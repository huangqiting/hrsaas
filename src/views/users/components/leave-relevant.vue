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
      <el-form-item label="假期类型">
        <el-select v-model="ruleForm.holidayType" placeholder="请选择" style="width: 220px;" @change="handleChange">
          <el-option
            v-for="item in baseData.leaveType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="申请单位">
        <span>按天</span>
      </el-form-item>
      <el-form-item label="开始时间" prop="startTime">
        <el-col :span="8">
          <el-date-picker
            v-model="ruleForm.startTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
            style="width: 340px;"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-col :span="8">
          <el-date-picker
            v-model="ruleForm.endTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
            style="width: 340px;"
          />
        </el-col>
      </el-form-item>
      <el-form-item v-if="state===&quot;1&quot;" label="请假时长">
        <el-input v-model="ruleForm.duration" style="width: 340px;" />
      </el-form-item>
      <el-form-item v-if="state===&quot;0&quot;" label="申请天数">
        <el-input v-model="ruleForm.duration" style="width: 340px;" />
      </el-form-item>
      <el-form-item label="申请理由" prop="reason">
        <el-input
          v-model="ruleForm.reason"
          type="textarea"
          style="width: 340px;"
          :autosize="{ minRows: 3, maxRows: 8}"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { applyeLave, startProcess } from '@/api/approvals'
import commonApi from '@/api/constant/user'
export default {
  name: 'UsersTableIndex',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      state: '1',
      ruleForm: {
        startTime: '',
        endTime: '',
        reason: '',
        holidayType: '',
        duration: 0,
        applyUnit: '按天',
        processKey: 'process_leave',
        processName: '请假',
        userId: this.$store.getters.userId
      },
      baseData: commonApi,
      opType: 7,
      options: [
        {
          value: 7,
          label: '请假'
        },
        {
          value: 18,
          label: '调休'
        }
      ],
      duration: 0,
      rules: {
        start_time: [
          { required: true, message: '开始时间', trigger: 'change' }
        ],
        end_time: [{ required: true, message: '结束时间', trigger: 'change' }],
        reason: [{ required: true, message: '加班原因', trigger: 'blur' }]
      }
    }
  },
  computed: {
    computeDuration() {
      let duration = 0
      if (this.ruleForm.start_time && this.ruleForm.end_time) {
        const durationStamp = (new Date(this.ruleForm.end_time)).valueOf() - (new Date(this.ruleForm.start_time)).valueOf()
        const fourHours = 1000 * 60 * 60 * 4
        const total = Math.floor(durationStamp / fourHours)
        duration = Math.floor(total / 2) + (total % 2) * 0.5
      }
      return duration
    }
  },
  created() {
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    submitForm(name) {
      console.log(this.ruleForm)
      startProcess(this.ruleForm).then(res => {
        if (res.data.success) {
          this.$message.success(res.data.message)
          this.$emit('handleShow')
        }
      })
    },
    resetForm() {
      this.ruleForm = {}
    },
    handleChange(obj) {
      this.state = obj
    },
    submitUpload(content) {
      const formData = new FormData()
      formData.append('file', content.file)
      formData.append('start_time', this.ruleForm.start_time)
      formData.append('end_time', this.ruleForm.end_time)
      formData.append('reason', this.ruleForm.reason)
      formData.append('holiday_type', this.ruleForm.holiday_type)
      formData.append('apply_unit', this.ruleForm.apply_unit)
      applyeLave(formData)
    }
  }
}
</script>

