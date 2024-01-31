import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  darkMode: boolean;

  @IsString()
  pass: string;

  @IsString()
  salt: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
