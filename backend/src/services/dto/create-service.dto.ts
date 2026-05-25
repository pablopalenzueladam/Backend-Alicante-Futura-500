import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ example: 'Gimnasia' })
  @IsString()
  name: string;

  @ApiProperty({ example: '25.99' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: '66' })
  @IsNumber()
  durationMinutes?: number;
}
