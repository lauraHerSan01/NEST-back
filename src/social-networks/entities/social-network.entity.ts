import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum SocialNetworkType {
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  LINKEDIN = 'linkedin',
  TWITTER = 'twitter',
  YOUTUBE = 'youtube',
  TIKTOK = 'tiktok',
  WHATSAPP = 'whatsapp',
  OTHER = 'other',
}

@Entity('social_networks')
export class SocialNetwork {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'simple-enum',
    enum: SocialNetworkType,
    default: SocialNetworkType.OTHER,
  })
  type: SocialNetworkType;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  icon: string;

  @CreateDateColumn()
  createdAt: Date;
}
