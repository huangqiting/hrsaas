<template>
  <div class="dashboard-container">
    <div class="app-container">
      <h2>首页</h2>
      <ImageUpload />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["userName"]),
  },
};
</script>

<style scoped lang="scss"></style>
