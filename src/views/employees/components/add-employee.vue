<template>
  <el-dialog title="新增员工" :visible="showDialog" @close="btnCancel">
    <el-form :model="formDate" ref="form" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formDate.username"
          style="width: 50%"
          placeholder="请输入姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formDate.mobile"
          style="width: 50%"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formDate.timeOfEntry"
          style="width: 50%"
          placeholder="请选择日期"
          type="date"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formDate.formOfEmployment"
          style="width: 50%"
          placeholder="请选择"
        >
          <el-option
            v-for="item of EmployeeEnum.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formDate.workNumber"
          style="width: 50%"
          placeholder="请输入工号"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-loading="loading"
          @focus="getDepartments"
          v-model="formDate.departmentName"
          style="width: 50%"
          placeholder="请输入部门"
        ></el-input>
        <el-tree
          v-if="treeShow"
          @node-click="selectNode"
          :default-expand-all="true"
          :data="treeData"
          :props="{ label: 'name' }"
        ></el-tree>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formDate.correctionTime"
          style="width: 50%"
          placeholder="请输入选择日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-row type="flex" justify="center">
        <el-col :span="6" :offset="0">
          <el-button @click="btnCancel">取消</el-button>
          <el-button type="primary" @click="submitBtn">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>
<script>
import { getDepartmentsAPI } from "@/api/departments";
import { tranListToTreeData } from "@/utils";
import EmployeeEnum from "@/api/constant/employees";
import { addEmployeeAPI } from "@/api/employees";
export default {
  name: "AddEmployee",
  props: {
    // 控制弹层
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      EmployeeEnum, // 枚举转换
      // 表单的数据
      formDate: {
        username: "",
        mobile: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: "",
        timeOfEntry: "",
        correctionTime: "",
      },
      // 表单校验规则
      rules: {
        username: [
          {
            required: true,
            trigger: "blur",
            message: "员工姓名不能为空",
          },
          {
            min: 1,
            max: 4,
            message: "姓名长度为1-4位",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true,
            trigger: "blur",
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        formOfEmployment: [
          {
            required: true,
            trigger: "blur",
            message: "聘用形式不能为空",
          },
        ],
        workNumber: [
          {
            required: true,
            trigger: "blur",
            message: "员工工号不能为空",
          },
        ],
        departmentName: [
          {
            required: true,
            trigger: "change",
            message: "部门名字不能为空",
          },
        ],
        timeOfEntry: [
          {
            required: true,
            trigger: "blur",
            message: "员工入职日期不能为空",
          },
        ],
        correctionTime: [
          {
            required: true,
            trigger: "blur",
            message: "员工转正日期不能为空",
          },
        ],
      },
      // 转换过后的树形部门
      treeData: [],
      // 控制树形组件显示
      treeShow: false,
      // 显示转圈圈
      loading: false,
    };
  },
  methods: {
    async getDepartments() {
      this.loading = true;
      // 显示树形组件
      this.treeShow = true;
      // depts是树形不是数组
      const { depts } = await getDepartmentsAPI();
      // 把部门转换成树形
      this.treeData = tranListToTreeData(depts, "");
      this.loading = false;
    },
    // 获取节点的数据
    selectNode(node) {
      // console.log(node);
      this.formDate.departmentName = node.name;
      // 把部门隐藏
      this.treeShow = false;
    },
    // 点击确定提交表单
    async submitBtn() {
      try {
        // 检查表单是否都校验成功 不写里面的回调返回一个promise
        await this.$refs.form.validate();
        await addEmployeeAPI(this.formDate);
        // this.$parent是一级父组件实例 调用重新获取员工列表的方法
        this.$parent.getEmployeeList();
        // 关闭弹层
        this.$parent.showDialog = false;
      } catch (err) {
        console.log(err);
      }
    },
    // 关闭弹层 清除表单数据和校验
    btnCancel() {
      // 重置校验结果
      this.$refs.form.resetFields();
      // 重置表单数据
      this.formDate = {
        username: "",
        mobile: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: "",
        timeOfEntry: "",
        correctionTime: "",
      };
      this.$emit("update:showDialog", false);
    },
  },
};
</script>
<style></style>
