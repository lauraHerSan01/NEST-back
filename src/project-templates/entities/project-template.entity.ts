import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('project_templates')
export class ProjectTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectName: string;

  @Column()
  location: string;

  @Column()
  year: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  builtM2: number;

  @Column()
  projectType: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  builtAreaM2: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  rentableAreaM2: number;

  @Column({ nullable: true })
  levels: string;

  @Column({ nullable: true })
  parkingSpaces: number;

  @Column({ nullable: true })
  certification: string;

  @Column({ nullable: true })
  efficiency: string;

  @Column({ nullable: true })
  client: string;

  @Column({ type: 'simple-array', nullable: true })
  gallery: string[];

  @CreateDateColumn()
  createdAt: Date;
}
