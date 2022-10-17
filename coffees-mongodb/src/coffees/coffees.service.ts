import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { resolve } from 'path';
import { CoffeesPaginationDto } from './dtos/coffees-pagination.dto';
import { CreateCoffeeDto } from './dtos/create-coffee.dto';
import { UpdateCoffeeDto } from './dtos/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name, 'coffees')
    private readonly coffeeModel: Model<Coffee>,
    @InjectModel(Flavor.name, 'coffees')
    private readonly flavorModel: Model<Flavor>,
  ) {}

  findAll(paginationOptions: CoffeesPaginationDto) {
    const page = paginationOptions.page || 0;
    const limit = paginationOptions.limit || 10;

    return this.coffeeModel.find().skip(page).limit(limit).populate('flavors');
  }

  async findCoffeeById(id: string) {
    this.isValidMongoId(id);

    const foundCoffee = await this.coffeeModel.findById(id);

    if (!foundCoffee) {
      throw new BadRequestException(`Could not find coffee with the id: ${id}`);
    }

    return foundCoffee;
  }

  async create(content: CreateCoffeeDto) {
    const brandName = content.name;

    const foundCoffee = await this.coffeeModel.findOne({ name: brandName });

    if (foundCoffee) {
      throw new BadRequestException(
        `Coffee "${brandName}" already in the database.`,
      );
    }

    /// Handle preload of flavors
    const flavors = await this.getFlavorsBeforeSave(content);

    const createdCoffee = await this.coffeeModel.create({
      ...content,
      flavors,
    });

    return createdCoffee;
  }

  async update(id: string, updates: UpdateCoffeeDto) {
    this.isValidMongoId(id);

    /// Handle preload of flavors
    const flavors = await this.getFlavorsBeforeSave(updates);

    const foundCoffee = await this.coffeeModel.findByIdAndUpdate(
      id,
      { ...updates, ...(flavors.length > 0 ? { flavors } : {}) },
      {
        new: true,
      },
    );

    if (!foundCoffee) {
      throw new BadRequestException(`Coffee by id: ${id} was not updated.`);
    }

    return foundCoffee;
  }

  async remove(id: string) {
    this.isValidMongoId(id);

    const foundCoffee = await this.coffeeModel.findByIdAndDelete(id);

    if (!foundCoffee) {
      throw new BadRequestException(
        `Coffee with id: ${id} could not be deleted.`,
      );
    }

    return { status: 'success', message: `Coffee with id: ${id} deleted` };
  }

  private isValidMongoId(id: string): void | Error {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid id: "${id}"`);
    }
  }

  // private async preloadFlavors(flavorName: string, id?: string) {
  private async preloadFlavors(flavorName: string): Promise<Flavor> {
    const foundFlavor = await this.flavorModel.findOne({ name: flavorName });

    if (foundFlavor) {
      return foundFlavor;
    }

    const createdFlavor = this.flavorModel.create({
      name: flavorName,
      //coffee: [id, ...foundFlavor.coffees],
    });
    console.table({ createdFlavor });

    return createdFlavor;
  }

  private async getFlavorsBeforeSave(
    content: CreateCoffeeDto | UpdateCoffeeDto,
  ) {
    let flavors: Flavor[] = [];
    if (content.flavors?.length > 0) {
      flavors = await Promise.all<Flavor>(
        content.flavors.map((flavor) => this.preloadFlavors(flavor)),
      );
    }
    flavors = flavors.length === 0 ? [] : flavors;

    return flavors;
  }
}
