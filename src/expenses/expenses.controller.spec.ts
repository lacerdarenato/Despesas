import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { Expense } from './expense.entity';

const expenseEntityList: Expense[] = [
  new Expense({ id: 1, description: 'Despesa 1', date: new Date('2020-01-05T03:00:00.000Z'), amount: 100.00, userId: 1 }),
  new Expense({ id: 2, description: 'Despesa 2', date: new Date('2020-01-06T03:00:00.000Z'), amount: 200.00, userId: 1 }),
  new Expense({ id: 2, description: 'Despesa 2', date: new Date('2020-01-06T03:00:00.000Z'), amount: 300.00, userId: 1 }),
]

describe('ExpensesController', () => {
  let expenseController: ExpensesController;
  let expensesService: ExpensesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpensesController],
      providers: [
        {
          provide: ExpensesService,
          useValue: {
            find: jest.fn().mockResolvedValue(expenseEntityList),
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
          }
        }
      ],
    }).compile();

    expenseController = module.get<ExpensesController>(ExpensesController);
    expensesService = module.get<ExpensesService>(ExpensesService);
  });

  it('should be defined', () => {
    expect(expenseController).toBeDefined();
    expect(expensesService).toBeDefined();
  });
  

  describe('findAll', () => {
    it('shold return a expense list entity succesfully', async () => {
      //Arrange
      //Act
      const result = await expenseController.findAll()
      //Assert
      expect(result).toEqual(expenseEntityList);
      expect(typeof result).toEqual('object');
    })

    it('shold throw an exception', () => {
      //Arrange
      jest.spyOn(expensesService, 'findAll').mockRejectedValueOnce(new Error());
      //Act
      //Assert
      expect(expenseController.findAll()).rejects.toThrowError();
    })
  });
});
