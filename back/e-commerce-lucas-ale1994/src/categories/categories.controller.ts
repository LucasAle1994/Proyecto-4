import { Controller, Get, HttpCode, Param, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Categorias - Endpoints')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @HttpCode(200)
  @Get()
  @ApiOperation({ summary: 'Lista todas las categorias'})
  async getCategories() {
    return await this.categoriesService.getCategories();
  }

  @HttpCode(200)
  @Get('seeder')
  @ApiOperation({ summary: 'Carga todas las categorias del seeder'})
  async addCategories() {
    return await this.categoriesService.addCategories();
  }

   @Get('Categoria')
  async nameCategory(@Query('name') name: string){
    return await this.categoriesService.nameCategory(name)
  }
} 
