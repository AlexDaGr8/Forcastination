<template>
    <div class="container">
        <h4>
            Expenses
        </h4>
        <ExpenseItem v-for="item in expenses" :item="item" :key="item.id"/>
        <div class="grid-3">
            <button @click="addExpenseBtn">Add Expense</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '@/store';
import ExpenseItem from '@/components/expense/ExpenseItem.vue';
import Expense from '@/store/models/expense';

const store = useStore();
const expenses = computed(() => store.expenses);
const { addExpense } = store;

function addExpenseBtn() {
    const newExpense = new Expense('Placeholder', 0, 1);

    console.log('new', newExpense)

    addExpense(newExpense);
}
</script>

<style scoped>
.container {
    width: 100%;
}
.grid-3 {
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(3, 1fr);
}
</style>