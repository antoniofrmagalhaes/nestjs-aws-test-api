import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IndexController } from './controllers/index.controller';
import { GuildMembersController } from './controllers/guild-members.controller';
import { EnlistFormController } from './controllers/enlist-form.controller';
import { ListGuildMembersService } from './services/list-guild-members.service';
import { SendFormService } from './services/send-form.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [IndexController, GuildMembersController, EnlistFormController],
  providers: [ListGuildMembersService, SendFormService],
})
export class AppModule {}
