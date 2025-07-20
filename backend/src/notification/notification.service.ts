import { Injectable, Logger } from '@nestjs/common';
import { SendSmsDto } from './dto/send-sms.dto';
import axios from 'axios';

const SMSIR_API_KEY = process.env.SMSIR_API_KEY || 'YOUR_SMSIR_API_KEY';
const SMSIR_LINE_NUMBER = process.env.SMSIR_LINE_NUMBER || 'YOUR_SMSIR_LINE_NUMBER';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  async sendSms(dto: SendSmsDto) {
    this.logger.log(`Sending SMS to: ${dto.mobiles.join(', ')}`);
    try {
      const response = await axios.post(
        'https://api.sms.ir/v1/send/bulk',
        {
          mobileNumbers: dto.mobiles,
          message: dto.message,
          lineNumber: SMSIR_LINE_NUMBER,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': SMSIR_API_KEY,
          },
        },
      );
      this.logger.log(`SMS.ir response: ${JSON.stringify(response.data)}`);
      return response.data;
    } catch (error) {
      this.logger.error('Failed to send SMS', error);
      throw error;
    }
  }
}
