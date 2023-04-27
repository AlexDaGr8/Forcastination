<template>
    <div class="grid">
        <label>Balance:</label>

        <span v-show="editingBalance">
            <input type="number" v-model="newBalance" ref="numberInputBalance" name="balance" />
        </span>
        <span v-show="!editingBalance" class="left-justify">
            <span>{{ toCurrency(balance) }}</span>
        </span>
        
        <div v-if="!editingBalance" class="left-justify">
            <button @click="updateEditingBalance">Edit</button>
        </div>
        <div v-else>
            <button @click="saveEditBalance">Save</button>
            <button @click="cancelEditBalance">Cancel</button>
        </div>

        <label>Time Frame:</label>
        <span v-show="editingTimeFrame">
            <input type="number" v-model="newTimeFrame" ref="numberInputTimeFrame" name="timeFrame" />
        </span>
        <span v-show="!editingTimeFrame" class="left-justify">
            <span>Forcast {{ timeFrame }} months into the future</span>
        </span>
        
        <div v-if="!editingTimeFrame" class="left-justify">
            <button @click="updateEditingTimeFrame">Edit</button>
        </div>
        <div v-else>
            <button @click="saveEditTimeFrame">Save</button>
            <button @click="cancelEditTimeFrame">Cancel</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';
import { toCurrency } from '@/utils';

const store = useStore();
const { balance, timeFrame } = storeToRefs(store);
const { updateBalance, updateTimeFrame } = store;
const newBalance = ref(store.balance);
const editingBalance = ref(false);
const newTimeFrame = ref(store.balance);
const editingTimeFrame = ref(false);
const numberInputBalance = ref(null);
const numberInputTimeFrame = ref(null);

function updateEditingBalance() {
    editingBalance.value = !editingBalance.value;

    if (editingBalance.value) {
        nextTick(() => { 
            if (numberInputBalance.value) {
                numberInputBalance.value.focus();
            }
        });
    }
}

function saveEditBalance() {
    updateBalance(newBalance.value);

    editingBalance.value = false;
}

function cancelEditBalance() {
    newBalance.value = balance.value;

    editingBalance.value = false;
}

function updateEditingTimeFrame() {
    editingTimeFrame.value = !editingTimeFrame.value;

    if (editingTimeFrame.value) {
        nextTick(() => { 
            if (numberInputTimeFrame.value) {
                numberInputTimeFrame.value.focus();
            }
        });
    }
}

function saveEditTimeFrame() {
    updateTimeFrame(newTimeFrame.value);

    editingTimeFrame.value = false;
}

function cancelEditTimeFrame() {
    newTimeFrame.value = timeFrame.value;

    editingTimeFrame.value = false;
}
</script>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: auto;
    width: 60vw;
    gap: 10px;
}
.left-justify {
    text-align: left;
}
button {
    margin: 2px;
    width: 45%;
}
</style>