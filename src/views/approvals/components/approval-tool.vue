<template>
  <div class="cont-top-box">
    <!-- <div class="top-lable">
      <div class="careful-lab"> <i class="el-icon-info" />当前审批中 0 本月审批通过 1 本月审批驳回 0</div>
      <div class="lable-tit">
        <el-button type="primary" size="mini">
          <router-link :to="{'path':'/approvals/securitySetting'}">流程设置</router-link>

        </el-button>
      </div>
    </div> -->
    <el-dialog title="导出" width="500px" :visible.sync="exportData">
      <div class="exportTit"> 如果导出每月数据过多，请使用筛选功能后导出 </div>
      <div class="exportCont">
        审批发起月份：<el-date-picker v-model="value" type="date" placeholder="选择日期" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="exportData = false">取 消</el-button>
        <el-button type="primary" @click="exportDataAct()">确 定</el-button>
      </div>
    </el-dialog>
    <component :is="process" ref="set" @handleCloseModal="handleCloseModal" />
  </div>
</template>

<script>
import { exportApprovals } from '@/api/approvals'
import process from './process'
export default {
  name: 'ApprovalPageTool',
  components: {
    process
  },
  data() {
    return {
      process: 'process',
      exportData: false,
      searchKey: '',
      value: '',
      dataes: ''
    }
  },
  methods: {
    exportDataAct() {
      if (!this.value) {
        this.$message.success('请选择导出时间！')
      } else {
        exportApprovals({ month: this.value }).then(res => {
          this.$message.success('导出成功！')
        })
      }
    },
    handlSet() {
      this.$refs.set.dialogFormV()
    },
    // 弹框关闭
    handleCloseModal() {
      this.$refs.addUser.dialogFormH()
      this.$refs.positive.dialogFormH()
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
    display: inline-block;
    padding: 0 10px;
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
.exportTit {
  line-height: 50px;
}
</style>
