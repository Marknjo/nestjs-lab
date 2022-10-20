import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';

@Module({
  imports: [],
  controllers: [CoffeesController],
})
export class CoffeesModule {}
