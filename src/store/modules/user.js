import { getToken, setToken, removeToken, setTimeStamp } from "@/utils/auth";
import { loginAPI, getUserInfoAPI, getUserDetailByIdAPI } from "@/api/user";
import { resetRouter } from "@/router";
import store from "..";
export default {
  // 开启命名空间，作用域
  namespaced: true,
  state: {
    token: getToken(), // 从缓存获取初始token
    userInfo: {}, //不能设置null 因为null和undefined .属性是报错 而{}.对象是undefined
  },
  mutations: {
    // 更新token
    updateToken(state, token) {
      state.token = token; // 修改state里的token
      setToken(token); // 把本地缓存的token更新
      // 获取登录时候的时间戳
      setTimeStamp();
    },
    // 删除token
    clearToken(state) {
      state.token = null;
      removeToken();
    },
    // 设置用户信息
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    // 删除用户信息
    removeUserInfo(state) {
      state.userInfo = {}; // 是响应式的
    },
  },
  actions: {
    async login(ctx, data) {
      const result = await loginAPI(data);
      // 添加token
      ctx.commit("updateToken", result);
    },
    async getUserInfoAPI(ctx) {
      // 获取用户信息
      const result = await getUserInfoAPI();
      // 获取员工基本信息 用户头像从这里获取 传入用户id 所以要放获取用户信息后面
      const baseInfo = await getUserDetailByIdAPI(result.userId);
      ctx.commit("setUserInfo", { ...result, ...baseInfo }); // 把两个对象合并成一个
      return result; // 为后面权限埋下伏笔
    },
    // 退出登录
    logout(ctx) {
      ctx.commit("clearToken"); // 删除token
      ctx.commit("removeUserInfo"); // 删除用户信息
      resetRouter(); // 重置路由
      // 子模块调用子模块的action  默认情况下 子模块的context是当前子模块的
      // 第三个参数 {root:true} 调用根级的mutations和actions
      // ctx.commit("permission/setRoutes", [], { root: true });
      store.commit("permission/setRoutes", []); // 直接导入根级
    },
  },
};
