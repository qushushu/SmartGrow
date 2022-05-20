<template>
  <div id="app">
    <Head></Head>
    <div style="display: flex">
      <div style="width: 130px;">
        <Nav></Nav>
      </div>
      <div style="flex: 1">
        <router-view/>
      </div>
    </div>
    
    
  </div>
</template>

<script>
  import Head from "./components/common/Head.vue"
  import Nav from "./components/common/Nav.vue"
  export default {
    name: 'App',
    computed: {
      isMode() {
        return this.$store.state.localMode;
      }
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
