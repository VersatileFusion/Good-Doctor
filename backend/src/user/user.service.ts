import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    console.log('Creating user:', data.email);
    return this.prisma.user.create({ data });
  }

  async findAll() {
    console.log('Fetching all users');
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    console.log('Fetching user by id:', id);
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    console.log('Updating user:', id);
    return this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: string) {
    console.log('Deleting user:', id);
    return this.prisma.user.delete({ where: { id } });
  }
}
