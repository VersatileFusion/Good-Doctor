import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt, Min, Max, IsBoolean } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @ApiProperty({ minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  score: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  anonymous?: boolean;
} 