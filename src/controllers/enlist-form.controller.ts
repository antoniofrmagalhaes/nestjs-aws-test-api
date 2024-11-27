import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { SendFormService } from 'src/services/send-form.service';

@Controller('submit-enlistment-form')
export class EnlistFormController {
  constructor(private readonly sendFormService: SendFormService) {}

  @Post()
  async submitForm(
    @Body() body: { name: string; email: string; message: string },
    @Res() res: Response,
  ) {
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return res.status(400).send('Faltam dados no formulário');
    }

    try {
      await this.sendFormService.exec(name, email, message);
      res.status(200).send('Formulário enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao processar o formulário:', error);
      res.status(500).send('Erro ao processar o formulário');
    }
  }
}
