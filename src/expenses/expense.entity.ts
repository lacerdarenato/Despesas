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

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    amount: number;

    @Column()
    userId: number;

    @ManyToOne(() => User, (user) => user.expenses)
    @JoinColumn({ name: 'userId' })
    user: User;
}
