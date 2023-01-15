import request from "@/utils/request";
// 获取部门负责人
export const getEmployeeSimpleAPI = () => {
  return request({
    url: "/sys/user/simple",
  });
};
// 获取员工列表
export const getEmployeeListAPI = (params) => {
  return request({
    url: "/sys/user",
    params,
  });
};
// 根据id删除员工
export const delEmployeeAPI = (id) => {
  return request({
    method: "DELETE",
    url: `/sys/user/${id}`,
  });
};
// 添加员工
export const addEmployeeAPI = (data) => {
  return request({
    method: "POST",
    url: "/sys/user",
    data,
  });
};
