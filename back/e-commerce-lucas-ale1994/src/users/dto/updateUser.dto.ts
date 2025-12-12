import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './createUser.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length, IsNumber } from 'class-validator';

/**
 * DTO para la actualización parcial de un usuario.
 * Permite modificar solo los campos necesarios sin requerir todos los datos.
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {

  /** Nombre actualizado del usuario
   * @example Juan Actualizado */
  @ApiPropertyOptional({
    description: 'Nombre del usuario',
    example: 'Juan Actualizado'
  })
  @IsOptional()
  @IsString()
  @Length(3, 80)
  name?: string;


  /** País del usuario (solo letras)
   * @example Argentina */
  @ApiPropertyOptional({
    description: 'País del usuario',
    example: 'Argentina'
  })
  @IsOptional()
  @IsString()
  @Length(5, 20)
  country?: string;


  /** Ciudad del usuario (solo letras)
   * @example Córdoba */
  @ApiPropertyOptional({
    description: 'Ciudad del usuario',
    example: 'Córdoba'
  })
  @IsOptional()
  @IsString()
  @Length(5, 20)
  city?: string;


  /** Dirección del usuario (letras y números)
   * @example Nueva dirección 123 */
  @ApiPropertyOptional({
    description: 'Dirección del usuario',
    example: 'Nueva dirección 123'
  })
  @IsOptional()
  @IsString()
  @Length(5, 80)
  address?: string;


  /** Teléfono de contacto del usuario (solo números)
   * @example 5491122334455 */
  @ApiPropertyOptional({
    description: 'Teléfono de contacto',
    example: 5491122334455
  })
  @IsOptional()
  @IsNumber()
  phone?: number;
}
