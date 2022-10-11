import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
// import { Event } from 'src/events/entities/event-entity';
import { DataSource, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { COFFEE_BRANDS } from './utils/coffee-constants';
import coffeesConfig from './config/coffees.config';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    // @InjectRepository(Event)
    // private readonly eventRepository: Repository<Event>,
    private readonly dataSource: DataSource,
    @Inject(COFFEE_BRANDS) coffeeBrands: string[],

    @Inject(coffeesConfig.KEY)
    private readonly coffeesConfiguration: ConfigType<typeof coffeesConfig>,

    private readonly configService: ConfigService,
  ) {
    console.log({ coffeeBrands });
    console.table({ coffeeBrands });

    /// Global environment variables
    const dbHost = configService.get<string>('DB_HOST', 'localhost');
    console.table({ dbHost });

    /// Global custom configuration
    const dbPort = configService.get('database.port');
    console.table({ dbPort });

    /// Module level configuration with partial registration
    console.table(coffeesConfiguration);
  }

  findAll(limit?: number, offset?: number) {
    return this.coffeeRepository.find({
      ...(offset ? { skip: offset } : {}),
      ...(limit ? { take: limit } : {}),
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

    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    const createdCoffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });

    return this.coffeeRepository.save(createdCoffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    this.checkIdFormat(id);

    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
      ));

    const updateCoffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeDto,
      flavors,
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

  // async recommendCoffee(coffee: Coffee) {
  //   const queryRunner = this.dataSource.createQueryRunner();

  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();

  //   try {
  //     coffee.recommendations++;

  //     const recommendEvent = new Event();

  //     recommendEvent.name = 'recommend_coffee';
  //     recommendEvent.type = 'coffee';
  //     recommendEvent.payload = { coffee: coffee.id };

  //     await queryRunner.manager.save(coffee);
  //     await queryRunner.manager.save(recommendEvent);

  //     await queryRunner.commitTransaction();
  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }

  /**
   *  PRIVATE METHODS
   */

  private checkIdFormat(id: string) {
    if (!isUUID(id)) {
      throw new ForbiddenException('Invalid id format');
    }
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOneBy({ name });

    if (existingFlavor) {
      return existingFlavor;
    }

    return this.flavorRepository.create({ name });
  }
}
