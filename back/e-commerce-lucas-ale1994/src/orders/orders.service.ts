import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, OrderResponseDto } from './dto/create-order.dto';
import { OrderRepository } from './orders.repository';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/order-detail.entity';
import { UserRepository } from '../users/users.repository';
import { ProductsRepository } from '../products/products.repository';

@Injectable()
export class OrdersService {
  
  constructor(
    private readonly orderRepository: OrderRepository, 
    private readonly userRepository: UserRepository,      
    private readonly productRepository: ProductsRepository,
  ) {}

  async addOrder(dto: CreateOrderDto): Promise<Order | OrderResponseDto> {
    const user = await this.userRepository.getById(dto.userId);
    if (!user) throw new NotFoundException(`Usuario no encontrado`);

    const productIds = dto.products.map((p) => p.id); 

    const products = await this.productRepository.getProductById(productIds);
    if (!products || !products.length) {
      throw new NotFoundException(`No hay productos disponibles`);
    }

    const validProducts = products.filter((product) => product.stock > 0);
    if (!validProducts.length) {
      throw new BadRequestException('Los productos no tienen stock');
    }

    for (const product of validProducts) {
      product.stock -= 1;       
      await this.productRepository.save(product);
    }
    
    const order = new Order();
    order.user = user as any;
    order.date = new Date()
    const savedOrder = await this.orderRepository.saveOrder(order);

    const orderDetail = new OrderDetail();
    orderDetail.order = savedOrder; 

    orderDetail.totalPrice = validProducts.reduce((acc, p) => acc + Number(p.price), 0);
    orderDetail.products = validProducts;

    await this.orderRepository.saveOrderDetail(orderDetail);

    savedOrder.orderDetail = orderDetail;
    await this.orderRepository.saveOrder(savedOrder);

    const finishedOrder = await this.orderRepository.findOrderById( savedOrder.id );
    if (!finishedOrder) {
      throw new NotFoundException(`Orden no encontrada`);
    }
    return {
      orderId: finishedOrder.id,
      orderDetail: {
        id: finishedOrder.orderDetail.id,
        price:Number(finishedOrder.orderDetail.totalPrice)
      }
    }
  }

  async getOrder(id: string){
    const order = await this.orderRepository.findOrderById(id);
    if (!order) throw new NotFoundException(`Orden con id ${id} no encontrada`);
    return {
      id: order.id,
      date: order.date,
      user: {
        id:order.user.id,
      },
      orderDetail: {
        id: order.orderDetail.id,
        price: Number(order.orderDetail.totalPrice  ),
        products: order.orderDetail.products.map((p) => ({
          id: p.id,
          name: p.name,
          price: Number(p.price),
          imgUrl: p.imgUrl
        }))
      }
    };
  }

  async deleteOrder(id: string) {
    return await this.orderRepository.deleteOrder(id)
  }
}
