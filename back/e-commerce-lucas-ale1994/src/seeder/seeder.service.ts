import { Injectable } from "@nestjs/common";
import { CategoriesService } from "../categories/categories.service";
import { ProductsService } from "../products/products.service";

@Injectable()
export class SeederService{
  constructor(private readonly categoryService: CategoriesService,
    private readonly productsService: ProductsService
  ){}

  async seederCharge(){
      try {
    console.log('Ejecutando seeder...');
    await this.productsService.addProducts();
    await this.categoryService.addCategories();
    console.log('Seeder ejecutado correctamente.');
  } catch (err) {
    console.error(' Error ejecutando seeder:', err);
  }
  }
}