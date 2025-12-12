import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetail } from "../../orders/entities/order-detail.entity";
import { Category } from "../../categories/entities/category.entity";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Entidad de un producto dentro de la DB
 * contiene información básica como nombre, descripción, precio, stock
 * y sus relaciones con categorías y detalles de orden.
 */
@Entity()
export class Product {
  /** Identificador único del producto (UUID generado automáticamente). */
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string

  /** Nombre único del producto (máx. 50 caracteres). */
  @ApiProperty()
  @Column({type: 'varchar', length: 50, unique: true, nullable: false})
  name: string

  /** Descripción detallada del producto (opcional). */
  @ApiProperty()
  @Column({type: 'text', nullable: true})
  description: string

  /** Precio del producto (decimal). */
  @ApiProperty()
  @Column({type: 'decimal', precision: 10, scale: 2, nullable: false})
  price: number

  /** Stock disponible del producto (valor entero). */
  @ApiProperty()
  @Column({type: 'int', nullable: false})
  stock: number

  /** URL de la imagen del producto (por defecto un placeholder). */
  @ApiProperty()
  @Column({type: 'text', default: 'https://res.cloudinary.com/djj7y3oup/image/upload/v1759699785/image_dfkxth.jpg'})
  imgUrl: string

  /** Relación muchos a muchos: un producto puede aparecer en varias ordenes. */
  @ApiProperty()
  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  orderDetail: OrderDetail[]

  /** Relación muchos a uno: un producto pertenece a una categoría (opcional). */
  @ApiProperty()
  @ManyToOne(() => Category, (category) => category.products, {nullable:true})
  @JoinColumn({name: 'category_id'})
  category: Category | any
}