<template>
    <span :id="id">{{ transaction.dateString(dateLength) }} {{ width }}</span>
</template>

<script setup lang="ts">
import { defineProps, ref, watch, computed, onMounted, onBeforeUnmount } from 'vue';
import Transaction, { DateLength } from '@/store/models/transaction';
import { useElementSize } from '@/utils';


interface Props {
    transaction: Transaction
}

const props = defineProps<Props>();
const id = `date-${props.transaction.id}`;
const date = document.getElementById(id);
const width = ref(0);
// const { width , height } = useElementSize(date);
const dateLength = ref<DateLength>(DateLength.long);
const observer = new ResizeObserver(([entry]) => {
    const rect = entry.contentRect;

    if (rect) {
        width.value = rect.width;
    }
});

onMounted(() => {
    console.log(date);

    if (date) {
        observer.observe(date);
    }
});

onBeforeUnmount(() => {
    observer.disconnect();
})

// window.onresize = () => {
//     if (date.value) {
//         const width = date.value.clientWidth;

//         console.log('width', width);

//         dateLength.value = DateLength.long;

//         if (width < 100) {
//             dateLength.value = DateLength.short;
//         } else if (width > 90 && width < 150) {
//             dateLength.value = DateLength.medium;
//         }
//     }
// }
</script>
