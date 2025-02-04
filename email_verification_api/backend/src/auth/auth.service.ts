import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  private otpStore = new Map<string, string>(); // Store OTPs temporarily

  constructor(private readonly mailerService: MailerService) {}

  generateOtp(): string {
    return Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP
  }

  async sendOtp(email: string): Promise<string> {
    const otp = this.generateOtp();
    this.otpStore.set(email, otp);

    await this.mailerService.sendMail({
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
    });

    return 'OTP sent!';
  }

  verifyOtp(email: string, otp: string): boolean {
    const storedOtp = this.otpStore.get(email);
    if (storedOtp === otp) {
      this.otpStore.delete(email);
      return true;
    }
    return false;
  }
}
