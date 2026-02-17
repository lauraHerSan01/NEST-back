import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Consultation } from '../../consultations/entities/consultation.entity';

export enum UserType {
  ADMIN = 'admin',
  ARCHITECT = 'architect',
  CLIENT = 'client',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({
    type: 'simple-enum',
    enum: UserType,
    default: UserType.CLIENT,
  })
  type: UserType;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Consultation, (consultation) => consultation.user)
  consultations: Consultation[];
}
