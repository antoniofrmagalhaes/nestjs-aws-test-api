import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ListGuildMembersService } from 'src/services/list-guild-members.service';

@Controller('guild-members')
export class GuildMembersController {
  constructor(
    private readonly listGuildMembersService: ListGuildMembersService,
  ) {}

  @Get()
  async getGuildMembers(@Query('filter') filter: string, @Res() res: Response) {
    try {
      const result = await this.listGuildMembersService.exec(filter);
      res.json(result);
    } catch (error) {
      console.error('Erro ao buscar membros:', error);
      res.status(500).send('Erro ao buscar membros');
    }
  }
}
