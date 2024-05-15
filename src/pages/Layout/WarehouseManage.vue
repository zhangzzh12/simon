<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import BarChart from '@/components/chart/BarChart.vue';
import { useMenuStore } from '@/stores/menuData';
import { warehouseGetService, warehouseCountGetService, warehousePostService, inwarehousePostService, outwarehousePostService, billGetService } from '@/api/warehouse';
import WarehousePanel from '@/components/WarehousePanel.vue';
import OutwarehousePanel from '@/components/OutwarehousePanel.vue';
import InwarehousePanel from '@/components/InwarehousePanel.vue';
import { useWareDataStore } from '@/stores/WarehouseData';
import { formatTime } from '@/utils/format.ts'
const { formInline } = useWareDataStore(); 
const useWareData = useWareDataStore();
// 种类列表
const goodsName = ref([
    '日用品类',
    '食品类',
    '服装鞋帽类',
    '饮料类',
    '烟草类',
    '药品类',
    '电子产品类',
    '家用电器类',
    '家居用品类',
    '书籍文具类',
     '化妆品类',
     '运动户外用品类',
     '汽车配件类','宠物用品类',
])
const goodsKind = ref([
   {
      id:'',
      name:'请选择'
   },
   {
      id: 1,
      name: '日用品类'
   },
   {
      id: 2,
      name: '食品类'
   },
   {
      id: 3,
      name: '服装鞋帽类'
   },
   {
      id: 4,
      name: '饮料类'
   },
   {
      id: 5,
      name: '烟草类'
   },
   {
      id: 6,
      name: '药品类'
   },
   {
      id: 7,
      name: '电子产品类'
   },
     {
      id: 8,
      name: '家用电器类'
   },
   {
      id: 9,
      name: '家居用品类'
   },
   {
      id: 10,
      name: '书籍文具类'
   },
   {
      id: 11,
      name: '化妆品类'
   },
   {
      id: 12,
      name: '运动户外用品类'
   },
   {
      id: 13,
      name: '汽车配件类'
   },
   {
      id: 14,
      name: '宠物用品类'
   }
])
// 仓库货品数量列表
const goodsCountList = ref([])
const mergedData = ref([
    {name:'日用品类',value:'20'},
])
const num = ref(0)
// 查询量
const search_date = ref({
    page:1,
    pageSize:10,
    warehouseNum:0,
    name: '',
    kind:''
});
const search_bill = ref({
    page:1,
    pageSize:10,
    warehouseNum:0,
    day:''
});
//加载值
const loading = ref(false);
const load = ref(false)
//每页数据展示量
const total_page_number = ref(0);
const total_bill = ref(0)

// 表格数据
const tableData = ref();
const billList = ref();
const tableTitle = [
    { props: 'name', label: '货品名称' },
    { props: 'code', label: '编码' },
    { props: 'number', label: '数量' },
];

//获取所有的台账
const billGet = async () => {
    load.value = true
    const res = await billGetService(search_bill.value)
    total_bill.value = res.data.data.total
    billList.value = res.data.data.rows
    billList.value.forEach(element => {
        if(element.number<0){
            element.number = '出库' + (-element.number);
        }else{
            element.number = '入库' + (element.number);
        }
        element.time = formatTime(element.time)
    }); 
    load.value = false
}
//获取货品信息
const goodsGet = async () => {
    loading.value = true
    const res = await warehouseGetService(search_date.value)
    total_page_number.value = res.data.data.total
    tableData.value = res.data.data.rows
    loading.value = false
}
//获取仓库信息
const countList = async () => {
    const res = await warehouseCountGetService(search_date.value.warehouseNum)
    goodsCountList.value = res.data.data
    console.log(goodsCountList.value)
    mergedData.value = goodsKind.value.slice(1).map((item, index) => ({
        name: item.name,
        value: goodsCountList.value[index]
    }));
     console.log(mergedData.value)
}
//查询货品 
const Query = () => {
    goodsGet()
}
const onSubmit = async () => {
    console.log(formInline)
    await warehousePostService(formInline)
    goodsGet()
    dialogVisible.value = false
}
//添加货品
const addGoods = () => {
    formInline.id = 0
    formInline.name = ''
    formInline.inPrice = ''
    formInline.kind = ''
    formInline.location = 0
    formInline.code = ''
    formInline.number = ''
    dialogVisible.value = true
}
const inWarehouse = async (row) => {
    formInline.id = row.id
    formInline.name = row.name
    formInline.inPrice = ''
    formInline.kind = ''
    formInline.location = 0
    formInline.code = row.code
    formInline.number = ''
    inWarehouseVisible.value = true
    search_bill.value.page = 1
    await billGet()
}
const outWarehouse = async (row) => {
    formInline.id = row.id
    formInline.name = row.name
    formInline.inPrice = ''
    formInline.kind = ''
    formInline.location = 0
    formInline.code = row.code
    formInline.number = ''
    num.value = row.number
    useWareData.houseNumber = row.number
    outWarehouseVisible.value = true
    await billGet()
}
const inWarehouseOperation = async () => {
    if(Number(formInline.number)<0){
        alert("入库数量不能为负数");
    }else {
        await inwarehousePostService(formInline)
        goodsGet()
        inWarehouseVisible.value = false
    }
}
const outWarehouseOperation = async () => {
    if(Number(formInline.number)>num.value){
        alert("出库数量不能超过库存数量！");
    }else if(Number(formInline.number)<0){
         alert("入库数量不能为负数");
    }else {
        await outwarehousePostService(formInline)
        goodsGet()
        outWarehouseVisible.value = false   
    }
}
//改变每页展示的数量
const onSizeChange = (size:number) => {
    search_date.value.page = 1
    search_date.value.pageSize = size
    goodsGet()
}
const SizeChange = (size:number) => {
    search_bill.value.page = 1
    search_bill.value.pageSize = size
    billGet()
}
//改变页数
const onCurrentChange = (page: number) => {
   search_date.value.page = page
   goodsGet()
} 
const CurrentChange = (page: number) => {
   search_bill.value.page = page
   billGet()
} 
//面包屑
const { title } = useMenuStore();
onMounted(() => {
    title.first = '仓库管理';
    title.second = '店铺';
    goodsGet()
    countList()
    billGet()
});

//新增货品项
const dialogVisible = ref(false);
//入库
const inWarehouseVisible = ref(false);
//出库
const outWarehouseVisible = ref(false);
</script>

<template>
    <div class="common-layout home-section">
        <el-scrollbar>
            <el-container style="display: flex;justify-content: space-between;">
                <el-main>
                    <section class="statistic-box">
                        <div class="bar-box">
                            <BarChart chartTitle="仓位速览"
                                :xAxis="goodsName"
                                :chartData="mergedData" />
                        </div>
                    </section>
                    <section class="data-box">
                        <div class="showdata-box">
                            <form class="input-form">
                                <div class="input-box">
                                    <span>货品名称</span>
                                    <el-input v-model="search_date.name" placeholder="请输入货品名称" style="width: 150px;" />
                                </div>
                                <div class="input-box">
                                    <span>种类</span>
                                    <el-select v-model="search_date.kind" placeholder="请选择" style="width: 100px;">
                                        <el-option v-for="goods in goodsKind" style="margin-left: 10px;" :value="goods.id" :key="goods.id"
                                        :label="goods.name">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="button" @click="Query">查询</div>
                            </form>
                            <section class="button-box">
                                <div class="button" @click="addGoods">+ 新增货品项</div>
                            </section>
                            <section class="table-box">
                                <el-table ref="multipleTableRef" :data="tableData" table-layout="auto"
                                    v-loading="loading">
                                    <el-table-column v-for="item in tableTitle" :prop="item.props" :label="item.label"
                                        align="center" />
                                    <el-table-column label="操作" align="center">
                                        <template #default=" {row} ">
                                            <el-button type="primary" size="small" @click.prevent="inWarehouse(row)">入库</el-button>
                                            <el-button link type="primary" size="small" @click.prevent="outWarehouse(row)">出库</el-button>
                                            <el-button link type="primary" size="small" @click.prevent="">调拨货品</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="page-box">
                                    <el-pagination v-model:current-page="search_date.page" v-model:page-size="search_date.pageSize"
                                    :page-sizes="[10,20,50]" :background="true" layout="total, sizes, prev, pager, next, jumper"
                                    :total="total_page_number" @size-change="onSizeChange" @current-change="onCurrentChange"
                                    style="margin-top: 5px; justify-content: end" />
                                </div>
                            </section>
                            <el-dialog v-model="inWarehouseVisible" width="300">
                                <InwarehousePanel title="入库" >
                                    <template v-slot:button>
                                        <div class="button-box">
                                            <div class="button" @click="inWarehouseOperation">入库</div>
                                            <div class="button" @click="inWarehouseVisible = false">取消</div>
                                        </div>
                                    </template>
                                </InwarehousePanel>
                            </el-dialog>
                            <el-dialog v-model="outWarehouseVisible" width="300">
                                <OutwarehousePanel title="出库">
                                    <template v-slot:button>
                                        <div class="button-box">
                                            <div class="button" @click="outWarehouseOperation">出库</div>
                                            <div class="button" @click="outWarehouseVisible = false">取消</div>
                                        </div>
                                    </template>
                                </OutwarehousePanel>
                            </el-dialog>
                            <el-dialog v-model="dialogVisible" width="380">
                                <WarehousePanel title="新增货品">
                                    <template v-slot:button>
                                        <div class="button-box">
                                            <div class="button" @click="onSubmit">新增</div>
                                            <div class="button" @click="dialogVisible = false">取消</div>
                                        </div>
                                    </template>
                                </WarehousePanel>
                            </el-dialog>
                        </div>
                        <div class="ledger-box">
                            <form class="input-form">
                                <el-form-item label="台账生成时间">
                                    <el-date-picker type="date" placeholder="请选择台账生成时间" v-mdoel="search_bill.day"
                                        value-format="YYYY-MM-DD" clearable style="width: 200px;" />
                                </el-form-item>
                                <div class="button" @click="">查询</div>
                            </form>
                            <section class="table-box ledger">
                                <el-table ref="multipleTableRef" :data="billList" table-layout="auto"
                                    v-loading="load">
                                    <el-table-column prop="time" label="日期" align="center" width="150"/>
                                    <el-table-column prop="name" label="货品名称" align="center" width="150"/>
                                    <el-table-column prop="number" label="变动" align="center" width="80"/>
                                    <el-table-column label="操作" align="center" >
                                        <template #default="scope">
                                            <el-button type="primary" size="small" @click.prevent="">撤销</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="page-box">
                                    <el-pagination v-model:current-page="search_bill.page" v-model:page-size="search_bill.pageSize"
                                    :page-sizes="[10,20,50]" :background="true" layout="total, sizes, prev, pager, next, jumper"
                                    :total="total_bill" @size-change="SizeChange" @current-change="CurrentChange"
                                    style="margin-top: 5px; justify-content: end" />
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
            @include background_color('bg-300');
            color: white;
            font-size: 16px;
            border-radius: 5px;
            transition: all .3s ease;
            margin-right: 80px;
            box-shadow: 0 0 4px rgba(49, 61, 68, .5);
            text-align: center;
            line-height: 35px;

            &:hover {
                scale: 1.03;
                opacity: .8;
            }

            &:active {
                scale: 0.98;
            }
        }

        .table-box {
            position: relative;
            box-shadow: -2px -2px 5px rgba(49, 61, 68, .5);
            border-top: 6px solid;
            @include border_color('accent-200');

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
                @include font_color('text-100');

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
                            @include font_color('text-100');
                        }
                    }
                }
            }
        }

        .statistic-box {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 50px;

            .bar-box {
                height: 0;
                position: relative;
                padding-top: 30%;
                width: 70%;
                border-radius: 12px;
                box-shadow: 10px 10px 10px rgba(49, 61, 68, .4);
                @include background_color('bg-200');
            }
        }

        .data-box {
            display: flex;
            justify-content: space-between;
            width: 100%;

            .input-form {
                padding: 15px 25px;
                border-radius: 12px;
                box-shadow: inset 0 0 10px rgba(49, 61, 68, .8);
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 20px;
                @include background-color('bg-200');

                .input-box {
                    @include font_color('text-100');

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
                box-shadow: inset 0 0 10px rgba(49, 61, 68, .8);
                padding-bottom: 40px;
                margin-right: 30px;
                @include background_color('bg-300');
                .ledger{
                    box-shadow: 5px 5px 10px rgba(49, 61, 68, .8);
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