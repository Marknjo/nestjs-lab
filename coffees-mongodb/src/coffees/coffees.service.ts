import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoffeesPaginationDto } from './dtos/coffees-pagination.dto';
import { CreateCoffeeDto } from './dtos/create-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name, 'coffees')
    private readonly coffeeModel: Model<Coffee>,
  ) {}

  findAll(paginationOptions: CoffeesPaginationDto) {
    const page = paginationOptions.page || 0;
    const limit = paginationOptions.limit || 10;

    return this.coffeeModel.find().skip(page).limit(limit);
  }

  async findOne() {}

  async create(content: CreateCoffeeDto) {
    const brandName = content.name;

    const foundCoffee = await this.coffeeModel.findOne({ name: brandName });

    if (foundCoffee) {
      throw new BadRequestException(
        `Coffee "${brandName}" already in the database.`,
      );
    }

    const createdCoffee = await this.coffeeModel.create(content);

    return createdCoffee;
  }

  async update() {}

  async remove() {}
}
