import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee-entity';
import { Flavor } from './entities/flavor-entity';

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
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
