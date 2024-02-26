import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo } from 'src/entities/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { ProjectService } from 'src/project/project.service';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/mail/mail.service';
import { User } from 'src/entities/user.entity';

@Module({
  controllers: [TodoController],
  providers: [TodoService, ProjectService, UserService, MailService],
  imports: [
    TypeOrmModule.forFeature([Todo]),
    TypeOrmModule.forFeature([Project]),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [TodoService],
})
export class TodoModule {}
