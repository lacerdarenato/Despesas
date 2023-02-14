import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Expense } from '../expenses/expense.entity'

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Expense, (expense) => expense.user)
  expenses: Array<Expense>;
}