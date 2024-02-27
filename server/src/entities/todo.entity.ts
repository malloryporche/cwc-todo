import { Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Project } from './project.entity';
import { Task } from './task.entity';
import { Tag } from './tag.entity';

@Entity()
export class Todo extends Task {
  position: number;

  @ManyToOne(() => Project, (project) => project.todos)
  project: Project;

  @ManyToMany(() => Tag, (tag) => tag.todos)
  @JoinTable({ name: 'todo_tags' })
  tags: Tag[];
}
