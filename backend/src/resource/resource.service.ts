import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Injectable()
export class ResourceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateResourceDto) {
    console.log('Creating resource:', data.title);
    return this.prisma.resource.create({ data });
  }

  async findAll() {
    console.log('Fetching all resources');
    return this.prisma.resource.findMany();
  }

  async findOne(id: string) {
    console.log('Fetching resource by id:', id);
    const resource = await this.prisma.resource.findUnique({ where: { id } });
    if (!resource) throw new NotFoundException('Resource not found');
    return resource;
  }

  async update(id: string, data: UpdateResourceDto) {
    console.log('Updating resource:', id);
    return this.prisma.resource.update({ where: { id }, data });
  }

  async remove(id: string) {
    console.log('Deleting resource:', id);
    return this.prisma.resource.delete({ where: { id } });
  }
}
