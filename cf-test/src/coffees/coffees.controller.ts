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

@Controller('coffees')
export class CoffeesController {
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
  findAll(@Query() filters: any) {
    let { limit, page } = filters;
    limit = limit || 10;
    page = page || 0;

    return 'This resource returns all coffees';
  }

  @Post('/create')
  create(@Body() coffeeContent: any) {
    return 'This resource creates a new coffee content';
  }

  @Patch('/:id/update')
  update(@Param() id: string, @Body() updates: any) {
    return 'This resource updates coffee entry by id';
  }

  @Delete('/:id/delete')
  remove(@Param() id: string) {
    return 'This resource deletes coffee by id';
  }
}
