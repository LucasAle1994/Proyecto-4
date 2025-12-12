import {Controller, Post, Param, UseInterceptors, UploadedFile, ParseUUIDPipe, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator,
  UseGuards} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enum/roles.enum';
import { RolesGuard } from '../auth/guard/roles.guard';

@ApiTags('Carpetas - Endpoints')
@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('uploadImage/:id')
  @ApiOperation({ summary: 'Agrega una imagen a un producto'})
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema:{
      type: 'object',
      properties: {
        file:{
          type:'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('file'))
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async uploadProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200 * 1024,
            message: '¡El tamaño del archivo no debe exceder los 200 kb!',
          }),
          new FileTypeValidator({
            fileType: /(jpeg|jpg|png|webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadProductImage(file, id);
  }
}
