import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateDoctorDto) {
    console.log('Creating doctor:', data.userId);
    return this.prisma.doctor.create({ data });
  }

  async findAll() {
    console.log('Fetching all doctors');
    return this.prisma.doctor.findMany();
  }

  async findOne(id: string) {
    console.log('Fetching doctor by id:', id);
    const doctor = await this.prisma.doctor.findUnique({ where: { id } });
    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }

  async update(id: string, data: UpdateDoctorDto) {
    console.log('Updating doctor:', id);
    return this.prisma.doctor.update({ where: { id }, data });
  }

  async remove(id: string) {
    console.log('Deleting doctor:', id);
    return this.prisma.doctor.delete({ where: { id } });
  }
}
