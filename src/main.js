import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en"; // lang i18n
import Component from "@/components";
import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";
import checkPermission from "@/mixin/checkPermission";
import "@/icons"; // icon
import "@/permission"; // permission control
// 把导出的全放directives对象里面
import * as directives from "@/directives"; // 自定义指令
// Object.keys()返回一个数组 把对象转为数组 数组的值为对象的key
Object.keys(directives).forEach((key) => {
  // 遍历这个数组统一注册自定义指令
  Vue.directive(key, directives[key]);
});
// 注册所有的过滤器
import * as filters from "@/filters";
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// 判断当前运行环境
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale });
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
// 全局注册组件
Vue.use(Component);
// 注册一个全局的权限按钮混入
Vue.mixin(checkPermission);
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
