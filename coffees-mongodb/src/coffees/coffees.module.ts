import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Coffee, CoffeeSchema } from './entities/coffee.entity';
import { CoffeesController } from './coffees.controller';

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
})
export class CoffeesModule {}
