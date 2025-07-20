import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@ApiTags('resources')
@Controller('resource')
export class ResourceController {
  private readonly logger = new Logger(ResourceController.name);
  constructor(private readonly resourceService: ResourceService) {}

  @Post()
  @ApiOperation({ summary: 'Create resource' })
  @ApiResponse({ status: 201, description: 'Resource created' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createResourceDto: CreateResourceDto) {
    this.logger.log(`Creating resource: ${createResourceDto.title}`);
    return this.resourceService.create(createResourceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all resources' })
  @ApiResponse({ status: 200, description: 'List of resources' })
  findAll() {
    return this.resourceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get resource by id' })
  @ApiResponse({ status: 200, description: 'Resource found' })
  findOne(@Param('id') id: string) {
    return this.resourceService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update resource' })
  @ApiResponse({ status: 200, description: 'Resource updated' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Param('id') id: string, @Body() updateResourceDto: UpdateResourceDto) {
    this.logger.log(`Updating resource: ${id}`);
    return this.resourceService.update(id, updateResourceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete resource' })
  @ApiResponse({ status: 200, description: 'Resource deleted' })
  remove(@Param('id') id: string) {
    this.logger.log(`Deleting resource: ${id}`);
    return this.resourceService.remove(id);
  }
}
