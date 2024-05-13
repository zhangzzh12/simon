import { createRouter,createWebHistory } from "vue-router";
import LoginView from "@/pages/LoginView.vue";
import LoginAndRegister from "@/components/LoginAndRegister.vue";
const router = createRouter({
    history:createWebHistory(),
    routes :[
        {
            path:'/',
            component: LoginView,
            children:[
                {
                    path:'',
                    component: LoginAndRegister,
                },
            ],
        },
        {
            path:'/home',
            component:()=>import("@/pages/HomeView.vue"),
            children:[
                {
                    path:'',
                    component:()=>import("@/pages/Layout/A.vue"),
                },
                {
                    path:'warehouse',
                    component:()=>import("@/pages/Layout/warehouse.vue"),
                },
                {
                    path:'c',
                    component:()=>import("@/pages/Layout/C.vue"),
                },
                {
                    path:'d',
                    component:()=>import("@/pages/Layout/D.vue"),
                },
                {
                    path:'e',
                    component:()=>import("@/pages/Layout/E.vue"),
                },
                {
                    path:'f',
                    component:()=>import("@/pages/Layout/F.vue"),
                },
            ]
        },
    ],
});

export default router;