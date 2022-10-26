import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dtos/create-coffee.dto';
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
  /// Create
  async create(addData: CreateCoffeeDto) {
    const createdData = this.coffeeRepo.create(addData);

    return this.coffeeRepo.save(createdData);
  }

  /// update
  /// delete or remove
}
