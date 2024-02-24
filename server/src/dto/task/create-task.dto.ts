import {
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsDate,
  IsOptional,
} from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';
import { Transform } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  title: string;

  @IsOptional()
  @IsString()
  @Transform((params) => sanitizeHtml(params.value))
  description?: string;

  @IsOptional()
  @IsDate()
  dueDate?: Date;

  @IsBoolean()
  completed?: boolean = false;
}
