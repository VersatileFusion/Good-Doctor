import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAppointmentDto) {
    console.log('Creating appointment:', data);
    // Ensure status is set to a default if not provided
    const appointmentData = {
      ...data,
      status: data.status ?? 'SCHEDULED',
    };
    return this.prisma.appointment.create({ data: appointmentData });
  }

  async findAll() {
    console.log('Fetching all appointments');
    return this.prisma.appointment.findMany();
  }

  async findOne(id: string) {
    console.log('Fetching appointment by id:', id);
    const appointment = await this.prisma.appointment.findUnique({ where: { id } });
    if (!appointment) throw new NotFoundException('Appointment not found');
    return appointment;
  }

  async update(id: string, data: UpdateAppointmentDto) {
    console.log('Updating appointment:', id);
    return this.prisma.appointment.update({ where: { id }, data });
  }

  async remove(id: string) {
    console.log('Deleting appointment:', id);
    return this.prisma.appointment.delete({ where: { id } });
  }
}
