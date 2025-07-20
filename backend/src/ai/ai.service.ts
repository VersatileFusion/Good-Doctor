import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AiService {
  constructor(private readonly prisma: PrismaService) {}

  // Suggest available slots for a doctor or patient (simple logic)
  async smartScheduling(doctorId: string, date: string) {
    // Find all availabilities for the doctor on the given day
    const availabilities = await this.prisma.availability.findMany({
      where: { doctorId, dayOfWeek: new Date(date).getDay() },
    });
    // Find all appointments for the doctor on the given date
    const appointments = await this.prisma.appointment.findMany({
      where: {
        doctorId,
        startTime: { gte: new Date(date + 'T00:00:00'), lt: new Date(date + 'T23:59:59') },
      },
    });
    // Suggest slots that are available and not overlapping with appointments
    // (For demo: just return availabilities, real logic would check for overlaps)
    console.log('Smart scheduling for doctor', doctorId, 'on', date);
    return { availabilities, appointments };
  }

  // Suggest best therapist/service for a patient (simple logic)
  async aiTriage(patientId: string) {
    // For demo: suggest a random doctor with the most matching specialties
    const patient = await this.prisma.patient.findUnique({ where: { id: patientId } });
    if (!patient) return { suggestion: null };
    // For demo, just return the first doctor
    const doctor = await this.prisma.doctor.findFirst();
    console.log('AI triage for patient', patientId, 'suggested doctor:', doctor?.id);
    return { suggestion: doctor };
  }
}
