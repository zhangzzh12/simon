import request from "@/utils/request";
export const supplierGetService = (params: object) => {
  return request.get("/suppliers", {
    params,
  });
};
export const supplierPostService = (data) => {
  return request.post("/suppliers", data);
};
export const supplierPutService = (data) => {
  return request.put("/suppliers", data);
};
export const supplierDeleteService = (ids) => {
  return request.delete(`/suppliers/${ids}`);
};
export const getSupplierService = (id) => {
  return request.get(`/suppliers/{id}`);
};
