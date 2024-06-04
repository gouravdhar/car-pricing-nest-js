import { IsOptional } from 'class-validator';

export class updateUserDto {
  @IsOptional()
  email: string;

  @IsOptional()
  password: string;
}
