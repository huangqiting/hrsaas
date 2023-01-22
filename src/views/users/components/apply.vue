<template>
  <div class="usersContainer">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      status-icon
      label-width="110px"
      class="demo-ruleForm"
      enctype="multipart/form-data"
    >
      <el-form-item label="申请类型">
        <el-select v-model="opType" placeholder="请选择" style="width: 220px;" @change="handleChange">
          <el-option
            v-for="item in baseData.applyType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <!--离职表单-->
      <div v-if="state==3">
        <el-form-item label="期望离职时间" :class="computeOpType?'item-enable':'item-dismiss'" prop="exceptTime">
          <el-date-picker
            v-model="ruleForm.exceptTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="离职原因" :class="computeOpType?'item-enable':'item-dismiss'" prop="">
          <el-input
            v-model="ruleForm.reason"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 8}"
            style="width: 70%;"
            placeholder="请输入内容"
          />
        </el-form-item>
      </div>
      <!--离职表单-->
      <!--加班表单-->
      <div :v-else-if="state==15">
        <el-form-item label="加班开始时间" :class="computeOpType?'item-dismiss':'item-enable'" prop="start_time">
          <el-date-picker
            v-model="ruleForm.start_time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item label="加班结束时间" :class="computeOpType?'item-dismiss':'item-enable'" prop="end_time">
          <el-date-picker
            v-model="ruleForm.end_time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item label="补偿方式" :class="computeOpType?'item-dismiss':'item-enable'">
          <span>调休</span>
        </el-form-item>
        <el-form-item label="加班原因" :class="computeOpType?'item-dismiss':'item-enable'" prop="reason">
          <el-input
            v-model="ruleForm.reason"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 8}"
            style="width: 70%;"
            placeholder="请输入内容"
          />
        </el-form-item>
      </div>
      <!--加班表单-->
      <el-form-item>
        <el-button @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { startProcess } from '@/api/approvals'
import commonApi from '@/api/constant/user'
export default {
  name: 'UsersTableIndex',
  props: ['dialogVisible'],
  data() {
    return {
      dialogImageUrl: '',
      dialogVisibles: false,
      value: '加班',
      opType: 15,
      ruleForm: {

      },
      ruleForm2: {
        exceptTime: '',
        reason: '',
        processKey: 'process_dimission',
        processName: '离职',
        userId: this.$store.getters.userId
      },
      baseData: commonApi,
      state: '3'
    }
  },
  computed: {
    computeOpType() {
      return this.opType === 3
    }
  },
  created() {
  },
  methods: {
    async  submitForm(name) {
      if (this.state === 3) {
        this.ruleForm.processKey = 'process_dimission'
        this.ruleForm.processName = '离职'
      } else {
        this.ruleForm.processKey = 'process_overtime'
        this.ruleForm.processName = '加班'
      }
      this.ruleForm.userId = this.$store.getters.userId
      await startProcess(this.ruleForm)
      this.$emit('handleShow')
    },
    resetForm() {
      this.ruleForm = {}
    },
    handleChange(obj) {
      this.ruleForm = {}
      this.state = obj
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../styles/variables";
.usersContainer {
  .el-form-item {
    margin-bottom: 20px;
    .el-form-item__error {
      position: relative;
      margin-left: 300px;
    }
  }
}
.item-enable {
  display: block;
}
.item-dismiss {
  display: none;
}
</style>
