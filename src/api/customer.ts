import request from "@/utils/request";
export const customerGetService = (params: object) => {
  return request.get("/customers", {
    params,
  });
};
