import store from "@/store";
// 混入对象
export default {
  methods: {
    // 判断用户有没有按钮的使用权限 key是对应的按钮描述
    checkPermission(key) {
      const { userInfo } = store.state.user;
      // 如果用户有按钮权限则返回true
      if (userInfo.roles?.points) {
        return userInfo.roles.points.some((item) => item === key);
      }
      return false;
    },
  },
};
