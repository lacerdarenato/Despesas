import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

    @Column()
    user: string;
}
