import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { AppointmentModule } from './appointment/appointment.module';
import { RatingModule } from './rating/rating.module';
import { AvailabilityModule } from './availability/availability.module';
import { PaymentModule } from './payment/payment.module';
import { NotificationModule } from './notification/notification.module';
import { DocumentModule } from './document/document.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AdminModule } from './admin/admin.module';
import { ResourceModule } from './resource/resource.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WinstonModule.forRoot({}),
    UserModule,
    RoleModule,
    AuthModule,
    DoctorModule,
    PatientModule,
    AppointmentModule,
    RatingModule,
    AvailabilityModule,
    PaymentModule,
    NotificationModule,
    DocumentModule,
    AnalyticsModule,
    AdminModule,
    ResourceModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
