import request from '@/utils/request'
export const goodsGetService = (params:object) =>{
  return request.get('/goods',{
    params
  })
}
