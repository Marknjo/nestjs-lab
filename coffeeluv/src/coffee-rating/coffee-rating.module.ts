import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { CoffeeRatingController } from './coffee-rating.controller';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    CoffeesModule,
    DatabaseModule.register({
      type: 'postgres',
      host: 'localhost',
      password: 'secret',
      username: 'coffeeluv',
      database: 'postgres',
      port: 5432,
    }),
  ],
  providers: [CoffeeRatingService],
  controllers: [CoffeeRatingController],
})
export class CoffeeRatingModule {}
