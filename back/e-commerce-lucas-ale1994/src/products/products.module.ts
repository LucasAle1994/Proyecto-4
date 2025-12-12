import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/products.entity";
import { Category } from "../categories/entities/category.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Product, Category])],
  providers:[ProductsService, ProductsRepository],
  controllers:[ProductsController],
  exports:[ProductsService]
})
export class ProductsModule{}