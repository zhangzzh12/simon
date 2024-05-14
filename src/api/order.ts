import request from '@/utils/request';

export const orderGetService = (begin: string, end: string, status: number) => {
    return request.get('/getOrder', {
        params: { begin, end, status }
    });
}

export const allOrderGetService = () => {
    return request.get('/getOrder');
}

export const saveOrderpostService = (data:object) => {
    return request.post('/order', data);
}