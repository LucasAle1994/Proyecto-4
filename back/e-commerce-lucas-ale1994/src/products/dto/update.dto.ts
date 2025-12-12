import { IsOptional, IsString, IsNumber, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO para la actualizacion de un producto.
 * Se utiliza en el endpoint de update y valida los datos básicos.
 */
export class UpdateProductDto {
  /** Nombre del producto (mínimo 3 y máximo 50 caracteres). 
   * @example 'Iphone 25'
  */
  @IsOptional()
  @IsString()
  name?: string;

  /** La descripcion del producto debe contener unicamente letras. 
   * @example 'El mejor Smartphone'
  */
  @IsOptional()
  @IsString()
  description?: string;

  /** El precio del producto solo debe contener números. 
   * @example 1500
  */
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price?: number;

  /** El precio del producto solo debe contener números. 
   * @example 15
  */
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  stock?: number;

  /** El URL de la imagen debe ser un URL válido. 
   * @example https://res.cloudinary.com/djj7y3oup/image/upload/v1759442326/id9fqqw4ejhxnkzis6uw.jpg
  */
  @IsOptional()
  @IsString()
  imgUrl?: string;

  /**EL UUID de la categoria se asigna automaticamante
   * @example 884c96c0-47e3-4d86-b99c-08634d0ba3e8*/
  @IsOptional()
  @IsUUID()
  categoryId?: string;
}
