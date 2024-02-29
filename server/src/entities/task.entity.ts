import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Status {
  NOT_STARTED = 'not started',
  PLANNING = 'planning',
  ASSIGNED = 'assigned',
  IN_PROGRESS = 'in progress',
  REVIEW = 'review',
  COMPLETED = 'completed',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  dueDate: Date;

  @Column({ type: 'enum', enum: Status, default: Status.NOT_STARTED })
  status: Status;
}
