import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

@Entity('company_info')
export class CompanyInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  mission: string;

  @Column({ nullable: true })
  vision: string;

  @Column({ type: 'text', nullable: true })
  values: string;

  @Column({ type: 'text', nullable: true })
  bimMethodology: string;

  @Column({ type: 'text', nullable: true })
  aboutUs: string;

  @Column({ type: 'simple-array', nullable: true })
  gallery: string[];

  @UpdateDateColumn()
  updatedAt: Date;
}
