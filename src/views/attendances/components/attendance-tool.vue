<template>
  <div class="cont-top-box">
    <div class="top-lable">
      <div class="careful-lab"> <i class="el-icon-info" />有 {{ attendInfo.tobeTaskCount }} 条考勤审批尚未处理 </div>
      <div class="lable-tit">
        <span class="serachInput">
          <i v-show="iconShow" class="fa fa-search" aria-hidden="true" title="搜索" @click="searchIcon" />
          <el-input
            v-show="searchShow"
            v-model="formData.keyword"
            placeholder="搜索"
            clearable
            @clear="handleClear"
            @keyup.enter.native="dataSearch"
          />
        </span>
        <router-link :to="{'path':'/employees/import/',query: {name: '考勤'}}" class="el-button el-button--primary el-button--mini" title="导入">导入</router-link>
        <el-badge is-dot class="item">
          <el-button type="primary" size="mini" title="提醒" @click="handleTip">提醒</el-button>
        </el-badge>
        <el-button type="primary" size="mini" title="设置" @click="handleSet">设置</el-button>
        <router-link :to="{'path':'/attendances/archiving/'}" class="el-button el-button--primary el-button--mini" title="历史归档">历史归档</router-link>
        <router-link :to="{'path':'/attendances/report/'+ yearMonth}" class="el-button el-button--primary el-button--mini">{{ attendInfo.month }}月份报表</router-link>
      </div>

    </div>

    <!-- 设置 -->
    <component :is="employeesSet" ref="set" @handleCloseModal="handleCloseModal" />
  </div>
</template>

<script>
// import { notify } from '@/api/attendances'
import employeesSet from './set'
export default {
  name: 'AttendancesPageTool',
  components: {
    employeesSet
  },
  props: ['monthOfReport', 'formData', 'attendInfo', 'yearMonth'],
  data() {
    return {
      employeesSet: 'employeesSet',
      dataes: '',
      iconShow: true,
      searchShow: false,
      centerDialogVisible: false
    }
  },
  methods: {
    // 暂时不处理
    handleSub() {
      this.centerDialogVisible = false
      this.$message.success('提醒成功')
    },
    // 集合搜索
    searchIcon() {
      this.iconShow = false
      this.searchShow = true
    },
    // 清除搜索数据
    handleClear() {
      this.iconShow = true
      this.searchShow = false
      this.$emit('dataList', this.formData)
    },
    dataSearch() {
      this.$emit('dataList', this.formData)
    },

    handleSet() {
      this.$refs.set.dialogFormV()
    },
    // 弹框关闭
    handleCloseModal() {
      this.$refs.set.dialogFormH()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cont-top-box {
  padding: 20px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.top-lable {
  position: relative;
  line-height: 2;
  a {
    // display: inline-block;
    margin: 0;
  }
  .careful-lab {
    i {
      margin-right: 5px;
      color: #409eff;
    }
    display: inline-block;
    padding: 0px 10px;
    border-radius: 3px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);
  }
  .lable-tit {
    position: absolute;
    right: 0;
    top: 0px;
  }
}
.serachInput {
  .el-input--medium {
    width: 150px;
  }
}
.serachInput .el-input--medium .el-input__inner {
  height: 26px;
  line-height: 26px;
}
.attenInfo {
  p {
    line-height: 30px;
  }
}
</style>
