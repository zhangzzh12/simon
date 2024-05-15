import request from '@/utils/request';

export const postLogin = (data:object) => {
    return request.post('/login', data);
} 