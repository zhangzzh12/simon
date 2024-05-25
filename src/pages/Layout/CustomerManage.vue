<script setup lang="ts">
import { useMenuStore } from "@/stores/menuData";
import { onMounted, ref, reactive } from "vue";
import { customerGetService, customerDeleteService } from "@/api/customer";
import CustomerPanel from "@/components/CustomerPanel.vue";
const idList = ref([]);
const tableData = ref([]);
const customerRef = ref();
const loading = ref(false);
const dialogVisible = ref(false);
const { title } = useMenuStore();
const total_page_number = ref(0);
const tableTitle = [
  { prop: "name", label: "客户姓名" },
  { prop: "kind", label: "客户类别" },
  { prop: "address", label: "地址" },
  { prop: "phoneNum", label: "电话" },
];
const search_date = reactive({
  page: 1,
  pageSize: 10,
  name: "",
  kind: "",
  address: "",
});
//弹框

//获取客户信息列表
const getCustomer = async () => {
  loading.value = true;
  const res = await customerGetService(search_date);
  total_page_number.value = res.data.data.total;
  tableData.value = res.data.data.rows;
  tableData.value.forEach((item) => {
    if (item.kind === 1) {
      item.kind = "零售客户";
    } else {
      item.kind = "批发客户";
    }
  });
  loading.value = false;
};
//每页展示的数量改变
const onSizeChange = (size: number) => {
  search_date.page = 1;
  search_date.pageSize = size;
  getCustomer();
};
//页数改变
const onCurrentChange = (page: number) => {
  search_date.page = page;
  getCustomer();
};
const Query = () => {
  getCustomer();
};
const selectionLineChangeHandle = (rows: any) => {
  rows.forEach((row) => {
    const id = row.id;
    if (!idList.value.includes(id)) {
      idList.value.push(id);
    }
  });
};
const onSuccess = () => {
  getCustomer();
};
//新增客户信息
const addClick = (row: any) => {
  customerRef.value.open(row, "新增客户信息");
};
//编辑客户信息
const editClick = (row: any) => {
  customerRef.value.open(row, "编辑客户信息");
};
//删除
const Delete = async (row: any) => {
  await ElMessageBox.confirm("您确定要删除该货品信息吗", "删除货品信息", {
    type: "warning",
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  });
  await customerDeleteService(row.id);
  getCustomer();
};
//批量删除
const deleteAllClick = async () => {
  if (idList.value.length === 0) {
    ElMessage.warning("请选择要删除的客户");
  } else {
    await ElMessageBox.confirm("您确定要删除客户信息吗", "删除客户信息", {
      type: "warning",
      confirmButtonText: "确定",
      cancelButtonText: "取消",
    });
    await customerDeleteService(idList.value);
    getCustomer();
    idList.value = [];
  }
};
onMounted(() => {
  title.first = "客户管理";
  title.second = "";
  getCustomer();
});
</script>

<template>
  <div class="common-layout home-section">
    <el-scrollbar>
      <el-container style="display: flex; justify-content: space-between">
        <el-main>
          <form class="input-form">
            <div class="input-box">
              <span>客户姓名</span>
              <el-input
                v-model="search_date.name"
                placeholder="请输入客户姓名"
                style="width: 150px"
                clearable
              />
            </div>
            <div class="input-box">
              <span>类别</span>
              <el-select
                v-model="search_date.kind"
                placeholder="请选择"
                style="width: 100px"
              >
                <el-option label="请选择" value="" style="margin-left: 7px" />
                <el-option
                  label="零售客户"
                  value="1"
                  style="margin-left: 7px"
                />
                <el-option
                  label="批发客户"
                  value="2"
                  style="margin-left: 7px"
                />
              </el-select>
            </div>
            <div class="input-box">
              <span>地址</span>
              <el-input
                v-model="search_date.address"
                placeholder="请输入客户地址"
                style="width: 150px"
                clearable
              />
            </div>
            <div class="button" @click="Query">查询</div>
          </form>
          <section class="button-box">
            <div class="button" @click="addClick">+ 新增客户信息</div>
            <div class="button" @click="deleteAllClick">- 批量删除客户信息</div>
          </section>
          <section class="order-box">
            <el-table
              ref="multipleTableRef"
              :data="tableData"
              table-layout="auto"
              v-loading="loading"
              class="table-box"
              @selection-change="selectionLineChangeHandle"
            >
              <el-table-column type="selection" prop="id" />
              <el-table-column
                v-for="item in tableTitle"
                :prop="item.prop"
                :label="item.label"
                align="center"
              />
              <el-table-column label="操作" align="center">
                <template #default="{ row }">
                  <el-button
                    type="primary"
                    size="small"
                    @click.prevent="editClick(row)"
                    >编辑</el-button
                  >
                  <el-button
                    link
                    type="primary"
                    size="small"
                    @click.prevent="Delete(row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <CustomerPanel
              ref="customerRef"
              @success="onSuccess"
            ></CustomerPanel>
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
          <el-dialog v-model="dialogVisible" width="350">
            <AddEmpPanel title="修改员工">
              <template v-slot:button>
                <el-button type="primary" @click="">保存</el-button>
                <el-button type="primary" @click="">取消</el-button>
              </template>
            </AddEmpPanel>
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
      position: relative;
      margin-top: 15px;

      &.page {
        justify-content: space-between;
        align-items: center;
        padding: 0 20%;
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
