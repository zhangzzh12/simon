import request from '@/utils/request';

export const orderGetService = (begin: string, end: string, status: number|null = null) => {
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

export const returnOrderpostService = (data:object) => {
    return request.post('/Returns', data);
}

export const checkOrderpostService = (data:object) => {
    return request.post('/examine', data);
}