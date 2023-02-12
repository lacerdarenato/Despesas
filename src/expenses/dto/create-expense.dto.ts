import { Type } from "class-transformer";
import { IsString, IsNumber, IsDate, ValidateNested } from "class-validator";
import { User } from "../../users/user.entity";

export class CreateExpenseDto {
    @IsString()
    readonly description: string;

    @Type(() => Date)
    @IsDate()
    readonly date: string;

    @Type(() => User)
    readonly userId: User;

    @IsNumber()
    readonly amount: number;
}
