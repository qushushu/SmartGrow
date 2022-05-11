<template>
  <div id="app" class="container-fluid">
    <Head></Head>
    <Nav></Nav>
    <router-view/>
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
  #app {background:#137EC2 url(/static/bg.jpg) repeat-x;background-size: 100% auto;height: 100%;}
  @media screen and (max-width: 500px) {
    #app {
        background: none;
    }
  }
</style>
