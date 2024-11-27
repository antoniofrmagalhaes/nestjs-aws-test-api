import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.APP_PORT || 4000;

  // Obter as origens permitidas a partir das variáveis de ambiente
  const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
    : ['*']; // Por padrão, permite todas as origens

  // Configurar opções de CORS
  app.enableCors({
    origin: (origin, callback) => {
      console.log('Origem da requisição:', origin);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error('Origem não permitida:', origin);
        callback(new Error('Origem não permitida pelo CORS'), false);
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Origin',
      'X-Requested-With',
      'Accept',
    ],
    credentials: true, // Permite o envio de cookies e credenciais
  });

  await app.listen(port);
  console.log(`Backend rodando na porta ${port}`);
}

bootstrap();

// Logs para verificar as variáveis de ambiente
// console.log('NODE_ENV:', process.env.NODE_ENV);
// console.log('APP_PORT:', process.env.APP_PORT);
// console.log('AWS_SES_HOST:', process.env.AWS_SES_HOST);
// console.log('AWS_SES_PORT:', process.env.AWS_SES_PORT);
// console.log('AWS_SES_ACCESS_KEY:', process.env.AWS_SES_ACCESS_KEY);
// console.log('AWS_SES_SECRET_KEY:', process.env.AWS_SES_SECRET_KEY);
// console.log('DISCORD_MEMBER_BOT_TOKEN:', process.env.DISCORD_MEMBER_BOT_TOKEN);
// console.log('DISCORD_FORM_BOT_TOKEN:', process.env.DISCORD_FORM_BOT_TOKEN);
// console.log('DISCORD_GUILD_ID:', process.env.DISCORD_GUILD_ID);
// console.log('DISCORD_CHANNEL_ID:', process.env.DISCORD_CHANNEL_ID);
// console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN);
