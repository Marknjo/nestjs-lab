import { Query, Resolver } from '@nestjs/graphql';
import { Coffee } from '../graphql-types';

@Resolver()
export class CoffeesResolver {
  @Query('coffees')
  async findAll(): Promise<Coffee[]> {
    return [];
  }
}
