<template>
  <div id="app">
    <Head></Head>
    <div id="mainBox">
      <!-- <div v-if="!isMobile" class="nav-box">
        <Nav></Nav>
      </div> -->
      <div class="app-main">
        <router-view/>
      </div>
  </div>
    
    
  </div>
</template>
<style scoped>
  #mainBox {display: flex;background: #EFF2F9;}
  .nav-box {width: 130px;}
  .app-main {flex: 1}
  #app {background: #EFF2F9;}
</style>
<script>
  import Head from "./components/common/Head.vue"
  import Nav from "./components/common/Nav.vue"
  export default {
    name: 'App',
    computed: {
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

<style>
  #app {height: 100%;}
  @media screen and (max-width: 500px) {
    #app {
        background: none;
    }
  }
</style>
