<template>
  <!--放置一个图标 -->
  <div>
    <!-- 放置一个svg的图标 -->
    <svg-icon
      icon-class="fullscreen"
      style="color: #fff; width: 20px; height: 20px"
      @click="changeScreen"
    />
  </div>
</template>
<script>
export default {
  name: "ScreenFull",
  data() {
    return {
      flag: true,
    };
  },
  methods: {
    //   改变全屏
    changeScreen() {
      if (this.flag) {
        this.flag = false;
        document.documentElement.requestFullscreen(); // 打开全屏
      } else {
        this.flag = true;
        document.exitFullscreen(); // 关闭全屏
      }
    },
  },
};
</script>
<style></style>
