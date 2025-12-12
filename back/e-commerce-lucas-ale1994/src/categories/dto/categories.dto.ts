/**
 * Dto que se utiliza para la carga de la categoría de productos.
  se utiliza para organizar y clasificar los productos dentro de la DB.
 */

import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CategoryDto {
  /**Identificador único de la categoria(UUID válido)
   * @example 884c96c0-47e3-4d86-b99c-08634d0ba3e8*/
  @IsOptional()
  @IsUUID()
  id: string;

  /** Nombre único de la categoría 
   * @example "Smartphone"
  */
  @IsNotEmpty()
  @IsString()
  name: string;  
}
