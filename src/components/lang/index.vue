<template>
  <el-dropdown trigger="click" @command="changeLanguage">
    <div>
      <svg-icon style="color: #fff; font-size: 22px" icon-class="language" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh" :disabled="$i18n.locale === 'zh'">
          中文</el-dropdown-item
        >
        <el-dropdown-item command="en" :disabled="$i18n.locale === 'en'">
          en</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script>
import Cookie from "js-cookie";
export default {
  name: "lang",
  methods: {
    // 点击获取该项
    changeLanguage(lang) {
      this.$i18n.locale = lang; // 设置语言
      Cookie.set("language", lang); // 把要切换的语言存cookie
      this.$message.success("切换成功");
    },
  },
};
</script>
<style></style>
