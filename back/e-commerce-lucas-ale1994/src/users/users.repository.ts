import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserRepository {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(page: number = 1, limit: number = 5): Promise<User[]> {
    return await this.userRepository.find({
      where: { isActive: true },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getById(id: string): Promise<User | null> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.orders', 'order')
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.phone',
        'user.country',
        'user.address',
        'user.city',
        'order.id',
        'order.date',
      ])
      .where('user.id = :id', { id })
      .getOne();
  }

  async getByEmail(email: string): Promise<UserDto | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async updateUser(id: string, userDto: UpdateUserDto): Promise<User | null> {
    const user = await this.getById(id);
    if (!user) {
      throw new NotFoundException(`El usuario con id: ${id} no existe`);
    }
    const updateUser = { ...user, ...userDto, id };
    return await this.userRepository.save(updateUser);
  }

  async deleteUser(id: string): Promise<UserDto | null> {
    const searchId = await this.userRepository.findOne({ where: { id } });
    if (!searchId) {
      throw new NotFoundException(`El usuario con id: ${id} no existe`);
    }
    searchId.isActive = false;
    return await this.userRepository.save(searchId);
  }

  async countUsers(): Promise<number>{
    return this.userRepository.count()
  }


}
