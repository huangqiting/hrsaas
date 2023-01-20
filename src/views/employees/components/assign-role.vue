<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="btnCancel">
    <!-- el-checkbox-group 选中的是 当前用户所拥有的角色  需要绑定 当前用户拥有的角色 -->
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item of list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>

    <el-row slot="footer" type="flex" justify="center">
      <el-button @click="btnCancel">取消</el-button>
      <el-button type="primary" @click="btnSubmit">确定</el-button>
    </el-row>
  </el-dialog>
</template>
<script>
import { getRoleListAPI } from "@/api/setting";
import { getUserDetailByIdAPI } from "@/api/user";
import { assignRolesAPI } from "@/api/employees";
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
      required: true,
      default: null,
    },
  },
  data() {
    return {
      list: [], // 保存角色列表\
      roleIds: [], // 存用户勾选的角色
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      // 角色不会太多 所以这里可以写死
      const { rows } = await getRoleListAPI({ page: 1, pagesize: 20 });
      this.list = rows;
    },
    // 获取当前员工有哪些角色
    // props传参是异步的 所以这里拿到的userId为null
    async getUserDetailById(id) {
      // roleIds员工角色id数组
      const { roleIds } = await getUserDetailByIdAPI(id);
      this.roleIds = roleIds;
    },
    // 给员工分配角色
    async btnSubmit() {
      await assignRolesAPI({ id: this.userId, roleIds: this.roleIds });
      this.$message.success("操作成功！");
      this.$emit("update:showRoleDialog", false);
    },
    // 关闭弹层
    btnCancel() {
      this.roleIds = []; //清空原来的数组
      // $parent获得父组件的实例
      this.$parent.showRoleDialog = false;
    },
  },
};
</script>
<style></style>
