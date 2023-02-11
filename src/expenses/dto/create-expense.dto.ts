import { IsCurrency, IsString, IsTimeZone, IsNumber } from "class-validator";

export class CreateExpenseDto {
    description: string;
    date: string;
    user: string;
    amount: number;
}
