<template>
  <div id="app">
    <!-- 头部 start -->
    <Head></Head>
    <!-- 头部 end -->
    <div id="mainBox">
      <!-- 导航 start -->
      <Nav></Nav>
      <!-- 导航 end -->
      <!-- 内容 start -->
      <router-view/>
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
  export default {
    name: 'App',
    computed: {
      // 是否为本地模式
      isMode() {
        return this.$store.state.localMode;
      },
      // 是否为移动端
      isMobile() {
        return this.$store.state.isMobile;
      },
    },
    components: {
      Head,
      Nav
    },
    mounted() {
      let timer;
      if(!this.isMode) {
        timer = setInterval(()=> {
            this.$store.dispatch("updateRunInfo");
        },1000);
      } else {
        clearInterval(timer);
      }
    }
  }
</script>