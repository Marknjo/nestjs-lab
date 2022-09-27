import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll() {
    return 'This action return all coffees';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns #[${id}] coffee`;
  }

  @Post()
  create(@Body() body) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This action updates coffee #[${id}] with ${body.name}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes #[${id}] coffee`;
  }
}
