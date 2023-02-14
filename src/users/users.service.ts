import { Inject, Injectable } from '@nestjs/common';
import { Expense } from '../expenses/expense.entity';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { validate } from 'class-validator';
import { CreateUsersDTO } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
  ) { }

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email });
  }

  async findAllExpenses(id: number): Promise<Expense[]> {
    return (await this.userRepository.findOneBy({ id })).expenses;
  }

  async findEmailByUserId(id: number): Promise<string> {
    const findedUser = await this.userRepository.findOneBy({ id })
    return findedUser.email
  }

  async create(body: any): Promise<Record<string, any>> {
    let isOk = false;

    const createUsersDTO = new CreateUsersDTO();
    createUsersDTO.username = body.username;
    createUsersDTO.email = body.email;
    createUsersDTO.password = body.password;
    // createUsersDTO.password = bcrypt.hashSync(body.password, 10);

    await validate(createUsersDTO).then((errors) => {
      isOk = (errors.length > 0) ? false : true
    });
    if (isOk) {
      await this.userRepository.save(createUsersDTO).catch(error => isOk = false);
      
      if (isOk) {
        return { status: 201, content: { msg: `User created with success` } };
      } else {
        return { status: 400, content: { msg: 'User already exists' } };
      }
    } else {
      return { status: 400, content: { msg: 'Invalid content' } };
    }
  }

}
