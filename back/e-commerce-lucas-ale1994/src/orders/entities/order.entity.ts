import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetail } from "./order-detail.entity";
import { User } from "../../users/entities/users.entity";

/**
 * Entidad que representa una orden realizada por un usuario.
  contiene la fecha de creación, la relación con el usuario que la generó
 * y el detalle de la orden (productos y precios).
 */
@Entity({ name: 'order' })
  export class Order{
    /** Identificador único de la orden (UUID generado automáticamente). */
    @PrimaryGeneratedColumn('uuid')
    id: string

    /** Fecha en la que se generó la orden. */
    @Column()
    date: Date

    /** Relación muchos a uno: una o muchas ordenes perteneces a un único usuario. */
    @ManyToOne(() => User, (user) => user.orders, )
    @JoinColumn({ name: 'user_id' })
    user:User
    
    /**
   * Relación uno a uno: cada orden tiene un único detalle asociado.
   * Se usa cascade para guardar automáticamente el detalle junto con la orden.
   */
    @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
    @JoinColumn({name: 'order_detail_id'})
    orderDetail: OrderDetail;

  }
