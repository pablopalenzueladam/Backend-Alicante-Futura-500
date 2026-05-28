import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsEmail, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class BusinessServiceDto {
  @ApiProperty({ example: 'Corte de pelo' })
  @IsString()
  name: string;

  @ApiProperty({ example: 25 })
  @IsNumber()
  price: number;
}

export class CreateBusinessDto {
  @ApiProperty({ example: 'Negocio' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Calle Conde Lumiares' })
  @IsString()
  address: string;

  @ApiProperty({ example: '03010' })
  @IsString()
  zipcode: string;

  @ApiProperty({ example: 'lococarioco@mongo.db' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '666 666 666' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 3 })
  @IsNumber()
  maxCustomers?: number;

  @ApiProperty({ type: [BusinessServiceDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BusinessServiceDto)
  services?: BusinessServiceDto[];
}