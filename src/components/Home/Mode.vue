<!-- 
  组件说明： 本组件为仪表盘页面左侧显示方案自动/手动组件。
-->
<template>
    <a-card size="small" class="space-btm">
        <div>模式：{{runInfo.dig.AUTO ? '自动':'手动'}}</div>
    </a-card>
</template>
<style scoped>
    .space-btm {margin-bottom: 10px;}
</style>
<script>
    export default {
        computed: {
            runInfo() {
                return this.$store.state.runInfo;
            }
        }
    }
</script>