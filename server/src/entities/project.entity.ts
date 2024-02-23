import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Task } from './task.entity';
import { Todo } from './todo.entity';
import { User } from './user.entity';
import { Tag } from './tag.entity';

@Entity()
export class Project extends Task {
  @OneToMany(() => Todo, (todo) => todo.project)
  todos: Todo[];

  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @ManyToMany(() => Tag, (tag) => tag.projects)
  @JoinTable({ name: 'project_tags' })
  tags: Tag[];
}
