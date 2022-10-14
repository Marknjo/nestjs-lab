import { IsArray, IsString, MaxLength } from 'class-validator';

export class CreateCoffeeDto {
  @MaxLength(40)
  @IsString()
  name: string;

  @MaxLength(40)
  @IsString()
  brand: string;

  @IsString({ each: true })
  @IsArray()
  flavors: Array<string>;
}
