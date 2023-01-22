<template>
  <div class="securitySetting">
    <div class="settingList">
      <div class="set">
        <span>请假</span>
        <span>
          <el-switch
            v-model="levelData.enable"
            active-color="#13ce66"
            :inactive-color="inactiveColor"
            @change="handleChange(levelData,$event)"
          />
        </span>
        <i class="el-icon-setting" @click="setFlow('regular')" />
      </div>
      <div class="set">
        <span>加班</span>
        <span>
          <el-switch
            v-model="overtimeData.enable"
            active-color="#13ce66"
            :inactive-color="inactiveColor"
            @change="handleChange(overtimeData,$event)"
          />
        </span>
        <i class="el-icon-setting" @click="setFlow('regular')" />
      </div>
      <div class="set">
        <span>离职</span>
        <span>
          <el-switch
            v-model="dimissionData.enable"
            active-color="#13ce66"
            :inactive-color="inactiveColor"
            @change="handleChange(dimissionData,$event)"
          />
        </span>
        <i class="el-icon-setting" @click="setFlow('regular')" />
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span style="text-align:center">
        <el-upload
          class="upload-demo"
          drag
          action="/api/user/process/deploy"
          :headers="myheader"
          :before-upload="beforeUpload"
          :on-error="uploadFail"
          :on-success="handleFileSuccess"
          :show-file-list="false"
          :file-list="fileList"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处</div>
        </el-upload>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  saveSetState,
  getFlowList,
  suspend
} from '@/api/approvals'
import { importFilexml } from '@/filters'
import { getToken } from '@/utils/auth'
export default {
  name: 'UsersTableIndex',
  components: {},
  data() {
    return {
      requestData: {},
      activeColor: '#13ce66',
      inactiveColor: '#ccc',
      dialogVisible: false,
      processing: false,
      uploadTip: '点击上传',
      fileList: [],
      dataBase: [],
      levelData: {
        enable: false
      },
      overtimeData: {
        enable: false
      },
      dimissionData: {
        enable: false
      }
    }
  },
  computed: {
    myheader: function() {
      return {
        Authorization: `Bearer ${getToken()}`
      }
    }
  },
  created() {
    this.getFlowList()
  },
  methods: {
    async getFlowList() {
      const data = await getFlowList()
      data.map(item => {
        const items = {
          ...item,
          enable: item.persistentState.suspensionState !== 2
        }
        if (items.key === 'process_leave') {
          this.levelData = items
        } else if (items.key === 'process_dimission') {
          this.dimissionData = items
        } else {
          this.overtimeData = items
        }
      })
    },
    handleChange(obj, e) {
      if (!obj.key) {
        this.$message.error('还未上传流程')
        return
      }
      var parent = {
        processKey: obj.key,
        enable: e
      }
      suspend(parent)
    },
    async changeSet() {
      await saveSetState(this.requestData)
      this.$message.success('设置保存成功！')
    },
    setFlow(obj) {
      this.dialogVisible = true
    },
    // 文件上传完成
    typeTip(obj) {
      this.$message.error(obj)
    },
    beforeUpload(file, obj) {
      importFilexml(file, obj, this.typeTip)
    },
    // 上传错误
    uploadFail(err, file, fileList) {
      this.uploadTip = '点击上传'
      this.processing = false
      this.$message.error(err)
    },
    // 上传成功
    handleFileSuccess(obj, file, fileList) {
      this.uploadTip = '点击上传'
      this.processing = false
      this.dialogImportVisible = false
      if (obj.code === 99999) {
        this.$message.error('导入失败' + '!')
      } else {
        this.$message.success('导入成功' + '!')
        this.$router.back(-1)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./../../styles/variables";
$active: #13ce66;
$inactive: #ccc;
.securitySetting {
  padding: 20px;
  background: #fff;
  border-radius: 3px;
  margin: 15px;
  border: 1px solid #ebeef5;
  .settingList {
    margin-bottom: 20px;
    .title {
      font-weight: bold;
      line-height: 40px;
      margin-bottom: 20px;
      border-bottom: solid 1px #ccc;
    }
    .set {
      border: solid 1px #ccc;
      border-radius: 3px;
      padding: 15px 30px 15px 20px;
      position: relative;
      display: inline-block;
      margin-right: 20px;
      span:first-child {
        padding-right: 15px;
        border-right: solid 1px #ccc;
        margin-right: 15px;
      }
      .el-icon-setting {
        position: absolute;
        right: 5px;
        top: 5px;
        color: #999;
      }
    }
  }
}
</style>
