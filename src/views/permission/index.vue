<template>
  <div class="permission-container">
    <div class="app-container">
      <PageTools>
        <template #after>
          <el-button type="primary" size="small" @click="addPermission(1, '0')"
            >新增权限</el-button
          >
        </template>
      </PageTools>
      <el-table row-key="id" :data="list" border stripe>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column
          label="标识"
          align="center"
          prop="code"
        ></el-table-column>
        <el-table-column
          label="描述"
          align="center"
          prop="description"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="{ row }">
            <!-- 只有两级 第二级不应该添加节点 一级节点的type为1 二级节点为2 -->
            <el-button
              v-if="row.type === 1"
              type="text"
              @click="addPermission(2, row.id)"
              >添加</el-button
            >
            <el-button type="text" @click="editPermission(row.id)"
              >编辑</el-button
            >
            <el-button type="text" @click="delPermission(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增编辑权限的弹层 -->
    <el-dialog :title="showText" :visible="showDialog" @close="btnCancel">
      <el-form
        :model="formData"
        ref="perForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width: 90%"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width: 90%"></el-input>
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input
            v-model="formData.description"
            style="width: 90%"
          ></el-input>
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            active-value="1"
            inactive-value="0"
            v-model="formData.enVisible"
            style="width: 90%"
          ></el-switch>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-row :gutter="20" type="flex" justify="center">
          <el-button @click="btnCancel">取消</el-button>
          <el-button type="primary" @click="btnSubmit">确定</el-button>
        </el-row>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPermissionListAPI,
  addPermissionAPI,
  updatePermissionAPI,
  delPermissionAPI,
  getPermissionDetailAPI,
} from "@/api/permisson";
import { tranListToTreeData } from "@/utils";
export default {
  name: "Permission",
  data() {
    return {
      list: [], // 用来存放权限列表
      // 新增编辑权限表单的数据
      formData: {
        name: "", // 名称
        code: "", // 标识
        description: "", // 描述
        type: "", // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: "", // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: "0", // 0关闭 1开启
      },
      // 新增编辑权限表单的校验
      rules: {
        name: [
          {
            required: true,
            trigger: "blur",
            message: "权限名称不能为空",
          },
        ],
        code: [
          {
            required: true,
            trigger: "blur",
            message: "权限标识不能为空",
          },
        ],
      },
      // 控制新增编辑弹层
      showDialog: false,
    };
  },
  computed: {
    // 动态控制弹层标题
    showText() {
      return this.formData.id ? "编辑权限" : "新增权限";
    },
  },
  created() {
    this.getPermissionList();
  },
  methods: {
    // 获取权限列表
    async getPermissionList() {
      // 把权限列表转成树形结构
      this.list = tranListToTreeData(await getPermissionListAPI(), "0");
    },

    // 根据id删除该权限
    async delPermission(id) {
      // 提醒用户是否删除 防止误删
      // 默认会返回一个Promise对象
      try {
        await this.$confirm("您确定要删除吗");
        await delPermissionAPI(id);
        this.$message.success("删除成功");
        // 重新获取权限列表
        this.getPermissionList();
      } catch (error) {
        console.log(error);
      }
    },
    // 点击新增弹层 以传值方式判断是一级节点还是二级节点 以及在那个下面添加节点
    // type为1 是一级 为2是二级
    addPermission(type, pid) {
      this.formData.type = type;
      this.formData.pid = pid;
      this.showDialog = true;
    },
    // 点击编辑 数据回显 显示弹层
    async editPermission(id) {
      // 获取该权限的详细信息
      this.formData = await getPermissionDetailAPI(id);
      this.showDialog = true;
    },
    // 新增编辑权限
    async btnSubmit() {
      // 编辑情况下有id
      if (this.formData.id) {
        await updatePermissionAPI(this.formData);
      } else {
        await addPermissionAPI(this.formData);
      }
      this.$message.success(this.formData.id ? "修改成功" : "添加成功");
      this.getPermissionList();
      this.showDialog = false;
    },
    // 重置表单数据 关闭弹层
    btnCancel() {
      this.formData = {
        name: "",
        code: "",
        description: "",
        type: "",
        pid: "",
        enVisible: "0",
      };
      // 清除表单校验
      this.$refs.perForm.resetFields();
      this.showDialog = false;
    },
  },
};
</script>

<style></style>
