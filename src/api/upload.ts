import request from '@/utils/request'
export const imagePostService = (data) => {
  return request.post('/upload',data)
}