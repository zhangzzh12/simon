<script setup lang="ts">
import { getOneWeekCost, getOneWeekMoney, getOneWeekOrderNum, getOneWeekProfit, getTodayMoney, getTotalOrderNum } from '@/api/statistics';
import { useMenuStore } from '@/stores/menuData';
import { onMounted, reactive, ref } from 'vue';
import LineChart from '@/components/chart/LineChart.vue';

const loading = ref(false);
const cost_list = ref([
   { label: '总点击量', value: 0 },
   { label: '今日销售额', value: 0 },
   { label: '近一周总成本', value: 0 },
   { label: '近一周总利润', value: 0 },
]);

const costRes = ref([0, 0, 0, 0]);

// 花费统计区
const cost_statistic = async () => {
   loading.value = true;
   let res;
   res = await getTotalOrderNum();
   costRes.value[0] = res.data.data;
   res = await getTodayMoney();
   costRes.value[1] = res.data.data;
   res = await getOneWeekCost();
   costRes.value[2] = res.data.data;
   res = await getOneWeekProfit();
   costRes.value[3] = res.data.data;
   for (let i = 0; i < 4; ++i) {
      cost_list.value[i].value = costRes.value[i];
   }
   loading.value = false;
};


// 获取近一周的日期时间数据

function getOneWeekDate():string[]{
   let weekDates:string[] = [];
   let today = new Date();
   for (var i = 0; i < 7; i++) {
      let date = new Date(today);
      date.setDate(today.getDate() - i);

      let month = date.getMonth() + 1;
      let day = date.getDate();

      // 格式化月份和日期，保证为两位数
      let formattedMonth = month < 10 ? '0' + month : month;
      let formattedDay = day < 10 ? '0' + day : day;

      weekDates.push(formattedMonth + '-' + formattedDay);
   }
   return weekDates.reverse();
}

// 销量管理

const OrderLineyAxisData = reactive({
   type: 'value',
});

const OrderLinexAxisData = reactive({
   type: 'category',
   data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
   axisLabel: {
      color: '#917800',
   }
});

const SalesData = ref([
   {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
   }
]);

const setOneWeekOrderNum = async () => {
   const res = await getOneWeekOrderNum();
   OrderLinexAxisData.data = getOneWeekDate();
   SalesData.value[0].data = res.data.data;
}

// 销售额统计

const MoneyLineyAxisData = reactive({
   type: 'value',
});

const MoneyLinexAxisData = reactive({
   type: 'category',
   data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
   axisLabel: {
      color: '#917800',
   }
});

const MoneyData = ref([
   {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
   }
]);

const setOneWeekMoney = async () => {
   const res = await getOneWeekMoney();
   MoneyLinexAxisData.data = getOneWeekDate();
   MoneyData.value[0].data = res.data.data;
}


//面包屑
const { title } = useMenuStore();
onMounted(() => {
   title.first = '首页';
   title.second = '';
   cost_statistic();
   setOneWeekOrderNum();
   setOneWeekMoney();
});

</script>

<template>
   <div class="common-layout home-section">
      <el-scrollbar>
         <el-container>
            <el-main>
               <section class="cost-wrapper">
                  <div class="cost-box" v-for="(item, index) in cost_list" v-loading="loading">
                     <div class="label">{{ item.label }}</div>
                     <div class="value">{{ item.value }}<span v-show="index == 0">单</span><span
                           v-show="index != 0">￥</span>
                     </div>
                  </div>
               </section>
               <section class="central-wrapper">
                  <el-row :gutter="50">
                     <el-col :span="12">
                        <div class="grid-content">
                           <div class="box">
                              <LineChart :chartTitle="'销量统计'" :y-axis="OrderLineyAxisData" :x-axis="OrderLinexAxisData"
                                 :chartData="SalesData" />
                           </div>
                        </div>
                     </el-col>
                     <el-col :span="12">
                        <div class="grid-content">
                           <div class="box">
                              <LineChart :chartTitle="'销售额统计'" :y-axis="MoneyLineyAxisData" :x-axis="MoneyLinexAxisData"
                                 :chartData="MoneyData" />
                           </div>
                        </div>
                     </el-col>
                  </el-row>
               </section>
            </el-main>
            <el-footer>
               <div class="copyright">Copyright © , All Rights Reserved.</div>
               <div class="more">
                  <span>Simon</span>
                  <el-divider direction="vertical" />
                  <span>Web</span>
                  <el-divider direction="vertical" />
                  <span>Watermark</span>
               </div>
            </el-footer>
         </el-container>
      </el-scrollbar>
   </div>
</template>

<style scoped lang="scss">
.scrollbar-demo-item {
   display: flex;
   align-items: center;
   justify-content: center;
   height: 50px;
   margin: 10px;
   text-align: center;
   border-radius: 4px;
   background: var(--el-color-primary-light-9);
   color: var(--el-color-primary);
}

.home-section section[data-v-4bed82b5] {
   margin: 0;
}

.home-section {
   position: relative;
   height: 100%;
   width: 100%;

   .el-main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: 20px;

      .cost-wrapper {
         width: 100%;
         height: 30%;
         display: flex;
         align-items: center;
         justify-content: space-between;
         padding: 40px 50px;
         gap: 25px;

         .cost-box {
            padding: 10px;
            width: 20%;
            height: 70%;
            border-radius: 12px;
            box-shadow: 10px 10px 10px rgba(49, 61, 68, .4);
            text-align: center;
            @include background_color('bg-300');
            transition: all .3s ease;

            &:hover {
               transform: translateY(-3%);
            }

            .label {
               font-size: 20px;
               @include font_color('text-200');
               padding: 20px 10px 10px 10px;
               user-select: none;
            }

            .value {
               display: flex;
               align-items: center;
               justify-content: center;
               gap: 8px;
               padding-top: 10px;
               padding-bottom: 20px;
               border-top: 2px solid;
               @include border_color('text-100');
               font-size: 35px;
               font-weight: 600;
               @include font_color('text-100');

               span {
                  font-size: 16px;
                  font-weight: 550;
               }
            }
         }
      }

      .central-wrapper {
         width: 100%;
         padding: 0 50px;
         margin-bottom: 120px;

         .box {
            overflow: hidden;
            width: 100%;
            height: 100%;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 10px 10px 10px rgba(49, 61, 68, .4);
            @include background_color('bg-200');
            transition: all .3s ease;

            &:hover {
               transform: translateY(-3%);
            }
         }


      }
   }

   .el-footer {
      padding: 0 !important;

      .copyright {
         height: 80px;
         width: 100%;
         @include background_color('bg-300');
         display: flex;
         justify-content: center;
         align-items: center;
         color: white;
         box-shadow: 0 -5px 10px rgba(49, 61, 68, .6);
      }

      .more {
         padding-top: 60px;
         @include font_color('text-200');
         font-size: 25px;
         font-weight: 500;
         display: flex;
         justify-content: center;
         align-items: center;
      }
   }
}
</style>

<style>
.el-row {
   margin-bottom: 50px;
}

.el-row:last-child {
   margin-bottom: 0;
}

.el-col {
   border-radius: 12px;
}

.grid-content {
   border-radius: 12px;
   height: 45vh;
}
</style>