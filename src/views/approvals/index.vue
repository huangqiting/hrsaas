<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <!-- 工具栏 -->
      <page-tools :show-before="true">
        <!-- 前面内容 -->
        <template v-slot:before>当前审批中 0 本月审批通过 1 本月审批驳回 0</template>
        <template v-slot:after>
          <el-button size="mini" type="primary" @click="$router.push('/approvals/securitySetting')">流程设置</el-button>
        </template>
      </page-tools>
      <!-- <ApprovalPageTool /> -->
      <el-card class="hr-block">
        <el-table :data="list" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column type="selection" width="30" />
          <el-table-column type="index" width="80" label="序号" />
          <el-table-column prop="processName" label="审批类型" sortable />
          <el-table-column prop="username" label="申请人" sortable />
          <el-table-column prop="procCurrNodeUserName" label="当前审批人" sortable />
          <el-table-column label="审批发起时间" sortable>
            <template slot-scope="scope">
              <span>{{ scope.row.procApplyTime | formatDate }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="process_state" label="审批状态" sortable>
            <template slot-scope="scope">
              <span v-if="scope.row.processState==='0'" class="rovalsState">
                <em class="sub" />已提交
              </span>
              <span v-if="scope.row.processState==='1'" class="rovalsState">
                <em class="stay" />审批中
              </span>
              <span v-if="scope.row.processState==='2'" class="rovalsState">
                <em class="adopt" />审批通过
              </span>
              <span v-if="scope.row.processState==='3'" class="rovalsState">
                <em class="reject" />审批不通过
              </span>
              <span v-if="scope.row.processState==='4'" class="rovalsState">
                <em class="revoke" />撤销
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="toDetail(scope.row)">
                查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" align="middle" justify="center" style="height: 60px">
          <el-pagination
            :total="page.total"
            :page-size="page.pagesize"
            layout="prev, pager, next"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getApprovalList } from '@/api/approvals'
// import ApprovalPageTool from './components/approval-tool'

export default {
  name: 'SocialTableIndex',
  components: { },
  data() {
    return {
      list: [],
      loading: false,
      page: {
        page: 1,
        total: 0,
        pageSize: 10
      }
    }
  },
  created() {
    this.getApprovalList()
  },
  methods: {
    // 初始化数据
    async  getApprovalList() {
      this.loading = true
      const { rows, total } = await getApprovalList({ year: 2018, ...this.page })
      this.page.total = total
      this.list = rows
      this.loading = false
    },
    toDetail(obj) {
      var name = obj.processName
      switch (name) {
        case '工资':
          this.$router.push({ path: '/approvals/salaryApproval/' + obj.processId })
          break
        case '入职':
          this.$router.push({ path: '/approvals/enterApproval/' + obj.processId })
          break
        case '请假':
          this.$router.push({ path: '/approvals/leaveApproval/' + obj.processId })
          break
        case '离职':
          this.$router.push({ path: '/approvals/quitApproval/' + obj.processId })
          break
        case '加班':
          this.$router.push({ path: '/approvals/overtimeApproval/' + obj.processId })
      }
    },

    changePage(newPage) {
      this.page.newPage = newPage
      this.getApprovalList()
    }
  }
}
</script>

