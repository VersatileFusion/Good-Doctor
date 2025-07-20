import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRoleDto) {
    console.log('Creating role:', data.name);
    return this.prisma.role.create({ data });
  }

  async findAll() {
    console.log('Fetching all roles');
    return this.prisma.role.findMany();
  }

  async findOne(id: string) {
    console.log('Fetching role by id:', id);
    const role = await this.prisma.role.findUnique({ where: { id } });
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }

  async update(id: string, data: UpdateRoleDto) {
    console.log('Updating role:', id);
    return this.prisma.role.update({ where: { id }, data });
  }

  async remove(id: string) {
    console.log('Deleting role:', id);
    return this.prisma.role.delete({ where: { id } });
  }
}
