<template>
  <div class="cont-top-box">
    <el-form label-width="100px">
      <el-form-item label="部门">
        <el-checkbox-group
          v-model="departmentChecks"
          style="display: inline-block"
        >
          <el-checkbox
            v-for="item in departmentList"
            :key="item.id"
            :label="item.id"
            @change="checkChange"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="社保城市">
        <el-checkbox-group
          v-model="socialSecurityChecks"
          style="display: inline-block"
        >
          <el-checkbox
            v-for="item in cityList"
            :key="item.id"
            :label="item.id"
            @change="checkChange"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="公积金城市">
        <el-checkbox-group
          v-model="providentFundChecks"
          style="display: inline-block"
        >
          <el-checkbox
            v-for="item in cityList"
            :key="item.id"
            :label="item.id"
            @change="checkChange"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCityList } from "@/api/common";
import { getDepartmentsAPI } from "@/api/departments";

export default {
  name: "SocialTool",
  data() {
    return {
      tips: {},
      keyword: "",
      departmentChecks: [],
      socialSecurityChecks: [],
      providentFundChecks: [],
      cityList: [],
      departmentList: [],
    };
  },
  created: function () {
    this.getCityList();
    this.getDepartments();
  },
  methods: {
    // 获取城市
    async getCityList() {
      this.cityList = await getCityList();
    },
    // 获取组织架构
    async getDepartments() {
      const { depts } = await getDepartmentsAPI();
      this.departmentList = depts;
    },
    checkChange() {
      const selectParams = {
        departmentChecks: this.departmentChecks,
        socialSecurityChecks: this.socialSecurityChecks,
        providentFundChecks: this.providentFundChecks,
      };
      this.$parent.changeSelectParams &&
        this.$parent.changeSelectParams(selectParams);
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cont-top-box {
  padding: 20px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
