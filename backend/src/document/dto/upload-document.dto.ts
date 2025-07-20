import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadDocumentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @ApiProperty({ example: 'medical_report' })
  @IsString()
  @IsNotEmpty()
  type: string;
} 