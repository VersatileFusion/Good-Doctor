import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';

@Injectable()
export class AvailabilityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAvailabilityDto) {
    console.log('Creating availability:', data);
    return this.prisma.availability.create({ data });
  }

  async findAll() {
    console.log('Fetching all availabilities');
    return this.prisma.availability.findMany();
  }

  async findOne(id: string) {
    console.log('Fetching availability by id:', id);
    const availability = await this.prisma.availability.findUnique({ where: { id } });
    if (!availability) throw new NotFoundException('Availability not found');
    return availability;
  }

  async update(id: string, data: UpdateAvailabilityDto, userId: string, isAdmin: boolean) {
    console.log('Updating availability:', id);
    const availability = await this.prisma.availability.findUnique({ where: { id } });
    if (!availability) throw new NotFoundException('Availability not found');
    if (!isAdmin && availability.doctorId !== userId) throw new ForbiddenException('Not allowed');
    return this.prisma.availability.update({ where: { id }, data });
  }

  async remove(id: string, userId: string, isAdmin: boolean) {
    console.log('Deleting availability:', id);
    const availability = await this.prisma.availability.findUnique({ where: { id } });
    if (!availability) throw new NotFoundException('Availability not found');
    if (!isAdmin && availability.doctorId !== userId) throw new ForbiddenException('Not allowed');
    return this.prisma.availability.delete({ where: { id } });
  }
}
