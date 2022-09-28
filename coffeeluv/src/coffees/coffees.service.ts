import { Injectable } from '@nestjs/common';

@Injectable()
export class CoffeesService {
  private store: Array<{ [key: string]: any }> = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll(limit?: number, offset?: number) {
    console.log({ limit, offset });

    return this.store;
  }
}
