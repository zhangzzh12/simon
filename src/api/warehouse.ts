import request from "@/utils/request";

export const warehouseListGetService = () => {
  return request.get("/gethouseList");
};

export const warehouseGetService = (params) => {
  return request.get("/warehouse", { params });
};
export const warehouseCountGetService = (id: number) => {
  return request.get(`/countByKind/${id}`);
};
export const warehousePostService = (data) => {
  return request.post("/warehouse", data);
};
export const inwarehousePostService = (data) => {
  return request.post("/inWarehouse", data);
};
export const outwarehousePostService = (data) => {
  return request.post("/outWarehouse", data);
};
export const billGetService = (params) => {
  return request.get("/getAllLedger", {
    params,
  });
};
export const billContionalGetService = (params) => {
  return request.get("/TodayLedger", { params });
};
export const billRevokeService = (data) => {
  return request.post("/cancel", data);
};
