import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Ortiz SA' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'lococarioco@mongo.db' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '666 666 666' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ default: null })
  @IsOptional()
  businessId?: number;
}
