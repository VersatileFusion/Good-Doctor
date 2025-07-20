import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async listUsers() {
    return this.prisma.user.findMany({ include: { roles: true } });
  }

  async activateUser(id: string) {
    return this.prisma.user.update({ where: { id }, data: { status: 'ACTIVE' } });
  }

  async deactivateUser(id: string) {
    return this.prisma.user.update({ where: { id }, data: { status: 'INACTIVE' } });
  }

  async assignRole(userId: string, roleId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    return this.prisma.user.update({
      where: { id: userId },
      data: { roles: { connect: { id: roleId } } },
    });
  }

  async fetchLogs() {
    // Dummy implementation: In a real app, fetch from Winston or log storage
    return [
      { timestamp: new Date(), level: 'info', message: 'System started' },
      { timestamp: new Date(), level: 'warn', message: 'Test warning' },
    ];
  }
}
