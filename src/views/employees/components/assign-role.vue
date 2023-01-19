<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="">
    <!-- el-checkbox-group 选中的是 当前用户所拥有的角色  需要绑定 当前用户拥有的角色 -->

    <el-checkbox-group></el-checkbox-group>

    <el-row slot="footer" type="flex" justify="center">
      <el-button @click="">取消</el-button>
      <el-button type="primary" @click="">确定</el-button>
    </el-row>
  </el-dialog>
</template>
<script>
export default {
  name: "AssignRole",
  props: {
    // 控制弹层
    showRoleDialog: {
      type: Boolean,
      default: false,
    },
    // 点击员工的id
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
<style></style>
