import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class SendSmsDto {
  @ApiProperty({ example: ['09120000000'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  mobiles: string[];

  @ApiProperty({ example: 'Your appointment is confirmed.' })
  @IsString()
  @IsNotEmpty()
  message: string;
} 