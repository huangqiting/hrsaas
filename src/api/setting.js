import request from "@/utils/request";
// 获取角色列表
export const getRoleListAPI = (params) => {
  return request({
    url: "/sys/role",
    params,
  });
};
// 根据id查询企业信息
export const getCompanyInfoAPI = (companyId) => {
  return request({
    url: `/company/${companyId}`,
  });
};
// 根据角色id删除角色
export const deleteRoleAPI = (id) => {
  return request({
    method: "DELETE",
    url: `/sys/role/${id}`,
  });
};
// 根据id回去获取角色的详情
export const getRoleDetailAPI = (id) => {
  return request({
    url: `/sys/role/${id}`,
  });
};
// 根据角色id修改角色
export const updateRoleAPI = (data) => {
  return request({
    method: "PUT",
    url: `/sys/role/${data.id}`,
    data,
  });
};
// 添加角色
export const addRoleAPI = (data) => {
  return request({
    method: "POST",
    url: `/sys/role`,
    data,
  });
};
