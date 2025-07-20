import { Controller, Post, Body, UsePipes, ValidationPipe, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { SendSmsDto } from './dto/send-sms.dto';

@ApiTags('notifications')
@Controller('notification')
export class NotificationController {
  private readonly logger = new Logger(NotificationController.name);
  constructor(private readonly notificationService: NotificationService) {}

  @Post('sms')
  @ApiOperation({ summary: 'Send SMS via sms.ir' })
  @ApiResponse({ status: 201, description: 'SMS sent' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async sendSms(@Body() dto: SendSmsDto) {
    this.logger.log(`Sending SMS to: ${dto.mobiles.join(', ')}`);
    return this.notificationService.sendSms(dto);
  }
}
