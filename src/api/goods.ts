import request from '@/utils/request'
export const goodsGetService = (params:object) =>{
  return request.get('/goods',{
    params
  })
}

export const goodsDeleteService = (id) => {
  return request.delete(`/goods/${id}`)
}

export const goodsPostService = (data) => {
  return request.post('/goods',data)
}

export const goodsPutService = (data) => {
  return request.put('/goods', data)
}

export const goodsChaService = (id) => {
  return request.get(`/goods/${id}`)
}