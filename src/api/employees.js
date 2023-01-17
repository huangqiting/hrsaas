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
// 导入员工
export const importEmployeeAPI = (data) => {
  return request({
    method: "POST",
    url: "/sys/user/batch",
    data,
  });
};
// 修改员工基本信息
export const saveUserDetailByIdAPI = (data) => {
  return request({
    method: "PUT",
    url: `/sys/user/${data.id}`,
    data,
  });
};
/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetailAPI(id) {
  return request({
    url: `/employees/${id}/personalInfo`,
  });
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonalAPI(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: "PUT",
    data,
  });
}

/** **
 * 获取用户的岗位信息
 *
 * ****/
export function getJobDetailAPI(id) {
  return request({
    url: `/employees/${id}/jobs`,
  });
}

/**
 * 保存岗位信息
 * ****/
export function updateJobAPI(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: "put",
    data,
  });
}
