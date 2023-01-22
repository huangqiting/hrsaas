<template>
  <div class="AdjustThePost">
    <div class="infoBox">
      <div class="logo"><img src="./../../assets/img.jpeg" alt=""></div>
      <div class="info">
        <p><span class="name">{{ ruleForm.fullName }}</span></p>
        <p><span>部门：</span> {{ ruleForm.department }}      <span>岗位：</span> {{ ruleForm.post }}</p>
        <p><span>入职时间：</span>   {{ ruleForm.timeOfEntry }}</p>
      </div>
    </div>
    <div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px" class="demo-ruleForm">
        <el-form-item v-for="(item, index) in ruleForm.items" :key="index" :label="item.type == 'img' ? '附件': item.title" prop="types">
          <span v-if="item.oldValue != ''"><el-input v-model="item.oldValue" style="width: 220px;" /><span class="Label">-></span><el-input v-model="item.newValue" style="width: 220px;" /></span>
          <span v-if="item.title == '调岗时间'"><el-input v-model="item.newValue" style="width: 220px;" /></span>
          <span v-if="item.title == '调岗原因'"><el-input v-model="item.newValue" style="width: 220px;" /></span>
          <span v-if="item.type == 'img'"><img src="./../../assets/404_images/404.png" width="300" alt=""></span>
        </el-form-item>
        <div class="buttones" style="text-align: center;margin-top: 40px;">
          <el-form-item>
            <el-button type="primary">通过</el-button>
            <el-button type="primary">驳回</el-button>
            <el-button type="primary">转发</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { transferPosition } from '@/api/user'

export default {
  name: 'UsersTableIndex',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      timeValue: '',
      ruleForm: {
        fullName: '张三',
        department: 'XXX',
        headPortrait: 'XXX',
        post: 'XXX',
        timeOfEntry: '2018-2-12',
        items: [
          { title: '岗位', newValue: '总经理', oldValue: '部门经理' },
          { title: '部门', newValue: '管理部门', oldValue: '管理部门' },
          { title: '调岗时间', newValue: '2018-8-16', oldValue: '' },
          { title: '调岗原因', newValue: '开了就拉开始就拉菲拉菲奥拉夫', oldValue: '' },
          { title: '附件', newValue: '开了就拉开始就拉菲拉菲奥拉夫', oldValue: '', type: 'img' }
        ]
      },
      rules: {
        types: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.transferPosition()
  },
  methods: {
    async  transferPosition() {
      await transferPosition()
      this.loading = false
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./../../styles/variables";
  .AdjustThePost{
    .infoBox{
      display: flex;
      border-bottom: solid 1px #ccc;
      margin-bottom: 20px;
      padding: 10px 0 20px 0;
      img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      .logo{
        border:solid 1px #ccc;
        width: 102px;
        height: 102px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .info{
        p{
          line-height: 30px;
          .name{font-size: 16px;}
          span{
            font-weight: bold;
            display: inline-block;
            margin-right: 0px;
            margin-left: 10px;
          }
        }
      }
      .buttones{
        text-align: center;
      }
    }
    .Label{
      margin: 0 20px;
      color:#999;
    }
  }
</style>
