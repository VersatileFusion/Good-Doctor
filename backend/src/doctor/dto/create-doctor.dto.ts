import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsArray, ArrayNotEmpty, IsUrl } from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  specialties: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  photoUrl?: string;
} 