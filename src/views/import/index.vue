<template>
  <UploadExcel :onSuccess="success"></UploadExcel>
</template>
<script>
import { importEmployeeAPI } from "@/api/employees";
export default {
  name: "Import",
  methods: {
    // 获取excel导入员工的头部和数据
    async success({ header, results }) {
      //   username: "",
      //   mobile: "",
      //   formOfEmployment: "",
      //   workNumber: "",
      //   departmentName: "",
      //   timeOfEntry: "",
      //   correctionTime: "",
      // 存放键的中文和英文
      const userRelations = {
        手机号: "mobile",
        姓名: "username",
        入职日期: "timeOfEntry",
        转正日期: "correctionTime",
        工号: "workNumber",
      };
      // 把表里的中文键换成英文的
      const newArr = results.map((item) => {
        // 用来保存转换后的对象
        const userInfo = {};
        // 把对象转成数组 里面保存着键 遍历 为userInfo添加转换后的对象(把中文的键转成英文的)
        Object.keys(item).forEach((key) => {
          // 判断当前的key 是不是时间 如果是时间则做特殊的处理
          if (
            userRelations[key] === "correctionTime" ||
            userRelations[key] === "timeOfEntry"
          ) {
            userInfo[userRelations[key]] = new Date(
              this.formatDate(item[key], "/")
            );
            return;
          }
          userInfo[userRelations[key]] = item[key];
        });
        return userInfo;
      });
      // 调接口 存导入的员工
      await importEmployeeAPI(newArr);
      this.$message.success("导入成功");
      // 返回进来时的路由
      this.$router.back();
    },
    // 当excel中有日期格式的时候，实际转化的值为一个数字
    // 转换excel中的日期 numb传excel的日期 format传以什么分隔(2020-2-12)
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1);
      time.setYear(time.getFullYear() - 70);
      const year = time.getFullYear() + "";
      const month = time.getMonth() + 1 + "";
      const date = time.getDate() - 1 + "";
      if (format && format.length === 1) {
        return year + format + month + format + date;
      }
      return (
        year +
        (month < 10 ? "0" + month : month) +
        (date < 10 ? "0" + date : date)
      );
    },
  },
};
</script>
<style></style>
