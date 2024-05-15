import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/pages/LoginView.vue";
import LoginAndRegister from "@/components/LoginAndRegister.vue";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            component: LoginView,
            children: [
                {
                    path: '',
                    component: LoginAndRegister,
                },
            ],
        },
        {
            path: '/',
            component: () => import("@/pages/HomeView.vue"),
            children: [
                {
                    path: '',
                    component: () => import("@/pages/Layout/A.vue"),
                },
                {
                    path:'warehouseManage',
                    component:()=>import("@/pages/Layout/WarehouseManage.vue"),
                },
                {
                    path: 'goodsManage',
                    component: () => import("@/pages/Layout/GoodsManage.vue"),
                },
                {
                    path:'orderManage',
                    component:()=>import("@/pages/Layout/OrderManage.vue"),
                },
                {
                    path:'customerManage',
                    component:()=>import("@/pages/Layout/CustomerManage.vue"),
                },
                {
                    path: 'f',
                    component: () => import("@/pages/Layout/F.vue"),
                },
            ]
        },
    ],
});

export default router;