import { Type } from "class-transformer";
import { IsString, IsNumber, IsDate, MaxLength, IsPositive, MaxDate, Max } from "class-validator";
import { User } from "../../users/user.entity";

export class CreateExpenseDto {
    @MaxLength(191)
    @IsString()
    readonly description: string;

    @Type(() => Date)
    @IsDate()
    @MaxDate(new Date)
    readonly date: string;

    @Type(() => User)
    readonly userId: User;

    @IsPositive()
    @Max(99999999)
    @IsNumber()
    readonly amount: number;
}
