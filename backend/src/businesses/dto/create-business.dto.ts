import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNumber,  IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { Service } from '../../services/service.entity';
import { CreateServiceDto } from 'src/services/dto/create-service.dto';
import { Type } from 'class-transformer';

export class CreateBusinessDto {
  @ApiProperty({ example: 'Negocio' })
  @IsString()
  name!: string;

  @ApiProperty({example:'Calle Conde Lumiares'})
  @IsString()
  address!:  string;

  @ApiProperty({example: '03010'})
  @IsString()
  zipcode!: string;

  @ApiProperty({ example: 'lococarioco@mongo.db' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '666 666 666' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: '3' })
  @IsNumber()
  @IsOptional()
  maxCustomers?: number;

  @ApiProperty({ type: [CreateServiceDto]})
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateServiceDto)
  services!: CreateServiceDto[];
}
