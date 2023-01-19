export const imagerror = {
  // inserted钩子函数 当前dom元素插入页面上时触发 只会执行一次
  // dom是加入v-语法的dom对象
  // options 是指令中的变量信息 其中有一个属性就是value
  inserted(dom, options) {
    // 如果原来的图片路径为false 取变量值
    dom.src = dom.src || options.value;
    // 图片的onerror 当图片有地址 未加载成功 报错时触发的事件
    dom.onerror = () => {
      // 当图片出现异常时 会将指令配置的默认图片设置为该图片的内容
      dom.src = options.value; // 这里不能写死
    };
  },
  // 该钩子函数会在当前指令作用的组件 更新数据后执行
  // 一旦更新就不会执行inserted函数 会进componentUpdated
  componentUpdated(dom, options) {
    dom.src = dom.src || options.value;
  },
};
