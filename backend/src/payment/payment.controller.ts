import { Controller, Post, Body, Get, Query, UsePipes, ValidationPipe, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { InitiatePaymentDto } from './dto/initiate-payment.dto';
import { ZarinpalCallbackDto } from './dto/zarinpal-callback.dto';

@ApiTags('payments')
@Controller('payment')
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);
  constructor(private readonly paymentService: PaymentService) {}

  @Post('initiate')
  @ApiOperation({ summary: 'Initiate payment for an appointment' })
  @ApiResponse({ status: 201, description: 'Payment initiated, returns payment URL' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async initiate(@Body() dto: InitiatePaymentDto) {
    this.logger.log(`Initiating payment for appointment ${dto.appointmentId}`);
    return this.paymentService.initiatePayment(dto);
  }

  @Get('callback')
  @ApiOperation({ summary: 'Handle Zarinpal payment callback' })
  @ApiResponse({ status: 200, description: 'Payment verification result' })
  async callback(@Query() query: ZarinpalCallbackDto) {
    this.logger.log(`Handling Zarinpal callback: ${JSON.stringify(query)}`);
    return this.paymentService.handleCallback(query);
  }
}
