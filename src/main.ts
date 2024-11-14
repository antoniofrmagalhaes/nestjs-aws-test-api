import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.APP_PORT || 4000;
  await app.listen(port);
}

console.log('Env:', process.env.NODE_ENV);
console.log('Port:', process.env.APP_PORT);
console.log('Host:', process.env.AWS_SES_HOST);
console.log('Port:', process.env.AWS_SES_PORT);
console.log('Access Key:', process.env.AWS_SES_ACCESS_KEY);
console.log('Secret Key:', process.env.AWS_SES_SECRET_KEY);
console.log('Email:', process.env.AWS_SES_VERIFIED_EMAIL_ADDRESS);

bootstrap();
