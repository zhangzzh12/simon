<script setup lang="ts">
import { useMenuStore } from '@/stores/menuData';
import { onMounted } from 'vue';


//面包屑
const { title } = useMenuStore();
onMounted(() => {
   title.first = '首页';
   title.second = '';
});

</script>

<template>
    

</template>

<style scoped>

</style>