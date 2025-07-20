import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRatingDto) {
    console.log('Creating rating:', data);
    return this.prisma.rating.create({ data });
  }

  async findAll() {
    console.log('Fetching all ratings');
    return this.prisma.rating.findMany();
  }

  async findOne(id: string) {
    console.log('Fetching rating by id:', id);
    const rating = await this.prisma.rating.findUnique({ where: { id } });
    if (!rating) throw new NotFoundException('Rating not found');
    return rating;
  }

  async update(id: string, data: UpdateRatingDto, userId: string, isAdmin: boolean) {
    console.log('Updating rating:', id);
    const rating = await this.prisma.rating.findUnique({ where: { id } });
    if (!rating) throw new NotFoundException('Rating not found');
    if (!isAdmin && rating.patientId !== userId) throw new ForbiddenException('Not allowed');
    return this.prisma.rating.update({ where: { id }, data });
  }

  async remove(id: string, userId: string, isAdmin: boolean) {
    console.log('Deleting rating:', id);
    const rating = await this.prisma.rating.findUnique({ where: { id } });
    if (!rating) throw new NotFoundException('Rating not found');
    if (!isAdmin && rating.patientId !== userId) throw new ForbiddenException('Not allowed');
    return this.prisma.rating.delete({ where: { id } });
  }
}
