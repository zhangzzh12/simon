<script setup lang="ts">
import { useMenuStore } from '@/stores/menuData';
import { onMounted, ref, reactive } from 'vue';
import OrderPanel from '@/components/OrderPanel.vue';
import { allOrderGetService, orderGetService } from '@/api/order';


const { title } = useMenuStore();

onMounted(() => {
    title.first = '销售单';
    title.second = '收银';
    // getorder();
});

// 查询量
const search_date = reactive({
    date: '',
    status: '',
});
//加载值
const loading = ref(false);

//每页数据展示量
const page_index = ref(1);
const total_page_number = ref(0);

//条件查询销售单

const getorder = async ()=>{
    const res = await allOrderGetService();
    console.log(res.data);
};



// 表格数据
const tableData = ref([]);
const tableTitle = [
    { props: 'name', label: '货品名称' },
    { props: 'gender', label: '货品数量' },
    { props: 'job', label: '货品单价' },
    { props: 'date', label: '交易记录时间' },
];

//新增销售单
const dialogVisible = ref(false);
const addorder = () => {
    dialogVisible.value = true;
};

//订单info

const order_info = ref([
    { label: '编号', value: '#123435' },
    { label: '时间', value: '2024-01-09' },
    { label: '总价', value: '500￥' },
    { label: '状态', value: '已审核' },
]);

</script>

<template>
    <div class="common-layout home-section">
        <el-scrollbar>
            <el-container style="display: flex;justify-content: space-between;">
                <el-main>
                    <form class="input-form">
                        <div class="input-box flex">
                            <span>时间范围</span>
                            <div class="block">
                                <el-date-picker v-model="search_date.date" type="daterange" range-separator="-"
                                    start-placeholder="最早时间" end-placeholder="最晚时间" unlink-panels="true"
                                    style="width: 240px" value-format="YYYY-MM-DD" />
                            </div>
                        </div>
                        <div class="input-box ">
                            <span>状态</span>
                            <el-select v-model="search_date.status" placeholder="请选择" style="width: 100px">
                                <el-option label="未审核" value=0 />
                                <el-option label="已审核" value=1 />
                                <el-option label="已退货" value=2 />
                            </el-select>
                        </div>
                        <div class="button">查询</div>
                    </form>
                    <section class="button-box">
                        <div class="button" @click="addorder">进行结账(新增销售单)</div>
                    </section>
                    <section class="order-box">
                        <div class="info-box">
                            <div class="info" v-for="item in order_info">
                                <span>{{ item.label }}</span>
                                <div class="data">{{ item.value }}</div>
                            </div>

                        </div>
                        <el-table ref="multipleTableRef" :data="tableData" table-layout="auto" v-loading="loading"
                            class="table-box">
                            <el-table-column v-for="item in tableTitle" :prop="item.props" :label="item.label"
                                align="center" />
                        </el-table>
                    </section>
                    <section class="button-box page">
                        <div class="button">上一页</div>
                        <div class="button">退货</div>
                        <div class="button">下一页</div>
                    </section>
                    <el-dialog v-model="dialogVisible" width="600" draggable>
                        <OrderPanel title="销售单结账进行中" />
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


        .button-box {
            display: flex;
            position: relative;

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
                        box-shadow: 10px 10px 10px rgba(49, 61, 68, .4);
                        margin-left: 8px;
                        @include background_color('bg-300');
                        padding: 5px 12px;
                        border-radius: 12px;
                    }
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