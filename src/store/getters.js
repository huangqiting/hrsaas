const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token, // 建立token快捷访问
  userName: (state) => state.user.userInfo.username, // 建立用户名的快捷访问
  staffPhoto: (state) => state.user.userInfo.staffPhoto, // 建立用户头像的快捷访问
};
export default getters;
