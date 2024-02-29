import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project } from 'src/entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/entities/user.entity';
import { MailService } from 'src/mail/mail.service';
import { Todo } from 'src/entities/todo.entity';
import { TodoService } from 'src/todo/todo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Todo]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, UserService, MailService, TodoService],
  exports: [ProjectService],
})
export class ProjectModule {}
