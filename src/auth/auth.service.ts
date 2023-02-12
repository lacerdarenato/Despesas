import { Injectable } from '@nestjs/common';
import { UsersDTO } from './dto/users.dto';
import { validate } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
// import { LoggerService } from '../logger/logger.service';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Inject } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        // private logger: LoggerService,
        private jwtService: JwtService,
        @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    ) { }

    async login(user: any): Promise<Record<string, any>> {
        // Validation Flag
        let isOk = false;

        // Transform body into DTO
        const userDTO = new UsersDTO();
        userDTO.email = user.email;
        userDTO.password = user.password;

        // Validate DTO against validate function from class-validator
        await validate(userDTO).then((errors) => {
            if (errors.length > 0) {
                // this.logger.debug(`${errors}`, AuthService.name);
            } else {
                isOk = true;
            }
        });

        if (isOk) {
            // Get user information
            const userDetails = await this.userRepository.findOneBy({
                email: user.email,
            });
            if (userDetails == null) {
                return { status: 401, msg: { msg: 'Invalid credentials' } };
            }

            // Check if the given password match with saved password
            const isValid = bcrypt.compareSync(user.password, userDetails.password);
            // const isValid = true
            if (isValid) {
                return {
                    status: 200,
                    msg: {
                        email: user.email,
                        access_token: this.jwtService.sign({ email: user.email }),
                    },
                };
            } else {
                return { status: 401, msg: { msg: 'Invalid credentials' } };
            }
        } else {
            return { status: 400, msg: { msg: 'Invalid fields.' } };
        }
    }

    async createUser(body: any): Promise<Record<string, any>> {
        // Validation Flag
        let isOk = false;

        // Transform body into DTO
        const userDTO = new UsersDTO();
        userDTO.email = body.email;
        userDTO.password = bcrypt.hashSync(body.password, 10);
        // userDTO.password = body.password;

        // Validate DTO against validate function from class-validator
        await validate(userDTO).then((errors) => {
            if (errors.length > 0) {
                // this.logger.debug(`${errors}`, AuthService.name);
            } else {
                isOk = true;
            }
        });
        if (isOk) {
            await this.userRepository.save(userDTO).catch((error) => {
                // this.logger.debug(error.message, AuthService.name);
                isOk = false;
            });
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