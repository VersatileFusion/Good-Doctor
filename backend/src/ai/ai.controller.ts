import { Controller, Get, Query, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AiService } from './ai.service';

@ApiTags('ai')
@Controller('ai')
export class AiController {
  private readonly logger = new Logger(AiController.name);
  constructor(private readonly aiService: AiService) {}

  @Get('smart-scheduling')
  @ApiOperation({ summary: 'Suggest available slots for a doctor on a given date' })
  @ApiResponse({ status: 200, description: 'Available slots and appointments' })
  smartScheduling(@Query('doctorId') doctorId: string, @Query('date') date: string) {
    this.logger.log(`Smart scheduling for doctor ${doctorId} on ${date}`);
    return this.aiService.smartScheduling(doctorId, date);
  }

  @Get('ai-triage')
  @ApiOperation({ summary: 'Suggest best therapist/service for a patient' })
  @ApiResponse({ status: 200, description: 'Suggested doctor/service' })
  aiTriage(@Query('patientId') patientId: string) {
    this.logger.log(`AI triage for patient ${patientId}`);
    return this.aiService.aiTriage(patientId);
  }
}
