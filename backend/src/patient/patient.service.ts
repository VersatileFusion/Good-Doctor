import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePatientDto) {
    console.log('Creating patient:', data.userId);
    return this.prisma.patient.create({ data });
  }

  async findAll() {
    console.log('Fetching all patients');
    return this.prisma.patient.findMany();
  }

  async findOne(id: string) {
    console.log('Fetching patient by id:', id);
    const patient = await this.prisma.patient.findUnique({ where: { id } });
    if (!patient) throw new NotFoundException('Patient not found');
    return patient;
  }

  async update(id: string, data: UpdatePatientDto) {
    console.log('Updating patient:', id);
    return this.prisma.patient.update({ where: { id }, data });
  }

  async remove(id: string) {
    console.log('Deleting patient:', id);
    return this.prisma.patient.delete({ where: { id } });
  }
}
