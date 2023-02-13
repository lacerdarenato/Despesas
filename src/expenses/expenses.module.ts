import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { DatabaseModule } from '../database/database.module';
import { expenseProviders } from './expense.provider';
import { userProviders } from '../users/user.provider';
import { UsersService } from 'src/users/users.service';
import { MailsService } from 'src/mails/mails.service';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [ExpensesController],
  providers: [
    ...expenseProviders,
    ...userProviders,
    ExpensesService,
    UsersService,
    MailsService
  ]
})
export class ExpensesModule { }
