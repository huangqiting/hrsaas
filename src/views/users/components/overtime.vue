<template>
  <div class="AdjustThePost">
    <div class="infoBox">
      <div class="logo">
        <img src="@/assets/common/img.jpeg" alt>
      </div>
      <div class="info">
        <p>
          <span class="name">{{ ruleForm.username }}</span>
        </p>
        <p>
          <span>部门：</span>
          {{ ruleForm.departmentName }}
        </p>
        <p>
          <span>入职时间：</span>
          {{ ruleForm.timeOfEntry | formatDate }}
        </p>
      </div>
    </div>
    <div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="补偿方式" prop="types">
          调休
        </el-form-item>
        <el-form-item label="加班开始时间" prop="timeValue">
          <el-date-picker
            v-model="ruleForm.data.start_time"
            format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="选择日期"
            :disabled="computeOpType"
          />
        </el-form-item>
        <el-form-item label="加班结束时间" prop="timeValue">
          <el-date-picker
            v-model="ruleForm.data.end_time"
            type="date"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
            :disabled="computeOpType"
          />
        </el-form-item>
        <el-form-item label="申请原因" prop="evaluate">
          <el-input
            v-model="ruleForm.data.reason"
            type="textarea"
            style="width: 400px;"
            placeholder="显示加班人填写的加班原因"
            :disabled="computeOpType"
          />
        </el-form-item>
        <div class="buttones" style="text-align: center;margin-top: 40px">
          <el-form-item>
            <el-button
              v-show="(ruleForm.state == 0 || ruleForm.state == 1) && tabLab =='launch'"
              type="primary"
              @click="btnClick"
            >撤销</el-button>
            <el-button
              v-show="(ruleForm.state == 0 || ruleForm.state == 1) && tabLab =='approvals'"
              type="primary"
              @click="btnPass"
            >通过</el-button>
            <el-button
              v-show="(ruleForm.state == 0 || ruleForm.state == 1) && tabLab =='approvals'"
              type="primary"
              @click="btnReject"
            >驳回</el-button>
            <!-- </el-form-item> -->
            <el-button
              v-show="ruleForm.stateOfApproval == 4 && tabLab =='launch'"
              type="primary"
              @click="btnSave"
            >提交</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  getApprovalsDetail,
  approvalsDel,
  approvalsPass,
  approvalsReject,
  applyOvertime
} from '@/api/approvals'
export default {
  name: 'Overtime',
  props: {
    selectedId: {
      type: String,
      default: ''
    },
    tabLab: {
      type: String,
      default: ''
    }},
  data() {
    return {
      id: '',
      dialogImageUrl: '',
      dialogVisible: false,
      timeValue: '',
      ruleForm: {},
      rules: {}
    }
  },
  computed: {
    computeOpType() {
      return this.ruleForm.stateOfApproval !== '已撤销'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      debugger
      const data = await getApprovalsDetail(this.selectedId)
      this.ruleForm = data
      this.ruleForm.data = JSON.parse(this.ruleForm.procData)
    },
    async btnClick() {
      await approvalsDel({ id: this.selectedId })
      this.$message.success('撤销成功')
      this.$emit('closeDialog')
    },
    async btnPass() {
      await approvalsPass({ id: this.selectedId })
      this.$message.success('操作成功')
      this.$emit('closeDialog')
    },
    async btnReject() {
      await approvalsReject({ id: this.selectedId })
      this.$message.success('操作成功')
      this.$emit('closeDialog')
    },
    async btnSave() {
      const sendForm = {}
      sendForm.processInstanceId = this.selectedId
      sendForm.overtimeStartTime = this.ruleForm.startTime
      sendForm.overtimeTime = this.ruleForm.endTime
      sendForm.overtimeCause = this.ruleForm.cause
      await applyOvertime(sendForm)
      this.ruleForm = {}
      this.$emit('closeDialog')
    },
    updateData() {
      this.init()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../styles/variables";
.AdjustThePost {
  .infoBox {
    display: flex;
    border-bottom: solid 1px #ccc;
    margin-bottom: 20px;
    padding: 10px 0 20px 0;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .logo {
      border: solid 1px #ccc;
      width: 102px;
      height: 102px;
      border-radius: 50%;
      margin-right: 20px;
    }
    .info {
      p {
        line-height: 30px;
        .name {
          font-size: 16px;
        }
        span {
          font-weight: bold;
          display: inline-block;
          margin-right: 0px;
          margin-left: 10px;
        }
      }
    }
    .buttones {
      text-align: center;
    }
  }
}
</style>
