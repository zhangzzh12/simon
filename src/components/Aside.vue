<script lang="ts" setup>
import { reactive, ref } from 'vue';

let aside_list = reactive([
  { id: 1, icon: 'bx-grid-alt', title: '首页', isactive: 'active',url:'/home' },
  { id: 2, icon: 'bx-cog', title: '物料管理', isactive: '',url:'/home/B' },
  { id: 3, icon: 'bx-lemon', title: '商品管理', isactive: '',url:'/home/c' },
  { id: 4, icon: 'bx-cart-alt', title: '订单管理', isactive: '',url:'/home/d' },
  { id: 5, icon: 'bx-user', title: '员工管理', isactive: '',url:'/home/e' },
  { id: 6, icon: 'bx-credit-card', title: '财务管理', isactive: '',url:'/home/f' },
]);

let isactive = ref('');
let menu_btn = () => {
  if (!isactive.value) { isactive.value = 'active'; }
  else { isactive.value = ''; }
};

let Search_btn = () => {
  if (!isactive.value) { isactive.value = 'active'; }
  else { isactive.value = ''; }
};

let li_click = (id: number) => {
  aside_list.forEach((item) => {
    item.isactive = '';
  });
  aside_list[id - 1].isactive = 'active';
};

</script>

<template>
  <div class="sidebar" :class="isactive">
    <div class="logo-content">
      <div class="logo">
        <i class='bx bxl-flutter'></i>
        <h3>"哈大饼"<br />管理平台</h3>
      </div>
      <i class='bx bx-menu' id="btn" @click="menu_btn"></i>
    </div>


    <ul class="list">
      <li>
        <a href="#">
          <i class="bx bx-search" @click="Search_btn"></i>
          <input type="text" placeholder="Search">
        </a>
      </li>
      <li v-for="value in aside_list" :key="value.id" :class="value.isactive" @click="li_click(value.id)">
        <RouterLink :to="value.url">
          <i class='bx' :class="value.icon"></i>
          <span class="links-name">{{ value.title }}</span>
        </RouterLink>
        <span class="tooltip">{{ value.title }}</span>
      </li>
    </ul>
    <ul class="list-logout">
      <li>
        <RouterLink to="/">
          <i class="bx bx-log-out"></i>
          <span class="links-name">Logout</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 80px;
  height: 100%;
  @include background_color('bg-300');
  backdrop-filter: blur(5px);
  box-shadow: inset -5px 0 10px rgba(0, 0, 0, 0.6);
  padding: 6px 14px;
  transition: all .5s ease;
  z-index: 1024;

  &.active {
    width: 240px;

    .logo {
      transition-delay: .2s;
      /* ------- */
      opacity: 1;
    }

    #btn {
      left: 90%;
    }

    ul li {
      .tooltip {
        opacity: 0!important;
      }

      .links-name {
        opacity: 1;
      }
    }

    .list-logout {
      width: 89%;
    }
  }

  .logo {
    display: flex;
    align-items: center;
    color: #fff;
    width: 100%;
    height: 80px;
    pointer-events: none;
    /* ------- */
    font-size: 28px;
    opacity: 0;
    transition: opacity .5s ease;

    h3 {
      font-size: 20px;
    }
  }

  #btn {
    position: absolute;
    color: #fff; 
    font-size: 35px;
    width: 50px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    top: 6px;
    left: 50%;
    transform: translate(-50%);
    /* ------- */
    cursor: pointer;
  }

  ul {
    margin-top: 20px;

    li {
      position: relative;
      width: 100%;
      margin: 5px 0;
      line-height: 50px;
      transition: background-color .1s ease;
      animation: animateBg 5s linear infinite;

      &.active {
        background-color: #327aff;
      }

      .tooltip {
        position: absolute;
        top: 0;
        left: 130px;
        transform: translate(-50%, -50%);
        height: 35px;
        background-color: #327aff;
        color: #fff;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        text-align: center;
        line-height: 35px;
        pointer-events: none;
        width: 122px;
        opacity: 0;
        border-radius: 5px;
      }

      &:hover {
        .tooltip {
          opacity: 1;
          top: 50%;
          transition: .5s ease;
        }
      }

      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        outline: none;
        border-radius: 6px;
        font-size: 18px;
        color: #fff;
        padding-left: 52px;

        &::placeholder {
          color: #fff;
        }
      }

      .bx-search {
        color: #fff;
        font-size: 22px;
        z-index: 1;
        /* ------- */
      }

      i {
        min-width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
      }

      .links-name {
        opacity: 0;
        transition: opacity .3s ease;
      }

      a {
        color: #fff;
        display: flex;
        align-items: center;
        transition: all .2s;
        white-space: nowrap;

        /* ---------------- */
        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }

  .list-logout {
    position: absolute;
    bottom: 0;
    margin: 15px 0;
    width: 70%;
  }
}
@keyframes animateBg{
    to {
        filter: hue-rotate(360deg);
    }
  }
</style>