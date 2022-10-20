import { Controller, Get } from '@nestjs/common';

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
}
