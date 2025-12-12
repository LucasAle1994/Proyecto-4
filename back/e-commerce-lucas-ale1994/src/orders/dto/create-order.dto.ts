import { Transform, Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsString, IsUUID, ValidateNested } from 'class-validator';

/**
 * DTO que representa un producto dentro de una orden.
 * Se utiliza para identificar productos por su UUID.
 */
class ProductIdDto {
  @Transform(({ value }) => String(value)) 
  @IsString()
  @IsUUID()
  /** Identificador único del producto (UUID válido). */
  id: string;
}

/**
 * DTO para la creación de un nuevo pedido.
 * Contiene el id del usuario que realiza la orden y al menos un producto.
 */
export class CreateOrderDto {
  @IsUUID()
  /** Identificador único del usuario que realiza el pedido. */
  userId: string;

  /** Lista de productos incluidos en la orden (mínimo 1). */
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductIdDto)
  products: ProductIdDto[];
}

/**
 * DTO de respuesta al crear o consultar un pedido.
 * Devuelve el id de la orden y los detalles básicos de los productos.
 */
export class OrderResponseDto {
  /** Identificador único de la orden creada. */
  @IsUUID()
  orderId: string;

  /** Detalle de la orden (ejemplo: id del detalle y precio total o unitario). */
  orderDetail: {
    /** Identificador único del detalle de la orden. */
    
    id: string;
    /** Precio del subtotal en la orden. */
    price: number;
  };
}
