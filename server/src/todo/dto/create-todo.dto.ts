export class CreateTodoDto {}
import {
  IsEmail,
  IsString,
  IsBoolean,
  IsNotEmpty,
  isDate,
  IsDate,
} from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  title: string;

  @IsString()
  @Transform((params) => sanitizeHtml(params.value))
  description: string;

  @IsString()
  @Transform((params) => sanitizeHtml(params.value))
  tag: string;

  @IsDate()
  dueDate: Date;

  @IsBoolean()
  completed: string;

  @IsString()
  @IsNotEmpty()
  projectId: number;
}
