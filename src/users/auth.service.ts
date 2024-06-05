import { BadRequestException, Injectable } from '@nestjs/common';
import { scrypt as _scrypt, randomBytes } from 'crypto';

import { UsersService } from './users.service';
import { asapScheduler } from 'rxjs';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    var users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('User already present');
    }

    // hash and salt password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    const user = await this.userService.create(email, result);
    return user;
  }

  signin() {}
}
