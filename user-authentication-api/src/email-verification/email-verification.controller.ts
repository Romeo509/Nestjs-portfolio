import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { EmailVerificationService } from './email-verification.service';
import { RegisterDto } from './dto/register.dto';

@Controller('email-verification')
export class EmailVerificationController {
  constructor(
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.emailVerificationService.register(registerDto);
  }

  @Get('verify/:token')
  async verifyEmail(@Param('token') token: string) {
    return await this.emailVerificationService.verifyEmail(token);
  }
}
