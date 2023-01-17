<template>
  <div class="detail-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <el-form
              :model="userInfo"
              :rules="rules"
              ref="form"
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名" prop="username">
                <el-input
                  v-model="userInfo.username"
                  style="width: 300px"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password2">
                <el-input
                  v-model="userInfo.password2"
                  style="width: 300px"
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item label-width="180px">
                <el-button @click="userInfo = { username: '', password2: '' }"
                  >重置</el-button
                >
                <el-button type="primary" @click="saveUser">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <!-- 动态组件 is绑定组件的名字 -->
            <component is="UserInfo" />
            <!-- <UserInfo /> -->
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <component is="JobInfo" />
            <!-- <JobInfo /> -->
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailByIdAPI } from "@/api/user";
import { saveUserDetailByIdAPI } from "@/api/employees";
import UserInfo from "../components/user-info.vue";
import JobInfo from "../components/job-info.vue";
export default {
  name: "Detail",
  components: {
    UserInfo,
    JobInfo,
  },
  data() {
    return {
      // 存放点击对应员工的id 路由传参
      userId: this.$route.params.id,
      // 存放获取当前员工的信息 做数据回显
      userInfo: {
        username: "",
        password2: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur",
          },
          {
            min: 1,
            max: 4,
            message: "姓名长度为1-4位",
            trigger: "blur",
          },
        ],
        password2: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
          {
            min: 6,
            max: 11,
            message: "密码长度为6-11位",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getUserDetailById();
  },
  methods: {
    // 获取员工基本信息
    async getUserDetailById() {
      this.userInfo = await getUserDetailByIdAPI(this.userId);
    },
    // 更新员工基本信息
    async saveUser() {
      // el-form 的手动校验 validate() 方法传入一个回调 回调第一个是布尔值 校验通为true
      // 不传入回调函数
      try {
        await this.$refs.form.validate();
        // 对象的拼接 键一样 新值覆盖旧值
        await saveUserDetailByIdAPI({
          ...this.userInfo,
          password: this.userInfo.password2,
        });
        this.$message.success("更新成功");
      } catch (err) {
        console.log(err.message);
      }
    },
  },
};
</script>

<style></style>
