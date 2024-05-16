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