import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers( 
    page: number, 
    limit: number,
  ): Promise<Omit<UserDto, 'password'>[]> {
    const allUser = await this.userRepository.getAllUsers(page, limit);

    const hidePassword = allUser.map((user) => {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        phone: user.phone,
        country: user.country,
        city: user.city,
        isAdmin: user.isAdmin,
      };
    });
    return hidePassword;
  }

  async getUserById( 
    id: string,
  ): Promise<
  Omit<UserDto, 'password'> & { orders: { id: string; date: Date }[] } 
  > {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new NotFoundException(`El usuario con id: ${id} no existe`);
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      phone: user.phone,
      country: user.country,
      city: user.city,
      orders: user.orders
        ? user.orders.map((o) => ({
            id: o.id,
            date: o.date,
          }))
        : [],
    };
  }
  
  async updateUser(id: string, userDto: UpdateUserDto) {
    const upGradeUser = await this.userRepository.updateUser(id, userDto);
    if (!upGradeUser) {
      throw new NotFoundException(`El usuario con id: ${id} no existe`);
    }
    return { id: upGradeUser.id };
  }

  async deleteUser(id: string) {
    const removeUser = await this.userRepository.deleteUser(id);
    if (!removeUser) {
      throw new NotFoundException(`El usuario con id: ${id} no existe`);
    }
    return { id: removeUser.id, status: 'Usuario marcado como inactivo' };
  }
}
