<!-- 
  组件说明： 本组件为仪表盘页面左侧显示当前EC、PH值组件。
  其他说明： 这些值会自动变化，每秒中调用定时器更新数值。
-->
<template>
    <div>
        <!-- PC端基本信息 start -->
        <a-card size="small" class="space-btm mobile-hide special-card1">
          <div style="display: flex;text-align: center">
            <div v-for="item in dataInfo" style="flex: 1">
              <p style="font-size: 14px;color:#808695;line-height: 22px;">{{item.name}}</p>
              <p style="color: #515a6e;font-size: 22px;">{{item.value}} <span class="dw" v-if="item.dw">{{item.dw}}</span></p>
            </div>
          </div>
            <el-row :gutter="1">
              <!-- <a-col :lg="3" :xl="3" :sm="3" :xs="3"><a-statistic :title="" :value="item.value"  /></a-col> -->
                <!-- <a-col :lg="3" :xl="3" :sm="3" :xs="3"><a-statistic title="营养液EC值" :value="" class="space-btm" /></a-col> -->
                <!-- <a-col :lg="3" :xl="3" :sm="3" :xs="3"><a-statistic title="营养液PH值" :value="" class="space-btm" /></a-col> -->
                <!-- <a-col :lg="3" :xl="3" :sm="3" :xs="3"><a-statistic title="管道压力" :value="" /></a-col> -->
                <!-- <a-col :lg="3" :xl="3" :sm="3" :xs="3"><a-statistic title="液温" :value="" /></a-col> -->

                <!-- <a-col :lg="3" :xl="3" :sm="3" :xs="3"><a-statistic title="温度" :type=""  /></a-col> -->

                <!-- <a-col :lg="3" :xl="3" :sm="3" :xs="3"><a-statistic title="湿度" :type=""  /></a-col> -->

                <!-- <a-col :lg="3" :xl="3" :sm="3" :xs="3"><a-statistic title="CO2" type="success" :value="" /></a-col> -->
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
   .dw {font-size: 14px;}
</style>
<script>
    export default {
        computed: {
            runInfo() {
                return this.$store.state.runInfo;
            },
            dataInfo() {
              return [{
                name: "营养液EC",
                value: (this.runInfo.ana.EC ? this.runInfo.ana.EC.toFixed(2) : '--') ,
                dw: "us/cm"
              },{
                name: "营养液PH",
                value: this.runInfo.ana.PH ? this.runInfo.ana.PH.toFixed(2) : '--'
              },{
                name: "管道压力",
                value: (this.runInfo.ana.OUT_PRESS ? this.runInfo.ana.OUT_PRESS.toFixed(2) : '0'),
                dw: "KPA"
              },{
                name: "液温",
                value: (this.runInfo.ana.LIQ_TEMP ? this.runInfo.ana.LIQ_TEMP.toFixed(2) : '--'),
                dw: "℃"
              },{
                name: "温度",
                value: (this.runInfo.ana.TEMP ? this.runInfo.ana.TEMP.toFixed(2) :  '--'),
                dw: "℃"
              },{
                name: "湿度",
                value: (this.runInfo.ana.HUM ? this.runInfo.ana.HUM.toFixed(2) : '--'),
                dw: "%"
              },{
                name: "CO2",
                value: (this.runInfo.ana.CO2 ? this.runInfo.ana.CO2.toFixed(2) : '--') ,
                dw: "ppm"
              }]
            }
        }
    }
</script>