<template>
  <div class="setting-container">
    <div class="app-container">
      <el-card>
        <el-tabs value="first">
          <!-- 放置标签页 -->
          <el-tab-pane label="角色管理" name="first">
            <!-- 新增角色按钮 -->
            <el-row :gutter="20" style="height: 50px">
              <el-button type="primary" size="small" @click="showDialog = true"
                >新增角色</el-button
              >
            </el-row>
            <!-- 表格 :data="list" 绑定数组 -->
            <el-table :data="list" border style="width: 100%">
              <!-- type="index"索引从1开始 -->
              <el-table-column
                align="center"
                type="index"
                label="序号"
                width="120"
              >
              </el-table-column>
              <!-- 
                当el-table元素中注入data对象数组后，
                在el-table-column中用prop属性来对应对象中的键名即可填入数据
               -->
              <el-table-column
                align="center"
                prop="name"
                label="角色名称"
                width="240"
              >
              </el-table-column>
              <el-table-column align="center" prop="description" label="描述">
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template v-slot="{ row }">
                  <el-button type="success" size="small">分配权限</el-button>
                  <el-button
                    type="primary"
                    size="small"
                    @click="editRole(row.id)"
                    >编辑</el-button
                  >
                  <el-button
                    type="danger"
                    size="small"
                    @click="deleteRole(row.id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 50px"
            >
              <el-pagination
                @current-change="changePage"
                layout="prev, pager, next"
                :total="pageInfo.total"
              >
              </el-pagination>
            </el-row>
          </el-tab-pane>
          <!-- 标签页 -->
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              effect="light"
              show-icon
              :closable="false"
            ></el-alert>
            <el-form label-width="120px" style="margin-top: 30px">
              <el-form-item label="公司名称">
                <el-input
                  v-model="companyInfo.name"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  v-model="companyInfo.companyAddress"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="公司邮箱">
                <el-input
                  v-model="companyInfo.mailbox"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="companyInfo.remarks"
                  disabled
                  type="textarea"
                  :rows="3"
                  style="width: 400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 编辑和新增的弹层 -->
    <el-dialog
      :title="roleForm.id ? '编辑角色' : '新增角色'"
      :visible="showDialog"
      @close="btnCancel"
      :close-on-click-modal="false"
    >
      <el-form
        :model="roleForm"
        ref="formRef"
        :rules="rulesForm"
        label-width="80px"
        size="normal"
      >
        <el-form-item prop="name" label="角色名称">
          <el-input maxlength="8" v-model="roleForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="description" label="描述">
          <el-input
            description
            type="textarea"
            maxlength="100"
            show-word-limit
            v-model="roleForm.description"
          ></el-input>
        </el-form-item>
        <el-row type="flex" justify="center">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button size="small" type="primary" @click="submitRole"
            >确定</el-button
          >
        </el-row>
      </el-form>
    </el-dialog>
    <el-form></el-form>
  </div>
</template>

<script>
import {
  getRoleListAPI,
  getCompanyInfoAPI,
  deleteRoleAPI,
  getRoleDetailAPI,
  updateRoleAPI,
  addRoleAPI,
} from "@/api/setting";
export default {
  name: "Setting",
  data() {
    return {
      // 存放角色列表
      list: [],
      // 放置页面及相关数据
      pageInfo: {
        page: 1,
        pagesize: 10,
        // 记录总数
        total: 0,
      },
      // 存放公司信息
      companyInfo: {},
      // 控制新增和编辑弹层
      showDialog: false,
      // 绑定表单数据
      roleForm: {
        name: "",
        description: "", // 角色描述
      },
      // 表单校验
      rulesForm: {
        name: [
          {
            required: true,
            message: "角色名称不能为空",
            trigger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "描述不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getRoleList();
    this.getCompanyInfo();
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      // total总数 rows角色列表
      const { total, rows } = await getRoleListAPI(this.pageInfo);
      this.pageInfo.total = total;
      this.list = rows;
    },
    // 切换页数 newPage是当前点击的页面
    changePage(newPage) {
      // 把最新页数重新赋值 调用接口
      this.pageInfo.page = newPage;
      this.getRoleList();
    },
    // 根据id获取公司信息
    async getCompanyInfo() {
      this.companyInfo = await getCompanyInfoAPI(this.$store.getters.companyId);
    },
    // 根据角色id删除角色
    async deleteRole(id) {
      // 返回一个promise 确定进成功 取消进失败
      await this.$confirm("您确定要删除该角色吗", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      });
      // 调用删除接口
      await deleteRoleAPI(id);
      // 提示用户
      this.$message.success("删除成功");
      this.getRoleList();
    },
    // 根据id获取角色详情
    async editRole(id) {
      this.roleForm = await getRoleDetailAPI(id);
      // 打开弹层
      this.showDialog = true;
    },
    // 根据id修改角色
    async submitRole() {
      await this.$refs.formRef.validate();
      if (this.roleForm.id) {
        // 编辑角色
        await updateRoleAPI(this.roleForm);
      } else {
        // 添加角色
        await addRoleAPI(this.roleForm);
      }
      // 这里可以不用清除表单 因为在弹层上面绑定了close事件 弹层关闭会调用这个事件
      this.showDialog = false;
      this.$message.success(this.roleForm.id ? "修改成功" : "添加成功");
      // 修改过后 重新调用接口 获取最新的角色列表
      this.getRoleList();
    },
    // 关闭弹层 清除表单
    btnCancel() {
      this.roleForm = {
        name: "",
        description: "",
      };
      // 重置表单
      this.$refs.formRef.resetFields();
      // 关闭弹层
      this.showDialog = false;
    },
  },
};
</script>

<style></style>
