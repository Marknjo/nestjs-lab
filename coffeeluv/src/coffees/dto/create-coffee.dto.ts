import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of a coffee' })
  @MaxLength(50)
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The coffee brand name' })
  @MaxLength(40)
  @IsString()
  readonly brand: string;

  @ApiProperty({
    description: 'Different coffee flavors',
    example: ['brown coffee', 'maven brown coffee'],
  })
  @IsString({ each: true })
  readonly flavors: Array<string>;
}
