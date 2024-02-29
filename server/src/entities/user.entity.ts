import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Project } from './project.entity';
import { Todo } from './todo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  darkMode: boolean;

  @Column()
  pass: string;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
