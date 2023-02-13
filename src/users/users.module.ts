import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.provider';
import { MailsService } from '../mails/mails.service';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...userProviders,
    MailsService,
  ],
  exports: [UsersService],
})

export class UsersModule { }
