import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'coffeeluv',
      password: 'secret',
      database: 'postgres',
      autoLoadEntities: true,

      // Apply sync based on environment: skip production
      ...(process.env.NODE_ENV === 'production' ? {} : { synchronize: true }),
    }),
    CoffeesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
