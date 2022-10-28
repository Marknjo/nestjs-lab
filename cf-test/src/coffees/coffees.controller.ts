import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesPaginationDto } from 'src/common/dtos/coffees-pagination.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dtos/create-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Get('/health')
  healthCheck() {
    return `
      <div style="
           margin: 30px auto; 
           display: flex; 
           flex-direction: 
           column; 
           align-items: center">
        <h1 style="
           line-height: 1; 
           margin: 5px 0;
           text-transform: capitalize;
           ">Welcome to the coffees API</h1>
        <p>API working as expected</p>
      </div>
    `;
  }

  @Get()
  // findAll(@Query() filters: PaginationFilters) {
  findAll(@Query() paginationOptions: CoffeesPaginationDto) {
    let { limit, page } = paginationOptions;
    limit = limit || 10;
    page = page || 0;

    return this.coffeeService.findAll(page, limit);
  }

  @Get('/:coffeeId')
  findOne(@Param('coffeeId') coffeeId: string) {
    return this.coffeeService.findOne(coffeeId);
  }

  @Post('/create')
  create(@Body() coffeeContent: CreateCoffeeDto) {
    return this.coffeeService.create(coffeeContent);
  }

  @Patch('/:coffeeId/update')
  update(@Param('coffeeId') coffeeId: string, @Body() updates: any) {
    return this.coffeeService.update(coffeeId, updates);
  }

  @Delete('/:coffeeId/delete')
  remove(@Param('coffeeId') coffeeId: string) {
    return this.coffeeService.remove(coffeeId);
  }
}
