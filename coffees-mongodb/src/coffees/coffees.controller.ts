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
    return `Find one coffee by id ${id}`;
  }

  @Post()
  create(@Body() content: CreateCoffeeDto) {
    console.log(content);

    return `Create a new coffee ${content}`;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updates: UpdateCoffeeDto) {
    console.log(updates);

    return `Update coffee by id ${id} with ${updates}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Delete coffee by id ${id}`;
  }
}
