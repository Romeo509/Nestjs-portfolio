import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { v4 as uuidv4 } from 'uuid';
import * as nodemailer from 'nodemailer';

// In-memory storage (you can replace this with a database later)
const users = {};
const verificationTokens = {};

@Injectable()
export class EmailVerificationService {
  async register(registerDto: RegisterDto) {
    const { email } = registerDto;

    // Check if the email already exists
    if (users[email]) {
      throw new Error('User already registered');
    }

    // Generate verification token
    const token = uuidv4();
    verificationTokens[token] = email;

    // Store user as unverified
    users[email] = { email, verified: false };

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com', // Replace with your email
        pass: 'your-email-password',   // Replace with your email password or use OAuth2
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Email Verification',
      text: `Please verify your email by clicking on the following link: 
      http://localhost:3000/verify/${token}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return { message: 'Verification email sent' };
    } catch (error) {
      throw new Error('Error sending email');
    }
  }

  async verifyEmail(token: string) {
    // Check if the token is valid
    const email = verificationTokens[token];
    if (!email) {
      throw new Error('Invalid or expired token');
    }

    // Mark the user as verified
    users[email].verified = true;

    // Optionally, remove the token after successful verification
    delete verificationTokens[token];

    return { message: 'Email successfully verified' };
  }
}
