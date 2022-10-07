import { Controller, Get } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';

@Controller('coffee-rating')
export class CoffeeRatingController {
  constructor(private readonly coffeeRatingService: CoffeeRatingService) {}

  @Get()
  getAllCoffees() {
    return this.coffeeRatingService.findCoffees();
  }
}
