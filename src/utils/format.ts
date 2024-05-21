import { dayjs } from "element-plus";
export const formatTime = (time) => {
  return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
};
export const format = (time) => {
  return dayjs(time).format("YYYY-MM-DDTHH:mm:ss");
};
