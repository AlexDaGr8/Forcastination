import { createUUID } from '@/utils';

class Expense {
    dayOfMonth: number | number[];
    amount: number;
    name: string;
    id: string;
    constructor(name: string, amount: number, dayOfMonth: number | number[]) {
        this.name = name;
        this.dayOfMonth = dayOfMonth;
        this.amount = amount;
        this.id = createUUID();
    }
}

export default Expense;