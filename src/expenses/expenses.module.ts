import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { DatabaseModule } from '../database/database.module';
import { expenseProviders } from './expense.provider';
import { UsersService } from 'src/users/users.service';
import { userProviders } from 'src/users/user.provider';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [ExpensesController],
  providers: [
    ExpensesService,
    ...expenseProviders,
    UsersService,
    ...userProviders
  ]
})
export class ExpensesModule { }
