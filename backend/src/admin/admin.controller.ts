import { Controller, Get, Patch, Param, Post, Body, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  private readonly logger = new Logger(AdminController.name);
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({ status: 200, description: 'List of users' })
  listUsers() {
    this.logger.log('Listing all users');
    return this.adminService.listUsers();
  }

  @Patch('users/:id/activate')
  @ApiOperation({ summary: 'Activate a user' })
  @ApiResponse({ status: 200, description: 'User activated' })
  activateUser(@Param('id') id: string) {
    this.logger.log(`Activating user ${id}`);
    return this.adminService.activateUser(id);
  }

  @Patch('users/:id/deactivate')
  @ApiOperation({ summary: 'Deactivate a user' })
  @ApiResponse({ status: 200, description: 'User deactivated' })
  deactivateUser(@Param('id') id: string) {
    this.logger.log(`Deactivating user ${id}`);
    return this.adminService.deactivateUser(id);
  }

  @Post('users/:id/assign-role')
  @ApiOperation({ summary: 'Assign a role to a user' })
  @ApiResponse({ status: 200, description: 'Role assigned' })
  assignRole(@Param('id') userId: string, @Body('roleId') roleId: string) {
    this.logger.log(`Assigning role ${roleId} to user ${userId}`);
    return this.adminService.assignRole(userId, roleId);
  }

  @Get('logs')
  @ApiOperation({ summary: 'Fetch recent system logs' })
  @ApiResponse({ status: 200, description: 'System logs' })
  fetchLogs() {
    this.logger.log('Fetching system logs');
    return this.adminService.fetchLogs();
  }
}
