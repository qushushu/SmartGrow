<!-- 
  组件说明： 本组件为仪表盘页面左侧显示当前EC、PH值组件。
  其他说明： 这些值会自动变化，每秒中调用定时器更新数值。
-->
<template>
    <div>
        <!-- PC端基本信息 start -->
        <a-card size="small" class="space-btm mobile-hide special-card1">
            <el-row :gutter="1">
                <a-col :lg="12" :xl="12" :sm="6" :xs="6"><a-statistic title="营养液EC值(us/cm)" :value="runInfo.ana.EC ? runInfo.ana.EC.toFixed(2) : '--'" class="space-btm" /></a-col>
                <a-col :lg="12" :xl="12" :sm="6" :xs="6"><a-statistic title="营养液PH值" :value="runInfo.ana.PH ? runInfo.ana.PH.toFixed(2) : '--'" class="space-btm" /></a-col>
                <a-col :lg="12" :xl="12" :sm="6" :xs="6"><a-statistic title="管道压力(KPA)" :value="runInfo.ana.OUT_PRESS ? runInfo.ana.OUT_PRESS.toFixed(2) : '0'" /></a-col>
                <a-col :lg="12" :xl="12" :sm="6" :xs="6"><a-statistic title="营养液温度(℃)" :value="runInfo.ana.LIQ_TEMP ? runInfo.ana.LIQ_TEMP.toFixed(2) : '--'" /></a-col>
            </el-row>
        </a-card>
        <!-- PC端基本信息 end -->
        <!-- 移动端基本信息 start -->
        <a-card size="small" class="space-btm mobile-show mobile-tp_col">
            <el-row :gutter="20">
              <el-col :span="6"><a-statistic title="营养液EC(us/cm)" :value="runInfo.ana.EC ? runInfo.ana.EC.toFixed(2) : '--'" class="space-btm" /></el-col>
              <el-col :span="6"><a-statistic title="营养液PH" :value="runInfo.ana.PH ? runInfo.ana.PH.toFixed(2) : '--'" class="space-btm" /></el-col>
              <el-col :span="6"><a-statistic title="管道压力(KPA)" :value="runInfo.ana.OUT_PRESS ? runInfo.ana.OUT_PRESS.toFixed(2) : '0'" /></el-col>
              <el-col :span="6"><a-statistic title="营养液温度(℃)" :value="runInfo.ana.LIQ_TEMP ? runInfo.ana.LIQ_TEMP.toFixed(2) : '--'" /></el-col>
            </el-row>
        </a-card>
        <!-- 移动端基本信息 end -->
    </div>
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