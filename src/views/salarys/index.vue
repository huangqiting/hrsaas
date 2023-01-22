<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 工具栏 -->
      <page-tools :show-before="true">
        <!-- 前面内容 -->
        <template v-slot:before>{{ tipsInfo }}</template>
        <template v-slot:after>
          <el-button
            size="mini"
            type="danger"
            @click="$router.push('/salarys/setting')"
            >设置</el-button
          >
          <el-button
            size="mini"
            type="primary"
            @click="
              $router.push(`/salarys/monthStatement?yearMonth=${yearMonth}`)
            "
            >{{ yearMonth }}报表</el-button
          >
        </template>
      </page-tools>
      <!-- 条件筛选 -->
      <el-card class="hr-block">
        <el-form label-width="120px">
          <el-form-item label="聘用形式:">
            <el-checkbox-group v-model="formData.approvalsTypeChecks">
              <el-checkbox
                v-for="item in approvalsType"
                :key="item.id"
                :label="item.id"
                @change="changeParams"
                >{{ item.value }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="员工状态:">
            <el-checkbox-group v-model="formData.approvalsStateChecks">
              <el-checkbox
                v-for="item in approvalsState"
                :key="item.id"
                :label="item.id"
                @change="changeParams"
                >{{ item.value }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="部门:">
            <el-checkbox-group v-model="formData.departmentChecks">
              <el-checkbox
                v-for="item in departments"
                :key="item.id"
                :label="item.id"
                @change="changeParams"
                >{{ item.name }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="hr-block">
        <el-table :data="list" style="width: 100%">
          <el-table-column type="index" label="序号" width="60" />
          <el-table-column prop="username" label="姓名" width="100" />
          <el-table-column prop="mobile" label="手机" width="130" />
          <el-table-column prop="workNumber" label="工号" width="100" />
          <el-table-column
            prop="formOfEmployment"
            :formatter="formatEmployment"
            width="100"
            label="聘用形式"
          />
          <el-table-column prop="departmentName" label="部门" width="100" />
          <el-table-column prop="timeOfEntry" width="130" label="入职时间">
            <template v-slot:default="obj">
              {{ obj.row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="工资基数" width="100">
            <template slot-scope="scope">
              {{ scope.row.currentBasicSalary + scope.row.currentPostWage }}
            </template>
          </el-table-column>
          <el-table-column label="津贴方案" width="100"
            >通用方案</el-table-column
          >
          <el-table-column label="操作" width="260">
            <template slot-scope="scope" style>
              <el-button
                v-if="
                  scope.row.currentBasicSalary + scope.row.currentPostWage > 0
                "
                size="mini"
                type="primary"
                @click="changeSalary('ChangeSalary', scope.row.id)"
                >调薪</el-button
              >
              <el-button
                v-else
                size="mini"
                type="danger"
                @click="fixedSalary('FixedSalary', scope.row.id)"
                >定薪</el-button
              >
              <el-button type="text" size="mini">
                <router-link
                  :to="{
                    path: '/salarys/details/' + yearMonth + '/' + scope.row.id,
                  }"
                  >查看</router-link
                >
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row
          type="flex"
          justify="center"
          style="height: 50px"
          align="middle"
        >
          <el-pagination
            background
            layout="prev,pager,next"
            :total="page.total"
            :current-page="page.page"
            :page-size="page.pageSize"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
      <!--查看弹框-->
      <el-dialog
        :title="topLabel"
        :visible.sync="centerDialogVisible"
        width="50%"
        left
      >
        <component
          :is="currentComponent"
          :user-salary="selectedSalaryInfo"
          :user-id="selectUserId"
          @success="getSalarysList"
          @onDialogCancel="centerDialogVisible = false"
        />
        <!-- <ChangeSalary v-if="seeState == 'changeSalary'" :user-salary="selectedSalaryInfo" :user-id="selectUserId" @onDialogCancel="centerDialogVisible=false" /> -->
        <!-- <FixedSalary v-if="seeState == 'fixedSalary'" /> -->
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  getSalarysList,
  getTips,
  getSalaryDetail,
  getCompanySetting,
} from "@/api/salarys";
import EmployeeData from "@/api/constant/employees";
import { getDepartmentsAPI } from "@/api/departments";
import ChangeSalary from "./components/change-salary";
import FixedSalary from "./components/fixed-salary";
export default {
  name: "UsersTableIndex",
  components: { ChangeSalary, FixedSalary },
  data() {
    return {
      seeState: "",
      centerDialogVisible: false,
      topLabel: "转正",
      approvalsType: EmployeeData.hireType,
      approvalsState: EmployeeData.workingState,
      department: [],
      subsidyScheme: [],
      list: [],
      departments: [],
      loading: false,
      page: {
        total: 0,
        page: 1,
        pageSize: 10,
      },
      tips: {},
      yearMonth: "",
      formData: {
        approvalsTypeChecks: [],
        approvalsStateChecks: [],
        departmentChecks: [],
      },
      selectedSalaryInfo: {},
      selectUserId: null,
      currentComponent: "",
    };
  },
  computed: {
    tipsInfo() {
      // return `本月${this.tips.dateRange}：入职 ${this.tips.worksCount} 离职 ${this.tips.leavesCount} 调薪 ${this.tips.adjustCount} 未定薪 ${this.tips.unGradingCount}`
      return `本月0：入职 0 离职 0 调薪 0 未定薪 0`;
    },
  },
  created() {
    this.getSalarysList(); // 获取工资
    this.getDepartments(); // 获取组织
  },
  methods: {
    // 对聘用形式进行文本显示
    formatEmployment(row) {
      const data = this.approvalsType.find(
        (item) => item.id === row.formOfEmployment.toString()
      );
      return data ? data.value : "未知";
    },
    async getSalarysList() {
      const data = await getCompanySetting();
      this.yearMonth = data.dataMonth;
      this.loading = true;
      const { rows, total } = await getSalarysList({
        ...this.page,
        ...this.formData,
      });
      this.list = rows;
      this.page.total = total;
      this.loading = false;
    },
    // 获取组织列表
    async getDepartments() {
      const { depts } = await getDepartmentsAPI();
      this.departments = depts;
    },
    async getTips() {
      const { tipsRes } = await getTips();
      this.tips = tipsRes;
    },
    changePage(newPage) {
      this.page.page = newPage;
      this.getSalarysList();
    },
    async changeSalary(key, userId) {
      this.topLabel = "调薪";
      this.currentComponent = key;
      this.centerDialogVisible = true;
      this.selectUserId = userId;
      this.selectedSalaryInfo = await getSalaryDetail(userId);
    },
    fixedSalary(key) {
      this.topLabel = "定薪";
      this.currentComponent = key;
      this.centerDialogVisible = true;
    },
    // 查询参数发生变化
    changeParams() {
      this.page.page = 1; // 重置第一页
      this.getSalarysList(); // 重新拉取工资数据
    },
  },
};
</script>
