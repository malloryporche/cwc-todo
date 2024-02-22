import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  tag: string;

  @Column()
  dueDate: Date;

  @Column()
  projectId: number;

  @Column()
  completed: boolean;
}
