import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
}

from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../enum/roles.enum';
import { UserRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { LoginUserDto } from '../users/dto/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(newUser: CreateUserDto) {
    const user = await this.userRepository.getByEmail(newUser.email);

    if (user) {
      throw new ConflictException('El usuario ya existe!');
    }

    if (newUser.password !== newUser.confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    if (!hashedPassword) {
      throw new InternalServerErrorException(
        'Error al generar hash de la contraseña',
      );
    }

    const totalUser = await this.userRepository.countUsers()

    if(totalUser === 0){
      newUser.isAdmin = true 
    }
    
    await this.userRepository.createUser({ ...newUser, password: hashedPassword, });    

    const { password, confirmPassword, isAdmin, ...userWithoutPass } = newUser;

    return userWithoutPass;
  }



  async signIn(loginDto: LoginUserDto ){
    const { email, password } = loginDto;
    const user = await this.userRepository.getByEmail(email);
    if(!user){
      throw new UnauthorizedException('Credenciales inválidas!')
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if(!isPasswordMatch){
      throw new UnauthorizedException('Credenciales inválidas!')
    }

    const Payload ={
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      roles: [user.isAdmin ? Role.Admin : Role.User]
    }
    
    const token = this.jwtService.sign(Payload)
    return {  
      success: 'Usuario Logueado con éxito',
      token,
    }
  
  }
}
