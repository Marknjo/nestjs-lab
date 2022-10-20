import { Module } from '@nestjs/common';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [CoffeesModule],
  controllers: [],
})
export class AppModule {}
