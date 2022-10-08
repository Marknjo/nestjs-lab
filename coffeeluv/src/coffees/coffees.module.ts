import { Injectable, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee-entity';
import { Flavor } from './entities/flavor-entity';
import { COFFEE_BRANDS } from './utils/coffee-constants';

//class MockCoffeeService {}
class CustomConfigService {
  constructor() {
    console.log({ provider: 'class CustomConfigService ' });
  }
}

class CustomDevConfigService {
  constructor() {
    console.log({ provider: 'class CustomDevConfigService' });
  }
}

class CustomProdConfigService {
  constructor() {
    console.log({ provider: 'class CustomProdConfigService' });
  }
}

@Injectable()
class CoffeeBrandsFactory {
  create() {
    return ['buddy brew', 'nescafe'];
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event]), ConfigModule],
  controllers: [CoffeesController],
  providers: [
    // {
    //   provide: CoffeesService,
    //   useValue: new MockCoffeeService(), // Both two methods works
    //   useClass: MockCoffeeService, //-> But all original CoffeeService method implementations are lost
    // },
    CoffeesService,
    CoffeeBrandsFactory,
    // // { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe'] }, // Without factories
    // {
    //   provide: COFFEE_BRANDS,
    //   useFactory: (brandsFactory: CoffeeBrandsFactory) => {
    //     return brandsFactory.create();
    //   },
    //   inject: [CoffeeBrandsFactory],
    // },
    {
      provide: COFFEE_BRANDS,
      useFactory: (
        brandsFactory: CoffeeBrandsFactory,
        dataSource: DataSource,
      ): Promise<string[]> => {
        const brands = brandsFactory.create();
        return new Promise((resolve, reject) => {
          //console.log({ entityMetas: dataSource.entityMetadatas });
          resolve(brands);
        });
      },
      inject: [CoffeeBrandsFactory, DataSource], // Order of arrangement matters with injection
    },
    {
      provide: CustomConfigService,
      useClass:
        process.env.NODE_ENV === 'production'
          ? CustomProdConfigService
          : CustomDevConfigService,
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
