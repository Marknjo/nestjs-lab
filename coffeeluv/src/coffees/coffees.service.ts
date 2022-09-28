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

  create(createCoffeeDto: any) {
    this.store.push(createCoffeeDto);
  }

  update(id: string, updateCoffeeDto: any) {
    const foundCoffee = this.findOne(id);

    const coffeeIndex = this.store.findIndex((coffee) => coffee.id === id);

    this.store[coffeeIndex] = {
      ...foundCoffee,
      ...updateCoffeeDto,
    };

    return this.store[coffeeIndex];
  }

  remove(id: string) {
    const coffeeIndex = this.store.findIndex((coffee) => coffee.id === id);

    if (coffeeIndex < 0) {
      throw new NotFoundException(
        `Could not delete coffee with the id of ${id}`,
      );
    }

    this.store.splice(coffeeIndex, 1);
  }
}
