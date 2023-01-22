<template>
  <div class="quitApproval">
    <div class="contLeft">
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
          <span>补偿方式：</span>
          调休
        </p>
        <p>
          <span>加班开始时间：</span>
          {{ information.data.start_time | formatDate }}
        </p>
        <p>
          <span>加班结束时间：</span>
          {{ information.data.end_time | formatDate }}
        </p>
        <p>
          <span>申请原因：</span>
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
          <div class="name" :style="index==taskInstanceOutList.length-1?'border-right:none':''">
            <p>{{ item.handleTime | formatDate }}</p>
            <!-- <p>{{item.description}}</p> -->
          </div>
          <div class="act">
            <strong>{{ item.handleUserName }}</strong>
            <span v-if="index==0">发起申请</span>
            <span v-else-if="item.handleType == '3'">审批驳回</span>
            <span v-else-if="item.handleType == '4'">已撤销</span>
            <span v-else-if="item.handleType == '1'">未开始</span>
            <span v-else-if="item.handleType == '2'">审批通过</span>
            <span v-else>审批中</span>
          </div>
        </li>
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
    },
    imgHandle(obj) {
      return window.URL.createObjectURL(obj)
    }
  }
}
</script>
