<template>
  <div v-loading="loading" class="myInfo">
    <div class="myInfoTop">
      <div class="topLab">
        <span class="act">个人信息</span>
      </div>
    </div>
    <div class="myInfoCont">
      <div class="myInfoPic">
        <img src="@/assets/common/img.jpeg" width="100" alt />
      </div>
      <div>
        <el-form ref="myInfo" :model="myInfo" label-width="80px">
          <el-form-item label="姓名" style="width: 300px">
            <el-input v-model="myInfo.username" />
          </el-form-item>
          <el-form-item label="手机号" style="width: 300px">
            <el-input v-model="myInfo.mobile" />
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="myInfo.sex" placeholder="请选择性别">
              <el-option label="男" value="男" />
              <el-option label="女" value="女" />
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker
              v-model="myInfo.dateOfBirth"
              type="date"
              format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserDetailByIdAPI } from "@/api/user";
import { updateUser } from "@/api/approvals";
import { updatePersonal, getPersonalDetail } from "@/api/employees";
import { mapGetters } from "vuex";
export default {
  name: "UsersTableIndex",
  data() {
    return {
      loading: false,
      myInfo: {
        dateOfBirth: "",
        sex: "",
      },
    };
  },
  computed: {
    ...mapGetters(["userId"]),
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async onSubmit() {
      const user = this.myInfo;
      await updateUser(user);
      await updatePersonal(user);
      this.$message.success("保存成功");
    },
    onCancel() {
      this.$router.back(-1);
    },
    async getUserInfo() {
      this.loading = true;
      const detailData = await getUserDetailByIdAPI(this.userId);
      const personData = await getPersonalDetail(this.userId);
      detailData.sex = personData.sex;
      detailData.dateOfBirth = personData.dateOfBirth;
      this.myInfo = detailData;
      this.loading = false;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/variables.scss";
.myInfo {
  padding: 15px;
  margin-top: 15px;
  .myInfoTop {
    color: #666;
    background: #fff;
    border-bottom: solid 1px #ccc;
    line-height: 40px;
    span {
      display: inline-block;
      padding: 0 25px;
      font-size: 18px;
      cursor: pointer;
    }
    .act {
      color: $blue;
      border-bottom: solid 2px $blue;
    }
  }
  .myInfoCont {
    background: #fff;
    display: flex;
    padding: 20px;
    .myInfoPic {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: solid 1px #ccc;
      margin-right: 40px;
      img {
        width: 100px;
        height: 100px;
      }
    }
    div:last-child {
      flex: 1;
    }
  }
}
</style>
