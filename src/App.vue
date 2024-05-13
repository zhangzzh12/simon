<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>
<template>
    <el-config-provider :locale="zhCn">
        <transition name="fade" mode="out-in">
            <RouterView />
        </transition>        
    </el-config-provider>

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
