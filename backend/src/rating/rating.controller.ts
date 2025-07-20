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
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AuthRequest } from '../types/express';

@ApiTags('ratings')
@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @ApiOperation({ summary: 'Create rating (patient only)' })
  @ApiResponse({ status: 201, description: 'Rating created' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Roles('PATIENT')
  create(@Body() createRatingDto: CreateRatingDto, @Req() req: AuthRequest) {
    // In a real app, check if req.user.userId === createRatingDto.patientId
    return this.ratingService.create(createRatingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all ratings' })
  @ApiResponse({ status: 200, description: 'List of ratings' })
  findAll() {
    return this.ratingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get rating by id' })
  @ApiResponse({ status: 200, description: 'Rating found' })
  findOne(@Param('id') id: string) {
    return this.ratingService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update rating (patient or admin)' })
  @ApiResponse({ status: 200, description: 'Rating updated' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Roles('ADMIN', 'PATIENT')
  update(
    @Param('id') id: string,
    @Body() updateRatingDto: UpdateRatingDto,
    @Req() req: AuthRequest,
  ) {
    // In a real app, check if req.user.userId === rating.patientId or user is admin
    const userId = req.user?.userId;
    const isAdmin = req.user?.roles?.includes('ADMIN') ?? false;
    if (!userId) throw new UnauthorizedException('User ID not found');
    return this.ratingService.update(id, updateRatingDto, userId, isAdmin);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete rating (patient or admin)' })
  @ApiResponse({ status: 200, description: 'Rating deleted' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'PATIENT')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    // In a real app, check if req.user.userId === rating.patientId or user is admin
    const userId = req.user?.userId;
    const isAdmin = req.user?.roles?.includes('ADMIN') ?? false;
    if (!userId) throw new UnauthorizedException('User ID not found');
    return this.ratingService.remove(id, userId, isAdmin);
  }
}
