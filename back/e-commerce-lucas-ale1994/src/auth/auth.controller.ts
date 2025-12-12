import { Body, Controller, Get, HttpCode, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/createUser.dto";
import { LoginUserDto } from "../users/dto/loginUser.dto";
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticacion - Endpoints')
@Controller('auth')
export class AuthController{
  constructor (private readonly authService: AuthService){}

  @HttpCode(201)
  @Post('signup')
  @ApiOperation({ summary: 'Crea un nuevo usuario'})
  async signUp(@Body() createUser: CreateUserDto, ){  
    return await this.authService.signUp(createUser)
  }
  @HttpCode(200) 
  @Post('signin')
  @ApiOperation({ summary: 'Loguea un usuario'})
  async signIn(@Body() loginDto: LoginUserDto){  
    return await this.authService.signIn(loginDto)
  }
}