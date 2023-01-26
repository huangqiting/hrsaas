// 多语言实例化文件
import Vue from "vue";
import VueI18n from "vue-i18n"; // 引入国际化的包
import Cookie from "js-cookie"; // 引入cookie包
import elementEN from "element-ui/lib/locale/lang/en"; // 引入饿了么英文包
import elementZH from "element-ui/lib/locale/lang/zh-CN"; // 引入饿了么中文包
import elementJA from "element-ui/lib/locale/lang/ja"; // 引入饿了么日文包
import customZH from "./zh"; // 引入自定义中文包
import customEN from "./en";
Vue.use(VueI18n); // 全局注册
export default new VueI18n({
  locale: Cookie.get("language") || "zh", // 从Cookie获取语言 获取不到就是中文
  messages: {
    en: {
      ...elementEN, // 英文语言包
      ...customEN,
    },
    zh: {
      ...elementZH, // 中文语言包
      ...customZH,
    },
    ja: {
      ...elementJA, // 日文语言包
    },
  },
});
