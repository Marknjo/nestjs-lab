import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Coffee, CoffeeSchema } from './entities/coffee.entity';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Coffee.name,
          schema: CoffeeSchema,
        },
      ],
      'coffees',
    ),
    // MongooseModule.forFeatureAsync(
    //   [
    //     {
    //       name: 'Coffee',
    //       useFactory: () => {
    //         const schema = CoffeeSchema;
    //         return {
    //           schema,
    //         };
    //       },
    //     },
    //   ],
    //   'coffees',
    // ),
  ],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
