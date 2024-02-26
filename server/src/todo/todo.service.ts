import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTodoDto } from '../dto/todo/create-todo.dto';
import { UpdateTodoDto } from '../dto/todo/update-todo.dto';
import { Todo } from 'src/entities/todo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todosRepository: Repository<Todo>,
    private readonly projectsService: ProjectService,
  ) {}
  async create(createTodoDto: CreateTodoDto, projectId: number, user: number) {
    const project = await this.projectsService.findOne(projectId, user);

    if (!project) {
      throw new UnauthorizedException({
        message: 'No project with that id',
      });
    }

    const todo = new Todo();
    todo.title = createTodoDto.title;
    todo.description = createTodoDto.description;
    todo.dueDate = createTodoDto.dueDate;
    todo.project = project;

    return this.todosRepository.save(todo);
  }

  findAll() {
    return `This action returns all todo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
