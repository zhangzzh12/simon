import request from '@/utils/request';

export const getTotalOrderNum = () => {
    return request.get('/getTotalOrderNum');
} 

export const getTodayMoney = () => {
    return request.get('/getTodayMoney');
} 

export const getOneWeekCost = () => {
    return request.get('/getOneWeekCost');
} 

export const getOneWeekProfit = () => {
    return request.get('/getOneWeekProfit');
} 


export const getOneWeekOrderNum = () => {
    return request.get('/getOneWeek');
} //统计近七天销售单数量

export const getOneWeekMoney = () => {
    return request.get('/getOneWeekMoney');
} //统计近七天销售额