import { getToken, setToken, removeToken } from "@/utils/auth";
import { login } from "@/api/user";
export default {
  // 开启命名空间，作用域
  namespaced: true,
  state: {
    token: getToken(), // 从缓存获取初始token
  },
  mutations: {
    // 更新token
    setToken(state, token) {
      state.token = token; // 修改state里的token
      setToken(token); // 把本地缓存的token更新
    },
    // 删除token
    removeToken(state) {
      state.token = null;
      removeToken();
    },
  },
  actions: {
    async login(ctx, data) {
      const result = await login(data);
      // 添加token
      ctx.commit("setToken", result);
    },
  },
};
