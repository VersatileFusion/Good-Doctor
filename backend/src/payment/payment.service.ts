import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InitiatePaymentDto } from './dto/initiate-payment.dto';
import { ZarinpalCallbackDto } from './dto/zarinpal-callback.dto';
import axios from 'axios';

const ZARINPAL_MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID || 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX';
const ZARINPAL_API = 'https://api.zarinpal.com/pg/v4/payment';
const CALLBACK_URL = process.env.ZARINPAL_CALLBACK_URL || 'http://localhost:3000/payment/callback';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async initiatePayment(data: InitiatePaymentDto) {
    console.log('Initiating payment:', data);
    const appointment = await this.prisma.appointment.findUnique({ where: { id: data.appointmentId } });
    if (!appointment) throw new NotFoundException('Appointment not found');
    // Create payment record with PENDING status
    const payment = await this.prisma.payment.create({
      data: {
        appointmentId: data.appointmentId,
        amount: data.amount,
        status: 'PENDING',
      },
    });
    // Call Zarinpal API to get payment URL
    const response = await axios.post(`${ZARINPAL_API}/request.json`, {
      merchant_id: ZARINPAL_MERCHANT_ID,
      amount: data.amount,
      callback_url: CALLBACK_URL,
      description: `Payment for appointment ${data.appointmentId}`,
    });
    if (response.data.data && response.data.data.authority) {
      await this.prisma.payment.update({
        where: { id: payment.id },
        data: { authority: response.data.data.authority },
      });
      return {
        paymentId: payment.id,
        authority: response.data.data.authority,
        url: `https://www.zarinpal.com/pg/StartPay/${response.data.data.authority}`,
      };
    } else {
      throw new BadRequestException('Failed to initiate payment with Zarinpal');
    }
  }

  async handleCallback(query: ZarinpalCallbackDto) {
    console.log('Handling Zarinpal callback:', query);
    const payment = await this.prisma.payment.findFirst({ where: { authority: query.Authority } });
    if (!payment) throw new NotFoundException('Payment not found');
    if (query.Status === 'OK') {
      // Verify payment with Zarinpal
      const response = await axios.post(`${ZARINPAL_API}/verify.json`, {
        merchant_id: ZARINPAL_MERCHANT_ID,
        amount: payment.amount,
        authority: query.Authority,
      });
      if (response.data.data && response.data.data.code === 100) {
        await this.prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: 'PAID',
            refId: response.data.data.ref_id?.toString(),
            paidAt: new Date(),
          },
        });
        return { status: 'PAID', refId: response.data.data.ref_id };
      } else {
        await this.prisma.payment.update({
          where: { id: payment.id },
          data: { status: 'FAILED' },
        });
        return { status: 'FAILED', message: response.data.errors?.message || 'Payment failed' };
      }
    } else {
      await this.prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'CANCELLED' },
      });
      return { status: 'CANCELLED' };
    }
  }
}
