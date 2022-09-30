import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

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

  create(createCoffeeDto: CreateCoffeeDto) {
    const isNameUnique = this.store.find(
      (coffee) => coffee.name === createCoffeeDto.name,
    );

    if (isNameUnique) {
      throw new BadRequestException(
        `A coffee with the name '${createCoffeeDto.name}' already in the store.`,
      );
    }

    const id = randomBytes(8).toString('hex');

    const createDataWithId = {
      ...createCoffeeDto,
      id,
    };

    this.store.push(createDataWithId);

    return createDataWithId;
  }

  update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
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
