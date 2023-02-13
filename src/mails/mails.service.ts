import { Injectable } from '@nestjs/common';
import { Expense } from '../expenses/expense.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailsService {

  constructor(private mailerService: MailerService) { }

  async enviarEmail(email: string, expense: Expense): Promise<void> {
    console.log(email)
    await this.mailerService.sendMail({
      to: email,
      subject: "despesa cadastrada",
      html: `
        <dl>
            <dt> (Nova despesa cadastrada) </dt>
            <li>Data: ${expense.date}</li>
            <li>Descricao: ${expense.description}</li>
            <li>Valor: ${expense.amount}</li>
        </dl>
      `,
    }).catch((error) => console.log(error));
  }

}