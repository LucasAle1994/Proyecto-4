import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

/**
 * DTO para la creación de un nuevo usuario.
 * Se utiliza en el endpoint de registro y valida los datos básicos.
 */
export class CreateUserDto {
  @ApiProperty({
    required: true,
    description: 'Email del usuario',
    example: 'Juan Perez'
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  /** Nombre del usuario (mínimo 3 y máximo 80 caracteres). */
  name: string;

  @ApiProperty({
    required: true,
    description: 'Email del usuario',
    example: 'juanperez@gmail.com'
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**La contraseña debe contener minimo 8 caracteres(minúsculas, mayúsculas, números y caracteres especiales: !@#$%^&)
   * @example Ju@ncho2025*/
  @IsNotEmpty()
  @Length(8, 15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      'La contraseña debe contener minúsculas, mayúsculas, números y caracteres especiales: !@#$%^&',
  })
  password: string;


  /**La conformacion de contraseña debe contener minimo 8 caracteres(minúsculas, mayúsculas, números y caracteres especiales: !@#$%^&)
   * @example Ju@ncho2025*/
  @IsNotEmpty()
  @Length(8, 15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      'La contraseña debe contener minúsculas, mayúsculas, números y caracteres especiales: !@#$%^&'})
  confirmPassword: string

  /**El telefono de contacto debe contener solamente numeros
   * @example 54258236585*/
  @IsNotEmpty()
  @IsNumber()  
  phone: number;

  /**El pais debe contener solo letras
   * @example Alemania*/
  @IsOptional()
  @IsString()
  @Length(5, 20)
  country?: string;

  /**La direccion debe contener letras y numeros
   * @example Calledesconocida2526*/
  @IsNotEmpty()
  @IsString()
  @Length(5, 80)
  address: string;

  /**La ciudad debe contener solo letras
   * @example Dublin*/
  @IsOptional()
  @IsString()
  @Length(5, 20)
  city?: string;

  /**El Admin se asigna por defecto en false
   * @example false*/
  @ApiHideProperty()
  @IsEmpty()
  isAdmin?: boolean
}
