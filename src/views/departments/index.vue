<template>
  <div class="departments-container">
    <div class="app-container">
      <!-- 卡片组件 -->
      <el-card v-loading="loading" class="tree-card">
        <!-- 调用组件 -->
        <TreeTools :treeNode="company" :isRoot="true" @addDepts="onAddDepts" />
        <!-- 这个props和父传子没有关系 -->
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <!-- 传入内容  插槽内容 会循环多次 有多少节点 就循环多少次 -->
          <!-- 作用域插槽  slot-scope="obj" 可以解构 接收传递给插槽的数据-->
          <template v-slot="{ data }">
            <TreeTools
              :treeNode="data"
              @delDepts="getDepartments"
              @addDepts="onAddDepts"
              @editDepts="onEditDepts"
            />
          </template>
        </el-tree>
      </el-card>
      <AddDept
        :treeNode="node"
        @addDepts="getDepartments"
        :showDialog.sync="isShowDialog"
        ref="AddDeptRef"
      />
    </div>
  </div>
</template>

<script>
import TreeTools from "./components/tree-tools";
import AddDept from "./components/add-dept.vue";
import { getDepartmentsAPI } from "@/api/departments";
import { tranListToTreeData } from "@/utils/index";
export default {
  name: "Departments",
  data() {
    return {
      // 树形结构的数据
      departs: [],
      // 为树形结构的数据起别名
      defaultProps: {
        label: "name",
      },
      // 根节点的数据
      company: {},
      // 控制添加部门弹层
      isShowDialog: false,
      // 保存点击的部门信息
      node: null,
      // 用来控制
      loading: false,
    };
  },
  components: {
    TreeTools,
    AddDept,
  },
  created() {
    this.getDepartments();
  },
  methods: {
    // 获取部门列表
    async getDepartments() {
      // 开启转圈圈
      this.loading = true;
      const result = await getDepartmentsAPI();
      // 为了添加部门的重复校验 id: "" 手动赋值一个空id 变成树形结构的根节点
      this.company = { name: result.companyName, manager: "负责人", id: "" };
      // 需要转换成树形结构
      // this.departs = result.depts;
      this.departs = tranListToTreeData(result.depts, "");
      // 关闭转圈圈
      this.loading = false;
    },
    // 添加部门
    onAddDepts(node) {
      // 显示弹层
      this.isShowDialog = true;
      // 保存部门信息
      this.node = node;
    },
    // 编辑部门
    async onEditDepts(node) {
      // 保存部门信息
      this.node = node;
      // // 在这里调用获取部门详情的方法
      // await this.$refs.AddDeptRef.getDepartDetail(node.id);
      // 由于node是同一个地址 如果修改formDate 会影响到node 这里可以用一个简单的浅拷贝
      this.$refs.AddDeptRef.formDate = { ...node };
      // 显示弹层
      this.isShowDialog = true;
    },
  },
};
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
