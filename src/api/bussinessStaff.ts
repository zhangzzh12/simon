import request from "@/utils/request";
export const bussinessStaffGetService = (params: object) => {
  return request.get("/emps", {
    params,
  });
};
export const bussinessStaffPostService = (data) => {
  return request.post("/emps", data);
};
export const bussinessStaffPutService = (data) => {
  return request.put("/emps", data);
};
export const bussinessStaffDeleteService = (ids) => {
  return request.delete(`/emps/${ids}`);
};
