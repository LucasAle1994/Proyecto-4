import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "../../products/entities/products.entity";

/**
 * Entidad que representa el detalle de una orden.
  contiene el precio final asociado y la relación con la orden y los productos.
 * Funciona como tabla intermedia entre `Order` y `Product`.
 */
@Entity()
export class OrderDetail {
  /** Identificador único del detalle de la orden (UUID generado automáticamente). */
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  /** Precio total o subtotal asociado a este detalle de orden. */
  @Column({ type: 'decimal', precision: 10, scale:2, nullable: false })
  totalPrice: number

  /** Relación uno a uno: cada detalle pertenece a una sola orden. */
  @OneToOne(() => Order, (order) => order.orderDetail, {onDelete: 'CASCADE',  cascade: true,})
  @JoinColumn({name: 'id_order'})
  order:Order

  /**
   * Relación muchos a muchos: un detalle puede incluir varios productos
    y un producto puede estar en varios detalles de orden.
   * La tabla intermedia se llama `order_detail_products`.
   */
  @ManyToMany(() => Product, (product)=> product.orderDetail,)
  @JoinTable({
    name: 'order_detail_products',
    joinColumn: { name: 'order_detail_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' }
  })
  products: Product[] 

}