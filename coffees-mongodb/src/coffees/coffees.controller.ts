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
import { CoffeesPaginationDto } from './dtos/coffees-pagination.dto';
import { CreateCoffeeDto } from './dtos/create-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll(@Query() paginationOptions: CoffeesPaginationDto) {
    console.log(paginationOptions);

    return `Get all coffees Limit ${paginationOptions.limit} and collect ${paginationOptions.page}`;
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
  update(@Param('id') id: string, @Body() updates: any) {
    console.log(updates);

    return `Update coffee by id ${id} with ${updates}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Delete coffee by id ${id}`;
  }
}
