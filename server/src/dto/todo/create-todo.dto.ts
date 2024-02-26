import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateTaskDto } from '../task/create-task.dto';

export class CreateTodoDto extends CreateTaskDto {
  @IsNotEmpty()
  @IsNumber()
  projectId;
}
