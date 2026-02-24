import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialNetworksService } from './social-networks.service';
import { SocialNetworksController } from './social-networks.controller';
import { SocialNetwork } from './entities/social-network.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SocialNetwork])],
  controllers: [SocialNetworksController],
  providers: [SocialNetworksService],
  exports: [SocialNetworksService],
})
export class SocialNetworksModule {}
