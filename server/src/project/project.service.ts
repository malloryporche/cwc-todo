import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateProjectDto } from '../dto/project/create-project.dto';
import { UpdateProjectDto } from '../dto/project/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    private userService: UserService,
  ) {}

  create(createProjectDto: CreateProjectDto): Promise<Project> {
    console.log(createProjectDto);
    const { title, description, dueDate } = createProjectDto;
    const project = this.projectsRepository.save(createProjectDto);

    return project;
  }

  async findAll(req): Promise<Project[]> {
    const user = req.user;
    if (user) {
      const projects = await this.projectsRepository.find({
        where: { user: { id: user.id } },
      });

      return projects;
    } else {
      throw new UnauthorizedException({});
    }
  }

  async findOne(id: number, user): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id, user: { id: user.id } },
    });
    if (project) {
      return project;
    } else {
      throw new UnauthorizedException({ message: 'No project with that id' });
    }
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
