import { Inject, Injectable } from '@nestjs/common';
import {UploadApiResponse, v2 as Cloudinary} from 'cloudinary';
const toStream = require('buffer-to-stream');

@Injectable()
export class FileUploadRepository {
  constructor(
    @Inject('CLOUDINARY') private readonly cloudinary: typeof Cloudinary,
  ) {}

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = this.cloudinary.uploader.upload_stream(
        {resource_type: 'auto' },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result);
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }
}
