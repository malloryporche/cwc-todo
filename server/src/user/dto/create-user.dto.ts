import { IsEmail, IsString, IsBoolean, IsNotEmpty } from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';
import { Transform } from 'class-transformer';

// const passwordRegEx =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  name: string;

  @IsEmail()
  @Transform((params) => sanitizeHtml(params.value))
  email: string;

  @IsBoolean()
  darkMode: boolean;

  @IsString()
  @IsNotEmpty()
  pass: string;
}
