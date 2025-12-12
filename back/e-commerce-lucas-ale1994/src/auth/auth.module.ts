import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/users.entity";
import { UserRepository } from "../users/users.repository";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers:[AuthController],
  providers:[AuthService, UserRepository]
})
export class AuthModule{}