<template>
  <div class="employees-container">
    <div class="app-container">
      <!-- 员工工具栏 -->
      <PageTools :showBefore="true">
        <template #before>
          <span>共{{ pageInfo.total }}条数据</span>
        </template>
        <template #after>
          <el-button
            type="success"
            size="small"
            @click="$router.push('/import')"
            >Excel导入</el-button
          >
          <el-button type="danger" size="small" @click="exportData"
            >Excel导出</el-button
          >
          <el-button type="primary" size="small" @click="showDialog = true"
            >新增员工</el-button
          >
        </template>
      </PageTools>
      <!-- 表格和分页 -->
      <el-table v-loading="loading" :data="list" border>
        el-table border>
        <el-table-column label="序号" align="center" sortable="" type="index" />
        <el-table-column
          label="姓名"
          align="center"
          sortable=""
          prop="username"
        />
        <el-table-column label="头像" align="center" width="120px">
          <template v-slot="{ row }">
            <img
              @click="showQrCode(row.staffPhoto)"
              :src="row.staffPhoto"
              v-imagerror="require('@/assets/common/bigUserHeader.png')"
              alt=""
              style="
                border-radius: 50%;
                width: 100px;
                height: 100px;
                padding: 10px;
              "
            />
          </template>
        </el-table-column>
        <el-table-column
          label="工号"
          sortable=""
          align="center"
          prop="workNumber"
        />
        <el-table-column
          align="center"
          :formatter="formatEmployment"
          label="聘用形式"
          sortable=""
          prop="formOfEmployment"
        />
        <el-table-column
          align="center"
          label="部门"
          sortable=""
          prop="departmentName"
        />
        <el-table-column
          align="center"
          label="入职时间"
          sortable=""
          prop="timeOfEntry"
        >
          <template v-slot="{ row }">
            <!-- 作用域插槽获取当前行的数据 用全局过滤器对时间进行处理 -->
            {{ row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="账户状态"
          sortable=""
          prop="enableState"
        >
          <template v-slot="{ row }">
            <!-- 根据状态来决定是否开关 -->
            <el-switch :value="row.enableState === 1"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          sortable=""
          fixed="right"
          width="280"
        >
          <template v-slot="{ row }">
            <el-button
              type="text"
              size="small"
              @click="$router.push(`/employees/detail/${row.id}`)"
              >查看</el-button
            >
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small" @click="editRole(row.id)"
              >角色</el-button
            >
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
    <!-- 头像二维码弹层 -->
    <el-dialog title="头像二维码" :visible.sync="showCodeDialog" width="30%">
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas"></canvas>
      </el-row>
    </el-dialog>
    <!-- 角色分配弹层 -->
    <AssignRole
      ref="assignRole"
      :userId="userId"
      :showRoleDialog.sync="showRoleDialog"
    />
  </div>
</template>

<script>
import { getEmployeeListAPI, delEmployeeAPI } from "@/api/employees";
import EmployeeEnum from "@/api/constant/employees";
import AddEmployee from "./components/add-employee.vue";
import { formatDate } from "@/filters";
import QrCode from "qrcode";
import AssignRole from "./components/assign-role.vue";
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
      showCodeDialog: false, //控制头像二维码弹层
      showRoleDialog: false, // 控制角色分配的弹层
      userId: null, // 当前用户的id
    };
  },
  created() {
    this.getEmployeeList();
  },
  methods: {
    // 点击角色 把当前员工的id传到子组件 并开启弹层
    async editRole(id) {
      this.userId = id;
      // 通过ref调用子组件的方法
      await this.$refs.assignRole.getUserDetailById(this.userId);
      this.showRoleDialog = true;
    },
    // 点击头像弹出二维码
    showQrCode(url) {
      // 有头像的情况下才弹层
      if (url) {
        // 数据更新了 页面渲染是异步的所以 拿不到ref
        this.showCodeDialog = true;
        // nextTick可以在页面渲染完毕之后执行
        this.$nextTick(() => {
          // 此时可以拿到ref
          // QrCode.toCanvas(dom, info) info是字符串
          QrCode.toCanvas(this.$refs.myCanvas, url);
        });
      } else {
        this.$message.warning("该用户还未上传头像");
      }
    },
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
    // 导出员工excel数据
    exportData() {
      // 把英文的键转换成中文的
      const headers = {
        姓名: "username",
        手机号: "mobile",
        入职日期: "timeOfEntry",
        聘用形式: "formOfEmployment",
        转正日期: "correctionTime",
        工号: "workNumber",
        部门: "departmentName",
      };
      // 懒加载
      import("@/vendor/Export2Excel").then(async (excel) => {
        // excel.export_json_to_excel({
        //   header: ["姓名", "工资"], // 数据表头 数组
        //   data: [
        //     ["张三", "3000"],
        //     ["李四", "4000"],
        //   ], // 导出具体的数据 数组[[],[]]
        //   filename: "员工工资表", // 导出文件名 默认excel-list
        //   autoWidth: "true", // 单元格是否自适应宽度 默认true
        //   bookType: "txt", // 导出文件类型 默认xlsx
        // });
        // 获取所有的员工信息
        const { rows } = await getEmployeeListAPI({
          page: 1,
          size: this.pageInfo.total,
        });
        // 处理完的二维数组
        const data = this.formatJson(headers, rows);
        // 复杂表头 是一个[[]]
        const multiHeader = [["姓名", "主要信息", "", "", "", "", "部门"]];
        // 需要合并的部分 []
        const merges = ["A1:A2", "B1:F1", "G1:G2"];
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: "员工资料表",
          multiHeader,
          merges,
        });
      });
    },
    // 该方法负责将数组转化成二维数组
    // 由于data需要的格式是[[]] 把[{}] => [[]]
    formatJson(headers, rows) {
      // 此时是 [[手机号,姓名,...],[手机号,姓名,...],...]
      return rows.map((item) => {
        //此时是[手机号,姓名,入职日期,...]
        return Object.keys(headers).map((key) => {
          // 判断是不是日期 处理日期
          if (
            headers[key] === "timeOfEntry" ||
            headers[key] === "correctionTime"
          ) {
            return formatDate(item[headers[key]]);
          } else if (headers[key] === "formOfEmployment") {
            // 把聘用形式的数字 用枚举 转换成正式和非正式
            const obj = EmployeeEnum.hireType.find(
              (item2) => item2.id === item[headers[key]]
            );
            return obj ? obj.value : "未知";
          }
          return item[headers[key]]; //手机号，手姓名，入职日期...
        });
      });
    },
  },
  components: {
    AddEmployee,
    AssignRole,
  },
};
</script>

<style></style>
