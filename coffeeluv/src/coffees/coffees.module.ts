import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [
    // {
    //   provide: CoffeesService,
    //   useValue: new MockCoffeeService(), // Both two methods works
    //   useClass: MockCoffeeService, //-> But all original CoffeeService method implementations are lost
    // },
    CoffeesService,
    { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe'] },
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
