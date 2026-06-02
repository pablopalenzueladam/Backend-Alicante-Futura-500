import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNumber,  IsOptional, IsString } from 'class-validator';

export class CreateBusinessDto {
  @ApiProperty({ example: 'Negocio' })
  @IsString()
  name: string;

  @ApiProperty({example:'Calle Conde Lumiares'})
  @IsString()
  address:  string;

  @ApiProperty({example: '03010'})
  @IsString()
  zipcode: string;

  @ApiProperty({ example: 'lococarioco@mongo.db' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '666 666 666' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: '3' })
  @IsNumber()
  maxCustomers?: number;
}
