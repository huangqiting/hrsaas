<template>
  <div class="dashboard-container">
    <div class="dashboard-text">首页: {{ userName }}</div>
    <PageTools :showBefore="true">
      <template #before>
        <span>哈哈哈</span>
      </template>
      <template #after>
        <el-button type="primary" size="default">确定</el-button>
      </template>
    </PageTools>
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

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
