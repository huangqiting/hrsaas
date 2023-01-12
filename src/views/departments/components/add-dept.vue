<template>
  <!-- @close关闭弹层执行里面回调 -->
  <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
    <!-- 匿名插槽 -->
    <!-- label-width就是label的宽度 -->
    <el-form
      ref="deptForm"
      :model="formDate"
      :rules="formRules"
      label-width="120px"
    >
      <el-form-item prop="name" label="部门名称">
        <el-input
          v-model="formDate.name"
          placeholder="1-8字符"
          style="width: 80%"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code" label="部门编码">
        <el-input
          v-model="formDate.code"
          placeholder="1-8字符"
          style="width: 80%"
        ></el-input>
      </el-form-item>
      <el-form-item prop="manager" label="部门负责人">
        <el-select
          v-model="formDate.manager"
          placeholder="请选择"
          style="width: 80%"
          @focus="getEmployeeSimple"
        >
          <el-option
            v-for="item of peoples"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="introduce" label="部门介绍">
        <el-input
          v-model="formDate.introduce"
          placeholder="1-100字符"
          style="width: 80%"
          type="textarea"
          :rows="3"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row :gutter="20" slot="footer" type="flex" justify="center">
      <el-col :span="6" :offset="0">
        <el-button @click="btnCancel">取 消</el-button>
        <el-button type="primary" @click="onSubmitBtn">确 定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import {
  getDepartmentsAPI,
  addDepartmentsAPI,
  getDepartDetailAPI,
  updateDepartmentsAPI,
} from "@/api/departments";
import { getEmployeeSimpleAPI } from "@/api/employees";
export default {
  name: "AddDept",
  computed: {
    // 控制标题的名字
    showTitle() {
      return this.formDate.id ? "编辑部门" : "新增部门";
    },
  },
  props: {
    // 控制弹层是否显示
    showDialog: {
      type: Boolean,
      default: false,
    },
    // 当前点击的部门
    treeNode: {
      type: Object, // 传过来的值必须为对象
      default: null,
    },
  },
  data() {
    // 校验输入的部门名字是否与数据中的部门名字重复
    const checkNameRepeat = async (rule, value, callback) => {
      // 必须重新获取部门的信息 防止你添加的时候 别人也添加了 部门名字还是可能重复
      const { depts } = await getDepartmentsAPI();
      let isRepeat = false;
      if (this.formDate.id) {
        // 编辑的情况下 把跟同级的节点筛选出来 并把自己去除 再判断找出与输入部门名字相同的名字
        isRepeat = depts
          .filter(
            (item) =>
              item.pid === this.treeNode.pid && item.id !== this.treeNode.id
          )
          .some((item) => item.name === value);
      } else {
        // 先把点击的这个部门的 子部门筛选出来 然后用some 找出与输入部门名字相同的名字 找到为true
        isRepeat = depts
          .filter((item) => item.pid === this.treeNode.id)
          .some((item) => item.name === value);
      }

      isRepeat ? callback(new Error(`${value}已存在`)) : callback();
      // console.log(this.treeNode);
      // console.log(isRepeat);
      // console.log(depts);
    };
    // 校验输入的部门编码是否与数据中的部门编码重复
    // 部门编码在整个模块中都不允许重复
    const checkCodeRepeat = async (rule, value, callback) => {
      const { depts } = await getDepartmentsAPI();
      let isRepeat = false;
      if (this.formDate.id) {
        // 把自己筛选出来
        isRepeat = depts
          .filter((item) => item.id !== this.formDate.id)
          .some((item) => item.code === value);
      } else {
        isRepeat = depts.some((item) => item.code === value);
      }
      isRepeat ? callback(new Error(`${value}已存在`)) : callback();
    };
    return {
      // 表单数据
      formDate: {
        name: "", // 部门名称
        code: "", // 部门编码
        manager: "", // 部门负责人
        introduce: "", // 部门介绍
      },
      // 表单校验规则
      formRules: {
        name: [
          {
            required: true,
            message: "部门名称不能为空",
            trigger: "blur",
          },
          {
            min: 1,
            max: 8,
            message: "部门名称要求1-8个字符",
          },
          {
            trigger: "blur",
            validator: checkNameRepeat,
          },
        ],
        code: [
          {
            required: true,
            message: "部门编码不能为空",
            trigger: "blur",
          },
          {
            min: 1,
            max: 8,
            message: "部门编要求1-8个字符",
          },
          {
            trigger: "blur",
            validator: checkCodeRepeat,
          },
        ],
        manager: [
          {
            required: true,
            message: "部门负责人不能为空",
            trigger: "blur",
          },
        ],
        introduce: [
          {
            required: true,
            message: "部门介绍不能为空",
            trigger: "blur",
          },
          {
            min: 1,
            max: 100,
            message: "部门介绍要求1-100个字符",
          },
        ],
      },
      // 获取部门负责人
      peoples: [],
    };
  },
  methods: {
    // 获取部门负责人
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimpleAPI();
    },
    // 添加部门
    async onSubmitBtn() {
      try {
        // validate() 不传回调函数传入一个promise
        await this.$refs.deptForm.validate();
        // 判断是编辑还是添加
        if (this.formDate.id) {
          // 编辑
          await updateDepartmentsAPI(this.formDate);
          this.$message.success("修改成功");
        } else {
          // 添加
          await addDepartmentsAPI({ ...this.formDate, pid: this.treeNode.id });
          this.$message.success("添加成功");
        }
        console.log(this.formDate.id);
        // 添加的这个部门的pid为 点击添加部门的id 表示为这个部门添加子部门
        // sync修饰符的固定写法 update:props里面的属性名
        this.$emit("update:showDialog", false);
        // 通知父组件跟新视图
        this.$emit("addDepts");
        // 提示用户添加成功
      } catch {
        this.$message.error("添加失败");
      }
    },
    // 关闭弹层 清除表单
    btnCancel() {
      // 由于resetFields()只能清除formDate原来的属性
      // 不能清空后面接口里面的属性 所以要重置一下formDate
      this.formDate = {
        name: "",
        code: "",
        manager: "",
        introduce: "",
      };
      this.$emit("update:showDialog", false);
      this.$refs.deptForm.resetFields();
    },
    // 获取部门详情
    // 必须从父组件那里调用这个方法 如果用this.treeNode.id 可能会获取不到 因为props是异步
    async getDepartDetail(id) {
      this.formDate = await getDepartDetailAPI(id);
    },
  },
};
</script>
<style lang="scss"></style>
