import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/seeder.json';
import { Product } from '../products/entities/products.entity';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return await this.categoriesRepository.find({
      relations: ['products'],
    });
  }

  async addCategories(): Promise<string> {
    const productRepo = this.categoriesRepository.manager.getRepository(Product);

    for (const element of (data as any).default) {
      let category = await this.categoriesRepository.findOne({
        where: { name: element.category },
      });

      if (!category) {
        category = this.categoriesRepository.create({
          name: element.category,
        });
        category = await this.categoriesRepository.save(category);
      }       
      
      const product = await productRepo.findOne({
        where: { name: element.name },
        relations: ['category'],
      });

      if (product && !product.category ) {
        product.category = category;
        await productRepo.save(product);
      }
    }
    return 'Categorias agregadas';
  }

  async nameCategory(name:string){
    const categoryName = this.categoriesRepository.findOne({
      where: {name},
      relations: ['products']
    })
    if(!categoryName){
      throw new NotFoundException(`categoria ${name} no encontrada`)
    }
    return categoryName
    
  }
}
