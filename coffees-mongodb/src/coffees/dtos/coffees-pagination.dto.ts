import { IsNumber, IsOptional } from 'class-validator';

export class CoffeesPaginationDto {
  @IsOptional()
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsNumber()
  page: number;
}
