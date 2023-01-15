<template>
  <el-card class="page-tools">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col>
        <div v-if="showBefore" class="before">
          <i class="el-icon-info" />
          <!-- 定义前面的插槽 -->
          <slot name="before"> </slot>
        </div>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <!-- 后面的插槽 -->
          <slot name="after"> </slot>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
export default {
  name: "PageTools",
  props: {
    // 控制Before是否显示
    showBefore: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss">
.page-tools {
  margin: 10px 0;
  .before {
    line-height: 34px;
    i {
      margin-right: 5px;
      color: #409eff;
    }
    display: inline-block;
    padding: 0px 10px;
    border-radius: 3px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);
  }
}
</style>
