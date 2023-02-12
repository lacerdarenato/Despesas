import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { DatabaseModule } from 'src/database/database.module';
import { expenseProviders } from './expense.provider';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [ExpensesController],
  providers: [
    ...expenseProviders,
    ExpensesService
  ]
})
export class ExpensesModule { }
