import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ example: 'Gimnasia' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 25.99 })
  @IsNumber()
  price!: number;

  @ApiProperty({ example: '66', nullable: true })
  @IsOptional()
  @IsNumber()
  durationMinutes?: number;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  businessId?: number;

}
