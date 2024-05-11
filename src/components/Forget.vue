<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
//验证码
let show_num:number[]|string[] = [];
let value = '';
function sublim(length:number =6) {
    var num = show_num.join("");
    if (!value) return alert('请输入验证码！');
    if (value == num) {
        alert('提交成功！');
        dj(length);
    } else {
        alert('验证码错误！\n你输入的是:  ' + value + "\n正确的是:  " + num + '\n请重新输入！');
        dj(length);
    }
};
function charList(length = 26, code = 'a') {
    // fromCharCode: 将Unicode编码转为一个字符:
    // charCodeAt: 获得自负unicode编码;
    let i = -1;
    return new Array(length)
        .fill(null)
        .map(() => {
            i++;
            return String.fromCharCode(code.charCodeAt(0) + i);
        });  // 获取’a’的charCode: "a".charCodeAt(0)=97
}
// 获得图形验证码集合
function getCode() {
    // 生成26个小写字母集合
    const lowercaseAlphabet = charList(26, 'a') || [];

    // 生成26个大写字母集合
    const uppercaseAlphabet = charList(26, 'A') || [];

    // 生成0-9数字集合
    const numsZeroToNine = new Array(10).fill(null).map((v, i) => i)

    return [...lowercaseAlphabet, ...uppercaseAlphabet, ...numsZeroToNine]
}
function draw(show_num:number[]|string[], codeLength = 6) { // codeLength: 设置验证码长度
    let canvas = document.getElementById("canvas");//获取到canvas的对象，演员
    
    let context = canvas!.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
    let canvas_width = canvas!.width;
    let canvas_height = canvas!.height;
    context.clearRect(0, 0, canvas_width, canvas_height);

    var aCode = getCode(); // 验证码所有字符数组
    var aLength = aCode.length;//获取到数组的长度

    // 绘制codeLength个随机图形
    for (var i = 0; i <= (codeLength - 1); i++) {
        var j = Math.floor(Math.random() * aLength);//获取到随机的索引值 Math.floor(Math.random()*(max-min+1)+min);
        var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
        var txt = aCode[j];//得到随机的一个内容
        show_num[i] = txt;
        var x = 10 + i * 20;//文字在canvas上的x坐标
        var y = 20 + Math.random() * 8;//文字在canvas上的y坐标（20+0到8的随机数）
        context.font = "bold 23px 微软雅黑";

        context.translate(x, y);
        context.rotate(deg); // 旋转一个角度

        context.fillStyle = randomColor(); // 随机生成一个颜色
        context.fillText(txt, 0, 0);

        context.rotate(-deg);
        context.translate(-x, -y);
    }
    for (var i = 0; i <= 5; i++) { //验证码上显示线条
        context.strokeStyle = randomColor();
        context.beginPath();
        context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.stroke();
    }
    for (var i = 0; i <= 30; i++) { //验证码上显示小点
        context.strokeStyle = randomColor();
        context.beginPath();
        var x = Math.random() * canvas_width;
        var y = Math.random() * canvas_height;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
    }
}
// 随机颜色
function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}
function dj(length:number) {
    draw(show_num,length);
}
onMounted(() => {
    show_num = [];
    draw(show_num,6);
}
);
//表单验证

//确定正则判断
const lower = new RegExp('(?=.*[a-z])')
const upper = new RegExp('(?=.*[A-Z])')
const number = new RegExp('(?=.*[0-9])')
const special = new RegExp('(?=.*[!@#\$%\^&\*/?])')
const length = new RegExp('(?=.{8,})')


let password = ref('');
let repassword = ref('');
let valid = reactive([
    { id: '1', show: false, text: '至少有一个小写字母' },
    { id: '2', show: false, text: '至少有一个大写字母' },
    { id: '3', show: false, text: '至少有一个数字' },
    { id: '4', show: false, text: '至少有一个特殊字符' },
    { id: '5', show: false, text: '至少有8个字符' },
]);//验证框里的确认
let valid_re = reactive([
    { id: '1', show: false, text: '两次输入密码不一致' },
])
let verifyValid = reactive([
    { show: false, valid: false },
    { show: false, valid: false },
    { show: false, valid: false },
    { show: false, valid: false },
]);//每行的验证框和最终通过图标的显示
const checkPassword = () => {
    //小写字母判断
    if (lower.test(password.value)) {
        valid[0]['show'] = true;
    } else {
        valid[0]['show'] = false;
    }

    //大写字母判断 
    if (upper.test(password.value)) {
        valid[1]['show'] = true;
    } else {
        valid[1]['show'] = false;
    }

    //数字判断
    if (number.test(password.value)) {
        valid[2]['show'] = true;
    } else {
        valid[2]['show'] = false;
    }

    //特殊字符判断
    if (special.test(password.value)) {
        valid[3]['show'] = true;
    } else {
        valid[3]['show'] = false;
    }

    //长度判断
    if (length.test(password.value)) {
        valid[4]['show'] = true;
    } else {
        valid[4]['show'] = false;
    }
    let flag = 0;
    for (let i = 0; i < valid.length; ++i) {
        if (valid[i]['show'] === true) flag++;
    }
    if (flag === valid.length) {
        verifyValid[2]['valid'] = true;
    } else {
        verifyValid[2]['valid'] = false;
    }
};//密码验证
const recheckPassword = () => {
    if (repassword.value === '') {
        valid_re[0]['show'] = false;
        verifyValid[3]['valid'] = false;
    }
    else if (repassword.value === password.value) {
        valid_re[0]['show'] = true;
        verifyValid[3]['valid'] = true;
    } else {
        valid_re[0]['show'] = false;
        verifyValid[3]['valid'] = false;
    }
};//再次确认
const openVerify = (index: number) => {
    if (!verifyValid[index]['valid']) verifyValid[index]['show'] = true;
};
const closeVerify = (index: number) => {
    verifyValid[index]['show'] = false;
};
</script>

<template>
    <div class="wrapper forget">
        <div class="form-box login">
            <h2>重置密码</h2>
            <form action="#">
                <div class="input-box">
                    <i class='bx bxs-envelope'></i>
                    <input type="text" required>
                    <label>申诉邮箱</label>
                </div>
                <div class="input-box">
                    <i class="bx" :class="{ 'bxs-check-circle': verifyValid[1]['valid'] }" id="ac"></i>
                    <i class='bx bxs-lock-alt'></i>
                    <input type="password" required v-model="password" @keyup="checkPassword" @focus="openVerify(1)"
                        @blur="closeVerify(1)">
                    <label>新密码</label>
                    <div class="validation" :class="{ 'valid': verifyValid[1]['show'] }">
                        <ul>
                            <li v-for="item in valid" :class="{ 'valid': item.show }" :key="item.id">
                                <i class='bx'
                                    :class="{ 'bxs-x-circle': !item.show, 'bxs-check-circle': item.show }"></i>
                                <span>{{ item.text }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="input-box">
                    <i class="bx" :class="{ 'bxs-check-circle': verifyValid[2]['valid'] }" id="ac"></i>
                    <i class='bx bxs-lock-alt'></i>
                    <input type="password" required @focus="openVerify(2)" @blur="closeVerify(2)"
                        @keyup="recheckPassword" v-model="repassword">
                    <label>确认新密码</label>
                    <div class="validation" :class="{ 'valid': verifyValid[2]['show'] }">
                        <ul>
                            <li v-for="item in valid_re" :class="{ 'valid': item.show }" :key="item.id">
                                <i class='bx'
                                    :class="{ 'bxs-x-circle': !item.show, 'bxs-check-circle': item.show }"></i>
                                <span>{{ item.text }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="input-box code">
                    <input type="text" required v-model=value maxlength="6">
                    <div id="code-btn" onclick="">
                        <canvas id="canvas" @click="dj(6)"></canvas>
                    </div>
                    <label>验证码</label>
                </div>
                <button type="submit" class="btn" @click="sublim(6)">重置密码</button>
                <div class="returnLogin">
                    <p>已找回密码?<RouterLink class="login-link" to="/">去登陆</RouterLink>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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

    &.forget {
        height: 570px!important;
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
            user-select: none;
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

            #ac {
                position: absolute;
                right: -20px;
                font-size: 1.2em;
                line-height: 57px;
                color: rgb(40, 207, 40)!important;;
            }

            &.code {
                display: flex;
                position: relative;
                border: none;

                input {
                    border-bottom: 2px solid;
                    @include border_color('text-100');
                    width: 65%;
                }

                #code-btn {
                    width: 50%;
                    padding: 0;
                    outline: none;
                    background-color: transparent;
                    border: 2px solid;
                    @include border_color('text-100');
                    user-select: none;
                    overflow: hidden;
                    cursor: pointer;
                }
            }

            .validation {
                width: 100%;
                position: absolute;
                top: 100%;
                margin-top: 5px;
                opacity: 0;
                visibility: hidden;
                z-index: 99;
                @include background_color('bg-300');
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15);
                transition: all 0.4s ease-in-out;

                &.valid {
                    opacity: 1;
                    visibility: visible;
                }

                ul {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;

                    li {

                        list-style: none;
                        @include font_color('text-100');
                        font-size: 1.1rem;
                        font-weight: 500;
                        transition: 0.5s;
                        display: flex;
                        flex-wrap: nowrap;

                        i {
                            position: static;
                            font-size: inherit;
                            line-height: inherit;
                            margin-right: 5px;
                            @include font_color('text-100');
                        }

                        &.valid {
                            @include font_color('primary-300');

                            i {
                                @include font_color('primary-300');
                            }
                        }
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