import { Inject, Injectable } from '@nestjs/common';
import { Expense } from '../expenses/expense.entity';
import { Repository } from 'typeorm';
import { User } from './user.entity';

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
    
}
