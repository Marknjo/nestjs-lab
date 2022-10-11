import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoffeeRatingService } from './coffee-rating.service';

@ApiTags('Ratings')
@Controller('coffee-rating')
export class CoffeeRatingController {
  constructor(private readonly coffeeRatingService: CoffeeRatingService) {}

  @Get()
  getAllCoffees() {
    return this.coffeeRatingService.findCoffees();
  }
}
