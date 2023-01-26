<template>
  <!-- 工作日历 -->
  <div>
    <el-row :gutter="20" type="flex" justify="end">
      <!-- 年 -->
      <el-select
        @change="dateChange"
        v-model="currentYear"
        size="small"
        style="width: 120px"
      >
        <el-option
          v-for="item of yearList"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <!-- 月 -->
      <el-select
        @change="dateChange"
        v-model="currentMonth"
        size="small"
        style="width: 120px"
      >
        <el-option v-for="item of 12" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
    </el-row>
    <!-- 日历 -->
    <el-calendar v-model="currentDate">
      <template #dateCell="{ data, date }">
        <div class="date-content">
          <!-- 
            date单元格代表的日期
            data	{ type, isSelected, day}，day 是格式化的日期，格式为 yyyy-MM-dd
           -->
          <span class="text"> {{ data.day | getDay }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>
<script>
export default {
  name: "WorkCalendar",
  props: {
    // 用户传过来的时间 如果不传则用默认时间
    startDate: {
      type: Date,
      default: () => new Date(),
    },
  },
  data() {
    return {
      // 取时间的前五年和后五年
      yearList: [],
      // 当前年
      currentYear: null,
      // 当前月
      currentMonth: null,
      // 当前时间
      currentDate: null,
    };
  },
  created() {
    // 从日期里面获取当前年
    this.currentYear = this.startDate.getFullYear();
    // 从日期里面获取当前月
    this.currentMonth = this.startDate.getMonth() + 1;
    // 获取当前年的前五年和后五年
    this.yearList = Array.from(
      Array(11),
      (value, index) => index + this.currentYear - 5
    );
    this.dateChange();
  },
  methods: {
    // 获取当前时间 从1号开始
    dateChange() {
      this.currentDate = new Date(
        `${this.currentYear}-${this.currentMonth}-01`
      );
    },
    // 控制周末显示 休
    isWeek(date) {
      return date.getDay() === 0 || date.getDay() === 6;
    },
  },
  filters: {
    // 对data.day时间进行处理 默认格式是yyyy-MM-dd 只需要天数
    getDay(value) {
      const day = value.split("-")[2];
      // startsWith() 判断字符串开头是不是
      // substr() 保留字符串多少到多少
      // 去掉天数前面的0
      return day.startsWith("0") ? day.substr(1) : day;
    },
  },
};
</script>
<style scoped>
/deep/ .el-calendar-day {
  height: auto;
}
/deep/ .el-calendar-table__row td,
/deep/ .el-calendar-table tr td:first-child,
/deep/ .el-calendar-table__row td.prev {
  border: none;
}
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text {
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
}
/deep/ .el-calendar-table td.is-selected .text {
  background: #409eff;
  color: #fff;
  border-radius: 50%;
}
/deep/ .el-calendar__header {
  display: none;
}
</style>
