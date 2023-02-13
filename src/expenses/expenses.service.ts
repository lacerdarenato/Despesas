import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './expense.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @Inject('EXPENSE_REPOSITORY') private expenseRepository: Repository<Expense>,
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    private mailerService: MailerService
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
    const userEmail = await this.getEmailByUserId(savedExpense.userId);
    this.enviarEmail(userEmail, savedExpense)
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

  async getEmailByUserId(id: number): Promise<string> {
    console.log(id)
    const findedUser = await this.userRepository.findOneBy({ id })
    return findedUser.email
  }

  async enviarEmail(email: string, expense: Expense): Promise<void> {
    console.log(email)
    await this.mailerService.sendMail({
      to: email,
      subject: "despesa cadastrada",
      html: `
        <dl>
            <dt> (Nova despesa cadastrada) </dt>
            <li>Data: ${expense.date}</li>
            <li>Descricao: ${expense.description}</li>
            <li>Valor: ${expense.amount}</li>
        </dl>
      `,
    }).catch((error) => console.log(error));
  }

}