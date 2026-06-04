import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;

  @ApiProperty()
  @IsString()
  comment!: string;

  @ApiProperty()
  @IsInt()
  customerId!: number;

  @ApiProperty()
  @IsInt()
  businessId!: number;
}