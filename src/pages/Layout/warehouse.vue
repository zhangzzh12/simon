<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import BarChart from '@/components/chart/BarChart.vue';
import { useMenuStore } from '@/stores/menuDataData.ts';
import WarehousePanel from '@/components/WarehousePanel.vue';
// 查询量
const search_date = reactive({
    name: '',
    gender: '',
    entrydate: '',
});
//加载值
const loading = ref(false);

//每页数据展示量
const page_index = ref(1);
const page_data_value = ref(10);
const total_page_number = ref(0);
const page_data_number = [
    {
        value: 5,
        label: 5,
    },
    {
        value: 10,
        label: 10,
    },
    {
        value: 20,
        label: 20,
    },
    {
        value: 50,
        label: 50,
    },
    {
        value: 100,
        label: 100,
    },
];

// 表格数据
const tableData = ref([]);
const tableTitle = [
    { props: 'name', label: '货品名称' },
    { props: 'gender', label: '性别' },
    { props: 'job', label: '职位' },
    { props: 'entrydate', label: '入职日期' },
    { props: 'updateTime', label: '最后操作时间' },
];

//面包屑
const { title } = useMenuStore();
onMounted(() => {
    title.first = '仓库管理';
    title.second = '店铺';
});


//新增货品项
const dialogVisible = ref(false);
</script>

<template>
    <div class="common-layout home-section">
        <el-scrollbar>
            <el-container style="display: flex;justify-content: space-between;">
                <el-main>
                    <div class="showdata-box">
                        <form class="input-form">
                            <div class="input-box">
                                <span>货品名称</span>
                                <el-input v-model="search_date.name" placeholder="请输入货品名称" style="width: 150px;" />
                            </div>
                            <div class="input-box">
                                <span>种类</span>
                                <el-select v-model="search_date.gender" placeholder="请选择" style="width: 100px;">
                                    <el-option label="男" value=1 />
                                    <el-option label="女" value=2 />
                                    <el-option label="全部" value='' />
                                </el-select>
                            </div>
                            <div class="button" @click="">查询</div>
                        </form>
                        <section class="button-box">
                            <div class="button" @click="dialogVisible = true">+ 新增货品项</div>
                        </section>
                        <section class="table-box">
                            <el-table ref="multipleTableRef" :data="tableData" table-layout="auto" v-loading="loading">
                                <el-table-column v-for="item in tableTitle" :prop="item.props" :label="item.label"
                                    align="center" />
                                <el-table-column label="操作" align="center">
                                    <template #default="scope">
                                        <el-button type="primary" size="small" @click.prevent="">入库</el-button>
                                        <el-button link type="primary" size="small" @click.prevent="">出库</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="page-box">
                                <div class="data-select">
                                    <span>每页至多展示数据数</span>
                                    <el-select v-model="page_data_value" placeholder="请选择" style="width: 100px;"
                                        @change="">
                                        <el-option v-for="item in page_data_number" :key="item.value"
                                            :label="item.label" :value="item.value" />
                                    </el-select>
                                </div>
                                <div class="wrapper">
                                    <div class="total-data">
                                        共<span>{{ total_page_number }}</span>条数据
                                    </div>
                                    <el-pagination background layout="prev, pager, next" :total="total_page_number"
                                        :page-size="page_data_value" @current-change="" hide-on-single-page="true"
                                        v-model:current-page="page_index" />
                                </div>
                            </div>
                        </section>
                        <el-dialog v-model="dialogVisible" width="350">
                            <WarehousePanel title="新增学员">
                                <template v-slot:button>
                                    <div class="button-box">
                                        <div class="button">新增</div>
                                        <div class="button" @click="dialogVisible = false">取消</div>
                                    </div>
                                </template>
                            </WarehousePanel>
                        </el-dialog>
                    </div>
                    <div class="statistics-box">
                        <section class="bar-box">
                            <BarChart chartTitle="仓位速览" :chartX="['A货', 'B货']"
                                :chartData="[{ value: 15, name: 'A货' }, { value: 15, name: 'B货' },]" />
                        </section>
                        <section class="table-box ledger">
                            <el-table ref="multipleTableRef" :data="tableData" table-layout="auto" v-loading="loading">
                                <el-table-column prop="date" label="日期" align="center" />
                                <el-table-column prop="date" label="货品名称" align="center" />
                                <el-table-column prop="date" label="变动" align="center" />
                                <el-table-column label="操作" align="center" width="200px">
                                    <template #default="scope">
                                        <el-button type="primary" size="small" @click.prevent="">撤销</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="page-box">
                                <div class="data-select">
                                    <span>每页至多展示数据数</span>
                                    <el-select v-model="page_data_value" placeholder="请选择" style="width: 80px;"
                                        @change="">
                                        <el-option v-for="item in page_data_number" :key="item.value"
                                            :label="item.label" :value="item.value" />
                                    </el-select>
                                </div>
                                <div class="wrapper">
                                    <div class="total-data">
                                        共<span>{{ total_page_number }}</span>条数据
                                    </div>
                                    <el-pagination background layout="prev, pager, next" :total="total_page_number"
                                        :page-size="page_data_value" @current-change="" hide-on-single-page="true"
                                        v-model:current-page="page_index" />
                                </div>
                            </div>
                        </section>
                    </div>
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
        justify-content: space-between;
        padding-bottom: 60px;

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

        .showdata-box {
            width: 55%;
            padding: 50px 30px 10px 30px;
            display: flex;
            flex-direction: column;
            gap: 30px;

            .input-form {
                padding: 15px 25px;
                border-radius: 12px;
                box-shadow: inset 0 0 10px rgba(49, 61, 68, .8);
                display: flex;
                justify-content: space-between;
                align-items: center;
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

            }
        }

        .statistics-box {
            width: 45%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
            padding: 30px 30px 10px 10px;

            .bar-box {
                height: 0;
                position: relative;
                padding-top: 50%;
                width: 80%;
                border-radius: 12px;
                box-shadow: 10px 10px 10px rgba(49, 61, 68, .4);
                @include background_color('bg-200')
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