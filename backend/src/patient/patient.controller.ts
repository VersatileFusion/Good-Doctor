import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Request } from 'express';
import { AuthRequest } from '../types/express';

@ApiTags('patients')
@Controller('patients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @ApiOperation({ summary: 'Create patient (admin only)' })
  @ApiResponse({ status: 201, description: 'Patient created' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Roles('ADMIN')
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all patients' })
  @ApiResponse({ status: 200, description: 'List of patients' })
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get patient by id' })
  @ApiResponse({ status: 200, description: 'Patient found' })
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update patient (patient or admin)' })
  @ApiResponse({ status: 200, description: 'Patient updated' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Roles('ADMIN', 'PATIENT')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto, @Req() req: AuthRequest) {
    // Only allow patient to update their own profile, or admin
    if (req.user && req.user.userId) {
      // In a real app, check if patient.userId === req.user.userId or user is admin
    }
    return this.patientService.update(id, updatePatientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete patient (admin or patient)' })
  @ApiResponse({ status: 200, description: 'Patient deleted' })
  @Roles('ADMIN', 'PATIENT')
  remove(@Param('id') id: string) {
    return this.patientService.remove(id);
  }
}
