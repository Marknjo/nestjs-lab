import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dtos/create-coffee.dto';
import { UpdateCoffeeDto } from './dtos/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepo: Repository<Coffee>,
  ) {}

  findAll(skip: number, take: number) {
    return this.coffeeRepo.find({
      take,
      skip,
    });
  }

  /// Find one
  async findOne(id: string) {
    this.isValidUUId(id);

    const foundCoffee = await this.coffeeRepo.findOneBy({ id });

    if (!foundCoffee) {
      return {
        status: 'failed',
        message: `Could not the coffee option you are looking. Try again!`,
      };
    }

    return foundCoffee;
  }

  /// Create
  async create(addData: CreateCoffeeDto) {
    const createdData = this.coffeeRepo.create(addData);

    return this.coffeeRepo.save(createdData);
  }

  /// update
  async update(id: string, updateData: UpdateCoffeeDto) {
    this.isValidUUId(id);

    const updateCoffee = await this.coffeeRepo.preload({
      id,
      ...updateData,
    });

    if (!updateCoffee) {
      throw new BadRequestException(`Could not update coffee with id: ${id}`);
    }

    return this.coffeeRepo.save(updateCoffee);
  }

  /// delete or remove

  /// PRIVATE METHODS
  private isValidUUId(id: string) {
    const checkResults = isUUID(id, '4');

    if (!checkResults) {
      throw new BadRequestException(`Invalid id`);
    }
    return true;
  }
}
