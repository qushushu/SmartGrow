<!-- 
  组件说明： 本组件为仪表盘页面右侧显示喷灌泵相关信息组件。
-->
<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="12">
                <!-- 左喷灌泵 start -->
                <div class="home-cardbox">
                    <div class="home-cardtitle">左喷灌泵<el-switch v-model="runInfo.dig.SIP1 == 1" disabled style="margin-left: 8px;float: right;"></el-switch></div>
                    <div class="home-cardinner">
                        <div>本次喷灌持续时长（s）：{{runInfo.ana.SIP1T || "--"}}</div>
                        <div>下次喷灌时间：{{runInfo.ana.SIP1NT ? minuteToTime(runInfo.ana.SIP1NT)  : "--"}}</div>
                    </div>
                </div>
                <!-- 左喷灌泵 end -->
            </el-col>
            <el-col :span="12">
                <!-- 右喷灌泵 start -->
                <div class="home-cardbox">
                    <div class="home-cardtitle">右喷灌泵<el-switch v-model="runInfo.dig.SIP2 == 1" disabled style="margin-left: 8px;float: right;"></el-switch></div>
                    <div class="home-cardinner">
                        <div>本次喷灌持续时长（s）：{{runInfo.ana.SIP2T || "--"}}</div>
                        <div>下次喷灌时间：{{runInfo.ana.SIP2NT ? minuteToTime(runInfo.ana.SIP2NT)  : "--"}}</div>
                    </div>
                </div>
                <!-- 右喷灌泵 end -->
            </el-col>
        </el-row>
      
        <el-row :gutter="10">
            <el-col :span="12">
                <!-- 回水泵 start -->
                <div class="home-cardbox">
                    <div class="home-cardtitle">回水泵<el-switch v-model="runInfo.dig.BWP1 == 1" disabled style="margin-left: 8px;float: right;"></el-switch></div>
                </div>
                <!-- 回水泵 end -->
            </el-col>
            <el-col :span="12">
                 <!-- 补水阀 start -->
                <div class="home-cardbox">
                    <div class="home-cardtitle">补水阀<el-switch v-model="runInfo.dig.WSV == 1" disabled style="margin-left: 8px;float: right;"></el-switch></div>
                </div>
                <!-- 补水阀 end -->
            </el-col>
        </el-row>
        <!-- 水阀 start -->
           
            <el-row :gutter="10">
                <el-col :span="12">
                    <div class="home-cardbox">
                        <div class="home-cardtitle">左侧水阀</div>
                        <table class="normal-table">
                            <tr>
                                <td><span>4层</span> 
                                    <span style="float:right">
                                        <el-switch v-model="runInfo.dig.VL4 == '1'" disabled class="space-left1"></el-switch>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>3层</span>
                                    <span style="float:right">
                                        <el-switch v-model="runInfo.dig.VL3 == '1'" disabled class="space-left1"></el-switch>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>2层</span> 
                                    <span style="float:right">
                                        <el-switch v-model="runInfo.dig.VL2 == '1'" disabled class="space-left1"></el-switch>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>1层</span>
                                    <span style="float:right">
                                        <el-switch v-model="runInfo.dig.VL1 == '1'" disabled class="space-left1"></el-switch>
                                    </span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="home-cardbox">
                         <div class="home-cardtitle">右侧水阀</div>
                        <table class="normal-table">
                            <tr>
                                <td>
                                    <span>4层</span> 
                                    <span style="float:right">
                                     <el-switch v-model="runInfo.dig.VR4 == '1'" disabled class="space-left1"></el-switch></span>
                                    </span>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <span>3层</span> 
                                     <span style="float:right">
                                        <el-switch v-model="runInfo.dig.VR3 == '1'" disabled class="space-left1"></el-switch>
                                     </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>2层</span> 
                                    <span style="float:right">
                                        <el-switch v-model="runInfo.dig.VR2 == '1'" disabled class="space-left1"></el-switch>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>1层</span> 
                                    <span style="float:right">
                                        <el-switch v-model="runInfo.dig.VR1 == '1'" disabled class="space-left1"></el-switch>
                                    </span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </el-col>
            </el-row>
        <!-- 水阀 end -->
        <el-row :gutter="10">
            <el-col :span="12">
                <!-- 液位 start -->
                <div class="home-cardbox">
                    <div class="home-cardtitle">液位</div>
                    <div class="home-cardinner">
                         <WaterBox 
                            :liqLv="liqLv"
                            :lbBwUpAlm="lbBwUpAlm"
                            :lbBwAlm="lbBwAlm"
                            :lvTv="lvTv"
                            :lvAdj="lvAdj"
                        ></WaterBox>
                    </div>
                </div>
                <!-- 液位 end -->
            </el-col>
            <el-col :span="12">
                <!-- 回水液位 start -->
                <div class="home-cardbox">
                    <div class="home-cardtitle">回水液位</div>
                    <div class="home-cardinner">
                         <BWaterBox 
                             :liqLv="liqLv1"
                             :lbBwUpAlm="lbBwUpAlm1"
                             :lbBwAlm="lbBwAlm1"
                             :lvTv="lvTv1"
                             :lvAdj="lvAdj1"
                        ></BWaterBox>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<style scoped>
   .space-btm1 {margin-bottom: 20px;}
  .form-text-inner {display: flex;justify-content: space-between;width: 85%;}
  .card {margin-bottom: 10px;}
  .normal-table {border-collapse: collapse; border:  1px solid #f1f1f1; width: 100%; font-size: 12px; color: #606266; }
  .normal-table td { border:  1px solid #f1f1f1;padding: 8px;}
  .space-left1 {margin-left: 1px;}

  .home-cardbox {background: #FFF;padding: 0px 0 4px;margin-bottom: 10px;font-size: 12px;border-radius: 2px;color: #808695}
  .home-cardtitle {border-bottom: 1px solid #F7F7F7;padding: 8px 8px;font-size: 14px;}
  .home-cardtitle:only-child {padding-bottom: 3px;border-bottom: 0;}
  .home-cardinner {padding: 0 8px;line-height: 30px;}
  .more-col {display: flex;justify-content: space-between;}
  .more-col > * {width: 49%;}
  @media screen and (max-width: 768px) {
   .space-left1 {margin-left: 2px;}
   .space-btm1_special {margin-bottom: 10px;}
}
</style>
<script>
    import {minuteToTime} from "../../assets/tools/tool"
    import WaterBox from "./WaterBox"
    import BWaterBox from "./BWaterBox"
    export default {
        data() {
            return {
                tableData: [{title: "第四层"}, {title: "第三层"}, {title: "第二层"},{title: "第一层"}],
                tableData1: [{title: "回水泵状态"}],
                renderWaterBox: false,
                renderWaterBox1: false
            }
        },
        methods: {
            minuteToTime
        },
        watch: {
            liqLv() {
                this.renderWaterBox = true;
            },
            liqLv1() {
                this.renderWaterBox1 = true;
            }
        },
        computed: {
            runInfo() {
                return this.$store.state.runInfo;
            },
            curDevInfo() {
                return this.$store.state.curDevInfo;
            },
            level_tv() {
                if(this.curDevInfo.param_item) {
                  let s = this.curDevInfo.param_item;
                  let m = s.filter(item => item.param_code === "LEVEL_TV");
                  if(m && m[0]) {
                    return m[0].value;
                  } else {
                      return 0;
                  }
                } else {
                  return 0;
                }
            },
            liqLv() {
                return this.runInfo.ana.LIQ_LV ? (this.runInfo.ana.LIQ_LV.toFixed(1) + 'cm') : '未知'
            },
            lbBwUpAlm() {
                return this.runInfo.param.LV_UP_ALM ? (this.runInfo.param.LV_UP_ALM + 'cm') : '未知'
            },
            lbBwAlm() {
                return this.runInfo.param.LV_ALM ? (this.runInfo.param.LV_ALM + 'cm') : '未知'
            },
            lvTv() {
                return this.runInfo.param.LV_TV ? (this.runInfo.param.LV_TV + 'cm') : '未知'
            },
            lvAdj() {
                return this.runInfo.param.LV_ADJ ? (this.runInfo.param.LV_ADJ + 'cm') : '未知'
            },
            liqLv1() {
                return this.runInfo.ana.LIQ_B_LV ? (this.runInfo.ana.LIQ_B_LV + 'cm') : '未知'
            },
            lbBwUpAlm1() {
                return this.runInfo.param.LV_BW_UP_ALM ? (this.runInfo.param.LV_BW_UP_ALM + 'cm') : '未知'
            },
            lbBwAlm1() {
                return this.runInfo.param.LV_BW_ALM ? (this.runInfo.param.LV_BW_ALM + 'cm') : '未知'
            },
            lvTv1() {
                return this.runInfo.param.LV_BW_TV ? (this.runInfo.param.LV_BW_TV + 'cm') : '未知'
            },
            lvAdj1() {
                return this.runInfo.param.LV_BW_ADJ ? (this.runInfo.param.LV_BW_ADJ + 'cm') : '未知'
            },
            // 是否为移动端
            isMobile() {
                return this.$store.state.isMobile;
            },
        },
        components: {
            WaterBox,
            BWaterBox
        }
    }
</script>