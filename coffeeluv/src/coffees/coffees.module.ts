import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffees } from './entities/coffees-entity';
import { Flavors } from './entities/flavors-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffees, Flavors])],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
