import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

/**
 * DTO para loguear un usuario.
 * Se utiliza en el endpoint de signin y valida los datos básicos.
 */
export class LoginUserDto {
  /**El Email debe ser válido
   * @example juanperez@gmail.com*/
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**La conformacion de contraseña debe contener minimo 8 caracteres(minúsculas, mayúsculas, números y caracteres especiales: !@#$%^&)
   * @example Ju@ncho2025*/
  @IsNotEmpty()
  @Length(8, 15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      'La contraseña debe contener minúsculas, mayúsculas, números y caracteres especiales: !@#$%^&',
  })
  password: string;
}
