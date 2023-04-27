<template>
    <div class="grid-4">
        <div class="grid-item">
            <span v-show="editing">
                <input type="text" v-model="newName" ref="nameInput" />
            </span>
            <span v-show="!editing" class="left-justify">
                <span>{{ item.name }}</span>
            </span>
        </div>
        <div class="grid-item">
            <span v-show="editing">
                <input type="number" v-model="newAmount" ref="nameInput" />
            </span>
            <span v-show="!editing" class="left-justify">
                <span>{{ toCurrency(item.amount) }}</span>
            </span>
        </div>
        <div class="grid-item">
            <span v-show="editing">
                <input type="number" v-model="newDayOfMonth" ref="nameInput" />
            </span>
            <span v-show="!editing" class="left-justify">
                <span>{{ item.dayOfMonth }}</span>
            </span>
        </div>
        <div class="grid-item">
            <button @click="updateEdit" v-if="!editing">Edit</button>
            <button @click="saveEdit" v-else>Save</button>
            <button @click="deleteItem" v-if="!editing">Delete</button>
            <button @click="cancelEdit" v-else>Cancel</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, nextTick } from 'vue';
import Expense from '@/store/models/expense';
import { useStore } from '@/store';
import { toCurrency } from '@/utils';

interface Props {
    item: Expense
}

const store = useStore();
const { updateExpense, deleteExpense } = store;
const props = defineProps<Props>();
const editing = ref(false);
const nameInput = ref(null);
const newName = ref(props.item.name);
const newAmount = ref(props.item.amount);
const newDayOfMonth = ref(props.item.dayOfMonth);

function updateEdit() {
    editing.value = !editing.value;

    if (editing.value) {
        nextTick(() => { 
            if (nameInput.value) {
                nameInput.value.focus();
            }
        });
    }
}

function saveEdit() {
    const newExp = new Expense(newName.value, newAmount.value, newDayOfMonth.value);

    updateExpense(newExp, props.item.id);

    editing.value = false;
}

function cancelEdit() {
    newName.value = props.item.name;

    editing.value = false;
}

function deleteItem() {
    deleteExpense(props.item.id);

    editing.value = false;
}
</script>

<style scoped>
.grid-4 {
    display: grid;
    gap: 5px;
    grid-template-columns: 20% 20% 20% 1fr;
}
.grid-item {
    padding: 3px;
}
button {
    margin: 2px;
    width: 45%;
}
input {
    width: 100%;
}
</style>