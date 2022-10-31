import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dtos/create-coffee.dto';
import { UpdateCoffeeDto } from './dtos/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepo: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepo: Repository<Flavor>,
  ) {}

  findAll(skip: number, take: number) {
    return this.coffeeRepo.find({
      take,
      skip,
      relations: ['flavors'],
    });
  }

  /// Find one
  async findOne(id: string) {
    this.isValidUUId(id);

    const foundCoffee = await this.coffeeRepo.findOne({
      where: { id },
      relations: ['flavors'],
    });

    if (!foundCoffee) {
      return {
        status: 'failed',
        message: `Could not find the coffee with id: ${id}. Try again!`,
      };
    }

    return foundCoffee;
  }

  /// Create
  async create(addData: CreateCoffeeDto) {
    const flavors = await this.mapFlavors<CreateCoffeeDto>(addData);

    const createdData = this.coffeeRepo.create({
      ...addData,
      flavors,
    });

    const newCoffee = await this.coffeeRepo.save(createdData);

    /// add new flavor entries

    return newCoffee;
  }

  /// update
  async update(id: string, updateData: UpdateCoffeeDto) {
    this.isValidUUId(id);

    const flavors = await this.mapFlavors(updateData);
    const updateCoffee = await this.coffeeRepo.preload({
      id,
      ...updateData,
      flavors,
    });

    if (!updateCoffee) {
      throw new BadRequestException(`Could not update coffee with id: ${id}`);
    }

    return this.coffeeRepo.save(updateCoffee);
  }

  /// delete or remove
  async remove(id: string) {
    const foundCoffee = await this.findOne(id);

    if (!(foundCoffee instanceof Coffee)) {
      return {
        ...foundCoffee,
        message: `Could not delete the coffee with id: ${id}. Try again!`,
      };
    }

    await this.coffeeRepo.delete(id);
    return {
      status: 'success',
      message: `Coffee deleted 🚮 successfully`,
    };
  }

  /// PRIVATE METHODS
  private async mapFlavors<T extends UpdateCoffeeDto>(data: T) {
    const flavors = await Promise.all(
      data.flavors.map(async (flavor) => this.preloadCoffeeFlavors(flavor)),
    );

    return flavors;
  }

  private async preloadCoffeeFlavors(flavorName: string) {
    const foundFlavor = await this.flavorRepo.findOneBy({ name: flavorName });

    if (foundFlavor) {
      return foundFlavor;
    }

    return this.flavorRepo.create({
      name: flavorName,
    });
  }

  private isValidUUId(id: string) {
    const checkResults = isUUID(id, '4');

    if (!checkResults) {
      throw new BadRequestException(`Invalid id`);
    }
    return true;
  }
}
