import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SendTestEmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.AWS_SES_HOST,
      port: +process.env.AWS_SES_PORT,
      auth: {
        user: process.env.AWS_SES_ACCESS_KEY,
        pass: process.env.AWS_SES_SECRET_KEY,
      },
      logger: true,
      debug: true,
    });
  }

  async sendEmail(to: string): Promise<void> {
    const mailOptions = {
      from: process.env.AWS_SES_VERIFIED_EMAIL_ADDRESS,
      to,
      subject: 'Test Email',
      text: 'This is a test email sent from our NestJS app!',
    };

    await this.transporter.sendMail(mailOptions);
  }
}
