import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialNetwork } from './entities/social-network.entity';

@Injectable()
export class SocialNetworksService {
  constructor(
    @InjectRepository(SocialNetwork)
    private socialNetworksRepository: Repository<SocialNetwork>,
  ) {}

  async create(data: Partial<SocialNetwork>): Promise<SocialNetwork> {
    const socialNetwork = this.socialNetworksRepository.create(data);
    return this.socialNetworksRepository.save(socialNetwork);
  }

  async findAll(): Promise<SocialNetwork[]> {
    return this.socialNetworksRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<SocialNetwork> {
    const socialNetwork = await this.socialNetworksRepository.findOne({
      where: { id },
    });
    if (!socialNetwork) {
      throw new NotFoundException(`SocialNetwork with ID ${id} not found`);
    }
    return socialNetwork;
  }

  async update(
    id: number,
    data: Partial<SocialNetwork>,
  ): Promise<SocialNetwork> {
    const socialNetwork = await this.findOne(id);
    Object.assign(socialNetwork, data);
    return this.socialNetworksRepository.save(socialNetwork);
  }

  async remove(id: number): Promise<void> {
    const socialNetwork = await this.findOne(id);
    await this.socialNetworksRepository.remove(socialNetwork);
  }
}
