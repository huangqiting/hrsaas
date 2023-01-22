<template>
  <div class="boxInfo">
    <!-- 数据表格 -->
    <div class="fr clearfix searchInfo">
      <!-- <div class="serachInput">
        <el-input
          v-model="requestParameters.keyword"
          placeholder="搜索"
          clearable
          @keyup.enter.native="dataSearch(itemes,index)"
        />
      </div> -->
      <!-- <el-input v-model="requestParameters.keyword" placeholder="请输入姓名" @click="handleSearch"></el-input> -->
      <a class="el-button fr el-button--primary el-button--mini" title="导出" @click="handelFileDownload">导出</a>
    </div>
    <el-table
      :key="tableKey"
      v-loading="loading"
      :data="dataList"
      element-loading-text="给我一点时间"
      fit
      highlight-current-row
      style="width: 100%; margin-top:10px;"
      border
    >
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="workNumber" label="工号" width="100" />
      <el-table-column prop="mobile" label="手机号" width="200" />
      <el-table-column prop="department" label="部门" width="200" />
      <el-table-column prop="leaveDays" label="事假" width="100" />
      <el-table-column prop="dayOffLeaveDays" label="调休" width="100" />
      <el-table-column prop="normalDays" label="正常" width="100" />
      <el-table-column prop="laterTimes" label="迟到次数" width="100" />
      <el-table-column prop="earlyTimes" label="早退次数" width="100" />
      <el-table-column prop="averageDailyNaturalDays" label="日均时长" width="150" />
      <el-table-column prop="absenceDays" label="旷工天数" width="100" />
      <el-table-column prop="whetherItIsFullOfWork" label="是否全勤" width="100" />
      <el-table-column prop="actualAttendanceDaysAreOfficial" label="实际出勤天数" width="180" />
      <el-table-column prop="attendanceDay" label="应出勤工作日" width="120" />
      <el-table-column prop="salaryStandard" label="计薪标准" width="100" />
      <el-table-column prop="officialSalaryDays" label="计薪天数" width="150" />
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        :page-size="requestParameters.pagesize"
        layout="total, prev, pager, next"
        :total="Number(counts)"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- end -->
    <!-- 数据表格 / -->
    <div class="butList">
      <el-tooltip class="item" effect="dark" content="将当前报表存放至归档，归档可以多次，但只保留最后一次" placement="top-start">
        <el-button type="primary" size="small" @click="archivingReportForm">归档{{ month }}月份报表</el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="开始做下月考勤" placement="top-start">
        <el-button type="primary" size="small" @click="createReportForm">新建报表</el-button>
      </el-tooltip>
      <!-- <el-button @click="handleRest">取消</el-button> -->
    </div>
  </div>
</template>

<script>
import { archives, newReports, reportFormList } from '@/api/attendances'
// import { importDown } from '@/api/employees'
// import XLSX from 'xlsx'
// import FileSaver from 'file-saver'
// import { getBlob } from '@/filters'

export default {
  name: 'RefortList',
  data() {
    return {
      // baseData: [],
      dataList: [],
      seleList: [],
      text: '', // 新增、编辑文本
      tableKey: 0,
      counts: '',
      barSearch: {
        alertText: ''
      },
      requestParameters: {
        atteDate: ''
      },
      isArchived: '',
      loading: false,
      centerDialogVisible: false,
      infoTip: '',
      month: this.$route.params.month
    }
  },
  computed: {
    // 模糊搜索
    list() {
      const search = this.requestParameters.keyword
      if (search) {
        return this.dataList.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(search) > -1
            )
          })
        })
      }
      return this.dataList
    }
  },
  // 创建完毕状态
  created() {
    this.requestParameters.atteDate = this.yearMonth
    this.reportFormList()
  },
  // 组件更新
  methods: {
    // 业务方法
    async  reportFormList(params) {
      this.loading = true
      this.dataList = await reportFormList(this.requestParameters)
      this.loading = false
    },
    // 新增用户刷新列表
    handleLoadDataList() {
      this.reportFormList()
    },
    // 归档
    archivingReportForm() {
      var departmentId = this.requestParameters.departmentId
      var atteDate = {
        departmentId: departmentId,
        atteDate: this.month
      }
      this.$confirm(
        '该月报表已归档过，重新归档将覆盖上一份报表，您确认要再次归档吗？',
        '归档' + this.month + '报表'
      )
        .then(async() => {
          await archives(atteDate)
          this.$message.success('归档成功')
        })
    },
    // 新建报表
    createReportForm() {
      this.$confirm(
        '新建报表会使得' +
          this.month +
          '月报表不能修改，且您上一次归档之后的修改将不会被保存。您确定现在就开始做下月考勤吗？',
        '新建' + parseInt(Number(this.month) + Number(1)) + '报表'
      )
        .then(async() => {
          // const nextMonth = this.getNextMonth(this.yearMonth)
          var atteTime = this.month.substring(0, 4) + '-' + this.month.substring(4)
          atteTime = this.getNextMonth(atteTime).datas.replace('-', '')
          this.requestParameters.yearMonth = atteTime
          await newReports(this.requestParameters)
          this.$message.success('新建报表成功！')
          this.$router.push('/attendances')
        })
    },
    // 获取下一个月
    getNextMonth: function(date) {
      var arr = date.split('-')
      var year = arr[0] // 获取当前日期的年份
      var month = arr[1] // 获取当前日期的月份
      var year2 = year
      var month2 = parseInt(month) + 1
      if (month2 === 13) {
        year2 = parseInt(year2) + 1
        month2 = 1
      }

      if (month2 < 10) {
        month2 = '0' + month2
      }

      var datas = year2 + '-' + month2
      var months = month2
      return {
        datas: datas,
        months: months
      }
    },
    // 每页显示信息条数
    handleSizeChange(pageSize) {
      this.requestParameters.pagesize = pageSize
      if (this.requestParameters.page === 1) {
        this.reportFormList(this.requestParameters)
      }
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.requestParameters.page = val
      this.reportFormList()
    },
    // 下载文件
    handelFileDownload() {
      try {
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['姓名', '工号', '手机号', '部门', '事假', '调休', '正常', '迟到次数', '早退次数', '日均时长', '旷工天数', '是否全勤', '实际出勤天数', '应出勤工作日', '计薪标准', '计薪天数'] // 表头 必填

          const filterVal = ['name', 'workNumber', 'mobile', 'department', 'leaveDays', 'dayOffLeaveDays', 'normalDays', 'laterTimes', 'earlyTimes', 'averageDailyNaturalDays', 'absenceDays', 'whetherItIsFullOfWork', 'actualAttendanceDaysAreOfficial', 'attendanceDay', 'salaryStandard', 'officialSalaryDays']
          const data = this.formatJson(filterVal, this.dataList)
          excel.export_json_to_excel({
            header: tHeader,
            data: data,
            filename: '人事报表',
            autoWidth: true,
            bookType: 'xlsx'
          })
          this.$message.success('导出报表成功！')
        })
      } catch (error) {
        this.$message.error(error)
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.el-message-box--center .el-message-box__content p {
  text-align: left;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../../styles/variables.scss';
.butList {
  // border-top: solid 1px #f4f4f4;
  margin-top: 15px;
  text-align: center;
  background: #fff;
  span {
    display: inline-block;
    background: $green;
    color: #fff;
    padding: 8px 20px;
    border-radius: 3px;
    margin: 10px;
    cursor: pointer;
  }
  .cancel {
    background: #ccc;
    color: #666;
  }
}
</style>
