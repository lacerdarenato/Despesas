import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity'

@Entity()
export class Expense {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    date: Date;

    @Column()
    amount: number;

    @ManyToOne(() => User, (user) => user.expenses)
    user: User;
}
