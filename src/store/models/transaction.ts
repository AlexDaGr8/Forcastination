import { createUUID } from '@/utils';

export enum TransactionType {
    withdrawal = 0,
    deposite = 1
}

export enum DateLength {
    long = 0,
    medium = 1,
    short = 2
}


class Transaction { 
    id: string;
    type: TransactionType;
    label: string;
    amount: number;
    currentBalance: number;
    date: Date;
    change: number;

    constructor(type: TransactionType, label: string, amount: number, balance: number, date: Date, change: number) {
        this.id = createUUID();
        this.type = type;
        this.label = label
        this.amount = amount;
        this.currentBalance = balance;
        this.date = date;
        this.change = change;
    }

    dateString(dateLength: DateLength = DateLength.long) {
        const options: Intl.DateTimeFormatOptions | undefined = {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
        };

        if (dateLength === DateLength.medium) {
            options.month = 'short';
        }

        if (dateLength === DateLength.short) {
            options.month = '2-digit';
            options.year = '2-digit';
        }

        return this.date.toLocaleString('en-US', options);
    }

    isWithdrawal() {
        return this.type === TransactionType.withdrawal;
    }
}

export default Transaction;