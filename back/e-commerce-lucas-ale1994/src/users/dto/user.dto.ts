import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';

/**
 * DTO para la validacion de usuarios.
 * Se utiliza en el endpoint de listado de ususarios y valida los datos básicos.
 */
export class UserDto {
  /**EL UUID se asigna automaticamante
   * @example 884c96c0-47e3-4d86-b99c-08634d0ba3e8*/
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  id?: string;

  /** Nombre del usuario (mínimo 3 y máximo 80 caracteres). 
   * @example Juan Perez
  */
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name: string;

  /**El Email debe ser válido
   * @example juancho@mail.com*/
  @IsEmail()
  @IsString()
  email: string;

  /**La conformacion de contraseña debe contener minimo 8 caracteres(minúsculas, mayúsculas, números y caracteres especiales: !@#$%^&)
   * @example Ju@ncho2025*/
  @IsNotEmpty()
  @Length(8, 15)
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
      message:
        'La contraseña debe contener minúsculas, mayúsculas, números y caracteres especiales: !@#$%^&',
    })
  password: string;

  /**El telefono de contacto debe contener solamente numeros
   * @example 54258236585*/
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
  @Length(3, 80)
  address: string;

  /**La ciudad debe contener solo letras
   * @example Dublin*/
  @IsOptional()
  @IsString()
  @Length(5, 20)
  city?: string;

  /**El Admin se asigna por defecto en false
   * @example false*/
  @IsEmpty()
  isAdmin?: boolean
}
