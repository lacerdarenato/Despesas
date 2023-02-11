import { Expense } from 'src/expenses/expense.entity';
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
                entities: [Expense],
                subscribers: [],
                migrations: [],
            });

            return dataSource.initialize();
        },
    },
];


