import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CoffeesService {
  private store: Array<{ [key: string]: any }> = [
    {
      id: '1',
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll(limit?: number, offset?: number) {
    console.log({ limit, offset });

    return this.store;
  }

  findOne(id: string) {
    const foundCoffee = this.store.find((coffee) => coffee.id === id);

    if (!foundCoffee) {
      throw new NotFoundException(`Could not find coffee with the id of ${id}`);
    }

    return foundCoffee;
  }
}
