import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTodoDto } from '../dto/todo/create-todo.dto';
import { UpdateTodoDto } from '../dto/todo/update-todo.dto';
import { Todo } from 'src/entities/todo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectService } from 'src/project/project.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todosRepository: Repository<Todo>,
    private readonly projectsService: ProjectService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async create(
    createTodoDto: CreateTodoDto,
    projectId: number,
    userId: number,
  ) {
    const project = await this.projectsService.findOne(projectId, userId);

    if (!project) {
      throw new UnauthorizedException({
        message: 'No project with that id',
      });
    }

    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException({ message: 'No user with that id' });
    }

    const { dueDate } = createTodoDto;
    const todo = new Todo();
    todo.title = createTodoDto.title;
    todo.description = createTodoDto.description;
    todo.status = createTodoDto.status;
    todo.user = user;
    todo.project = project;

    if (dueDate) {
      todo.dueDate = new Date(createTodoDto.dueDate);
    }

    const savedTodo = await this.todosRepository.save(todo);
    return savedTodo;
  }

  findAllUserTasks(userId: number) {
    return this.todosRepository.find({
      where: { user: { id: userId } },
      order: { dueDate: 'ASC' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const task = await this.todosRepository.findOne({
      where: { id },
    });
    const udpatedTask = this.todosRepository.save({
      ...task,
      ...updateTodoDto,
    });

    return udpatedTask;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
