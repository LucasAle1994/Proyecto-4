import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enum/roles.enum';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/products.entity';
import { ProductResponseDto } from './dto/productResponse.dto';

@ApiTags('Productos - Endpoints')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @HttpCode(200)
  @Get('list')
  @ApiOperation({ summary: 'Lista todos los productos'})
  async getProductsList(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
     return await this.productsService.getAllProducts(page, limit);    
  }

  @HttpCode(200) 
  @Get('seeder')
  @ApiOperation({ summary: 'Carga todos los productos del seeder'})
  async addProducts(){
    return await this.productsService.addProducts()
  }
  
  @HttpCode(200)
  @Get(':id')
  @ApiOperation({ summary: 'Busca un producto Id'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: ProductResponseDto})
  async getProductsById(@Param('id') id: string){
    return await this.productsService.getProductsById([id])
  }

  @HttpCode(201)
  @Post()
  @ApiOperation({ summary: 'Crea un nuevo Producto'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({ type: Product })
  async createNewProduct(@Body() productDto: ProductDto){
    return await this.productsService.createProduct(productDto)    
  }

  @HttpCode(200)
  @Put(':id')
  @ApiOperation({ summary: 'Realiza cambios en el Producto seleccionado por Id'})
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async updateProduct(@Param('id') id: string, @Body() productDto: UpdateProductDto){    
    if(productDto){
      return await this.productsService.updateProduct(id, productDto)
    }else{
      throw new NotFoundException (`El Producto no existe`);
    }
  }

  @HttpCode(200)
  @Delete(':id')
  @ApiOperation({ summary: 'Elimina el Producto seleccionado por Id'})
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async deleteProduct(@Param('id') id: string) {
        return await this.productsService.deleteProduct(id);
  }

} 
