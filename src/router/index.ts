import { createRouter,createWebHistory } from "vue-router";
import LoginView from "@/pages/LoginView.vue";
import LoginAndRegister from "@/components/LoginAndRegister.vue";
import Forget from "@/components/Forget.vue";
import PhoneVerify from "@/components/PhoneVerify.vue";
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
                {
                    path:'forget',//不要加斜杠
                    component: Forget,
                },
                {
                    path:'phone',//不要加斜杠
                    component: PhoneVerify,
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
                    path:'b',
                    component:()=>import("@/pages/Layout/B.vue"),
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