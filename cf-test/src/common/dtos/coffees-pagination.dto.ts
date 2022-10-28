import { Allow, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class CoffeesPaginationDto {
  @Min(0)
  @IsOptional()
  page: number;

  @Min(1)
  @IsPositive()
  @IsOptional()
  limit: number;
}
