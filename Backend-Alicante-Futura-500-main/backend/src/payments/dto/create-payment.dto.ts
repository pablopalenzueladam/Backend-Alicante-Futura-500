import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { PaymentStatus } from '../payments.entity';

export class CreatePaymentDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  appointmentId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  customerId: number;

  @ApiProperty({ example: 50.00 })
  @IsNumber()
  amount: number;

  @ApiPropertyOptional({ enum: PaymentStatus })
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;
}