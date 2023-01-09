import request from "@/utils/request";
// 登录接口
export function loginAPI(data) {
  return request({
    method: "POST",
    url: "/sys/login", // 设置跨域了，不用加api
    data,
  });
}
// 获取用户信息接口
export function getUserInfoAPI() {
  return request({
    method: "POST",
    url: "/sys/profile",
  });
}
// 获取用户详情信息接口
export const getUserDetailByIdAPI = (id) => {
  return request({
    // 不写请求类型默认get请求
    url: `/sys/user/${id}`,
  });
};
export function logout() {}
