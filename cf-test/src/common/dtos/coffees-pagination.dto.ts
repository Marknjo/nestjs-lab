import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CoffeesPaginationDto {
  @IsPositive()
  @IsOptional()
  page: number;

  @IsPositive()
  @IsOptional()
  limit: number;
}
