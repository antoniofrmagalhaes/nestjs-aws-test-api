import { Injectable } from '@nestjs/common';
import { Client, GatewayIntentBits } from 'discord.js';

@Injectable()
export class ListGuildMembersService {
  private readonly memberClient: Client;
  private cachedMembers = null;
  private cacheTimestamp = 0;
  private readonly CACHE_DURATION = 12 * 60 * 60 * 1000;

  constructor() {
    this.memberClient = new Client({
      intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.Guilds],
    });
    this.memberClient.login(process.env.DISCORD_MEMBER_BOT_TOKEN);

    this.memberClient.once('ready', () => {
      console.log(`Bot de membros logado como ${this.memberClient.user.tag}`);
    });
  }

  async exec(filter: string): Promise<any> {
    const now = Date.now();

    // Verificação do cache
    if (this.cachedMembers && now - this.cacheTimestamp < this.CACHE_DURATION) {
      console.log('Servindo membros do cache');
      return this.formatResponse(this.cachedMembers, filter);
    }

    // Busca da guilda
    const guild = this.memberClient.guilds.cache.get(
      process.env.DISCORD_GUILD_ID,
    );
    if (!guild) throw new Error('Guilda não encontrada');

    // Busca de membros com presença
    const members = await guild.members.fetch({ withPresences: true });

    const roleNamesToFilter = [
      'Administração',
      'Moderação',
      'Competitivo',
      'Infantaria',
      'Divisão de Blindados',
      'Recrutador',
      'Membro',
      'Recruta',
    ];

    // Filtragem de membros por roles
    const filteredMembers = members.filter((member) =>
      member.roles.cache.some((role) => roleNamesToFilter.includes(role.name)),
    );

    // Agrupamento dos membros
    const groupedMembers = this.groupMembers(filteredMembers);

    // Atualiza o cache
    this.cachedMembers = groupedMembers;
    this.cacheTimestamp = now;

    return this.formatResponse(groupedMembers, filter);
  }

  private groupMembers(filteredMembers) {
    const groups = {
      administradores: [],
      moderacao: [],
      recrutadores: [],
      competivivo: [],
      membros: [],
      recrutas: [],
    };

    filteredMembers.forEach((member) => {
      const roles = member.roles.cache.map((role) => role.name);
      const memberData = {
        id: member.user.id,
        avatar: member.user.avatarURL(),
        username: member.user.username,
        displayName: member.user.displayName,
        nickname: member.nickname,
        discriminator: member.user.discriminator,
        tag: `${member.user.username}#${member.user.discriminator}`,
        isBot: member.user.bot,
        roles,
        presence: member.presence?.status || 'offline',
      };

      if (roles.includes('Recrutador')) groups.recrutadores.push(memberData);
      else if (roles.includes('Administração'))
        groups.administradores.push(memberData);
      else if (roles.includes('Moderação')) groups.moderacao.push(memberData);
      else if (roles.includes('Competitivo'))
        groups.competivivo.push(memberData);
      else if (roles.includes('Recruta')) groups.recrutas.push(memberData);
      else if (roles.includes('Membro')) groups.membros.push(memberData);
    });

    return groups;
  }

  private formatResponse(groupedMembers: any, filter: string): any {
    // Retorna um grupo específico se o filtro for fornecido
    if (filter) {
      const filteredResponse = groupedMembers[filter];
      if (!filteredResponse) {
        return { error: 'Filtro inválido' };
      }
      return { [filter]: filteredResponse };
    }

    // Retorna todos os grupos se não houver filtro
    return groupedMembers;
  }
}
