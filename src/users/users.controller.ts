import { Controller } from '@nestjs/common';
import { UsersService } from './users.service'
import { CreateUsersDTO } from './dto/create-user.dto'
import { Body, Get, Param } from '@nestjs/common/decorators';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get(':id/expenses')
    findAllExpenses(@Param('id') id: string) {
        return this.usersService.findAllExpenses(+id)
    }

    @Get(':id')
    findEmailByUserId(@Param('id') id: string) {
        return this.usersService.findEmailByUserId(+id)

    }
}
