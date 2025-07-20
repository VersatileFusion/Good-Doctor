import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AuthRequest } from '../types/express';

@ApiTags('availability')
@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post()
  @ApiOperation({ summary: 'Create availability (doctor or admin)' })
  @ApiResponse({ status: 201, description: 'Availability created' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Roles('ADMIN', 'DOCTOR')
  create(@Body() createAvailabilityDto: CreateAvailabilityDto, @Req() req: AuthRequest) {
    // In a real app, check if req.user.userId === createAvailabilityDto.doctorId or user is admin
    return this.availabilityService.create(createAvailabilityDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all availabilities' })
  @ApiResponse({ status: 200, description: 'List of availabilities' })
  findAll() {
    return this.availabilityService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get availability by id' })
  @ApiResponse({ status: 200, description: 'Availability found' })
  findOne(@Param('id') id: string) {
    return this.availabilityService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update availability (doctor or admin)' })
  @ApiResponse({ status: 200, description: 'Availability updated' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Roles('ADMIN', 'DOCTOR')
  update(@Param('id') id: string, @Body() updateAvailabilityDto: UpdateAvailabilityDto, @Req() req: AuthRequest) {
    // In a real app, check if req.user.userId === availability.doctorId or user is admin
    const userId = req.user?.userId;
    const isAdmin = req.user?.roles?.includes('ADMIN') ?? false;
    if (!userId) throw new UnauthorizedException('User ID not found');
    return this.availabilityService.update(id, updateAvailabilityDto, userId, isAdmin);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete availability (doctor or admin)' })
  @ApiResponse({ status: 200, description: 'Availability deleted' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'DOCTOR')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    // In a real app, check if req.user.userId === availability.doctorId or user is admin
    const userId = req.user?.userId;
    const isAdmin = req.user?.roles?.includes('ADMIN') ?? false;
    if (!userId) throw new UnauthorizedException('User ID not found');
    return this.availabilityService.remove(id, userId, isAdmin);
  }
}
