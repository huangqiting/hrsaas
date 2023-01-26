// 该文件负责全局的自定义组件注册
import PageTools from "./PageTools";
import UploadExcel from "./UploadExcel";
import ImageUpload from "./ImageUpload";
import ScreenFull from "./ScreenFull";
import ThemePicker from "./ThemePicker";
import TagsView from "./TagsView";
import lang from "./lang";
import Print from "vue-print-nb";
export default {
  install(Vue) {
    Vue.component("PageTools", PageTools); // 注册工具栏
    Vue.component("UploadExcel", UploadExcel); // 注册导入excel组件
    Vue.component("ImageUpload", ImageUpload); // 注册导入上传组件
    Vue.component("ScreenFull", ScreenFull); // 注册导入上传组件
    Vue.component("ThemePicker", ThemePicker); // 自定义主题色组件
    Vue.component("lang", lang); // 切换语言组件
    Vue.component("TagsView", TagsView); // tab页组件
    Vue.use(Print); // 注册打印组件
  },
};
