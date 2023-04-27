import { TransactionType } from './models/transaction';
 import Expense from '@/store/models/expense';
import { defineStore } from 'pinia'
import Transaction from '@/store/models/transaction';
import LocalStorageService from '@/services/LocalStorageService';

const KEYS = { 
    EXPENSES: 'expenses',
    BALANCE: 'balance',
    TIME_FRAME: 'timeFrame'
};
const localStorage = new LocalStorageService();

export interface State {
    expenses: Expense[];
    balance: number;
    futureBalance: number;
    timeFrame: number;
    transactions: Transaction[],
    localStorage: LocalStorageService
}

export const useStore = defineStore('store', {
  state: (): State => {
    const expenses = localStorage.getItem<Expense[]>(KEYS.EXPENSES, []);
    const balance = localStorage.getItem<number>(KEYS.BALANCE, 0);
    const timeFrame = localStorage.getItem<number>(KEYS.TIME_FRAME, 24);

    return { 
        expenses,
        balance,
        timeFrame,
        futureBalance: 0,
        transactions: [],
        localStorage: localStorage
    }
  },
  actions: {
    addExpense(expense: Expense) {
        this.expenses.push(expense);

        this.localStorage.setItem(KEYS.EXPENSES, this.expenses);

        this.calculateTransactions();
    },
    updateExpense(expense: Expense, expenseId: string) {
        const foundIndex = this.expenses.findIndex(ex => ex.id === expenseId);

        if (foundIndex > -1) {
            expense.id = expenseId;

            this.expenses.splice(foundIndex, 1, expense);
        } else {
            this.expenses.push(expense);
        }

        this.localStorage.setItem(KEYS.EXPENSES, this.expenses);

        this.calculateTransactions();
    },
    deleteExpense(expenseId: string) {
        const foundIndex = this.expenses.findIndex(ex => ex.id === expenseId);

        this.expenses.splice(foundIndex, 1);

        this.localStorage.setItem(KEYS.EXPENSES, this.expenses);

        this.calculateTransactions();
    },
    updateTimeFrame(newTimeFrame: number) {
        this.timeFrame = newTimeFrame;

        this.localStorage.setItem(KEYS.TIME_FRAME, this.timeFrame);

        this.calculateTransactions();
    },
    updateBalance(expense: Expense | number) {
        if (typeof expense === 'number') {
            this.balance = expense;
        } else {
            this.balance += expense.amount;
        }

        this.localStorage.setItem(KEYS.BALANCE, this.balance);

        this.calculateTransactions();
    },
    calculateTransactions() {
        console.log('calc Trans');

        const { years, months } = ((m) => {
            const yrs = m / 12;
            
            return {
            years: yrs - (yrs % 1),
            months: (yrs % 1) * 12
            }
        })(this.timeFrame);
        const startDate = new Date();
        const endDate = new Date(
            startDate.getFullYear() + years,
            startDate.getMonth() + months,
            startDate.getDate()
        );

        this.transactions = [];

        this.futureBalance = this.balance;


        for (let sd = startDate; sd < endDate; sd.setDate(sd.getDate() + 1)) {
            const expenses = this.expenses.filter(ex => ex.dayOfMonth === sd.getDate());

            for (const exp of expenses) {
                this.futureBalance += exp.amount;
            
                const transactionType = exp.amount > 0 ? TransactionType.deposite : TransactionType.withdrawal;
                const transaction = new Transaction(transactionType, exp.name, exp.amount, this.futureBalance, new Date(sd), 0);

                this.transactions.push(transaction);
            }
        }
    }
  },
})