<template>
  <div id="app">
    <!-- <TempLayer></TempLayer> -->
    <!-- 头部 start -->
    <Head></Head>
    <!-- 头部 end -->
    <div id="mainBox">
      <!-- 导航 start -->
      <Nav></Nav>
      <!-- 导航 end -->
      <!-- 内容 start -->
      <router-view />
      <!-- 内容 end -->
    </div>
  </div>
</template>
<style scoped>
  #app {background: #EFF2F9;}
  #mainBox {display: flex;}
</style>
<script>
  import Head from "./components/common/Head.vue"
  import Nav from "./components/common/Nav.vue"
  import TempLayer from "./components/common/TempLayer.vue"
  import {getUserPower} from "./assets/tools/tool"
  export default {
    name: 'App',
    computed: {
      // 是否为本地模式
      isMode() {
        return this.$store.state.localMode;
      }
    },
    components: {
      Head,
      Nav,
      TempLayer
    },
    mounted() {
      let timer;
      if(!this.isMode && getUserPower() != 2) {
        // 线上模式每秒钟调用updateRunInfo接口获取信息
        timer = setInterval(()=> {
            this.$store.dispatch("updateRunInfo");
        },1000);
      } else {
        clearInterval(timer);
      }
    }
  }
</script>