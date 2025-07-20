import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async totalAppointments() {
    const count = await this.prisma.appointment.count();
    console.log('Total appointments:', count);
    return { totalAppointments: count };
  }

  async totalRevenue() {
    const result = await this.prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: 'PAID' },
    });
    const total = result._sum.amount || 0;
    console.log('Total revenue:', total);
    return { totalRevenue: total };
  }

  async appointmentsPerDoctor() {
    const result = await this.prisma.appointment.groupBy({
      by: ['doctorId'],
      _count: { id: true },
    });
    console.log('Appointments per doctor:', result);
    return result;
  }

  async newPatientsPerMonth() {
    const result = await this.prisma.patient.groupBy({
      by: ['createdAt'],
      _count: { id: true },
    });
    // Group by month/year
    const monthly: Record<string, number> = {};
    result.forEach((r) => {
      const date = new Date(r.createdAt);
      const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      monthly[key] = (monthly[key] || 0) + r._count.id;
    });
    console.log('New patients per month:', monthly);
    return monthly;
  }
}
