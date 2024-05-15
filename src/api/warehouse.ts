import request from '@/utils/request'
export const warehouseGetService = (params) => {
  return request.get('/warehouse',{params})
}
export const warehouseCountGetService = (id:number) => {
  return request.get(`/countByKind/${id}`)
}
export const warehousePostService = (data) => {
  return request.post('/warehouse',data)
}
export const inwarehousePostService = (data) => {
  return request.post('/inWarehouse',data)
}
export const outwarehousePostService = (data) => {
  return request.post('/outWarehouse',data)
}