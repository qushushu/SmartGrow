<template>
    <div class="card mobile-sprinkling-card">
        <div class="card-body">
            <!-- 喷灌信息 start -->
            <div class="form-text space-btm1 space-btm1_special mobile-hide">
                <a-row type="flex">
                    <a-col justify="space-between" :span="12">
                        <p class="normal-table" style="border: 0">左喷灌泵{{runInfo.dig.SIP1 ? '已开启' : '未开启' }} <el-switch v-model="runInfo.dig.SIP1 == 1" disabled style="margin-left: 8px;"></el-switch></p>
                        <p class="normal-table" style="border: 0">左喷灌泵本次喷灌持续时长（s）：{{runInfo.ana.SIP1T || "--"}}</p>
                        <p class="normal-table" style="border: 0">左喷灌泵下次喷灌时间：{{runInfo.ana.SIP1NT ? minuteToTime(runInfo.ana.SIP1NT)  : "--"}}</p>
                    </a-col>
                    <a-col justify="space-between" :span="12">
                         <p class="normal-table" style="border: 0">右喷灌泵{{runInfo.dig.SIP2 ? '已开启' : '未开启' }} <el-switch v-model="runInfo.dig.SIP2 == 1" disabled style="margin-left: 8px;"></el-switch></p>
                        <p class="normal-table" style="border: 0">右喷灌泵本次喷灌持续时长（s）：{{runInfo.ana.SIP2T || "--"}}</p>
                        <p class="normal-table" style="border: 0">右喷灌泵下次喷灌时间：{{runInfo.ana.SIP2NT ? minuteToTime(runInfo.ana.SIP2NT) : "--"}}</p>
                    </a-col>
                </a-row>
            </div>
            <div class="form-text space-btm1 mobile-show mobile-round-capsule">
                <div class="form-text-inner">
                    <div>
                        <p class="mobile-cap-title" style="border: 0">左喷灌泵</p>
                        <p class="mobile-cap-value" style="border: 0">{{runInfo.dig.SIP1 ? '已开启' : '未开启' }}</p>
                    </div>
                    <div>
                        <p class="mobile-cap-title" style="border: 0">本次喷灌持续时长（s）</p>
                        <p class="mobile-cap-value" style="border: 0">{{runInfo.ana.SIP1T || "--"}}</p>
                    </div>

                    <div>
                        <p class="mobile-cap-title" style="border: 0">下次喷灌时间</p>
                        <p class="mobile-cap-value" style="border: 0">{{runInfo.ana.SIP1NT ? minuteToTime(runInfo.ana.SIP1NT)  : "--"}}</p>
                    </div>
                </div>
            </div>
            <div class="form-text space-btm1 mobile-show mobile-round-capsule">
                <div class="form-text-inner">
                    <div>
                        <p class="mobile-cap-title" style="border: 0">右喷灌泵</p>
                        <p class="mobile-cap-value" style="border: 0">{{runInfo.dig.SIP2 ? '已开启' : '未开启' }}</p>
                    </div>
                    <div>
                        <p class="mobile-cap-title" style="border: 0">本次喷灌持续时长（s）</p>
                        <p class="mobile-cap-value" style="border: 0">{{runInfo.ana.SIP2T || "--"}}</p>
                    </div>

                    <div>
                        <p class="mobile-cap-title" style="border: 0">下次喷灌时间</p>
                        <p class="mobile-cap-value" style="border: 0">{{runInfo.ana.SIP2NT ? minuteToTime(runInfo.ana.SIP2NT)  : "--"}}</p>
                    </div>
                </div>
            </div>
            <!-- 喷灌信息 end -->
            <!-- 液位信息 start -->
            <a-row type="flex" class="mobile-hide space-btm1">
                <!-- 左侧水箱图 start -->
                <a-col justify="space-between" :span="12">
                    <WaterBox 
                        :liqLv="liqLv"
                        :lbBwUpAlm="lbBwUpAlm"
                        :lbBwAlm="lbBwAlm"
                        :lvTv="lvTv"
                        :lvAdj="lvAdj"
                        v-if="renderWaterBox"
                    ></WaterBox>
                    
                </a-col>
                <!-- 左侧水箱图 end -->
                <!-- 右侧表格 start -->
                <a-col :span="12">
                    <BWaterBox 
                         :liqLv="liqLv1"
                         :lbBwUpAlm="lbBwUpAlm1"
                         :lbBwAlm="lbBwAlm1"
                         :lvTv="lvTv1"
                         :lvAdj="lvAdj1"
                         v-if="renderWaterBox1"
                    ></BWaterBox>
                </a-col>
                <!-- 右侧表格 end -->
            </a-row>

            <div class="mobile-show">
                <div class="mobile-round-capsule">
                    <div class="form-text-inner">
                        <div>
                            <p class="mobile-cap-title">当前液位</p>
                            <p class="mobile-cap-value">{{runInfo.ana.LIQ_LV ? (runInfo.ana.LIQ_LV + 'cm') : '--'}}</p>
                        </div>
                        <div>
                            <p class="mobile-cap-title">上告警值</p>
                            <p class="mobile-cap-value">{{runInfo.param.LV_BW_UP_ALM ? (runInfo.param.LV_BW_UP_ALM + 'cm') : "未知"}}</p>
                        </div>
                        <div>
                            <p class="mobile-cap-title">下告警值</p>
                            <p class="mobile-cap-value">{{runInfo.param.LV_BW_ALM ? (runInfo.param.LV_BW_ALM + 'cm') : '未知'}}</p>
                        </div>
                    </div>
                </div>
                <table class="normal-table space-btm1">
                    <tr>
                        <td style="width: 62px;"></td>
                        <td> <span style="margin-right: 8px;">{{runInfo.dig.BWP1 == "1" ? "回水泵1已开启": '回水泵1未开启'}}</span> <el-switch v-model="runInfo.dig.BWP1 == 1" disabled></el-switch> </td>
                        <td> <span style="margin-right: 8px;">{{runInfo.dig.WSV == "1" ? "补水阀已开启": '补水阀未开启'}}</span> <el-switch v-model="runInfo.dig.WSV == 1" disabled></el-switch> </td>
                    </tr>
                </table>
                <table class="normal-table" style="margin-top: 20px;">
                    <tr>
                        <td style="width: 62px;"></td>
                        <td>左侧</td>
                        <td>右侧</td>
                    </tr>
                    <tr>
                        <td>第四层</td>
                        <td>{{runInfo.dig.VL4 == "1" ? "水阀已开启": '水阀未开启'}}</td>
                        <td>{{runInfo.dig.VR4 == "1" ? "水阀已开启": '水阀未开启'}}</td>
                    </tr>
                    <tr>
                        <td>第三层</td>
                        <td>{{runInfo.dig.VL3 == "1" ? "水阀已开启": '水阀未开启'}}</td>
                        <td>{{runInfo.dig.VR3 == "1" ? "水阀已开启": '水阀未开启'}}</td>
                    </tr>
                    <tr>
                        <td>第二层</td>
                        <td>{{runInfo.dig.VL2 == "1" ? "水阀已开启": '水阀未开启'}}</td>
                        <td>{{runInfo.dig.VR2 == "1" ? "水阀已开启": '水阀未开启'}}</td>
                    </tr>
                    <tr>
                        <td>第一层</td>
                        <td>{{runInfo.dig.VL1 == "1" ? "水阀已开启": '水阀未开启'}}</td>
                        <td>{{runInfo.dig.VR1 == "1" ? "水阀已开启": '水阀未开启'}}</td>
                    </tr>
                </table>
            </div>
            <!-- 液位信息 end -->
           <table class="normal-table space-btm1">
                <tr>
                    <td> <span style="margin-right: 8px;">{{runInfo.dig.BWP1 == "1" ? "回水泵1已开启": '回水泵1未开启'}}</span> <el-switch v-model="runInfo.dig.BWP1 == 1" disabled></el-switch> </td>
                    <td> <span style="margin-right: 8px;">{{runInfo.dig.WSV == "1" ? "补水阀已开启": '补水阀未开启'}}</span> <el-switch v-model="runInfo.dig.WSV == 1" disabled></el-switch> </td>
                </tr>
            </table>
            <table class="normal-table">
                <tr>
                    <td style="width: 54px;"></td>
                    <td>左侧</td>
                    <td>右侧</td>
                </tr>
                <tr>
                    <td>第四层</td>
                    <td>{{runInfo.dig.VL4 == "1" ? "水阀已开启": '水阀未开启'}}
                        <el-switch v-model="runInfo.dig.VL4 == '1'" disabled class="space-left1"></el-switch>
                    </td>
                    <td>
                        {{runInfo.dig.VR4 == "1" ? "水阀已开启": '水阀未开启'}}
                         <el-switch v-model="runInfo.dig.VR4 == '1'" disabled class="space-left1"></el-switch>
                    </td>

                </tr>
                <tr>
                    <td>第三层</td>
                    <td>
                        {{runInfo.dig.VL3 == "1" ? "水阀已开启": '水阀未开启'}}
                        <el-switch v-model="runInfo.dig.VL3 == '1'" disabled class="space-left1"></el-switch>
                    </td>
                    <td>
                        {{runInfo.dig.VR3 == "1" ? "水阀已开启": '水阀未开启'}}
                        <el-switch v-model="runInfo.dig.VR3 == '1'" disabled class="space-left1"></el-switch>
                    </td>
                </tr>
                <tr>
                    <td>第二层</td>
                    <td>
                        {{runInfo.dig.VL2 == "1" ? "水阀已开启": '水阀未开启'}}
                        <el-switch v-model="runInfo.dig.VL2 == '1'" disabled class="space-left1"></el-switch>
                    </td>
                    <td>
                        {{runInfo.dig.VR2 == "1" ? "水阀已开启": '水阀未开启'}}
                        <el-switch v-model="runInfo.dig.VR2 == '1'" disabled class="space-left1"></el-switch>
                    </td>
                </tr>
                <tr>
                    <td>第一层</td>
                    <td>
                        {{runInfo.dig.VL1 == "1" ? "水阀已开启": '水阀未开启'}}
                        <el-switch v-model="runInfo.dig.VL1 == '1'" disabled class="space-left1"></el-switch>
                    </td>
                    <td>
                        {{runInfo.dig.VR1 == "1" ? "水阀已开启": '水阀未开启'}}
                        <el-switch v-model="runInfo.dig.VR1 == '1'" disabled class="space-left1"></el-switch>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<style scoped>
   .space-btm1 {margin-bottom: 20px;}
  .form-text-inner {display: flex;justify-content: space-between;width: 85%;}
  .card {margin-bottom: 10px;}
  .normal-table {border-collapse: collapse; border:  1px solid #f1f1f1; width: 100%; font-size: 12px; color: #606266; }
  .normal-table td { border:  1px solid #f1f1f1;padding: 8px;}
  .space-left1 {margin-left: 4px;}
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
            }
        },
        components: {
            WaterBox,
            BWaterBox
        }
    }
</script>