<template>
  <div ref="main" style="width: 600px; height: 400px"></div>
</template>
<script>
// echarts按需引入
const echarts = require("echarts/lib/echarts");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
require("echarts/lib/chart/radar");
export default {
  mounted() {
    // 接下来的使用就跟之前一样，初始化图表，设置配置项
    var myChart = echarts.init(this.$refs.main);
    myChart.setOption({
      title: {
        text: "人力资源基础绩效表",
      },
      legend: {
        data: ["自我预期", "实际"],
      },
      radar: {
        // 每个区域的最高值
        indicator: [
          { name: "工作效率", max: 100 },
          { name: "考勤", max: 100 },
          { name: "积极性", max: 100 },
          { name: "帮助同事", max: 100 },
          { name: "自主学习", max: 100 },
          { name: "正确率", max: 100 },
        ],
      },
      series: [
        {
          name: "Budget vs spending",
          type: "radar",
          data: [
            {
              value: [60, 60, 60, 60, 60, 60],
              name: "自我预期",
            },
            {
              value: [20, 30, 10, 50, 80, 40],
              name: "实际",
            },
          ],
        },
      ],
    });
  },
};
</script>
<style></style>
