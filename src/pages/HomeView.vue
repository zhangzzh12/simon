<script setup lang="ts">
import Aside from '@/components/Aside.vue';
import { useThemeStyleStore } from '@/stores/data';

const { themeStyle } = useThemeStyleStore();

window.document.documentElement.setAttribute("data-theme", themeStyle.model);
let themeModelBtn = () => {
  themeStyle.btn_icon = (themeStyle.btn_icon == 'bxs-sun' ? 'bxs-moon' : 'bxs-sun');
  themeStyle.model = (themeStyle.model == 'light' ? 'dark' : 'light');
  if (themeStyle.model == 'dark') {
    window.document.documentElement.setAttribute("data-theme", "dark");
  } else {
    window.document.documentElement.setAttribute("data-theme", "light");
  }
};
// 主题色切换
</script>

<template>
  <div class="home-main">
    <el-container>
      <el-aside width="240px">
        <Aside />
      </el-aside>
      <el-container>
        <el-main>
          <transition name="fade" mode="out-in">
            <RouterView />
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
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


.home-main {
  height: 100vh;
  @include background_color('bg-100');
  min-width: 400px;
  overflow: hidden;
  transition: all .5s ease-in;

  .el-container {
    height: 100%;

    .el-aside {
      height: 100%;
    }
  }
}
 
</style>