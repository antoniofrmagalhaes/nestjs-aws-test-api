import { Module } from '@nestjs/common';
import { SendEmailController } from './controllers/app.controller';
import { SendTestEmailService } from './services/send-test-email.service';
import { IndexController } from './controllers/index.controller';

@Module({
  imports: [],
  controllers: [IndexController, SendEmailController],
  providers: [SendTestEmailService],
})
export class AppModule {}
