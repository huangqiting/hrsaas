import request from "@/utils/request";
// 获取部门列表
export const getDepartmentsAPI = () => {
  return request({
    url: "/company/department",
  });
};
// 删除部门
export const delDepartmentsAPI = (id) => {
  return request({
    method: "DELETE",
    url: `/company/department/${id}`,
  });
};
// 新增部门
export const addDepartmentsAPI = (data) => {
  return request({
    method: "POST",
    url: "/company/department",
    data,
  });
};
// 获取部门详情
export const getDepartDetailAPI = (id) => {
  return request({
    url: `/company/department/${id}`,
  });
};
// 编辑部门
export const updateDepartmentsAPI = (data) => {
  return request({
    method: "PUT",
    url: `/company/department/${data.id}`,
    data,
  });
};
