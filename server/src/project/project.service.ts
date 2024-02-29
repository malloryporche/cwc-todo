import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateProjectDto } from '../dto/project/create-project.dto';
import { UpdateProjectDto } from '../dto/project/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { User } from '../entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Status } from '../entities/task.entity';
import { Todo } from 'src/entities/todo.entity';
import { TodoService } from 'src/todo/todo.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private userService: UserService,
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    id: number,
  ): Promise<Project> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new UnauthorizedException({ message: 'No user with that id' });
    }

    const project = new Project();
    project.title = createProjectDto.title;
    project.description = createProjectDto.description;
    project.dueDate = new Date(createProjectDto.dueDate) || null;
    project.status = createProjectDto.status;
    project.user = user;

    const savedProject = await this.projectsRepository.save(project);
    return savedProject;
  }

  async findAllActive(
    req,
  ): Promise<{ projects: Project[]; activeTasks: Todo[] }> {
    const user = req.user;
    if (user) {
      const projects = await this.projectsRepository.find({
        where: { user: { id: user.id }, status: Not(In([Status.COMPLETED])) },
        order: { dueDate: 'ASC' },
        relations: ['todos'],
      });
      projects.forEach((project) => {
        project.todos = project.todos.sort((a, b) => a.position - b.position);
      });

      const activeTasks = await this.todosRepository.find({
        where: { user: { id: user.id }, status: Not(In([Status.COMPLETED])) },
        order: { dueDate: 'ASC' },
        relations: ['project'],
      });
      return { projects: [...projects], activeTasks: [...activeTasks] };
    } else {
      throw new UnauthorizedException({});
    }
  }

  async findOne(id: number, user): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id, user: { id: user.id } },
      relations: ['todos'],
    });
    if (project) {
      return project;
    } else {
      throw new UnauthorizedException({ message: 'No project with that id' });
    }
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectsRepository.findOne({
      where: { id },
    });
    const updatedProject = await this.projectsRepository.save({
      ...project,
      ...updateProjectDto,
    });
    return updatedProject;
  }

  async remove(id: number) {
    return await this.projectsRepository.delete(id);
  }
}
