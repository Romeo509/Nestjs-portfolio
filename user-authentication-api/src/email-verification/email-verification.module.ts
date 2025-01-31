import { Module } from '@nestjs/common';
import { EmailVerificationService } from './email-verification.service';

@Module({
  providers: [EmailVerificationService]
})
export class EmailVerificationModule {}
