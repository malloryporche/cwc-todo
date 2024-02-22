import { IsEmail, IsString, IsBoolean, IsNotEmpty } from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @IsEmail()
  @Transform((params) => sanitizeHtml(params.value))
  email: string;

  @IsString()
  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  password: string;
}
