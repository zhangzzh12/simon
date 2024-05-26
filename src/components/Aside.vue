<script lang="ts" setup>
import { getPermission } from "@/api/login";
import { useMenuStore } from "@/stores/menuData";
import { tokenStore } from "@/stores/tokenData";
import { useRouter } from "vue-router";
import { ref } from "vue";
let { title, asideList_id, warehouse, aside_list } = useMenuStore();

const router = useRouter();

// let aside_list = reactive([
//   { id: 1, icon: "bx-grid-alt", title: "首页", url: "/" },
//   { id: 2, icon: "bx-cog", title: "仓库管理", url: "/warehouseManage" },
//   { id: 3, icon: "bx-lemon", title: "货品管理", url: "/goodsManage" },
//   { id: 4, icon: "bx-cart-alt", title: "订单管理", url: "/orderManage" },
//   { id: 5, icon: "bx-user", title: "客户管理", url: "/customerManage" },
//   { id: 6, icon: "bx-credit-card", title: "商务人员管理", url: "/businessStaffManage" },
//   { id: 7, icon: "bxs-backpack", title: "供货商管理", url: "/SupplierManage" },
// ]);

let isactive = ref("");
let menu_btn = () => {
  if (!isactive.value) {
    isactive.value = "active";
  } else {
    isactive.value = "";
  }
};

let Search_btn = () => {
  if (!isactive.value) {
    isactive.value = "active";
  } else {
    isactive.value = "";
  }
};

let li_click = (id: number) => {
  for (let i = 0; i < asideList_id.length; ++i) {
    asideList_id[i] = "";
  }
  asideList_id[id] = "active";
};

//离开
const token = tokenStore();
const out = () => {
  token.removeToken();
  token.removeUser();
  aside_list = [];
  router.push("/login");
  ElMessage.success("退出成功！");
};
</script>

<template>
  <div class="sidebar" :class="isactive">
    <div class="logo-content">
      <div class="logo">
        <i class="bx bxl-flutter"></i>
        <h3>西蒙零售<br />批发管理平台</h3>
      </div>
      <i class="bx bx-menu" id="btn" @click="menu_btn"></i>
    </div>

    <ul class="list">
      <li>
        <a href="#">
          <i class="bx bx-search" @click="Search_btn"></i>
          <input type="text" placeholder="Search" />
        </a>
      </li>
      <li v-for="value in aside_list" :key="value.key" :class="asideList_id[value.key]" @click="li_click(value.key)">
        <RouterLink :to="value.url">
          <i class="bx" :class="value.icon"></i>
          <span class="links-name">{{ value.title }}</span>
        </RouterLink>
        <span class="tooltip">{{ value.title }}</span>
      </li>
    </ul>
    <ul class="list-logout">
      <li>
        <a @click="out">
          <i class="bx bx-log-out"></i>
          <span class="links-name">Logout</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 80px;
  height: 100%;
  @include background_color("bg-300");
  backdrop-filter: blur(5px);
  box-shadow: inset -5px 0 10px rgba(0, 0, 0, 0.6);
  padding: 6px 14px;
  transition: all 0.5s ease;

  &.active {
    width: 240px;

    .logo {
      transition-delay: 0.2s;
      /* ------- */
      opacity: 1;
    }

    #btn {
      left: 90%;
    }

    ul li {
      .tooltip {
        opacity: 0 !important;
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
    user-select: none;
    /* ------- */
    font-size: 28px;
    opacity: 0;
    transition: opacity 0.5s ease;

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
      transition: background-color 0.1s ease;
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
          transition: 0.5s ease;
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
        transition: opacity 0.3s ease;
      }

      a,
      .out {
        color: #fff;
        display: flex;
        align-items: center;
        transition: all 0.2s;
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

@keyframes animateBg {
  to {
    filter: hue-rotate(360deg);
  }
}
</style>
