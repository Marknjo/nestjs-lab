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
import { CoffeesService } from './coffees.service';
import { CoffeesPaginationDto } from './dtos/coffees-pagination.dto';
import { CreateCoffeeDto } from './dtos/create-coffee.dto';
import { UpdateCoffeeDto } from './dtos/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Get()
  findAll(@Query() paginationOptions: CoffeesPaginationDto) {
    return this.coffeeService.findAll(paginationOptions);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeeService.findCoffeeById(id);
  }

  @Post()
  create(@Body() newCoffee: CreateCoffeeDto) {
    return this.coffeeService.create(newCoffee);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updates: UpdateCoffeeDto) {
    return this.coffeeService.update(id, updates);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Delete coffee by id ${id}`;
  }
}
