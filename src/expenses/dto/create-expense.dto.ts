import { Type } from "class-transformer";
import { IsString, IsNumber, IsDate } from "class-validator";

export class CreateExpenseDto {
    @IsString()
    readonly description: string;

    @Type(() => Date)
    @IsDate()
    readonly date: string;

    @IsString()
    readonly user: string;

    @IsNumber()
    readonly amount: number;
}
