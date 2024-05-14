<script setup lang="ts">
import { useMenuStore } from '@/stores/menuData';
import { onMounted, ref, reactive } from 'vue';


const { title } = useMenuStore();

onMounted(() => {
    title.first = '客户管理';
    title.second = '';
});

// 查询量
const search_date = reactive({
    name: '',
    gender: '',
    entrydate: '',
    ledgerdate: '',
});
//加载值
const loading = ref(false);

//每页数据展示量

// 表格数据
const tableData = ref([]);
const tableTitle = [
    { props: 'name', label: '货品名称' },
    { props: 'gender', label: '性别' },
    { props: 'job', label: '职位' },
    { props: 'entrydate', label: '入职日期' },
    { props: 'updateTime', label: '最后操作时间' },
];

//弹框
const dialogVisible = ref(false);

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
                        <div class="input-box">
                            <span>客户名</span>
                            <el-input v-model="search_date.name" placeholder="请输入货品名称" style="width: 150px;" />
                        </div>
                        <div class="input-box ">
                            <span>类别</span>
                            <el-select v-model="search_date.gender" placeholder="请选择" style="width: 100px">
                                <el-option label="男" value=1 />
                                <el-option label="女" value=2 />
                                <el-option label="全部" value='' />
                            </el-select>
                        </div>
                        <div class="input-box">
                            <span>地址</span>
                            <el-input v-model="search_date.name" placeholder="请输入货品名称" style="width: 150px;" />
                        </div>
                        <div class="button">查询</div>
                    </form>
                    <section class="button-box">
                        <div class="button">+ 新增客户信息</div>
                        <div class="button">- 批量删除客户信息</div>
                    </section>
                    <section class="order-box">
                        <el-table ref="multipleTableRef" :data="tableData" table-layout="auto" v-loading="loading"
                            class="table-box">
                            <el-table-column type="selection" prop="id" />
                            <el-table-column prop="name" label='姓名' align="center">
                            </el-table-column>
                            <el-table-column v-for="item in tableTitle" :prop="item.props" :label="item.label"
                                align="center" />
                            <el-table-column label="操作" align="center">
                                <template #default="scope">
                                    <el-button type="primary" size="small" @click.prevent=''>编辑</el-button>
                                    <el-button link type="primary" size="small" @click.prevent=''>删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
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