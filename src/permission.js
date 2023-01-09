import router from "./router";
import store from "./store";
import NProgress from "nprogress"; // 引入一份进度条插件
import "nprogress/nprogress.css"; // 引入进度条样式
const whiteList = ["/login", "/404"]; // 定义白名单 不受token影响
// 路由的前置守位
// to代表要跳转的信息 from代表从哪里来的信息 next代表是否放行 以及加上路径就跳转
router.beforeEach(async (to, from, next) => {
  NProgress.start(); // 开启进度条
  // 判断是否有token
  if (store.getters.token) {
    // 有token的情况下 如果要去登录页 则跳转首页 否则直接放行
    if (to.path === "/login") {
      next("/");
    } else {
      // 获取用户信息
      // 为了避免每次放行都获取用户信息
      // 如果用户信息里没有用户名 则获取用户信息
      if (!store.getters.userName) {
        // 由于获取用户信息是异步的 会导致没获取到信息就直接放行
        // 所以要等获取完用户信息 再放行
        await store.dispatch("user/getUserInfoAPI");
      }
      next();
    }
    // 没token的情况下
  } else {
    // 判断要跳转的路径是否在白名单 如果在白名单则放行 否则直接跳转登录页
    // indexOf(to.path) 判断数组里面是否有这个值 如果有则返回符合条件的单第一个索引 否则返回-1
    if (whiteList.indexOf(to.path) > -1) {
      next();
    } else {
      next("/login");
    }
  }
  NProgress.done(); //手动关闭一次 解决手动切换地址时 进度条不关闭的问题
});
// 路由后置守卫
router.afterEach(() => NProgress.done()); // 关闭进度条
