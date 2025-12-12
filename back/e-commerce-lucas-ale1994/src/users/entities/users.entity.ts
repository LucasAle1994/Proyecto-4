import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

/**
 * Entidad que representa a los usuarios del sistema.
 * Contiene datos personales, credenciales, estado y su relación con pedidos.
 */
@Entity({ name: 'users' })
export class User {

  /** Identificador único del usuario (UUID generado automáticamente). */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Nombre completo del usuario (máx. 50 caracteres). */
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  /** Email único del usuario (máx. 50 caracteres). */
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;

  /** Contraseña del usuario (debe almacenarse encriptada en producción). */
  @Column({ type: 'varchar', nullable: false })
  password: string;

  /** Número de teléfono del usuario (máx. 20 caracteres). */
  @Column({ type: 'varchar', length: 20 })
  phone: number;

  /** País del usuario (opcional, máx. 50 caracteres). */
  @Column({ type: 'varchar', length: 50 })
  country?: string | undefined;

  /** Dirección principal del usuario. */
  @Column({ type: 'text' })
  address: string;

  /** Ciudad del usuario (opcional, máx. 50 caracteres). */
  @Column({ type: 'varchar', length: 50 })
  city?: string | undefined;

  /** Indica si el usuario tiene rol de administrador. */
  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  /** Estado del usuario: true = activo, false = eliminado */
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  /** Relación uno a muchos: un usuario puede tener varios pedidos. */
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
} 
