import { IsEmail, IsString } from 'class-validator';
import { Expense } from '../../expenses/expense.entity';

export class CreateUsersDTO {

  @IsString()
  readonly username: string;
    
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  readonly expenses: Array<Expense>;
}