// 导出属于员工的路由规则
import Layout from "@/layout";
//  {  path: '', component: '' }
// 每个子模块 其实 都是外层是layout  组件位于layout的二级路由里面
export default {
  path: "/employees", // 路径
  name: "employees", // 给路由规则加一个name
  component: Layout, // 组件
  // 配置二级路的路由表
  children: [
    {
      // 不用写 这样代表即有Layout 还有员工管理
      path: "", // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
      component: () => import("@/views/employees"),
      // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
      meta: {
        icon: "people",
        title: "员工管理", // meta属性的里面的属性 随意定义 但是这里为什么要用title呢， 因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
      },
    },
  ],
};

// 当你的访问地址 是 /employees的时候 layout组件会显示 此时 你的二级路由的默认组件  也会显示
