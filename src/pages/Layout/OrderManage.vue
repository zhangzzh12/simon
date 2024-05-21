<script setup lang="ts">
import { useMenuStore } from "@/stores/menuData";
import { onMounted, ref, reactive } from "vue";
import OrderPanel from "@/components/OrderPanel.vue";
import {
  allOrderGetService,
  checkOrderpostService,
  orderGetService,
  returnOrderpostService,
} from "@/api/order";
import { useOrderDataStore } from "@/stores/orderData";

const { title } = useMenuStore();
const { formInline } = useOrderDataStore();

// 查询量
const search_date = reactive({
  date: ["", ""],
  status: "",
});
//加载值
const loading = ref(false);

//每页数据展示量
const page_index = ref(1);
const total_page_number = ref(0);

//订单info

const order_info = ref([
  { label: "编号", value: "-----" },
  { label: "交易时间", value: "-----" },
  { label: "总价", value: "---￥" },
  { label: "状态", value: "---" },
]);

// 表格数据
interface order {
  id: number;
  nameList: string[];
  numberList: number[];
  priceList: number[];
  goodList: string[];
  totalPrice: number;
  status: number;
  time: string;
}

interface orderItem {
  name: string;
  number: number;
  price: number;
  goodsCode: string;
}

const orderList = ref<order[]>([]);
const tableData = ref<orderItem[]>([]);
const tableTitle = [
  { props: "name", label: "货品名称" },
  { props: "goodsCode", label: "货品编号" },
  { props: "number", label: "货品数量" },
  { props: "price", label: "货品单价" },
];

const clean = () => {
  tableData.value = [];
  page_index.value = 1;
  total_page_number.value = 0;
  order_info.value = [
    { label: "编号", value: "-----" },
    { label: "交易时间", value: "-----" },
    { label: "总价", value: "---￥" },
    { label: "状态", value: "---" },
  ];
};

//条件查询销售单

const order_status = ["未审核", "已审核", "已退货"];

const getOrderItem = () => {
  if (!orderList.value) {
    clean();
    return;
  }
  let order_item = orderList.value[page_index.value - 1];
  for (let i = 0; i < order_item.nameList.length; ++i) {
    tableData.value[i] = { name: "", number: 1, price: 1, goodsCode: "" };
    tableData.value[i].name = order_item.nameList[i];
    tableData.value[i].number = order_item.numberList[i];
    tableData.value[i].goodsCode = order_item.goodList[i];
    tableData.value[i].price = order_item.priceList[i];
  }
  order_info.value[0].value = "Or" + order_item.id.toString();
  order_info.value[1].value = order_item.time.replace("T", " | ");
  order_info.value[2].value = order_item.totalPrice.toString() + "￥";
  order_info.value[3].value = order_status[order_item.status];
};

const getorder = async () => {
  loading.value = true;
  const res = await allOrderGetService();
  const resData = res.data.data;
  total_page_number.value = resData.length;
  for (let i = 0; i < resData.length; ++i) {
    orderList.value[i] = resData[i];
  }
  orderList.value.reverse();
  getOrderItem();
  loading.value = false;
}; //获取所有数据

onMounted(() => {
  title.first = "销售单";
  title.second = "收银";
  getorder();
});

const search = async () => {
  clean();
  loading.value = true;
  search_date.date = !search_date.date ? ["", ""] : search_date.date;
  if (search_date.status == "") {
    const res = await orderGetService(search_date.date[0], search_date.date[1]);
    const resData = res.data.data;
    if (resData.length > 0) {
      total_page_number.value = resData.length;
      for (let i = 0; i < resData.length; ++i) {
        orderList.value[i] = resData[i];
      }
      getOrderItem();
    }
    loading.value = false;
    return;
  }
  const res = await orderGetService(
    search_date.date[0],
    search_date.date[1],
    parseInt(search_date.status)
  );
  const resData = res.data.data;
  if (resData.length > 0) {
    total_page_number.value = resData.length;
    for (let i = 0; i < resData.length; ++i) {
      orderList.value[i] = resData[i];
    }
    getOrderItem();
  }
  loading.value = false;
};

//新增销售单
const dialogVisible = ref(false);
const addorder = () => {
  dialogVisible.value = true;
};

const emitsGetvisible = (data: boolean) => {
  dialogVisible.value = data;
  getorder();
};

//分页按钮

const prev = () => {
  if (page_index.value > 1) {
    page_index.value--;
    getOrderItem();
  } else {
    ElMessage.warning("已到达最新订单！");
  }
};

const next = () => {
  if (page_index.value < total_page_number.value) {
    page_index.value++;
    getOrderItem();
  } else {
    ElMessage.warning("已到达最早订单！");
  }
};

const jumpTo = () => {
  if (page_index.value > total_page_number.value) {
    page_index.value = total_page_number.value;
    ElMessage.warning("操作溢出，已修正");
  }
  if (page_index.value < 1) {
    page_index.value = 1;
    ElMessage.warning("操作溢出，已修正");
  }
  getOrderItem();
};

//退货
const returnVisible = ref(false);
const refund = async () => {
  console.log(orderList.value[page_index.value - 1]);
  const res = await returnOrderpostService(
    orderList.value[page_index.value - 1]
  );
  returnVisible.value = false;
  getorder();
};

//审核
const checkVisible = ref(false);
const check = async () => {
  console.log(orderList.value[page_index.value - 1]);
  const res = await checkOrderpostService(
    orderList.value[page_index.value - 1]
  );
  checkVisible.value = false;
  getorder();
};
</script>

<template>
  <div class="common-layout home-section">
    <el-scrollbar>
      <el-container style="display: flex; justify-content: space-between">
        <el-main>
          <form class="input-form">
            <div class="input-box flex">
              <span>时间范围</span>
              <div class="block">
                <el-date-picker
                  v-model="search_date.date"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="最早时间"
                  end-placeholder="最晚时间"
                  unlink-panels="true"
                  style="width: 240px"
                  value-format="YYYY-MM-DD"
                />
              </div>
            </div>
            <div class="input-box">
              <span>状态</span>
              <el-select
                v-model="search_date.status"
                placeholder="请选择"
                style="width: 100px"
              >
                <el-option label="未审核" value="0" />
                <el-option label="已审核" value="1" />
                <el-option label="已退货" value="2" />
                <el-option label="全部" value="" />
              </el-select>
            </div>
            <div class="button" @click="search">查询</div>
          </form>
          <section class="button-box">
            <div class="button cash" @click="addorder">
              进行结账(新增销售单)
            </div>
          </section>
          <section class="order-box">
            <div class="info-box">
              <div class="info" v-for="item in order_info">
                <span>{{ item.label }}</span>
                <div class="data">{{ item.value }}</div>
              </div>
            </div>
            <el-table
              ref="multipleTableRef"
              :data="tableData"
              table-layout="auto"
              v-loading="loading"
              class="table-box"
            >
              <el-table-column
                v-for="item in tableTitle"
                :prop="item.props"
                :label="item.label"
                align="center"
              />
            </el-table>
          </section>
          <section class="button-box page">
            <div class="button" @click="prev">上一页</div>
            <div class="button refund" @click="returnVisible = true">退货</div>
            <div class="button refund" @click="checkVisible = true">审核</div>
            <div class="button" @click="next">下一页</div>
            <div class="wrapper">
              <span>当前页面：</span
              ><input
                class="page-index"
                type="number"
                @blur="jumpTo"
                v-model="page_index"
              />
              <div class="total-data">共有{{ total_page_number }}单</div>
            </div>
          </section>
          <el-dialog v-model="dialogVisible" width="600" draggable>
            <OrderPanel
              title="销售单结账进行中"
              @getvisible="emitsGetvisible"
            />
          </el-dialog>
          <el-dialog v-model="returnVisible" width="350">
            <div class="title">
              <h3>退回订单</h3>
            </div>
            <div class="warning-box">
              <div class="content">您确定要进行退货操作吗</div>
              <div class="button-box">
                <div class="button" @click="refund">确认</div>
                <div class="button" @click="returnVisible = false">取消</div>
              </div>
            </div>
          </el-dialog>
          <el-dialog v-model="checkVisible" width="350">
            <div class="title">
              <h3>审核订单</h3>
            </div>
            <div class="warning-box">
              <div class="content">订单是否核对正确</div>
              <div class="button-box">
                <div class="button" @click="check">确认审核</div>
                <div class="button" @click="checkVisible = false">取消</div>
              </div>
            </div>
          </el-dialog>
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
  <div class="common-layout home-section">
    <el-scrollbar>
      <el-container>
        <el-main>
          <form class="input-form">
            <div class="input-box flex">
              <span>时间范围</span>
              <div class="block">
                <el-date-picker
                  v-model="search_date.date"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="最早时间"
                  end-placeholder="最晚时间"
                  unlink-panels="true"
                  style="width: 240px"
                  value-format="YYYY-MM-DD"
                />
              </div>
            </div>
            <div class="input-box">
              <span>状态</span>
              <el-select
                v-model="search_date.status"
                placeholder="请选择"
                style="width: 100px"
              >
                <el-option label="未审核" value="0" />
                <el-option label="已审核" value="1" />
                <el-option label="已退货" value="2" />
                <el-option label="全部" value="" />
              </el-select>
            </div>
            <div class="button" @click="search">查询</div>
          </form>
          <section class="button-box">
            <div class="button cash" @click="addorder">
              进行结账(新增销售单)
            </div>
          </section>
          <section class="order-box">
            <div class="info-box">
              <div class="info" v-for="item in order_info">
                <span>{{ item.label }}</span>
                <div class="data">{{ item.value }}</div>
              </div>
            </div>
            <el-table
              ref="multipleTableRef"
              :data="tableData"
              table-layout="auto"
              v-loading="loading"
              class="table-box"
            >
              <el-table-column
                v-for="item in tableTitle"
                :prop="item.props"
                :label="item.label"
                align="center"
              />
            </el-table>
          </section>
          <section class="button-box page">
            <div class="button" @click="prev">上一页</div>
            <div class="button refund" @click="returnVisible = true">退货</div>
            <div class="button refund" @click="checkVisible = true">审核</div>
            <div class="button" @click="next">下一页</div>
            <div class="wrapper">
              <span>当前页面：</span
              ><input
                class="page-index"
                type="number"
                @blur="jumpTo"
                v-model="page_index"
              />
              <div class="total-data">共有{{ total_page_number }}单</div>
            </div>
          </section>
          <el-dialog v-model="dialogVisible" width="600" draggable>
            <OrderPanel
              title="销售单结账进行中"
              @getvisible="emitsGetvisible"
            />
          </el-dialog>
          <el-dialog v-model="returnVisible" width="350">
            <div class="title">
              <h3>退回订单</h3>
            </div>
            <div class="warning-box">
              <div class="content">您确定要进行退货操作吗</div>
              <div class="button-box">
                <div class="button" @click="refund">确认</div>
                <div class="button" @click="returnVisible = false">取消</div>
              </div>
            </div>
          </el-dialog>
          <el-dialog v-model="checkVisible" width="350">
            <div class="title">
              <h3>审核订单</h3>
            </div>
            <div class="warning-box">
              <div class="content">订单是否核对正确</div>
              <div class="button-box">
                <div class="button" @click="check">确认审核</div>
                <div class="button" @click="checkVisible = false">取消</div>
              </div>
            </div>
          </el-dialog>
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

<style lang="scss" scoped>
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
    justify-content: space-between;
    padding: 60px 30px;
    gap: 20px;

    .button {
      user-select: none;
      min-width: 100px;
      padding: 0 10px;
      height: 35px;
      outline: none;
      border: none;
      @include background_color("bg-300");
      color: white;
      font-size: 16px;
      border-radius: 5px;
      transition: all 0.3s ease;
      margin-right: 80px;
      box-shadow: 0 0 4px rgba(49, 61, 68, 0.5);
      text-align: center;
      line-height: 35px;

      &.refund,
      &.cash {
        @include background_color("primary-300");
      }

      &:hover {
        scale: 1.03;
        opacity: 0.8;
      }

      &:active {
        scale: 0.98;
      }
    }

    .input-form {
      padding: 15px 25px;
      border-radius: 12px;
      box-shadow: inset 0 0 10px rgba(49, 61, 68, 0.8);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      @include background-color("bg-200");

      .input-box {
        @include font_color("text-100");

        span {
          margin-right: 10px;
          font-size: 16px;
        }

        &.flex {
          display: flex;
          align-items: center;
        }
      }
    }

    .button-box {
      display: flex;
      justify-content: center;
      position: relative;

      &.page {
        justify-content: space-between;
        align-items: center;
        padding: 0 10%;

        .wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: inset 0 0 10px rgba(49, 61, 68, 0.8);
          border-radius: 12px;
          padding: 10px;

          span {
            @include font_color("tetx-100");
            font-weight: 600;
            white-space: nowrap;
          }

          .total-data {
            box-shadow: 0 0 10px rgba(49, 61, 68, 0.8);
            padding: 8px 10px;
            border-radius: 12px;
            @include background_color("primary-200");
            white-space: nowrap;
            color: white;
          }

          .page-index {
            width: 60px;
            padding: 0 10px;
            height: 35px;
            outline: none;
            border: none;
            @include background_color("accent-200");
            color: white;
            font-size: 16px;
            border-radius: 5px;
            transition: all 0.3s ease;
            margin-right: 80px;
            box-shadow: 0 0 4px rgba(49, 61, 68, 0.5);
            text-align: center;
            line-height: 35px;
          }
        }
      }
    }

    .order-box {
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: center;
      padding: 30px 50px 60px 30px;

      .info-box {
        font-size: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 60px;

        .info {
          display: flex;
          align-items: center;
          @include font_color("text-100");

          span {
            user-select: none;
          }

          .data {
            box-shadow: 10px 10px 10px rgba(49, 61, 68, 0.4);
            margin-left: 8px;
            @include background_color("bg-300");
            padding: 5px 12px;
            border-radius: 12px;
          }
        }
      }

      .table-box {
        position: relative;
        box-shadow: -2px -2px 5px rgba(49, 61, 68, 0.5);
        border-top: 6px solid;
        @include border_color("accent-200");

        .warning-box {
          display: flex;
          flex-direction: column;
          gap: 10px;
          justify-content: space-between;
          padding: 10px;

          .content {
            font-size: 20px;
            font-weight: 500;
            text-align: center;
          }

          .button-box {
            display: flex;
            justify-content: space-between;
          }
        }

        .page-box {
          margin-top: 25px;
          padding: 0 10px 5px 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          @include font_color("text-100");

          .data-select span {
            margin-right: 5px;
          }

          .wrapper {
            display: flex;
            align-items: center;

            .total-data {
              margin-right: 15px;
              font-size: 16px;

              span {
                @include font_color("text-100");
              }
            }
          }
        }
      }
    }

    .title {
      padding: 8px 10px;
      border-left: 4px solid;
      @include border_color("accent-200");
    }

    .warning-box {
      padding: 30px 40px;
      display: flex;
      flex-direction: column;
      gap: 30px;

      .content {
        font-size: 20px;
        @include font_color("primary-200");
      }

      .button-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  .el-footer {
    padding: 0 !important;

    .copyright {
      height: 80px;
      width: 100%;
      @include background_color("bg-300");
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      box-shadow: 0 -5px 10px rgba(49, 61, 68, 0.6);
    }

    .more {
      padding-top: 60px;
      @include font_color("text-200");
      font-size: 25px;
      font-weight: 500;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
