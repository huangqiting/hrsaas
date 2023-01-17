// 该文件负责全局的自定义组件注册
import PageTools from "./PageTools";
import UploadExcel from "./UploadExcel";
export default {
  install(Vue) {
    Vue.component("PageTools", PageTools);
    Vue.component("UploadExcel", UploadExcel);
  },
};
