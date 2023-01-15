<template>
  <div class="employees-container">
    <div class="app-container">
      <!-- 员工工具栏 -->
      <PageTools :showBefore="true">
        <template #before>
          <span>共{{ pageInfo.total }}条数据</span>
        </template>
        <template #after>
          <el-button type="success" size="small">Excel导入</el-button>
          <el-button type="danger" size="small">Excel导出</el-button>
          <el-button type="primary" size="small" @click="showDialog = true"
            >新增员工</el-button
          >
        </template>
      </PageTools>
      <!-- 表格和分页 -->
      <el-table v-loading="loading" :data="list" border>
        el-table border>
        <el-table-column label="序号" sortable="" type="index" />
        <el-table-column label="姓名" sortable="" prop="username" />
        <el-table-column label="工号" sortable="" prop="workNumber" />
        <el-table-column
          :formatter="formatEmployment"
          label="聘用形式"
          sortable=""
          prop="formOfEmployment"
        />
        <el-table-column label="部门" sortable="" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
          <template v-slot="{ row }">
            <!-- 作用域插槽获取当前行的数据 用全局过滤器对时间进行处理 -->
            {{ row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="账户状态" sortable="" prop="enableState">
          <template v-slot="{ row }">
            <!-- 根据状态来决定是否开关 -->
            <el-switch :value="row.enableState === 1"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" sortable="" fixed="right" width="280">
          <template v-slot="{ row }">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="deleteEmployee(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="center" align="middle" style="height: 60px">
        <el-pagination
          :page-size="pageInfo.size"
          :total="pageInfo.total"
          :current-page="pageInfo.page"
          @current-change="changePage"
          layout=" prev, pager, next"
        ></el-pagination>
      </el-row>
    </div>
    <!-- 放置添加员工弹层 -->
    <AddEmployee :showDialog.sync="showDialog" />
  </div>
</template>

<script>
import { getEmployeeListAPI, delEmployeeAPI } from "@/api/employees";
import EmployeeEnum from "@/api/constant/employees";
import AddEmployee from "./components/add-employee.vue";
export default {
  name: "Employees",
  data() {
    return {
      loading: false, // 控制转圈圈
      list: [], // 保存员工列表
      pageInfo: {
        page: 1, // 当前页数
        size: 10, // 当前显示多少条
        total: 0, // 总条数
      },
      showDialog: false, // 控制添加员工弹层
    };
  },
  created() {
    this.getEmployeeList();
  },
  methods: {
    // 获取员工列表
    async getEmployeeList() {
      // 开启转圈圈
      this.loading = true;
      const { rows, total } = await getEmployeeListAPI(this.pageInfo);
      this.list = rows;
      this.pageInfo.total = total;
      this.loading = false;
    },
    // 切换分页重新获取员工 newPage就是最新点击页
    changePage(newPage) {
      this.pageInfo.page = newPage;
      this.getEmployeeList();
    },
    // 转换聘用形式数据格式
    formatEmployment(row, column, cellValue, index) {
      // cellValue就是当前列的数据
      // 筛选出枚举 与枚举id相同的那个对象
      const obj = EmployeeEnum.hireType.find(
        (item) => item.id === row.formOfEmployment
      );
      return obj ? obj.value : "未知";
    },
    // 根据id删除员工
    async deleteEmployee(id) {
      try {
        await this.$confirm("您确定要删除该员工吗", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        });
        await delEmployeeAPI(id);
        this.$message.success("删除成功");
        // 删除后重新获取员工列表
        this.getEmployeeList();
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    AddEmployee,
  },
};
</script>

<style></style>
