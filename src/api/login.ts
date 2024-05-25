import request from '@/utils/request';

export const postLogin = (data:object) => {
    return request.post('/login', data);
} //获取token和角色信息

export const getPermission = (job:number) => {
    return request.get(`/permission/${job}`);
} //获取相应权限页面