import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/pages/LoginView.vue";
import LoginAndRegister from "@/components/LoginAndRegister.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      component: LoginView,
      children: [
        {
          path: "",
          component: LoginAndRegister,
        },
      ],
    },
    {
      path: "/",
      component: () => import("@/pages/HomeView.vue"),
      children: [
        {
          path: "",
          name: '首页',
          component: () => import("@/pages/Layout/HomeStatistics.vue"),
        },
        {
          path: "warehouseManage",
          name: '仓库管理',
          component: () => import("@/pages/Layout/WarehouseManage.vue"),
        },
        {
          path: "goodsManage",
          name: '货品管理',
          component: () => import("@/pages/Layout/GoodsManage.vue"),
        },
        {
          path: "orderManage",
          name: '订单管理',
          component: () => import("@/pages/Layout/OrderManage.vue"),
        },
        {
          path: "customerManage",
          name: '客户管理',
          component: () => import("@/pages/Layout/CustomerManage.vue"),
        },
        {
          path: "businessStaffManage",
          name: '商务人员管理',
          component: () => import("@/pages/Layout/BusinessStaffManage.vue"),
        },
        {
          path: "SupplierManage",
          name: '供货商管理',
          component: () => import("@/pages/Layout/SupplierManage.vue"),
        },
      ],
    },
  ],
});

export default router;
