import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee-entity';
import { Flavor } from './entities/flavor-entity';
import { COFFEE_BRANDS } from './utils/coffee-constants';

//class MockCoffeeService {}

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
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
