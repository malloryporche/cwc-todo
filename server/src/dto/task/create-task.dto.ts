import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';
import { Transform } from 'class-transformer';
import { Status } from 'src/entities/task.entity';

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
  @IsString()
  dueDate?: string;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
