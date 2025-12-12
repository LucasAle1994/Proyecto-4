import { ApiHideProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from "class-validator";

/**
 * DTO para la creacion de un nuevo producto.
 * Se utiliza en el endpoint de creacion y valida los datos básicos.
 */
export class ProductDto {
  /**Identificador único del producto (UUID válido)
   * @example 884c96c0-47e3-4d86-b99c-08634d0ba3e8*/
  @ApiHideProperty()
  @IsOptional()
  @IsUUID()
  id?: string;

  /** Nombre del producto (mínimo 3 y máximo 50 caracteres). 
   * @example 'Iphone 25'
  */
  @IsNotEmpty()
  @IsString()
  name: string;

  /** La descripcion del producto debe contener unicamente letras. 
   * @example 'El mejor Smartphone'
  */
  @IsOptional()
  @IsString()
  description: string;

  /** El precio del producto solo debe contener números. 
   * @example 1500
  */
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price: number; 

  /** El precio del producto solo debe contener números. 
   * @example 15
  */
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  stock: number;

  /** El URL de la imagen debe ser un URL válido. 
   * @example https://res.cloudinary.com/djj7y3oup/image/upload/v1759699785/image_dfkxth.jpg
  */
  @IsOptional()
  @IsString()
  imgUrl?: string;

  /**EL UUID de la categoria se asigna automaticamante
   * @example 884c96c0-47e3-4d86-b99c-08634d0ba3e8*/
  @IsNotEmpty()
  @IsString()
  categoryId?: string;
}
