<!-- 
  组件说明： 本组件为头部导航组件。
-->
<template>
    <el-menu :default-active="$route.path" mode="vertical" router>
      <el-menu-item index="/" v-if="userPower != 2">{{$t("message.仪表盘")}}</el-menu-item>
      <el-menu-item index="/Operation" v-if="userPower == 1">手动操作</el-menu-item>
      <el-menu-item index="/DeviceModel" v-if="userPower == 1">设备模板</el-menu-item>
      <el-menu-item index="/Device" v-if="userPower == 1">设备参数</el-menu-item>
      <el-menu-item index="/DeviceInfo" v-if="userPower == 1">设备信息</el-menu-item>
      <el-menu-item index="/PlanSetting" v-if="userPower == 1">方案管理</el-menu-item>
      <el-menu-item index="/History" v-if="userPower == 1">历史记录</el-menu-item>
      <el-menu-item index="/User" v-if="userPower == 2">用户管理</el-menu-item>
      <el-menu-item index="/CreateLanguage" v-if="userPower == 2">多语言配置</el-menu-item>
    </el-menu>
</template>
<style scoped>
  /*.el-menu-demo {padding-left: 3%;padding-right: 3%;}
  .el-menu.el-menu--horizontal {border-radius: 4px 4px 0 0;overflow: hidden;}
  .el-menu--horizontal>.el-menu-item {height: 40px;line-height: 40px;padding: 0 12px !important;}*/
  @media screen and (max-width: 500px) {
    .el-menu-demo {display: none;}
  }
</style>
<script>
  import axios from 'axios'
	export default {
    data() {
      return {
        mode: "vertical",    // 导航展示方向
        mobile: this.$attrs.mobile || false,   // 移动端显示处理
      }
    },
    mounted() {
      // 更新用户权限
      this.$store.dispatch("updateUserPower");
    },
    computed: {
      // 请求地址
      apiurl() {
          return this.$store.state.apiurl;
      },
      // 用户权限
      userPower() {
        // return 1;  // 测试使用
        return this.$store.state.userPower;
      }
    }
  }
</script>