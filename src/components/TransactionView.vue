<template>
    <div class="container">
        <h4>
            Transactions 
            <button @click="calculateTransactions">Calculate</button>
        </h4>

        <h5>In {{ timeFrame }} months you should have {{ toCurrency(futureBalance) }}</h5>

        <div class="grid-4">
            <template v-for="transaction of transactions" :key="transaction.id">
                <span>{{ transaction.dateString(DateLength.short) }}</span>
                <span>{{ transaction.label }}</span>
                <span>{{ toCurrency(transaction.amount) }}</span>
                <span>
                    <span :class="[transaction.isWithdrawal() ? 'red' : 'green']">{{ transaction.isWithdrawal() ? '↓' : '↑' }}</span>
                    {{ toCurrency(transaction.currentBalance) }}
                </span>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { DateLength } from '@/store/models/transaction';
import { toCurrency } from '@/utils';
import { storeToRefs } from 'pinia';
import TransactionDate from './TransactionDate.vue';

const store = useStore();
const { transactions, futureBalance, timeFrame } = storeToRefs(store);
const { calculateTransactions } = store;
</script>

<style scoped>
.container {
    width: 100%;
    margin: auto;
}
.grid-4 {
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(4, 1fr);
    max-height: 60vh;
    overflow-y: scroll;
}
.green {
    color: green;
}
.red {
    color: red;
}
</style>