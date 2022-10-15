import { IsArray, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCoffeeDto {
  @MaxLength(40)
  @IsString()
  name: string;

  @MaxLength(40)
  @IsString()
  brand: string;

  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  flavors: Array<string>;
}
