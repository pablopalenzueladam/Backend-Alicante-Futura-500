import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNumber,  IsOptional, IsString } from 'class-validator';

export class CreateBusinessDto {
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

  @ApiProperty({ example: 'Lavar dinero' })
  @IsOptional()
  service: string;

  @ApiProperty({ example: 9999999.99})
  @IsNumber()
  price: number;
}
