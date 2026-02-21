import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserType } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    if (attrs.password) {
      throw new ForbiddenException(
        'Use /users/:id/password to change password',
      );
    }
    Object.assign(user, attrs);
    return this.usersRepository.save(user);
  }

  async updatePassword(
    id: number,
    currentPassword: string,
    newPassword: string,
    requesterId: number,
  ): Promise<void> {
    const user = await this.findOne(id);

    if (id !== requesterId) {
      const requester = await this.findOne(requesterId);
      if (requester.type !== UserType.ADMIN) {
        throw new ForbiddenException('You can only change your own password');
      }
    }

    if (!(await bcrypt.compare(currentPassword, user.password))) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }
}
