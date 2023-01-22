<template>
  <div class="salaryApproval">
    <div class="contLeft">
      <div class="topTit">
        <img src="@/assets/common/img.jpeg" alt>
        <div class="info">
          <p class="name"><strong> {{ information.user.fullName }} </strong></p>
          <p>{{ information.user.department }} | {{ information.user.post }}</p>
          <p>{{ information.user.inJobTime }}</p>
        </div>
      </div>
      <div class="content">
        <p v-for="(item, index) in information.body" :key="index"><span>{{ item.key }} </span> {{ item.val }}</p>
      </div>
    </div>
    <div class="contRit">
      <div class="topTit"><strong>审批记录</strong></div>
      <div class="Items">
        <li v-for="(item, index) in reviewHistoryDataes" :key="index">
          <div class="name">
            <p>{{ item.opTime }}</p>
            <p>{{ item.description }}</p>
          </div>
          <div class="act">
            <strong>{{ item.opUserName }}</strong>
            <span v-if="item.state == 1">审批中</span>
            <span v-else-if="item.state == 2">审批驳回</span>
            <span v-else-if="item.state == 3">已撤销</span>
            <span v-else-if="item.state == 4">审批通过</span>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import { getInformation, getReviewHistory } from '@/api/approvals'

export default {
  name: 'UsersTableIndex',
  components: { },
  data() {
    return {
      information: {},
      reviewHistoryDataes: {}
    }
  },
  created() {
    this.getInformation()
    this.getReviewHistory()
  },
  methods: {
    async getInformation() {
      this.information = await getInformation({ id: 1 })
    },
    async  getReviewHistory(id) {
      const { data } = await getReviewHistory({ id: 1 })
      this.reviewHistoryDataes = data
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./../../styles/variables";
  .salaryApproval{
    display: flex;
    padding: 15px;
    .contLeft{
      flex: 4;
      background: #fff;
      margin-right: 10px;
      padding: 20px;
      .topTit{
        display: flex;
        border-bottom: solid 1px #ccc;
        img{
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
        .more{
          display: inline-block;
          position: relative;
          text-align: center;
          width: 16px;
          line-height: 14px;
          font-size: 12px;
          top: -1px;
          left: 5px;
          border: solid 1px #666;
          color:#666;
          border-radius: 50px;
        }
        .info{
          margin-left: 10px;
          line-height: 25px;
          .name{
            span{
              background: $green1;
              color:#fff;
              padding: 4px 10px;
              border-radius: 3px;
              margin-left: 10px;
              font-size: 12px;
            }
          }
          .time{
            ul{
              position: relative;
              display: inline-block;
              li{
                position: absolute;
                border-radius: 3px;
                box-shadow: 1px 2px 2px #ccc;
                top: 34px;
                left: -43px;
                width: 500px;
                padding:5px 10px;
                line-height: 20px;
                display: none;
                background: #fff;
                border: solid 1px #ccc;
              }
              li::before{
                position:absolute;
                content: '∧';
                left: 50px;
                top: -15px;
                background: #fff;
                color:#ccc;
              }
            }
            ul:hover li{
              display: block;
            }
          }
        }
      }
      .content{
        padding: 10px 0;
        min-height: 500px;
        p{
          margin: 25px 0;
          span{
            display: inline-block;
            width: 80px;
            margin-right: 20px;
            color:#999;
            border-right: solid 1px #ccc;
          }
        }
      }
    }
    .contRit{
      flex: 1;
      background: #fff;
      padding:0 20px;
      .topTit{
        margin-bottom: 10px;
        border-bottom: solid 1px #ccc;
        line-height: 40px;
      }
      .Items{
        padding: 20px 0;
        li{
          display: flex;
          min-height: 70px;
          .name{
            position: relative;
            text-align: center;
            line-height: 24px;
            padding: 0 0 10px 0;
            flex: 3;
            border-right:solid 1px #ccc;
          }
          .name:after{
            content: ' ';
            border-radius: 50%;
            position: absolute;
            width: 10px;
            height: 10px;
            border:solid 2px $green1;
            right: -5px;
            top:0px;
            background: #fff;
          }
          .act{
            flex: 2;
            text-align: center;
          }
        }
      }
    }
  }
</style>
