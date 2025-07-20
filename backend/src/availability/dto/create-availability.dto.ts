import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, Min, Max } from 'class-validator';

export class CreateAvailabilityDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @ApiProperty({ minimum: 0, maximum: 6, description: '0=Sunday, 6=Saturday' })
  @IsInt()
  @Min(0)
  @Max(6)
  dayOfWeek: number;

  @ApiProperty({ example: '09:00' })
  @IsString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({ example: '17:00' })
  @IsString()
  @IsNotEmpty()
  endTime: string;
} 