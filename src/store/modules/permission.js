// vuex权限路由模块
import { constantRoutes, asyncRoutes } from "@/router"; // 导入静态路由页面
const state = {
  // 一开始所有人默认拥有静态路由
  routes: constantRoutes,
};
const getters = {};
const mutations = {
  // newRoutes可以认为是 用户登录 通过权限所得到的动态路由的部分
  setRoutes(state, newRouters) {
    // 不能这么写 下一个用户 不能在上一个用户的路由上添加路由
    // state.routes = [...state.routes, ...newRouters];
    // 这些写就每次都是静态路由 加用户当前拥有的权限路由
    state.routes = [...constantRoutes, ...newRouters];
  },
};
const actions = {
  // menus为用户所拥有的权限
  // asyncRoutes 是所有的动态路由
  filterRoutes(ctx, menus) {
    // 保存用户有权限的路由数组
    const routes = [];
    // 筛选出用户拥有权限的路由
    menus.forEach((key) => {
      // 每遍历一次就会返回一个数组 所以要解构添加到routes合并
      routes.push(...asyncRoutes.filter((item) => item.name === key));
    });
    // 把用户有访问权限的路由和静态路由合并
    ctx.commit("setRoutes", routes);
    // state数据 是用来 显示左侧菜单用的
    // return 是给路由addRoutes用的
    return routes;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
