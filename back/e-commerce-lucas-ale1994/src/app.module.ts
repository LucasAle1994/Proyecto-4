import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import typeorm from './config/typeorm'
import { JwtModule } from '@nestjs/jwt';
import { SeederModule } from './seeder/seeder.module';
import { SeederService } from './seeder/seeder.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return config.get<TypeOrmModuleOptions>('typeorm', { infer: true });
      },
    }),
    UserModule,
    ProductsModule,
    AuthModule,
    OrdersModule,
    CategoriesModule,
    FileUploadModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h'},
      secret:process.env.JWT_SECRET
    }),
    SeederModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnApplicationBootstrap{
  constructor(private readonly seederService: SeederService){}
  async onApplicationBootstrap() {
    await this.seederService.seederCharge();
  }
}
