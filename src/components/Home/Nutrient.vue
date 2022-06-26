<!-- 
  组件说明： 本组件为仪表盘页面左侧显示当前EC、PH值组件。
  其他说明： 这些值会自动变化，每秒中调用定时器更新数值。
-->
<template>
  <!-- PC端基本信息 start -->
  <a-card size="small" class="space-btm text-center">
    <el-row justify="space-between" type="flex">
      <el-col v-for="item,key in dataInfo" :key="key">
        <p class="text-dt">{{item.name}}</p>
        <p class="text-dd">{{item.value}} <span class="dw" v-if="item.dw">{{item.dw}}</span></p>
      </el-col>
    </el-row>
  </a-card>
  <!-- PC端基本信息 end -->
</template>
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