import { Controller, Post, Body } from '@nestjs/common';
import { SendTestEmailService } from 'src/services/send-test-email.service';

@Controller('test')
export class SendEmailController {
  constructor(private readonly sendTestEmailService: SendTestEmailService) {}

  @Post()
  async sendTestEmail(
    @Body('email') email: string,
  ): Promise<{ message: string }> {
    await this.sendTestEmailService.sendEmail(email);
    return { message: 'Email sent successfully!' };
  }
}
