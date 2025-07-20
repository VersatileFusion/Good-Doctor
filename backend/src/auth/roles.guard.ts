import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) return false;
    // Fetch user roles from DB
    const dbUser = await this.prisma.user.findUnique({
      where: { id: user.userId },
      include: { roles: true },
    });
    if (!dbUser) return false;
    const userRoles = dbUser.roles.map(r => r.name);
    const hasRole = requiredRoles.some(role => userRoles.includes(role));
    if (!hasRole) throw new ForbiddenException('Insufficient role');
    return true;
  }
} 