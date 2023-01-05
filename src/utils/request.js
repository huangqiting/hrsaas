import Axios from "axios";
import { Message } from "element-ui";
const service = Axios.create({
  // 当执行yarn dev => .env.development => /api => 跨域代理
  // 当执行yarn build => .env.production => /prod-api
  baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础地址
  timeout: 5000, // 定义5秒超时
});
service.interceptors.request.use();
// 响应拦截器
service.interceptors.response.use(
  // 成功回调
  (response) => {
    // axios默认加了一层data
    const { message, success, data } = response.data;
    if (success) {
      return data;
    } else {
      // 业务错了进catch
      Message.error(message); // 提示错误信息
      return Promise.reject(new Error(message));
    }
  },
  // 失败回调
  (err) => {
    Message.error(err.message);
    return Promise.reject(err); // 返回错误的promise 进catch
  }
);
export default service;
