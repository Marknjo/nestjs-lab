import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
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

  private checkIdFormat(id: string) {
    if (!isUUID(id)) {
      throw new ForbiddenException('Invalid id format');
    }
  }

  findAll(limit?: number, offset?: number) {
    console.log({ limit, offset });

    return this.coffeeRepository.find({
      relations: ['flavors'],
    });
  }

  async findOne(id: string) {
    this.checkIdFormat(id);

    const foundCoffee = await this.coffeeRepository.findOne({
      where: { id },
      relations: ['flavors'],
    });

    if (!foundCoffee) {
      throw new NotFoundException(`Could not find coffee with the id of ${id}`);
    }

    return foundCoffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const isNotUnique = await this.coffeeRepository.findOne({
      where: {
        name: createCoffeeDto.name,
      },
    });

    if (isNotUnique) {
      throw new BadRequestException(
        `A coffee with the name '${createCoffeeDto.name}' already in the coffeeRepository.`,
      );
    }

    const createdCoffee = this.coffeeRepository.create(createCoffeeDto);

    return this.coffeeRepository.save(createdCoffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    this.checkIdFormat(id);

    const updateCoffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeDto,
    });

    if (!updateCoffee) {
      throw new NotFoundException(`Could not update coffee with ID: #${id}`);
    }

    return this.coffeeRepository.save(updateCoffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);

    this.coffeeRepository.delete(id);
  }
}
