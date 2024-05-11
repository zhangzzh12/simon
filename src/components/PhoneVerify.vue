<script setup lang="ts">
import { ref } from 'vue';
// import axios from 'axios';
const phone = ref('');
const verificationCode = ref('');
const countDown = ref(0);

const sendVerificationCode = () => {
    if (!phone.value) {
        alert('请输入手机号');
        return;
    }
    // 模拟发送验证码
    else alert(`验证码已发送至${phone.value}`);
    // 开始倒计时
    countDown.value = 60;
    const timer = setInterval(() => {
        countDown.value--;
        if (countDown.value <= 0) {
            clearInterval(timer);
        }
    }, 1000);
};

const login = () => {
    if (!phone.value || !verificationCode.value) {
        alert('请输入手机号和验证码');
        return;
    }

    //   // 调用后端接口验证验证码
    //   axios.post('/api/login', {
    //     phone: phone.value,
    //     code: verificationCode.value
    //   }).then(response => {
    //     // 登录成功，处理逻辑
    //     alert('登录成功');
    //   }).catch(error => {
    //     // 登录失败，处理逻辑
    //     alert('登录失败');
    //   });
    // };


}

</script>

<template>
    <div class="wrapper">
        <div class="form-box">
            <form action="#">
                <h2>电话验证登录</h2>
                <div class="input-box">
                    <i class='bx bxs-phone-call'></i>
                    <input type="text" v-model="phone" required>
                    <label>绑定的电话号码</label>
                </div>
                <div class="input-box send">
                    <input type="text" v-model="verificationCode" required>
                    <label>验证码</label>
                    <div id="send-btn" @click="sendVerificationCode" :disabled="countDown > 0">
                        <span> {{ countDown > 0 ? `${countDown}秒后重新发送` : '发送验证码' }} </span>
                    </div>
                </div>
                <button type="submit" class="btn" @click="login">登录</button>
                <div class="returnLogin">
                    <p>还未绑定电话号码？<RouterLink class="login-link" to="/">使用密码登陆</RouterLink>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss">
.wrapper {
    position: relative;
    width: 400px;
    height: 520px;
    background-color: transparent;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    backdrop-filter: blur(20px);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
    display: flex;
    transition: transform .5s ease, height .2s ease;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    &.active {

        .form-box {
            &.login {
                transition: none;
                transform: translateX(-400px);
            }

            &.register {
                transition: transform .18s ease;
                transform: translateX(0);
            }
        }
    }

    .form-box {
        width: 100%;
        padding: 40px;

        &.login {
            transition: transform .18s ease;
            transform: translateX(0);
        }

        &.register {
            position: absolute;
            transition: none;
            transform: translateX(400px);
        }

        h2 {
            font-size: 2em;
            @include font_color('text-100');
            text-align: center;
        }

        .input-box {
            position: relative;
            width: 100%;
            height: 50px;
            border-bottom: 2px solid;
            @include border_color('text-100');
            margin: 30px 0;

            i {
                @include font_color('text-200');
            }

            label {
                position: absolute;
                top: 50%;
                left: 5px;
                transform: translateY(-50%);
                font-size: 1.1em;
                pointer-events: none;
                font-weight: 600;
                transition: all .5s;
                @include font_color('text-200');
            }

            input {
                width: 100%;
                height: 100%;
                background: transparent;
                border: none;
                outline: none;
                @include font_color('text-100');
                font-weight: 600;
                padding: 0 35px 0 5px;

                &:focus~label,
                &:valid~label {
                    top: -5px;
                }
            }

            i {
                position: absolute;
                right: 8px;
                font-size: 1.2em;
                line-height: 57px;
            }

            &.send {
                display: flex;
                position: relative;
                border: none;
                justify-content: space-between;

                input {
                    border-bottom: 2px solid;
                    @include border_color('text-100');
                    width: 50%;
                }

                #send-btn {
                    width: 35%;
                    padding: 5px;
                    outline: none;
                    background-color: transparent;
                    border: 2px solid;
                    @include border_color('text-100');
                    user-select: none;
                    cursor: pointer;
                    box-shadow: inset 0px 0px 8px rgba(0, 0, 0, .7),
                        0 0 3px rgba(0, 0, 0, 1);
                    border-radius: 8px;
                    @include font_color('text-100');
                    transition: transform 0.2s ease;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-weight: 600;

                    &:hover {
                        transform: scale(1.02);
                    }

                    &:active {
                        transform: scale(0.98);
                    }
                }
            }
        }

        .btn {
            width: 100%;
            height: 45px;
            border: none;
            outline: none;
            @include background_color('accent-100');
            border-radius: 6px;
            cursor: pointer;
            color: #fff;
            font-weight: 500;
            font-size: 1.1em;
            transition: .2s;

            &:hover {
                scale: 1.03;
            }

            &:active {
                scale: 0.99;
            }
        }

        .returnLogin {
            font-size: .9em;
            @include font_color('text-100');
            text-align: center;
            font-weight: 500;
            margin: 25px 0 10px;

            p a {
                @include font_color('text-100');
                font-weight: 600;
                margin-left: 5px;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>