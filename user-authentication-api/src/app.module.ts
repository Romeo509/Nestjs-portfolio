import { Module } from '@nestjs/common';
import { EmailVerificationModule } from './email-verification/email-verification.module';

@Module({
  imports: [EmailVerificationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
