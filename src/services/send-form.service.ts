import { Injectable } from '@nestjs/common';
import { Client, GatewayIntentBits } from 'discord.js';

@Injectable()
export class SendFormService {
  private readonly formClient: Client;

  constructor() {
    this.formClient = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    });

    this.formClient.login(process.env.DISCORD_FORM_BOT_TOKEN);

    this.formClient.once('ready', () => {
      console.log(`Bot de formulário logado como ${this.formClient.user.tag}`);
    });
  }

  async exec(name: string, email: string, message: string) {
    const guild = this.formClient.guilds.cache.get(
      process.env.DISCORD_GUILD_ID,
    );

    console.log('Busca da guilda', process.env.DISCORD_GUILD_ID);
    if (!guild) throw new Error('Guilda não encontrada');

    const channel = guild.channels.cache.get(process.env.DISCORD_CHANNEL_ID);

    if (!channel) throw new Error('Canal não encontrado');

    // Verifique se o canal é um TextChannel
    if (channel.isTextBased()) {
      await channel.send(
        `Novo formulário enviado por **${name}**\nEmail: ${email}\nMensagem: ${message}`,
      );
    } else {
      throw new Error('O canal configurado não é um canal de texto');
    }
  }
}
