import { Injectable, NotFoundException } from "@nestjs/common";
import { Order } from "./entities/order.entity";
import { DataSource, Repository } from "typeorm";
import { OrderDetail } from "./entities/order-detail.entity";

@Injectable()
export class OrderRepository extends Repository<Order>{
  
  constructor(private dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  async saveOrder(order: Order):Promise<Order> {
    return this.save(order)
  }
  async saveOrderDetail(orderDetail: OrderDetail): Promise<OrderDetail> {
    return this.dataSource.manager.save(OrderDetail, orderDetail);
  }

  async findOrderById(id: string): Promise<Order | null> {
    return this.findOne({
      where:{ id },
      relations:['user', 'orderDetail', 'orderDetail.products']
    });
  }

  async deleteOrder(id: string) {
    return this.delete(id)
  }  

}