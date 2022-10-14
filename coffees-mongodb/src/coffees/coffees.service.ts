import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoffeesPaginationDto } from './dtos/coffees-pagination.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name, 'coffees')
    private readonly coffeeModel: Model<Coffee>,
  ) {}

  async findAll(paginationOptions: CoffeesPaginationDto) {
    const page = paginationOptions.page || 0;
    const limit = paginationOptions.limit || 10;

    return this.coffeeModel.find().skip(page).limit(limit);
  }

  async findOne() {}

  async create() {}

  async update() {}

  async remove() {}
}
