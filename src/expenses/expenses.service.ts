import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './expense.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @Inject('EXPENSE_REPOSITORY') private expenseRepository: Repository<Expense>,
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>
  ) { }

  findAll(): Promise<Expense[]> {
    return this.expenseRepository.find();
  }

  findOne(id: number): Promise<Expense> {
    return this.expenseRepository.findOneBy({ id });
  }

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const newExpense = this.expenseRepository.create(createExpenseDto);
    const savedExpense = await this.expenseRepository.save(newExpense);
    const userEmail = await this.getEmailByUserId(savedExpense)
    console.log(userEmail)
    return savedExpense;
  };

  async update(id: number, updateExpenseDto: UpdateExpenseDto): Promise<boolean> {
    const findedExpense = this.findOne(id);
    if (findedExpense) {
      await this.expenseRepository.update(id, updateExpenseDto)
      return true
    } else {
      return false
    }
  }

  async remove(id: number): Promise<void> {
    await this.expenseRepository.delete(id);
  }

  async getEmailByUserId(expense: Expense): Promise<string> {
    return (await this.userRepository.findOneBy(expense.user)).email;
  }

  
}