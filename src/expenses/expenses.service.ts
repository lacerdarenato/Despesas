import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './expense.entity';
import { MailsService } from 'src/mails/mails.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ExpensesService {
  constructor(
    @Inject('EXPENSE_REPOSITORY') private expenseRepository: Repository<Expense>,
    private usersService: UsersService,
    private mailsService: MailsService
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
    const userEmail = await this.usersService.findEmailByUserId(savedExpense.userId);
    this.mailsService.enviarEmail(userEmail, savedExpense)
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
}