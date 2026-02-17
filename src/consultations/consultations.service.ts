import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consultation } from './entities/consultation.entity';
import { User, UserType } from '../users/entities/user.entity';

@Injectable()
export class ConsultationsService {
  constructor(
    @InjectRepository(Consultation)
    private consultationsRepository: Repository<Consultation>,
  ) {}

  async create(
    title: string,
    description: string,
    userId: number,
  ): Promise<Consultation> {
    const consultation = this.consultationsRepository.create({
      title,
      description,
      userId,
      status: 'pending',
    });
    return this.consultationsRepository.save(consultation);
  }

  async findAllForUser(user: User): Promise<Consultation[]> {
    if (user.type === UserType.ADMIN) {
      return this.consultationsRepository.find({ relations: ['user'] });
    }
    if (user.type === UserType.ARCHITECT) {
      return this.consultationsRepository.find({
        where: { status: 'pending' },
        relations: ['user'],
      });
    }
    return this.consultationsRepository.find({ where: { userId: user.id } });
  }

  async findOne(id: number, user: User): Promise<Consultation> {
    const consultation = await this.consultationsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!consultation)
      throw new NotFoundException(`Consultation ${id} not found`);

    if (user.type === UserType.CLIENT && consultation.userId !== user.id) {
      throw new ForbiddenException('You can only view your own consultations');
    }

    return consultation;
  }

  async updateStatus(
    id: number,
    status: string,
    user: User,
  ): Promise<Consultation> {
    if (user.type === UserType.CLIENT) {
      throw new ForbiddenException('Clients cannot update consultation status');
    }

    const consultation = await this.consultationsRepository.findOne({
      where: { id },
    });
    if (!consultation)
      throw new NotFoundException(`Consultation ${id} not found`);

    consultation.status = status;
    return this.consultationsRepository.save(consultation);
  }

  async remove(id: number, user: User): Promise<void> {
    const consultation = await this.consultationsRepository.findOne({
      where: { id },
    });
    if (!consultation)
      throw new NotFoundException(`Consultation ${id} not found`);

    if (user.type === UserType.CLIENT && consultation.userId !== user.id) {
      throw new ForbiddenException(
        'You can only delete your own consultations',
      );
    }

    await this.consultationsRepository.remove(consultation);
  }
}
