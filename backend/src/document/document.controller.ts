import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Logger,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { DocumentService } from './document.service';
import { UploadDocumentDto } from './dto/upload-document.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('documents')
@Controller('document')
export class DocumentController {
  private readonly logger = new Logger(DocumentController.name);
  constructor(private readonly documentService: DocumentService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload a document for a patient' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        patientId: { type: 'string' },
        type: { type: 'string' },
      },
      required: ['file', 'patientId', 'type'],
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadDocumentDto,
  ) {
    this.logger.log(`Uploading document for patient ${dto.patientId}`);
    return this.documentService.upload(file, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all documents' })
  @ApiResponse({ status: 200, description: 'List of documents' })
  findAll() {
    return this.documentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get document by id' })
  @ApiResponse({ status: 200, description: 'Document found' })
  findOne(@Param('id') id: string) {
    return this.documentService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete document' })
  @ApiResponse({ status: 200, description: 'Document deleted' })
  remove(@Param('id') id: string) {
    return this.documentService.remove(id);
  }
}
