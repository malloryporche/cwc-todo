import { IsNotEmpty, IsString } from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';
import { Transform } from 'class-transformer';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  name: string;
}
