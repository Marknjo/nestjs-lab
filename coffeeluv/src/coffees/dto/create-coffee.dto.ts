import { IsString, MaxLength } from 'class-validator';

export class CreateCoffeeDto {
  @MaxLength(50)
  @IsString()
  readonly name: string;

  @MaxLength(40)
  @IsString()
  readonly brand: string;

  @IsString({ each: true })
  readonly flavors: Array<string>;
}
