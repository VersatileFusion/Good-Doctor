import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ZarinpalCallbackDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  Authority: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  Status: string;
} 