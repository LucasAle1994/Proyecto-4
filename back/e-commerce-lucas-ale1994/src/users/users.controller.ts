import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Put, Query, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enum/roles.enum';
import { RolesGuard } from '../auth/guard/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/updateUser.dto';

@ApiTags('Usuarios - Endpoints')
@Controller('users')
export class UsersController { 
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lista todos los usuarios'})
  @ApiResponse({
    status:200,
    description: 'Listado obtenido satisfactoriamente'
  })
  @ApiResponse({
    status: 401, description:'No autorizado'
  })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard )
  async getAllUsers(@Query('page') page: number = 1,@Query('limit') limit: number = 5) {
    return await this.usersService.getAllUsers(page, limit);
  }

  @HttpCode(200)
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Busca un usuario por Id'})
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard )
  async getUserById(@Param('id', new ParseUUIDPipe()) id: string) { 
    return await this.usersService.getUserById(id);
  }

  @HttpCode(200)
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Realiza cambios en el usuario seleccionado por Id'})
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard )
  async updateUser(@Param('id', new ParseUUIDPipe()) id: string, @Body() userDto: UpdateUserDto) {
    return await this.usersService.updateUser(id, userDto)    
  }

  @HttpCode(200)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Elimina un usuario seleccionado por Id'})
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard )
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.deleteUser(id);
  }

}
