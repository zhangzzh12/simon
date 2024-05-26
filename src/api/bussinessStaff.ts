import request from "@/utils/request";
export const bussinessStaffGetService = (params: object) => {
  return request.get("/emps", {
    params,
  });
};
export const bussinessStaffPostService = (data: any) => {
  return request.post("/emps", data);
};
export const bussinessStaffPutService = (data: any) => {
  return request.put("/emps", data);
};
export const bussinessStaffDeleteService = (ids: any) => {
  return request.delete(`/emps/${ids}`);
};
