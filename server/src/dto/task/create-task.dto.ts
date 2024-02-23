import { IsString, IsBoolean, IsNotEmpty, IsDate } from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';
import { Transform } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  title: string;

  @IsString()
  @Transform((params) => sanitizeHtml(params.value))
  description: string;

  @IsDate()
  dueDate: Date;

  @IsBoolean()
  completed: boolean;
}
