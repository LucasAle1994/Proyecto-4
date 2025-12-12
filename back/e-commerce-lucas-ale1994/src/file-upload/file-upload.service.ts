import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/products.entity';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async uploadProductImage(file: Express.Multer.File, productId: string) {
    const productExists = await this.productRepository.findOneBy({
      id: productId,
    });
    if (!productExists) {
      throw new NotFoundException('El producto no existe');
    }
    const uploadedImage = await this.fileUploadRepository.uploadImage(file);

    await this.productRepository.update(productId, {
      imgUrl: uploadedImage.secure_url,
    });

    const updatedProduct = await this.productRepository.findOneBy({
      id: productId,
    });

    return updatedProduct;
  }
}
