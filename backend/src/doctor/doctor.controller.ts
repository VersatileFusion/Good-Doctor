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
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Request } from 'express';
import { AuthRequest } from '../types/express';

@ApiTags('doctors')
@Controller('doctors')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @ApiOperation({ summary: 'Create doctor (admin only)' })
  @ApiResponse({ status: 201, description: 'Doctor created' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Roles('ADMIN')
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all doctors' })
  @ApiResponse({ status: 200, description: 'List of doctors' })
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get doctor by id' })
  @ApiResponse({ status: 200, description: 'Doctor found' })
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update doctor (doctor or admin)' })
  @ApiResponse({ status: 200, description: 'Doctor updated' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Roles('ADMIN', 'DOCTOR')
  update(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
    @Req() req: AuthRequest,
  ) {
    // Only allow doctor to update their own profile, or admin
    if (req.user && req.user.userId) {
      // In a real app, check if doctor.userId === req.user.userId or user is admin
    }
    return this.doctorService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete doctor (admin or doctor)' })
  @ApiResponse({ status: 200, description: 'Doctor deleted' })
  @Roles('ADMIN', 'DOCTOR')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(id);
  }
}
