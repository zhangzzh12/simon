<script setup lang="ts">
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

let nav_menu_list = [
    { id: "1", title: "Home", icon: "bxs-home",url:'/home' },
    { id: "2", title: "Products", icon: "bxs-package",url:'/' },
    { id: "3", title: "About", icon: "bxs-heart",url:'/' },
    { id: "4", title: "service", icon: "bxs-user-circle",url:'/' },
];
</script>

<template>
    <div class="login-main" :class=themeStyle.model>
        <header>
            <div class="logo">哈大饼</div>
            <nav>
                <ul class="menu">
                    <li v-for="value in nav_menu_list" :key="value.id">
                        <RouterLink :to="value.url">
                            <i class="bx" :class="value.icon"></i>
                            <span>{{ value.title }}</span>
                        </RouterLink>
                    </li>
                </ul>
                <div class="btn"><i class='bx' :class="themeStyle.btn_icon" id="toggle" @click="themeModelBtn"></i>
                </div>
            </nav>
        </header>

        <main>
            <section class="home">
                <div class="home-content">
                    <h1>"哈大饼"<br>外卖配送</h1>
                    <p>美味外送<br>尽在指尖间<br>品尝哈大饼<br>畅享饕餮盛宴</p>
                </div>
            </section>
            <section class="form-Area">
                <transition name="fade" mode="out-in">
                    <RouterView />
                </transition>
            </section>
        </main>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/common.scss';
.fade-enter-active,
.fade-leave-active {
     transition: opacity 1s;
    // transition: height 1s;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}//路由跳转动画

//
.login-main {
    height: 100vh;
    @include background_color('bg-100');
    min-width: 400px;
    overflow: hidden;
    transition: all .5s ease-in;

}

header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 130px;
    padding: 0 5%;
    font-size: 18px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, .4);

    @include font_color('text-100');
    @include background_color('bg-300');
    transition: all .5s ease-in;


    .logo {
        margin-right: auto;
        font-size: 50px;
        font-weight: 600;
        user-select: none;
    }

    nav {
        display: flex;
        align-items: center;

        .menu {
            display: flex;
            align-items: center;

            li a {
                position: relative;
                @include font_color('text-200');
                font-size: 1.1rem;
                font-weight: 500;
                margin-left: 40px;

                span {
                    margin-left: 3px;
                }
            }

            li a::after {
                content: '';
                position: absolute;
                left: 0;
                bottom: -6px;
                width: 100%;
                height: 3px;
                background: #fff;
                border-radius: 5px;
                transform-origin: right;
                transform: scaleX(0);
                transition: transform .5s;
                font-size: 2em;
            }

            li a:hover::after {
                transform-origin: left;
                transform: scaleX(1);
            }
        }

        #toggle {
            border: 2px solid;
            @include border_color('text-100');
            box-shadow: 0 0 6px rgba(0, 0, 0, .9);
            border-radius: 50%;
            padding: 8px;
            font-size: 2rem;
            margin-left: 150px;
            cursor: pointer;
            transition: transform .2s ease;

            &:hover {
                transform: scale(1.1);
            }

            &:active {
                transform: scale(0.95);
            }
        }
    }

}

main {
    display: flex;
    height: 100%;

    .home {
        padding: 0 5%;
        @include font_color('text-200');
        text-align: center;
        width: 65%;
        position: relative;

        .home-content {
            position: absolute;
            top: 20%;
            left: 50%;
            transform: translateX(-40%);
            display: flex;
            user-select: none;

            h1 {
                text-align: end;
                white-space: nowrap;
                font-size: 4.5rem;
                font-weight: 600;
                border-right: 10px solid;
                @include border_color('text-100');
                padding-right: 8px;
                @include font_color('accent-100');
                -webkit-text-stroke: 1px #fff;
            }

            p {
                text-align: start;
                font-size: 1.1rem;
                font-weight: 400;
                line-height: 30px;
                letter-spacing: 3px;
                margin: auto 0;
                padding-left: 8px;
                @include font_color('text-200');
                white-space: nowrap;
            }
        }
    }

    .form-Area {
        width: 35%;
        display: flex;
        justify-content: center;
        position: relative;
        align-items: center;
        padding-bottom: 10%;
    }
}
</style>