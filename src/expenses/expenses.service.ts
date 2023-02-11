import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './expense.entity';


@Injectable()
export class ExpensesService {
  constructor(
    @Inject('EXPENSE_REPOSITORY')
    private expenseRepository: Repository<Expense>,
  ) { }

  findAll(): Promise<Expense[]> {
    return this.expenseRepository.find();
  }

  findOne(id: number): Promise<Expense> {
    return this.expenseRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.expenseRepository.delete(id);
  }

  create(createExpenseDto: CreateExpenseDto) {
    return 'This action adds a new expense';
  }
  
  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }
}

// @Injectable()
// export class ExpensesService {
//   create(createExpenseDto: CreateExpenseDto) {
//     return 'This action adds a new expense';
//   }

//   findAll() {
//     return `This action returns all expenses`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} expense`;
//   }

//   

//   remove(id: number) {
//     return `This action removes a #${id} expense`;
//   }
// }


