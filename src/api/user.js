import request from "@/utils/request";
// 登录接口
export function login(data) {
  return request({
    method: "POST",
    url: "/sys/login", // 设置跨域了，不用加api
    data,
  });
}

export function getInfo() {}

export function logout() {}
