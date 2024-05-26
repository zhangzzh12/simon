<script setup lang="ts">
import { onMounted, ref } from "vue";
import BarChart from "@/components/chart/BarChart.vue";
import { useMenuStore } from "@/stores/menuData";
import ChangeGoods from "@/components/changeGoods.vue";
import {
  warehouseGetService,
  warehouseCountGetService,
  warehousePostService,
  billRevokeService,
  inwarehousePostService,
  outwarehousePostService,
  billGetService,
  warehouseListGetService,
  goodsChangeService,
} from "@/api/warehouse";
import WarehousePanel from "@/components/WarehousePanel.vue";
import OutwarehousePanel from "@/components/OutwarehousePanel.vue";
import InwarehousePanel from "@/components/InwarehousePanel.vue";
import { useWareDataStore } from "@/stores/WarehouseData";
import { formatTime, format } from "@/utils/format.ts";
const { formInline, Warehouse } = useWareDataStore();
const { title } = useMenuStore();
const menu = useMenuStore();
const num = ref(0);
const billList = ref();
const billlist = ref();
const tableData = ref();
const warehousePanel = ref();
const load = ref(false);
const total_bill = ref(0);
const loading = ref(false);
const goodsCountList = ref([]);
const total_page_number = ref(0);
//新增货品项显示与隐藏
const dialogVisible = ref(false);
//入库显示与隐藏
const inWarehouseVisible = ref(false);
//出库显示与隐藏
const outWarehouseVisible = ref(false);
//调拨货物显示与隐藏
const changeGoodsVisible = ref(false);

const getWarehouseList = async () => {
  const res = await warehouseListGetService();
  Warehouse.WarehouseList = res.data.data;
};
const goodsName = ref([
  "日用品类",
  "食品类",
  "服装鞋帽类",
  "饮料类",
  "烟草类",
  "药品类",
  "电子产品类",
  "家用电器类",
  "家居用品类",
  "书籍文具类",
  "化妆品类",
  "运动户外用品类",
  "汽车配件类",
  "宠物用品类",
]);
const goodsKind = ref([
  {
    id: "",
    name: "请选择",
  },
  {
    id: 1,
    name: "日用品类",
  },
  {
    id: 2,
    name: "食品类",
  },
  {
    id: 3,
    name: "服装鞋帽类",
  },
  {
    id: 4,
    name: "饮料类",
  },
  {
    id: 5,
    name: "烟草类",
  },
  {
    id: 6,
    name: "药品类",
  },
  {
    id: 7,
    name: "电子产品类",
  },
  {
    id: 8,
    name: "家用电器类",
  },
  {
    id: 9,
    name: "家居用品类",
  },
  {
    id: 10,
    name: "书籍文具类",
  },
  {
    id: 11,
    name: "化妆品类",
  },
  {
    id: 12,
    name: "运动户外用品类",
  },
  {
    id: 13,
    name: "汽车配件类",
  },
  {
    id: 14,
    name: "宠物用品类",
  },
]);
const mergedData = ref([
  { name: "日用品类", value: 0 },
  { name: "食品类", value: 0 },
  { name: "服装鞋帽类", value: 0 },
  { name: "饮料类", value: 0 },
  { name: "烟草类", value: 0 },
  { name: "药品类", value: 0 },
  { name: "电子产品类", value: 0 },
  { name: "家用电器类", value: 0 },
  { name: "家居用品类", value: 0 },
  { name: "书籍文具类", value: 0 },
  { name: "化妆品类", value: 0 },
  { name: "运动户外用品类", value: 0 },
  { name: "汽车配件类", value: 0 },
  { name: "宠物用品类", value: 0 },
]);
const search_date = ref({
  page: 1,
  pageSize: 10,
  warehouseNum: menu.warehouse.number,
  name: "",
  kind: "",
});
const search_bill = ref({
  page: 1,
  pageSize: 10,
  warehouseNum: menu.warehouse.number,
  day: "",
});
const bill = ref({
  id: "",
  location: menu.warehouse.number,
  code: "",
  number: "",
  name: "",
  operator: 0,
  time: "",
});
const submitBill = ref({
  id: "",
  location: menu.warehouse.number,
  code: "",
  number: 0,
  name: "",
  operator: 0,
  time: "",
});
const tableTitle = [
  { props: "name", label: "货品名称" },
  { props: "code", label: "编码" },
  { props: "number", label: "数量" },
];
//获取所有的台账
const billGet = async () => {
  load.value = true;
  console.log(search_bill.value);
  const res = await billGetService(search_bill.value);
  total_bill.value = res.data.data.total;
  billList.value = res.data.data.rows;
  billlist.value = res.data.data.rows;
  billList.value.forEach((element) => {
    if (element.number < 0) {
      element.number = "出库" + -element.number;
    } else {
      element.number = "入库" + element.number;
    }
    element.time = formatTime(element.time);
  });
  load.value = false;
};
//获取货品信息
const goodsGet = async () => {
  loading.value = true;
  const res = await warehouseGetService(search_date.value);
  total_page_number.value = res.data.data.total;
  tableData.value = res.data.data.rows;
  loading.value = false;
};
//获取仓库信息
const countList = async () => {
  const res = await warehouseCountGetService(menu.warehouse.number);
  goodsCountList.value = res.data.data;
  for (let i = 0; i < goodsCountList.value.length; ++i) {
    mergedData.value[i].value = goodsCountList.value[i];
  }
};
//查询货品
const Query = () => {
  goodsGet();
};
//查询台账
const queryBill = () => {
  billGet();
};
//添加货品
const addGoods = () => {
  formInline.name = "";
  formInline.inPrice = "";
  formInline.kind = "";
  formInline.location = menu.warehouse.number;
  formInline.code = "";
  formInline.number = "";
  dialogVisible.value = true;
  warehousePanel.value.clearForm();
};
//新增货品
const onSubmit = async () => {
  await warehousePanel.value.ruleFormRef.validate();
  if (Number(formInline.number) > 0) {
    const res = await warehousePostService(formInline);
    if (res.data.msg === "success") {
      goodsGet();
      dialogVisible.value = false;
    } else {
      alert(res.data.msg);
    }
  } else {
    alert("新增货品的数量必须大于0");
  }
};
//入库操作
const inWarehouse = (row: any) => {
  formInline.id = row.id;
  formInline.name = row.name;
  formInline.inPrice = "";
  formInline.kind = "";
  formInline.location = menu.warehouse.number;
  formInline.code = row.code;
  formInline.number = "";
  inWarehouseVisible.value = true;
};
const inWarehouseOperation = async () => {
  if (Number(formInline.number) <= 0) {
    alert("入库数量必须为正数");
  } else {
    await inwarehousePostService(formInline);
    search_bill.value.page = 1;
    await billGet();
    goodsGet();
    countList();
    inWarehouseVisible.value = false;
  }
};
//出库操作
const outWarehouse = (row: any) => {
  formInline.id = row.id;
  formInline.name = row.name;
  formInline.inPrice = "";
  formInline.kind = "";
  formInline.location = menu.warehouse.number;
  formInline.code = row.code;
  formInline.number = "";
  num.value = row.number;
  outWarehouseVisible.value = true;
};
const outWarehouseOperation = async () => {
  if (Number(formInline.number) > num.value) {
    alert("出库数量不能超过库存数量！");
  } else if (Number(formInline.number) <= 0) {
    alert("出库数量必须为正数");
  } else {
    await outwarehousePostService(formInline);
    search_bill.value.page = 1;
    billGet();
    goodsGet();
    countList();
    outWarehouseVisible.value = false;
  }
};
//调拨货品
const changeGoods = (row: any) => {
  num.value = row.number;
  formInline.id = row.id;
  formInline.name = row.name;
  formInline.inPrice = "";
  formInline.kind = "";
  formInline.location = menu.warehouse.number;
  formInline.code = row.code;
  formInline.number = "";
  formInline.nextLocation = "";
  changeGoodsVisible.value = true;
};
const changeGoodsOperation = async () => {
  if (Number(formInline.number) > num.value) {
    alert("出库数量不能超过库存数量！");
  } else {
    await goodsChangeService(formInline);
    goodsGet();
    billGet();
    countList();
    changeGoodsVisible.value = false;
  }
};
//货品信息改变每页展示的数量
const onSizeChange = (size: number) => {
  search_date.value.page = 1;
  search_date.value.pageSize = size;
  goodsGet();
};
//台账信息改变每页展示的数量
const SizeChange = (size: number) => {
  search_bill.value.page = 1;
  search_bill.value.pageSize = size;
  billGet();
};
//货品信息改变页数
const onCurrentChange = (page: number) => {
  search_date.value.page = page;
  goodsGet();
};
//台账信息改变页数
const CurrentChange = (page: number) => {
  search_bill.value.page = page;
  billGet();
};
//撤销台账
const revoke = async (row) => {
  await ElMessageBox.confirm("您确定要撤销该货品台账吗", "撤销货品台账", {
    type: "warning",
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  });
  bill.value = { ...row };
  console.log(bill.value);
  if (bill.value.number.includes("入库")) {
    bill.value.number = bill.value.number.slice(2);
  } else {
    bill.value.number = "-" + bill.value.number.slice(2);
  }
  submitBill.value.id = bill.value.id;
  submitBill.value.location = bill.value.location;
  submitBill.value.code = bill.value.code;
  submitBill.value.number = Number(bill.value.number);
  submitBill.value.name = bill.value.name;
  submitBill.value.operator = bill.value.operator;
  submitBill.value.time = format(bill.value.time);
  console.log(submitBill.value);
  await billRevokeService(submitBill.value);
  billGet();
  goodsGet();
};
//面包屑
onMounted(() => {
  title.first = "仓库管理";
  title.second = menu.warehouse.name;
  goodsGet();
  countList();
  billGet();
  getWarehouseList();
});

const warehouse_toggle = (id: number) => {
  for (let i = 0; i < menu.warehouse.active_list.length; ++i) {
    menu.warehouse.active_list[i] = "";
  }
  menu.warehouse.active_list[id] = "active";
  menu.warehouse.number = Warehouse.WarehouseList[id].code;
  menu.warehouse.name = Warehouse.WarehouseList[id].name;
  title.second = menu.warehouse.name;
  //
  search_date.value.warehouseNum = menu.warehouse.number;
  search_bill.value.warehouseNum = menu.warehouse.number;
  bill.value.location = menu.warehouse.number;
  submitBill.value.location = menu.warehouse.number;
  //
  goodsGet();
  countList();
  billGet();
};
</script>

<template>
  <div class="common-layout home-section">
    <el-scrollbar>
      <el-container style="display: flex; justify-content: space-between">
        <el-main>
          <section class="central-wrapper">
            <el-row :gutter="50">
              <el-col :span="4">
                <div class="grid-content">
                  <div class="box">
                    <div class="warehouse-list">
                      <h3>店铺/仓库列表</h3>
                      <div
                        class="warehouse-btn"
                        v-for="(item, index) in Warehouse.WarehouseList"
                        @click="warehouse_toggle(index)"
                        :class="menu.warehouse.active_list[index]"
                      >
                        {{ item.name }}
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content">
                  <div class="box">
                    <BarChart
                      chartTitle="仓位速览"
                      :xAxis="goodsName"
                      :chartData="mergedData"
                    />
                  </div>
                </div>
              </el-col>
            </el-row>
          </section>
          <section class="data-box">
            <div class="showdata-box">
              <form class="input-form">
                <div class="input-box">
                  <span>货品名称</span>
                  <el-input
                    v-model="search_date.name"
                    placeholder="请输入货品名称"
                    style="width: 150px"
                    clearable
                  />
                </div>
                <div class="input-box">
                  <span>种类</span>
                  <el-select
                    v-model="search_date.kind"
                    placeholder="请选择"
                    style="width: 100px"
                  >
                    <el-option
                      v-for="goods in goodsKind"
                      style="margin-left: 10px"
                      :value="goods.id"
                      :key="goods.id"
                      :label="goods.name"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="button" @click="Query">查询</div>
              </form>
              <section class="button-box">
                <div class="button" @click="addGoods">+ 新增货品</div>
              </section>
              <section class="table-box">
                <el-table
                  ref="multipleTableRef"
                  :data="tableData"
                  table-layout="auto"
                  v-loading="loading"
                >
                  <el-table-column
                    v-for="item in tableTitle"
                    :prop="item.props"
                    :label="item.label"
                    align="center"
                  />
                  <el-table-column label="操作" align="center">
                    <template #default="{ row }">
                      <el-button
                        type="primary"
                        size="small"
                        @click.prevent="inWarehouse(row)"
                        >入库</el-button
                      >
                      <el-button
                        link
                        type="primary"
                        size="small"
                        @click.prevent="outWarehouse(row)"
                        >出库</el-button
                      >
                      <el-button
                        link
                        type="primary"
                        size="small"
                        @click.prevent="changeGoods(row)"
                        >调拨货品</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
                <div class="page-box">
                  <el-pagination
                    v-model:current-page="search_date.page"
                    v-model:page-size="search_date.pageSize"
                    :page-sizes="[10, 20, 50]"
                    :background="true"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total_page_number"
                    @size-change="onSizeChange"
                    @current-change="onCurrentChange"
                    style="margin-top: 5px; justify-content: end"
                  />
                </div>
              </section>
              <el-dialog v-model="inWarehouseVisible" width="300">
                <InwarehousePanel title="入库">
                  <template v-slot:button>
                    <div class="button-box">
                      <div class="button" @click="inWarehouseOperation">
                        入库
                      </div>
                      <div class="button" @click="inWarehouseVisible = false">
                        取消
                      </div>
                    </div>
                  </template>
                </InwarehousePanel>
              </el-dialog>
              <el-dialog v-model="outWarehouseVisible" width="300">
                <OutwarehousePanel title="出库">
                  <template v-slot:button>
                    <div class="button-box">
                      <div class="button" @click="outWarehouseOperation">
                        出库
                      </div>
                      <div class="button" @click="outWarehouseVisible = false">
                        取消
                      </div>
                    </div>
                  </template>
                </OutwarehousePanel>
              </el-dialog>
              <el-dialog v-model="dialogVisible" width="320">
                <WarehousePanel title="新增货品" ref="warehousePanel">
                  <template v-slot:button>
                    <div class="button-box">
                      <div class="button" @click="onSubmit">新增</div>
                      <div class="button" @click="dialogVisible = false">
                        取消
                      </div>
                    </div>
                  </template>
                </WarehousePanel>
              </el-dialog>
              <el-dialog v-model="changeGoodsVisible" width="320">
                <ChangeGoods title="调拨货物">
                  <template v-slot:button>
                    <div class="button-box">
                      <div class="button" @click="changeGoodsOperation">
                        调拨
                      </div>
                      <div class="button" @click="changeGoodsVisible = false">
                        取消
                      </div>
                    </div>
                  </template>
                </ChangeGoods>
              </el-dialog>
            </div>
            <div class="ledger-box">
              <form class="input-form">
                <el-form-item label="台账生成时间">
                  <el-date-picker
                    type="date"
                    placeholder="请选择台账生成时间"
                    v-model="search_bill.day"
                    value-format="YYYY-MM-DD"
                    clearable
                    style="width: 200px"
                  />
                </el-form-item>
                <div class="button" @click="queryBill">查询</div>
              </form>
              <section class="table-box ledger">
                <el-table
                  ref="multipleTableRef"
                  :data="billList"
                  table-layout="auto"
                  v-loading="load"
                >
                  <el-table-column
                    prop="time"
                    label="日期"
                    align="center"
                    width="150"
                  />
                  <el-table-column
                    prop="name"
                    label="货品名称"
                    align="center"
                    width="150"
                  />
                  <el-table-column
                    prop="number"
                    label="变动"
                    align="center"
                    width="80"
                  />
                  <el-table-column label="操作" align="center">
                    <template #default="{ row }">
                      <el-button
                        v-if="row.operator === 1"
                        type="primary"
                        size="small"
                        @click.prevent="revoke(row)"
                        >撤销</el-button
                      >
                      <el-button v-else type="primary" size="small" disabled
                        >撤销</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
                <div class="page-box">
                  <el-pagination
                    v-model:current-page="search_bill.page"
                    v-model:page-size="search_bill.pageSize"
                    :page-sizes="[10, 20, 50]"
                    :background="true"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total_bill"
                    @size-change="SizeChange"
                    @current-change="CurrentChange"
                    style="margin: 5px 0; justify-content: end; flex-wrap: wrap"
                  />
                </div>
              </section>
            </div>
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
    align-items: center;
    padding: 60px 0;

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

      &:hover {
        scale: 1.03;
        opacity: 0.8;
      }

      &:active {
        scale: 0.98;
      }
    }

    .table-box {
      width: 100%;
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
        box-shadow: 10px 10px 10px rgba(49, 61, 68, 0.4);
        @include background_color("bg-200");
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-3%);
        }
      }

      .warehouse-list {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 20px;
        padding: 2px;

        h3 {
          user-select: none;
          white-space: nowrap;
          padding: 5px;
          border-bottom: 2px solid;
          @include border_color("text-200");
          @include font_color("text-100");
          margin-bottom: 10px;
          overflow: hidden;
        }

        .warehouse-btn {
          width: 100%;
          user-select: none;
          padding: 0 10px;
          height: 35px;
          @include background_color("bg-300");
          @include border_color("text-100");
          border: 2px solid;
          @include font_color("text-100");
          font-size: 16px;
          border-radius: 5px;
          transition: all 0.5s ease;
          box-shadow: 0 0 4px rgba(49, 61, 68, 0.5);
          text-align: center;
          line-height: 35px;

          &:hover {
            scale: 1.05;
            opacity: 0.8;
          }

          &:active {
            scale: 0.98;
          }

          &.active {
            border: none;
            box-shadow: inset 5px 5px 5px rgba(49, 61, 68, 0.5);
            @include background_color("bg-200");
          }
        }
      }
    }

    .data-box {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 0 20px;

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
          display: flex;
          align-items: center;
          flex-wrap: nowrap;

          span {
            margin-right: 10px;
            font-size: 16px;
            white-space: nowrap;
          }
        }
      }

      .showdata-box {
        width: 55%;
        padding: 50px 30px 10px 30px;
        display: flex;
        flex-direction: column;
        gap: 30px;

        .button-box {
          display: flex;
          position: relative;
        }
      }

      .ledger-box {
        width: 45%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        padding: 50px 30px 10px 30px;
        border-radius: 12px;
        box-shadow: inset 0 0 10px rgba(49, 61, 68, 0.8);
        padding-bottom: 40px;
        margin-right: 30px;
        @include background_color("bg-300");

        .ledger {
          box-shadow: 5px 5px 10px rgba(49, 61, 68, 0.8);
        }
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
