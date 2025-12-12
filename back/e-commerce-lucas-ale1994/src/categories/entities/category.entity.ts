import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../products/entities/products.entity";

/**
 * Entidad que representa una categoría de productos.
  se utiliza para organizar y clasificar los productos dentro de la DB.
 */
@Entity()
export class Category {
  /** Identificador único de la categoría (UUID generado automáticamente). */
  @PrimaryGeneratedColumn('uuid')
  id: string

  /** Nombre único de la categoría (ej: "Smartphone", "Monitor", "Mouse"). */
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true})
  name: string

  /** Relación uno a muchos: una categoría puede contener varios productos. */
  @OneToMany(() => Product, (product) => product.category)
  products: Product[]
} 
 