import { Expense } from '../expenses/expense.entity';
import { User } from '../users/user.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: "postgres",
                host: "localhost",
                port: 5432,
                username: "postgres",
                password: "postgres",
                database: "onFly",
                synchronize: true,
                logging: true,
                entities: [Expense, User],
                subscribers: [],
                migrations: [],
            });

            return dataSource.initialize();
        },
    },
];


