<template>
  <h1>Forcastination</h1>
  <h3>Forcasting your money so you don't have to.</h3>
  <BalanceView />
  <div class="grid-2">
    <ExpenseList />
    <TransactionView />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import ExpenseList from '@/components/expense/ExpenseList.vue';
import BalanceView from './components/BalanceView.vue';
import TransactionView from './components/TransactionView.vue';
import { useStore } from './store';


const store = useStore();
const { calculateTransactions } = store;

onMounted(() => {
  calculateTransactions();
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 80vw;
  margin: auto;
}
</style>
