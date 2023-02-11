import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './expense.entity';
import { DatabaseModule } from 'src/database/database.module';
import { expenseProviders } from './expense.provider';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Expense]),
    DatabaseModule
  ],
  controllers: [ExpensesController],
  providers: [
    ...expenseProviders,
    ExpensesService
  ]
})
export class ExpensesModule { }
