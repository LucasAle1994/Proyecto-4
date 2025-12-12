import { Controller, Get, Post, Body, Param, ParseUUIDPipe, UseGuards, Req, ForbiddenException, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enum/roles.enum';
import { RolesGuard } from '../auth/guard/roles.guard';

@ApiTags('Ordenes - Endpoints')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  
  @Post()
  @ApiOperation({ summary: 'Crea una nueva Orden'})
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard )
  async addOrder(@Body() dto: CreateOrderDto, @Req() req: any) {
    const loggerUserId = req.user.id;

    if(dto.userId !== loggerUserId){
      throw new ForbiddenException('No puedes crear ordenes para otros usuarios')
    }
    return await this.ordersService.addOrder(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca una orden por Id'})
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard )
  async getOrder(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.ordersService.getOrder(id); 
  }

  @Delete(':id')
  async deleteOrder(@Param('id', new ParseUUIDPipe()) id:string){
    return await this.ordersService.deleteOrder(id)
  }

}
