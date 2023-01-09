import Axios from "axios";
import store from "@/store";
import { Message } from "element-ui";
import router from "@/router";
import { getTimeStamp } from "@/utils/auth";
const TimeOut = 3600; // 超时时间
// 超时逻辑 当前事件 - 缓存中的事件 是否大于token有效时间一小时
const IsCheckTimeOut = () => (Date.now() - getTimeStamp()) / 1000 > TimeOut;
const service = Axios.create({
  // 当执行yarn dev => .env.development => /api => 跨域代理
  // 当执行yarn build => .env.production => /prod-api
  baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础地址
  timeout: 5000, // 定义5秒超时
});
// 请求拦截器
service.interceptors.request.use(
  // config就是请求的对象
  (config) => {
    // 判断有无token
    if (store.getters.token) {
      // token过期的主动介入处理
      if (IsCheckTimeOut()) {
        // token过期 跳到登录页 做退出登录操作
        // 必须先删token 再跳转页面 否则会=还是会token过期
        store.dispatch("user/logout");
        router.push("/login");
        // 把错误信息返回出去
        return Promise.reject(new Error("token已过期"));
      }
      // 设置token请求头
      config.headers.Authorization = `Bearer ${store.getters.token}`;
    }
    // 必须返回出去否则无法进行下一步
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
// 响应拦截器 当状态为2xx 的时候才进入成功回调
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
    // token过期的被动介入处理
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 10002
    ) {
      store.dispatch("user/logout");
      router.push("/login");
    } else {
      Message.error(err.message);
    }
    return Promise.reject(err); // 返回错误的promise 进catch
  }
);
export default service;
