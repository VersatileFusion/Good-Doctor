import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class InitiatePaymentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  appointmentId: string;

  @ApiProperty({ minimum: 1000 })
  @IsInt()
  @Min(1000)
  amount: number;
} 