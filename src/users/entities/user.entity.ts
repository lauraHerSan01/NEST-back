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
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  secondLastName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  zipCode: string;

  @Column({ nullable: true })
  country: string;

  @Column({
    type: 'simple-enum',
    enum: UserType,
    default: UserType.CLIENT,
  })
  type: UserType;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ default: false })
  showInTeam: boolean;

  @Column({ nullable: true })
  position: string;

  @Column({ nullable: true })
  teamImage: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Consultation, (consultation) => consultation.user)
  consultations: Consultation[];
}
