import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductDto } from './dto/product.dto';
import { Product } from './entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update.dto';

@Injectable()
export class ProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    @InjectRepository(Product)
    private productRep: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAllProducts( page: number = 1, limit: number = 5,): Promise<ProductDto[]> {
      return await this.productsRepository.getAllProducts(page, limit);
  }

  async addProducts(): Promise<string> {
    return await this.productsRepository.addProducts();
  }

  async getProductsById(id: string[]): Promise<ProductDto[]> {
    const products = await this.productsRepository.getProductById(id);
    if (!products || products.length === 0) {
      throw new NotFoundException(`El Producto con id: ${id} no existe`);
    }
    return products.map((p)=>({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.stock,
      imgUrl: p.imgUrl,
      categoryName: p.category?.name,
    }));
  }

  async createProduct(productDto: Omit<ProductDto, 'id'>): Promise<ProductDto> {
    const existingProduct = await this.productRep.findOneBy({
    name: productDto.name.trim(),
  });

  if (existingProduct) {
    throw new BadRequestException(
      `Ya existe un producto con el nombre "${productDto.name}"`,
    );
  }

    const category = productDto.categoryId
      ? await this.categoryRepository.findOneBy({ id: productDto.categoryId })
      : null;

    if (!category) {
      throw new NotFoundException('Categoría no encontrada');
    }

    const newProduct : Partial<Product> = {
      name: productDto.name,
      description: productDto.description,
      price: productDto.price,
      stock: productDto.stock,
      imgUrl: productDto.imgUrl,
      category,
    };
    return await this.productsRepository.createProduct(newProduct);
  }

  
  async updateProduct(productId: string, productDto: UpdateProductDto): Promise<ProductDto> {

    const updated = await this.productsRepository.updateProduct( productId, productDto,);
    if (!updated) {
      throw new NotFoundException(`El Producto con id: ${productId} no existe`);    }
    return updated;
  }


  async deleteProduct(productId: string): Promise<ProductDto> {
    const removeProduct = await this.productsRepository.deleteProduct(productId);
    if (!removeProduct) {
      throw new NotFoundException(`El Producto con id: ${productId} no existe`);
    }
    return removeProduct;
  }
}
