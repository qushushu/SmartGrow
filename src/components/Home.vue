<!-- 
  组件说明： 本组件为首页组件。
  用户权限： 默认情况下本组件针对所有人（包含未登录用户）均可见。但系统管理员登录系统后会自动跳转至用户管理页。
  其他说明：子组件的地址在同级目录Home文件夹下。
-->
<template>
  <div>
    <!-- PC端主体内容 start -->
    <div class="ym-main mobile-hide">
      <!-- <el-carousel :autoplay="false" arrow="always"> -->
        <!-- <el-carousel-item> -->
          <div>
            <div class="inner">
                <Nutrient></Nutrient>
                <CurrentPlan></CurrentPlan>
                <Mode></Mode>
                <Sprinkling></Sprinkling>
            </div>
          </div>
      </el-carousel>

      <!-- <el-row :gutter="10">
        <el-col :lg="18" :md="18" :sm="18" :xs="24">
            <Nutrient></Nutrient>
            <CurrentPlan></CurrentPlan>
            <Mode></Mode>
        </el-col>
        <el-col :lg="6" :md="6" :sm="6" :xs="24">
          <Sprinkling></Sprinkling>
        </el-col>
      </el-row> -->
      <!-- 左侧信息 end -->
    </div>
    <!-- PC端主体内容 end -->
    <!-- 移动端主题内容 start -->
    <div class="ym-main mobile-show">
      <Nutrient></Nutrient>
      <div class="mobile-home-tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="当前环境" name="first"><Environment></Environment></el-tab-pane>
          <el-tab-pane label="当前方案" name="second"><CurrentPlan></CurrentPlan></el-tab-pane>
          <el-tab-pane label="喷灌信息" name="third"><Sprinkling></Sprinkling></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- 移动端主题内容 end -->
    <!-- 时钟 start -->
    <Clock></Clock>
    <!-- 时钟 end -->
  </div>
</template>
<style scoped>
  .space-left {padding-left: 8px;}
  .space-right {padding-right: 8px;}
  .showMoreInfo {float: right;color: #515a6e;font-size: 12px;}
  .morebtnbox {overflow: hidden;margin-bottom: 10px;}
</style>
<script>
  import Nutrient from "./Home/Nutrient"
  import Environment from "./Home/Environment"
  import CurrentPlan from "./Home/CurrentPlan"
  import Sprinkling from "./Home/Sprinkling"
  import Clock from "./Home/Clock"
  import Mode from "./Home/Mode"
  import {autoJump} from "../assets/tools/tool"
  export default {
    name: 'Home',
    components: {
      Nutrient,
      Environment,
      CurrentPlan,
      Sprinkling,
      Clock,
      Mode
    },
    data() {
      return {
        activeName: 'first',
        showCard: 0
      }
    },
    computed: {
      userPower() {
        return this.$store.state.userPower;
      }
    },
    watch: {
      userPower() {
        autoJump(0,1);
      }
    },
    methods: {
      // 获取仪表盘主体信息
      info() {
        this.$store.dispatch("updateRunInfo");
      },
      handleClick(tab, event) {},
    },
    mounted() {
      this.info();
      autoJump(0,1);
    }
  }
</script>