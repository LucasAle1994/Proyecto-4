import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';


@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers: [UsersService, UserRepository  ],
  controllers: [UsersController],
  exports: [TypeOrmModule, UserRepository]
})
export class UserModule {}
