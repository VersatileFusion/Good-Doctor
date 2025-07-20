import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Request } from 'express';

@ApiTags('appointments')
@Controller('appointments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @ApiOperation({ summary: 'Create appointment (patient only)' })
  @ApiResponse({ status: 201, description: 'Appointment created' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Roles('PATIENT')
  create(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @Req() req: Request,
  ) {
    // In a real app, check if req.user.userId === createAppointmentDto.patientId
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all appointments' })
  @ApiResponse({ status: 200, description: 'List of appointments' })
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get appointment by id' })
  @ApiResponse({ status: 200, description: 'Appointment found' })
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update appointment (doctor, patient, or admin)' })
  @ApiResponse({ status: 200, description: 'Appointment updated' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Roles('ADMIN', 'DOCTOR', 'PATIENT')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
    @Req() req: Request,
  ) {
    // In a real app, check if req.user is involved in the appointment or is admin
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete appointment (doctor, patient, or admin)' })
  @ApiResponse({ status: 200, description: 'Appointment deleted' })
  @Roles('ADMIN', 'DOCTOR', 'PATIENT')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(id);
  }
}
