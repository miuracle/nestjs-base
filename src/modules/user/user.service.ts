import { User } from '@db/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  async test(data: CreateUserDto) {
    const user = this.userRepo.create({
      ...data,
    });

    await this.userRepo.save(user);

    return user;
  }
}
