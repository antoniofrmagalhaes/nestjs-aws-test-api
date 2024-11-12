import { Controller, Get } from '@nestjs/common';

@Controller('')
export class IndexController {
  constructor() {}

  @Get()
  async getApiStatus(): Promise<{
    status: string;
    version: string;
    message: string;
  }> {
    return {
      status: 'API operacional e disponível',
      version: '0.0.1',
      message:
        'Esta API é uma aplicação de demonstração desenvolvida para testar a integração com o Amazon SES em um ambiente de uso gratuito. Ela permite o envio de e-mails de teste individuais para destinatários especificados utilizando o Amazon Simple Email Service (SES). Ideal para explorar as funcionalidades de envio de e-mails com configuração simplificada e sem custos adicionais.',
    };
  }
}
