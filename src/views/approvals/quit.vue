<template>
  <div class="quitApproval">
    <div class="contLeft">
      <h2>{{ information.user_name }}申请离职</h2>
      <div class="topTit">
        <img src="@/assets/common/img.jpeg" alt>
        <div class="info">
          <p class="name">
            <strong>{{ information.username }}</strong>
          </p>
          <p>
            <span>部门：{{ information.departmentName }}</span>
          </p>
          <p>
            <span>入职时间： {{ information.timeOfEntry | formatDate }}</span>
          </p>
        </div>
      </div>
      <div class="content">
        <!-- <p v-for="(item, index) in information.body" :key="index"><span>{{item.key}} </span> {{item.val}}</p> -->
        <p>
          <span>申请类型：</span>离职
        </p>
        <p>
          <span>期望离职时间：</span>
          {{ information.data.exceptTime | formatDate }}
        </p>
        <p>
          <span>离职原因：</span>
          {{ information.data.reason }}
        </p>
      </div>
    </div>
    <div class="contRit">
      <div class="topTit">
        <strong>审批记录</strong>
      </div>
      <div class="Items">
        <li v-for="(item, index) in taskInstanceOutList" :key="index">
          <div class="name">
            <p>{{ item.handleTime | formatDate }}</p>
            <!-- <p>{{item.description}}</p> -->
          </div>
          <div class="act">
            <strong>{{ item.shouldUserName }}</strong>
            <span v-if="item.handleType == '3'">审批驳回</span>
            <span v-else-if="item.handleType == '4'">已撤销</span>
            <span v-else-if="item.handleType == '1'">未开始</span>
            <span v-else-if="item.handleType == '2'">审批通过</span>
            <span v-else>审批中</span>
          </div>
        </li>
        <li />
      </div>
    </div>
  </div>
</template>

<script>
import { getApprovalsDetail, getApprovalsTaskDetail, downImg } from '@/api/approvals'
export default {
  name: 'UsersTableIndex',

  data() {
    return {
      approvalId: this.$route.params.id,
      information: {
        data: {}
      },
      taskInstanceOutList: [],
      imgs: ''
    }
  },
  created() {
    this.getApprovalsDetail()
    this.getApprovalsTaskDetail()
  },
  methods: {
    async getApprovalsDetail() {
      this.information = await getApprovalsDetail(this.approvalId)
      this.information.data = JSON.parse(this.information.procData)
    },
    async getApprovalsTaskDetail() {
      this.taskInstanceOutList = await getApprovalsTaskDetail(this.approvalId)
    },
    // 图片下载
    async getReviewHistory(id) {
      const response = await downImg(id)
      this.imgs = 'data:image/png;base64,' + btoa(
        new Uint8Array(response.request.response).reduce((data, byte) => data + String.fromCharCode(byte), '')
      )
    }
  }
}
</script>

