import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderRepository } from './orders.repository';
import { OrderDetail } from './entities/order-detail.entity';
import { User } from '../users/entities/users.entity';
import { Product } from '../products/entities/products.entity';
import { Category } from '../categories/entities/category.entity';
import { UserRepository } from '../users/users.repository';
import { ProductsRepository } from '../products/products.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Order, User, Product, OrderDetail, Category])],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository, UserRepository, ProductsRepository]
})

export class OrdersModule {}
