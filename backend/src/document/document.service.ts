import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadDocumentDto } from './dto/upload-document.dto';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const UPLOAD_DIR = path.join(__dirname, '../../uploads');

@Injectable()
export class DocumentService {
  constructor(private readonly prisma: PrismaService) {
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }
  }

  async upload(file: Express.Multer.File, dto: UploadDocumentDto) {
    const filePath = path.join(UPLOAD_DIR, file.filename);
    fs.writeFileSync(filePath, file.buffer);
    const document = await this.prisma.document.create({
      data: {
        patientId: dto.patientId,
        url: `/uploads/${file.filename}`,
        type: dto.type,
      },
    });
    console.log('Document uploaded:', document);
    return document;
  }

  async findAll() {
    console.log('Fetching all documents');
    return this.prisma.document.findMany();
  }

  async findOne(id: string) {
    console.log('Fetching document by id:', id);
    const document = await this.prisma.document.findUnique({ where: { id } });
    if (!document) throw new NotFoundException('Document not found');
    return document;
  }

  async remove(id: string) {
    console.log('Deleting document:', id);
    const document = await this.prisma.document.findUnique({ where: { id } });
    if (!document) throw new NotFoundException('Document not found');
    // Remove file from storage
    const filePath = path.join(UPLOAD_DIR, path.basename(document.url));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return this.prisma.document.delete({ where: { id } });
  }
}
