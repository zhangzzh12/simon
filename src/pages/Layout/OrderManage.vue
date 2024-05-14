<script setup lang="ts">
import { useMenuStore } from '@/stores/menuData';
import { onMounted } from 'vue';


const { title } = useMenuStore();

onMounted(()=>{
    title.first='销售单';
    title.second='收银';
});

</script>

<template>

</template>

<style scoped lang="scss">

</style>