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
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="请假类型：" prop="holidayType">
          <el-input v-model="ruleForm.data.holidayType" style="width: 220px;" :disabled="true" />
        </el-form-item>

        <el-form-item label="开始时间：" prop="startTime">
          <el-date-picker
            v-model="ruleForm.data.start_time"
            type="datetime"
            placeholder="选择日期"
            :disabled="computeOpType"
          />
        </el-form-item>
        <el-form-item label="结束时间：" prop="endTime">
          <el-date-picker
            v-model="ruleForm.data.end_time"
            type="datetime"
            placeholder="选择日期"
            :disabled="computeOpType"
          />
        </el-form-item>
        <el-form-item label="请假时长：" prop="duration">
          <el-input v-model="ruleForm.data.duration" style="width: 220px;" :disabled="true" />
        </el-form-item>
        <el-form-item label="申请原因：" prop="cause">
          <el-input
            v-model="ruleForm.data.reason"
            type="textarea"
            style="width: 400px;"
            placeholder="显示请假人填写的请假原因"
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
            <el-button
              v-show="ruleForm.state == 4 && tabLab =='launch'"
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
  applyeLave
} from '@/api/approvals'
export default {
  name: 'UsersTableIndex',
  props: {
    selectedId: {
      type: String,
      default: ''
    },
    tabLab: {
      type: String,
      default: ''

    }
  },

  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      timeValue: '',
      ruleForm: {}
    }
  },
  computed: {
    computeOpType() {
      return this.ruleForm.stateOfApproval !== '已撤销'
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const data = await getApprovalsDetail(this.selectedId)
      this.ruleForm = data
      this.ruleForm.data = JSON.parse(this.ruleForm.procData)
      const type = this.ruleForm.data.holidayType
      this.ruleForm.data.holidayType = type === 1 ? '请假' : '调休'
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
      sendForm.holidayType = this.ruleForm.holidayType === '请假' ? 7 : 18
      sendForm.startTime = this.ruleForm.startTime
      sendForm.endTime = this.ruleForm.endTime
      sendForm.reasonsForApplication = this.ruleForm.cause
      await applyeLave(sendForm)
      this.ruleForm = {}
      this.$emit('closeDialog')
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    updateData() {
      this.init()
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
