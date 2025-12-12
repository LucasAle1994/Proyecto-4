import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CategoryDto } from './dto/categories.dto';

@Injectable()
export class CategoriesService {
  constructor (private readonly categoriesRepository: CategoriesRepository) {}

  async getCategories(): Promise<CategoryDto[]> {
    return await this.categoriesRepository.getCategories()
  }

  async addCategories() {
    return await this.categoriesRepository.addCategories()
  }
 
  async nameCategory(name:string){
    return await this.categoriesRepository.nameCategory(name)
  }
}
