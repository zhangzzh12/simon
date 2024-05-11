<script setup lang="ts">
</script>
<template>
    <transition name="fade" mode="out-in">
        <RouterView />
    </transition>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
     transition: opacity 1s;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
