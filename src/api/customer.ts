import request from "@/utils/request";
export const customerGetService = (params: object) => {
  return request.get("/customers", {
    params,
  });
};
export const customerDeleteService = (ids) => {
  return request.delete(`/customers/${ids}`);
};
export const customerPostService = (data) => {
  return request.post("/customers", data);
};
export const customerPutService = (data) => {
  return request.put("/customers", data);
};
