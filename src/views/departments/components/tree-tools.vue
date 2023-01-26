<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <el-col>
      <span
        ><i
          :class="isRoot ? 'el-icon-office-building' : 'el-icon-s-custom'"
        />&nbsp;&nbsp;{{ treeNode.name }}</span
      >
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 -->
          <el-dropdown @command="operateDepts" trigger="hover">
            <span>操作<i class="el-icon-caret-bottom" /></span>
            <!-- 具名插槽 -->
            <el-dropdown-menu slot="dropdown">
              <!-- 下拉菜单内容 -->
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item command="edit" v-if="!isRoot"
                >编辑子部门</el-dropdown-item
              >
              <el-dropdown-item command="del" v-if="!isRoot"
                >删除子部门</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import { delDepartmentsAPI } from "@/api/departments";
export default {
  name: "TreeTools",
  props: {
    // 接收作用域插槽传过来的值
    treeNode: {
      required: true, // 必传属性
      type: Object, // 传过来的值必须为对象
    },
    // 接收传过来的是否是根节点
    isRoot: {
      type: Boolean,
      default: false, // 默认不是根节点
    },
  },
  methods: {
    // 添加，编辑，删除部门
    async operateDepts(command) {
      if (command === "add") {
        // 添加部门
        // 把当前部门信息传过去
        this.$emit("addDepts", this.treeNode);
      } else if (command === "edit") {
        // 编辑部门
        this.$emit("editDepts", this.treeNode);
      } else {
        // 删除部门
        // this.$confirm("您确定要删除该部门吗")
        //   .then(() => {
        //     return delDepartments(this.treeNode.id);
        //   })
        //   .then(() => {
        //     this.$emit("delDepts");
        //     this.$message.success("删除成功");
        //   });
        await this.$confirm("您确定要删除该部门吗"); //弹出是否删除提示框 返回是一个promise
        await delDepartmentsAPI(this.treeNode.id); // 调用接口删除部门
        this.$emit("delDepts"); // 子传父通知父组件 重新获取部门列表
        this.$message.success("删除成功"); // 删除成功后提示用户
      }
    },
  },
};
</script>
<style></style>
