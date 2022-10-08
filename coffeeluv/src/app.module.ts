import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { env } from 'process';
import {
  configDevOptions,
  configProdOptions,
} from './common/config/configs-options';

@Module({
  imports: [
    ConfigModule.forRoot({
      ...(env.NODE_ENV === 'production' ? configProdOptions : configDevOptions),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.DB_HOST,
      port: +env.DB_PORT,
      username: env.DB_USER,
      password: env.DB_PASS,
      database: env.DB_NAME,
      autoLoadEntities: true,

      // Apply sync based on environment: skip production
      ...(process.env.NODE_ENV === 'production' ? {} : { synchronize: true }),
    }),
    CoffeesModule,
    CoffeeRatingModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
