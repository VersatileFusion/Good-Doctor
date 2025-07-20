import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  private readonly logger = new Logger(AnalyticsController.name);
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('total-appointments')
  @ApiOperation({ summary: 'Get total number of appointments' })
  @ApiResponse({ status: 200, description: 'Total appointments' })
  totalAppointments() {
    this.logger.log('Fetching total appointments');
    return this.analyticsService.totalAppointments();
  }

  @Get('total-revenue')
  @ApiOperation({ summary: 'Get total revenue from paid payments' })
  @ApiResponse({ status: 200, description: 'Total revenue' })
  totalRevenue() {
    this.logger.log('Fetching total revenue');
    return this.analyticsService.totalRevenue();
  }

  @Get('appointments-per-doctor')
  @ApiOperation({ summary: 'Get number of appointments per doctor' })
  @ApiResponse({ status: 200, description: 'Appointments per doctor' })
  appointmentsPerDoctor() {
    this.logger.log('Fetching appointments per doctor');
    return this.analyticsService.appointmentsPerDoctor();
  }

  @Get('new-patients-per-month')
  @ApiOperation({ summary: 'Get new patients per month' })
  @ApiResponse({ status: 200, description: 'New patients per month' })
  newPatientsPerMonth() {
    this.logger.log('Fetching new patients per month');
    return this.analyticsService.newPatientsPerMonth();
  }
}
