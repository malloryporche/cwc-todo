import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Project } from './project.entity';
import { Todo } from './todo.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Project, (project) => project.tags, { cascade: ['remove'] })
  @JoinTable({ name: 'project_tags' })
  projects: Project[];

  @ManyToMany(() => Todo, (todo) => todo.tags, { cascade: ['remove'] })
  @JoinTable({ name: 'todo_tags' })
  todos: Todo[];
}
