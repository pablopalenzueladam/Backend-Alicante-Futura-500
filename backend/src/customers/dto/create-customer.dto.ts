import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, isString, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Antonio Aranda' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'lococarioco@mongo.db' })
  @IsEmail()
  email: string;

  @ApiProperty({example: '1234'})
  @isString()
  password: string;

  @ApiProperty({ example: '666 666 666' })
  @IsString()
  phone?: string;

  @ApiProperty({ default: null })
  @IsOptional()
  businessId?: number;
}
