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

  remove(id: number) {
    return this.projectsRepository.delete(id);
  }
}
