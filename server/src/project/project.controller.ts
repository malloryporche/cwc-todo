import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  ValidationPipe,
  ParseIntPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from '../dto/project/create-project.dto';
import { UpdateProjectDto } from '../dto/project/update-project.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body(ValidationPipe) createProjectDto: CreateProjectDto,
    @Request() req,
  ) {
    const id = req.user.id;
    console.log(id);
    return this.projectService.create(createProjectDto, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllUserProjects(@Request() req) {
    return this.projectService.findAll(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id') // GET /project/:id
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    try {
      return this.projectService.findOne(id, req.user);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.remove(id);
  }
}
