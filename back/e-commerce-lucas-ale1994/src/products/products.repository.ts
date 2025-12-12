import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { In, Repository } from 'typeorm';
import * as data from '../utils/seeder.json';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,) 
    {}

  async getAllProducts(page: number = 1, limit: number = 5,): Promise<Product[]> {
    const product = await this.productsRepository.find({ skip: (page - 1) * limit, take: limit, relations: ['category'],}); 
    if(!(await product).length){
      throw new BadRequestException('No hay archivos cargados')
    }  return product
  }

  async addProducts(): Promise<string> {
    for (const element of (data as any).default) {
      const product = this.productsRepository.create({
        name: element.name,
        description: element.description,
        price: element.price,
        stock: element.stock,
        imgUrl: element.imgUrl,
        category: null,
      });

      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values(product)
        .orUpdate(['description', 'price', 'stock'], ['name'])
        .execute();
    }
    return 'Productos cargados';
  }

  async getProductById(id: string[]): Promise<Product[]> {
    return this.productsRepository.find({
      where: { id: In(id) },
      relations: ['category'],
    });
  }

  async createProduct(product: Partial<ProductDto>): Promise<ProductDto> {
    const newProduct = this.productsRepository.create(product);
    return await this.productsRepository.save(newProduct);
  }

  async updateProduct(productId: string, productDto: Partial<Product>): Promise<Product | null> {
    const searchId = await this.productsRepository.findOne({
      where: { id: productId },
    });
    if (!searchId) return null;
    Object.assign(searchId, productDto);
    return this.productsRepository.save(searchId);
  }

  async deleteProduct(productId: string): Promise<Product | null> {
    const searchId = await this.productsRepository.findOne({
      where: { id: productId },
    });
    if (!searchId) return null;
    return await this.productsRepository.remove(searchId);
  }

  async save(product: Product): Promise<Product> {
    return this.productsRepository.save(product);
  }
}
