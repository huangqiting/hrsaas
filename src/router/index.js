import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

/* Layout */
import Layout from "@/layout";
// 引入多个模块的规则
import approvalsRouter from "./modules/approvals";
import departmentsRouter from "./modules/departments";
import employeesRouter from "./modules/employees";
import permissionRouter from "./modules/permission";
import attendancesRouter from "./modules/attendances";
import salarysRouter from "./modules/salarys";
import settingRouter from "./modules/setting";
import socialRouter from "./modules/social";
import userRouter from "./modules/user";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
// 动态路由
export const asyncRoutes = [
  approvalsRouter,
  departmentsRouter,
  employeesRouter,
  permissionRouter,
  attendancesRouter,
  salarysRouter,
  settingRouter,
  socialRouter,
];
export const constantRoutes = [
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    name: "404",
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    name: "import",
    path: "/import",
    component: Layout,
    hidden: true, // 隐藏在左侧菜单中
    children: [
      {
        path: "", // 二级路由什么都不写，默认父级路由
        component: () => import("@/views/import"),
      },
    ],
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" },
      },
    ],
  },
  userRouter,

  // 404 page must be placed at the end !!!
  // { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    // 管理滚动行为 如果出现滚动 切换就让页面回到顶部
    scrollBehavior: () => ({ y: 0 }),
    // 路由规则 临时合并所有的路由
    // 在做权限路由 删除了合并
    routes: [...constantRoutes],
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// 重置路由
export function resetRouter() {
  const newRouter = createRouter();
  // 对router.matcher属性做修改，即新的routes就会替换老的routes
  router.matcher = newRouter.matcher; // reset router
}

export default router;
