<script setup lang="ts">
import Aside from '@/components/Aside.vue';
import { useThemeStyleStore } from '@/stores/Themedata';
import { useMenuStore } from '@/stores/menuData';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';


// 主题色切换
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

//头部导航
const nav_list = ref([
  { id: "1", title: "主页", iconType: "bxs-home", },
  { id: "2", title: "更多服务", iconType: "bxs-user", },
  { id: "3", title: "关于我们", iconType: "bxs-heart", },
  { id: "4", title: "设置", iconType: "bxs-cog", },
]);

const router = useRouter();
const nav_goTo = (id: string | number) => {
  if (id === '1' || id === 1)
    router.push('/');
};

//面包屑
const { title } = useMenuStore();
</script>

<template>
  <div class="home-main">
    <el-container class="home-container">
      <div class="aside" style="z-index: 1024;">
        <Aside />
      </div>
      <el-container>
        <el-header>
          <div class="home-title">
            <div class="bread">
              <span class="title-bread">{{ title.first }}</span>
              <i class='bx bx-chevron-right' v-if="title.second !== ''"></i>
              <span class="title-bread" v-if="title.second !== ''">{{ title.second }}</span>
            </div>
          </div>
          <ul class="header-nav">
            <li v-for="value in nav_list" :key="value.id" @click="nav_goTo(value.id)">
              <i class="bx" :class="value.iconType"></i>
              <span>{{ value.title }}</span>
            </li>
          </ul>
          <div class="homepage-box">
            <div class="user-img"></div>
            <div class="personal-name"><span>你好!Simon</span></div>
          </div>
        </el-header>
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

  .home-container {
    display: flex;
    justify-content: space-between;

    .aside {
      height: 100%;
    }

    .el-header {
      width: 100%;
      padding: 25px 30px 25px 20px;
      height: 16vh;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 99;
      border-bottom: 2px solid rgba(0, 0, 0, .3);
      box-shadow: 0 0 30px rgba(0, 0, 0, .8);
      @include background_color('bg-200');

      .home-title {
        padding: 10px 8px;
        border-left: 10px solid;
        @include border_color('accent-200');

        .bread {
          display: flex;
          gap: 8px;
          align-items: center;
          font-size: 25px;
          @include font_color('text-100');

        }

      }

      .header-nav {
        margin-right: 30%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 40px;
        gap: 40px;
        border-radius: 20px;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.1);
        border-bottom: 1px solid rgba(255, 255, 255, .4);
        transform: translateX(80%);

        li {
          position: relative;
          @include font_color('text-100');

          &:hover {
            span {
              opacity: 1;
              transform: translate(50%, 50%);
              pointer-events: none;
            }

            i {
              opacity: .8;
              filter: drop-shadow(0 0 10px #fff) drop-shadow(0 0 20px #fff);
            }
          }

          span {
            position: absolute;
            @include font_color('text-100');
            white-space: nowrap;
            top: 50%;
            left: 50%;
            transform: translate(-10%, -10%);
            opacity: 0;
            transition: .5s;
            pointer-events: none;
          }

          i {
            width: 20%;
            font-size: 1.75em;
            -webkit-text-stroke: 1px #fff;
            opacity: 0.3;
            cursor: pointer;
            transition: .5s;
          }
        }

      }

      .homepage-box {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &:hover {
          .user-img {
            filter: drop-shadow(0 0 10px #162938) drop-shadow(0 0 20px #fff);
          }

          .personal-name {
            transform: translateY(100%);
            opacity: 1;
          }
        }

        .user-img {
          background: url('../assets/images/fulilian.jpeg') no-repeat;
          background-size: cover;
          background-position: center;
          width: 5em;
          height: 5em;
          border-radius: 50%;
          border: 2px solid rgba(0, 0, 0, .4);
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
          transition: .5s;
        }

        .personal-name {
          position: absolute;
          @include font_color('text-100');
          opacity: 0;
          transition: .5s;
          bottom: 0;
          font-size: 1.1em;
          white-space: nowrap;
          user-select: none;
        }
      }
    }
  }

  .el-container {
    height: 100%;

    .el-aside {
      height: 100%;
    }

  }
}
</style>