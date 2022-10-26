import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  name: string;

  @IsString()
  brand: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  flavors: Array<string>;
}
