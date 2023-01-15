// 该文件负责全局的自定义组件注册
import PageTools from "./PageTools";
export default {
  install(Vue) {
    Vue.component("PageTools", PageTools);
  },
};
