import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Expense } from './expenses/expense.entity';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [
    ExpensesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('database.uri'),
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [Expense],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    // TypeOrmModule.forRoot({
    //   type: "postgres",
    //   host: process.env.DATABASE_URL,
    //   port: Number(process.env.DATABASE_PORT),
    //   username: process.env.DATABASE_USER,
    //   password: process.env.DATABASE_PASSWORD,
    //   database: process.env.POSTGRES_DB,
    //   synchronize: true,
    //   logging: false,
    //   entities: [Expense],
    //   subscribers: [],
    //   migrations: [],
    //   autoLoadEntities: true
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }