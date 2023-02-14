import { IsEmail, IsString } from 'class-validator';
import { Expense } from '../../expenses/expense.entity';

export class CreateUsersDTO {

  @IsString()
  username: string;
    
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  expenses: Array<Expense>;
}