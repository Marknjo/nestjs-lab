import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffees } from './entities/coffees-entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffees)
    private readonly coffeeRepository: Repository<Coffees>,
  ) {}

  findAll(limit?: number, offset?: number) {
    console.log({ limit, offset });

    return this.coffeeRepository.find();
  }

  findOne(id: string) {
    // const foundCoffee = this.coffeeRepository.find(
    //   (coffee) => coffee.id === id,
    // );

    // if (!foundCoffee) {
    //   throw new NotFoundException(`Could not find coffee with the id of ${id}`);
    // }

    // return foundCoffee;
    return 'waiting refactor';
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    // const isNameUnique = this.coffeeRepository.find(
    //   (coffee) => coffee.name === createCoffeeDto.name,
    // );

    // if (isNameUnique) {
    //   throw new BadRequestException(
    //     `A coffee with the name '${createCoffeeDto.name}' already in the coffeeRepository.`,
    //   );
    // }

    // const id = randomBytes(8).toString('hex');

    // const createDataWithId = {
    //   ...createCoffeeDto,
    //   id,
    // };

    // this.coffeeRepository.push(createDataWithId);

    // return createDataWithId;
    return 'waiting refactor';
  }

  update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    // const foundCoffee = this.findOne(id);

    // const coffeeIndex = this.coffeeRepository.findIndex(
    //   (coffee) => coffee.id === id,
    // );

    // this.coffeeRepository[coffeeIndex] = {
    //   ...foundCoffee,
    //   ...updateCoffeeDto,
    // };

    // return this.coffeeRepository[coffeeIndex];
    return 'waiting refactor';
  }

  remove(id: string) {
    // const coffeeIndex = this.coffeeRepository.findIndex(
    //   (coffee) => coffee.id === id,
    // );

    // if (coffeeIndex < 0) {
    //   throw new NotFoundException(
    //     `Could not delete coffee with the id of ${id}`,
    //   );
    // }

    // this.coffeeRepository.splice(coffeeIndex, 1);
    return 'waiting refactor';
  }
}
