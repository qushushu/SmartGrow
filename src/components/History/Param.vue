<!-- 
  组件说明： 本组件为历史记录中参数历史组件。
-->
<template>
    <div>
        <div class="btn-mode-toggle">
             <el-button :type="mode == 'table' ? 'primary' : 'default'" size="small" @click="mode='table'">表格</el-button>
            <el-button :type="mode == 'chart' ? 'primary' : 'default'" size="small" @click="mode='chart'">图表</el-button>
        </div>
        <div v-show="mode=='table'">
            <el-table ref="multipleTable" :data="paramTable" border stripe size="small"tooltip-effect="dark" empty-text="暂无数据">
                <el-table-column prop="time" label="时间" width="143"> </el-table-column>
                <el-table-column prop="DAY_OFFSET" label="天数"> </el-table-column>
                <el-table-column prop="EC_TV" label="EC目标值"> </el-table-column>
                <el-table-column prop="EC_ADJ" label="EC调节启动值"> </el-table-column>
                <el-table-column prop="EC_ALM" label="EC告警值"> </el-table-column>
                <el-table-column prop="PH_TV" label="PH目标值"> </el-table-column>
                <el-table-column prop="PH_ADJ" label="PH调节启动值"> </el-table-column>
                <el-table-column prop="PH_ALM" label="PH告警值"> </el-table-column>
                <el-table-column prop="LV_TV" label="液位目标值"> </el-table-column>
                <el-table-column prop="LV_ADJ" label="液位调节启动值"> </el-table-column>
                <el-table-column prop="LV_ALM" label="液位告警值"> </el-table-column>
                <el-table-column prop="LV_UP_ALM" label="液位上告警值"> </el-table-column>
                <el-table-column prop="LV_BW_TV" label="回水液位目标值"> </el-table-column>
                <el-table-column prop="LV_BW_ADJ" label="回水调节启动值"> </el-table-column>
                <el-table-column prop="LV_BW_ALM" label="回水液位告警值"> </el-table-column>
                <el-table-column prop="LV_BW_UP_ALM" label="回水液位上告警值"> </el-table-column>
                <el-table-column prop="SII_DAY" label="日喷灌间隔(分钟)"> </el-table-column>
                <el-table-column prop="SIT_DAY" label="日喷灌持续时间"> </el-table-column>
                <el-table-column prop="SII_NIGHT" label="夜喷灌间隔(分钟)"> </el-table-column>
                <el-table-column prop="SIT_NIGHT" label="夜喷灌持续时间"> </el-table-column>
                <el-table-column prop="SUNRIZE" label="日出时间"> </el-table-column>
                <el-table-column prop="SUNSET" label="日落时间"> </el-table-column>
                <el-table-column prop="QY_TIP" label="母液缺液提示"> </el-table-column>
                <el-table-column prop="QY_ALM" label="母液缺液告警"> </el-table-column>
                <el-table-column prop="MI_SCH" label="母液方案"> </el-table-column>
                <el-table-column prop="MI_NUM" label="母液数量"> </el-table-column>
                <el-table-column prop="RATIO_A" label="A液比例"> </el-table-column>
                <el-table-column prop="RATIO_B" label="B液比例"> </el-table-column>
                <el-table-column prop="RATIO_C" label="C液比例"> </el-table-column>
                <el-table-column prop="PUMP_A" label="A液蠕动泵地址"> </el-table-column>
                <el-table-column prop="PUMP_B" label="B液蠕动泵地址"> </el-table-column>
                <el-table-column prop="PUMP_C" label="C液蠕动泵地址"> </el-table-column>
                <el-table-column prop="PUMP_H" label="酸蠕动泵地址"> </el-table-column>
                <el-table-column prop="PUMP_OH" label="碱蠕动泵地址"> </el-table-column>
                <el-table-column prop="WP_LO_ALM" label="出水管压力下告警值"> </el-table-column>
                <el-table-column prop="WP_UP_ALM" label="出水管压力上告警值"> </el-table-column>
                <el-table-column prop="CO2_TV" label="二氧化碳浓度目标值"> </el-table-column>
                <el-table-column prop="CO2_ADJ" label="二氧化碳调节启动值"> </el-table-column>
                <el-table-column prop="CO2_ALM" label="二氧化碳告警值"> </el-table-column>
                <el-table-column prop="LEVEL_MAX" label="液位最大值"> </el-table-column>
                <el-table-column prop="VL1" label="阀左1"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.VL1 =='1'" class="text-success"> 开启 </div>
                        <div v-if="scope.row.VL1 == '0'" class="text-fail"> 关闭 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="VL2" label="阀左2"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.VL2 =='1'" class="text-success"> 开启 </div>
                        <div v-if="scope.row.VL2 == '0'" class="text-fail"> 关闭 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="VL3" label="阀左3"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.VL3 =='1'" class="text-success"> 开启 </div>
                        <div v-if="scope.row.VL3 == '0'" class="text-fail"> 关闭 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="VL4" label="阀左4"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.VL4 =='1'" class="text-success"> 开启 </div>
                        <div v-if="scope.row.VL4 == '0'" class="text-fail"> 关闭 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="VR1" label="阀右1"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.VR1 =='1'" class="text-success"> 开启 </div>
                        <div v-if="scope.row.VR1 == '0'" class="text-fail"> 关闭 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="VR2" label="阀右2"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.VR2 =='1'" class="text-success"> 开启 </div>
                        <div v-if="scope.row.VR2 == '0'" class="text-fail"> 关闭 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="VR3" label="阀右3"> 
                    <template slot-scope="scope">
                            <div v-if="scope.row.VR3 =='1'" class="text-success"> 开启 </div>
                            <div v-if="scope.row.VR3 == '0'" class="text-fail"> 关闭 </div>
                        </template>
                </el-table-column>
                <el-table-column prop="VR4" label="阀右4"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.VR4 =='1'" class="text-success"> 开启 </div>
                        <div v-if="scope.row.VR4 == '0'" class="text-fail"> 关闭 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="SI_L_RUN" label="左喷灌泵运行"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.SI_L_RUN =='1'" class="text-success"> 开启 </div>
                        <div v-if="scope.row.SI_L_RUN == '0'" class="text-fail"> 关闭 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="SI_R_RUN" label="右喷灌泵运行"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.SI_R_RUN =='1'" class="text-success"> 开启 </div>
                        <div v-if="scope.row.SI_R_RUN == '0'" class="text-fail"> 关闭 </div>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination v-if="total_param > 0" :page-index="page_param" :total="total_param" :page-size="rows" @change="pageChange_param"> </Pagination>
        </div>
        <div v-show="mode=='chart'" style="padding-top: 30px;">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="EC" name="EC-chart">
                      <div id="EC-chart" class="normal-chart"></div>
                </el-tab-pane>
                 <el-tab-pane label="PH" name="PH-chart">
                      <div id="PH-chart" class="normal-chart"></div>
                </el-tab-pane>
                <el-tab-pane label="液位" name="LV-chart">
                      <div id="LV-chart" class="normal-chart"></div>
                </el-tab-pane>
                <el-tab-pane label="喷灌间隔" name="SII-chart">
                      <div id="SII-chart" class="normal-chart"></div>
                </el-tab-pane>
                <el-tab-pane label="喷灌持续时间" name="SIT-chart">
                      <div id="SIT-chart" class="normal-chart"></div>
                </el-tab-pane>
                <el-tab-pane label="母液缺液" name="QY-chart">
                      <div id="QY-chart" class="normal-chart"></div>
                </el-tab-pane>
                <el-tab-pane label="出水管压力告警值" name="WP_ALM-chart">
                      <div id="WP_ALM-chart" class="normal-chart"></div>
                </el-tab-pane>
                <el-tab-pane label="CO2" name="CO2-chart">
                      <div id="CO2-chart" class="normal-chart"></div>
                </el-tab-pane>
                <el-tab-pane label="阀左" name="VL-chart">
                     <div id="VL-chart" class="normal-chart"></div>
                 </el-tab-pane>
                 <el-tab-pane label="阀右" name="VR-chart">
                     <div id="VR-chart" class="normal-chart"></div>
                 </el-tab-pane>
                 <el-tab-pane label="喷灌泵状态" name="SI-chart">
                     <div id="SI-chart" class="normal-chart"></div>
                 </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<style scoped>
    .text-success {color: #67C23A;}
    .text-fail {color: #F56C6C}
</style>
<script>
    import axios from 'axios'
    import * as echarts from 'echarts';
    import {formatTime} from "../../assets/tools/tool"
    import Pagination from "../common/Pagination"
    export default {
        props: ["start_time","end_time","rows"],
        watch: {
            start_time() {
                this.getParamList(1);
            },
            end_time() {
                this.getParamList(1);
            },
            mode() {
                this.resetParamChart();
            }
        },

        data() {
            return {
                mode: "table",
                activeName: 'EC-chart',
                fullData: [],
                paramTable: [],
                page_param: 1,
                rows_param : 1000,
                total_param : 0,
                arrParamData: [{
                    param: "EC_TV",
                    name: "EC目标值"
                },{
                    param: "EC_ADJ",
                    name: "EC调节启动值"
                },{
                    param: "EC_ALM",
                    name: "EC告警值"
                },{
                    param: "PH_TV",
                    name: "PH目标值"
                },{
                    param: "PH_ADJ",
                    name: "PH调节启动值"
                },{
                    param: "PH_ALM",
                    name: "PH告警值"
                },{
                    param: "LV_TV",
                    name: "液位目标值"
                },{
                    param: "LV_ADJ",
                    name: "液位调节启动值"
                },{
                    param: "LV_ALM",
                    name: "液位告警值"
                },{
                    param: "LV_UP_ALM",
                    name: "液位上告警值"
                },{
                    param: "LV_BW_TV",
                    name: "回水液位目标值"
                },{
                    param: "LV_BW_ADJ",
                    name: "回水调节启动值"
                },{
                    param: "LV_BW_ALM",
                    name: "回水液位告警值"
                },{
                    param: "LV_BW_UP_ALM",
                    name: "回水液位上告警值"
                },{
                    param: "SII_DAY",
                    name: "日喷灌间隔(分钟)"
                },{
                    param: "SIT_DAY",
                    name: "日喷灌持续时间"
                },{
                    param: "SII_NIGHT",
                    name: "夜喷灌间隔(分钟)"
                },{
                    param: "SIT_NIGHT",
                    name: "夜喷灌持续时间"
                },{
                    param: "SUNRIZE",
                    name: "日出时间"
                },{
                    param: "SUNSET",
                    name: "日落时间"
                },{
                    param: "QY_TIP",
                    name: "母液缺液提示"
                },{
                    param: "QY_ALM",
                    name: "母液缺液告警"
                },{
                    param: "MI_SCH",
                    name: "母液方案"
                },{
                    param: "MI_NUM",
                    name: "母液数量"
                },{
                    param: "RATIO_A",
                    name: "A液比例"
                },{
                    param: "RATIO_B",
                    name: "B液比例"
                },{
                    param: "RATIO_C",
                    name: "C液比例"
                },{
                    param: "PUMP_A",
                    name: "A液蠕动泵地址"
                },{
                    param: "PUMP_B",
                    name: "B液蠕动泵地址"
                },{
                    param: "PUMP_C",
                    name: "C液蠕动泵地址"
                },{
                    param: "PUMP_H",
                    name: "酸蠕动泵地址"
                },{
                    param: "PUMP_OH",
                    name: "碱蠕动泵地址"
                },{
                    param: "WP_LO_ALM",
                    name: "出水管压力下告警值"
                },{
                    param: "WP_UP_ALM",
                    name: "出水管压力上告警值"
                },{
                    param: "CO2_TV",
                    name: "二氧化碳浓度目标值"
                },{
                    param: "CO2_ADJ",
                    name: "二氧化碳调节启动值"
                },{
                    param: "CO2_ALM",
                    name: "二氧化碳告警值"
                },{
                    param: "LEVEL_MAX",
                    name: "液位最大值"
                },{
                    param: "VL1",
                    name: "阀左1"
                },{
                    param: "VL2",
                    name: "阀左2"
                },{
                    param: "VL3",
                    name: "阀左3"
                },{
                    param: "VL4",
                    name: "阀左4"
                },{
                    param: "VR1",
                    name: "阀右1"
                },{
                    param: "VR2",
                    name: "阀右2"
                },{
                    param: "VR3",
                    name: "阀右3"
                },{
                    param: "VR4",
                    name: "阀右4"
                },{
                    param: "SI_L_RUN",
                    name: "左喷灌泵运行"
                },{
                    param: "SI_R_RUN",
                    name: "右喷灌泵运行"
                }]
            }
        },
        computed: {
            apiurl() {
                return this.$store.state.apiurl;
            }
        },
        components: {
            Pagination
        },
        methods: {
            handleClick(tab, event) {
                this.resetParamChart();
            },
            // 获取参数历史
            getParamList(page) {
                axios({
                    method: "post",
                    url: `${this.apiurl}/la/history/param/get`,
                    data: {
                        data: {
                            start_time: this.start_time,
                            end_time: this.end_time,
                            page_index: page - 1,
                            page_size: this.rows
                        }
                    }
                }).then(data => {
                    if(data.data.code == 200) {
                        let tb = [];
                        this.total_param = data.data.data_total;
                        data.data.data.forEach(item => {
                            let result = {
                                time: formatTime(item["time"])
                            }
                            item.param_content.item.forEach(itm1 => {
                                    result[[itm1.param_code]] = itm1["value"]
                            })
                            tb.push(result);
                        });
                        this.paramTable = tb;
                        this.resetParamChart();
                    }
                })
            },
            getParamList1(page) {
                axios({
                    method: "post",
                    url: `${this.apiurl}/la/history/param/get`,
                    data: {
                        data: {
                            start_time: this.start_time,
                            end_time: this.end_time,
                            page_index: page - 1,
                            page_size: this.rows_param
                        }
                    }
                }).then(data => {
                    if(data.data.code == 200) {
                        let tb = [];
                        // this.total_param = data.data.data_total;
                        data.data.data.forEach(item => {
                            let result = {
                                time: formatTime(item["time"])
                            }
                            item.param_content.item.forEach(itm1 => {
                                    result[[itm1.param_code]] = itm1["value"]
                            })
                            tb.push(result);
                        });
                        this.fullData = tb;
                        this.resetParamChart();
                    }
                })
            },
            resetParamChart(tb) {
                if(!tb) {
                    tb = this.fullData;
                }
                this.createTb(tb,["EC_TV","EC_ADJ","EC_ALM"],"EC-chart","EC");
                this.createTb(tb,["PH_TV","PH_ADJ","PH_ALM"],"PH-chart","PH");
                this.createTb(tb,["LV_TV","LV_ADJ","LV_ALM","LV_UP_ALM","LV_BW_TV","LV_BW_ADJ","LV_BW_ALM","LV_BW_UP_ALM","LEVEL_MAX"],"LV-chart","液位");
                this.createTb(tb,["SII_DAY","SII_NIGHT"],"SII-chart","喷灌间隔(分钟)");
                this.createTb(tb,["SIT_DAY","SIT_NIGHT"],"SIT-chart","喷灌持续时间");
                this.createTb(tb,["QY_TIP","QY_ALM"],"QY-chart","母液缺液");
                this.createTb(tb,["WP_LO_ALM","WP_UP_ALM"],"WP_ALM-chart","出水管压力告警值");
                this.createTb(tb,["CO2_TV","CO2_ADJ","CO2_ALM"],"CO2-chart","CO2");
                this.createTb(tb,["VL1","VL2","VL3","VL4"],"VL-chart","阀左");
                this.createTb(tb,["VR1","VR2","VR3","VR4"],"VR-chart","阀右");
                this.createTb(tb,["SI_L_RUN","SI_R_RUN"],"SI-chart","喷灌泵状态");
            },
            pageChange_param(page) {
                this.page_param = page;
                this.getParamList(page);
            },
            createTb(tb,arr,chartId,text="") {
                var chartDom = document.getElementById(chartId);
                var myChart = echarts.init(chartDom);
                var option;
                let xAxisData = tb.map(item => item.time);
                let computedJson = arr.map(item => {
                    let name =  this.arrParamData.filter(i=>i["param"] == item)[0].name;
                    return {
                        name,
                        type: 'line',
                        data: tb.map(item1 => item1[item])
                    }
                });
                 let legendData = arr.map(item => {
                    return this.arrParamData.filter(i=>i["param"] == item)[0].name;
                });
                option = {
                    tooltip: {
                      trigger: 'axis'
                    },
                    legend: {
                      data: legendData
                    },
                    grid: {
                      left: '3%',
                      right: '4%',
                      bottom: '3%',
                      containLabel: true
                    },
                    xAxis: {
                      type: 'category',
                      boundaryGap: false,
                      data: xAxisData
                    },
                    yAxis: {
                        type: 'value'
                    },
                    dataZoom:[{
                　　     type:"inside"         //详细配置可见echarts官网
                 　　}],
                    series: computedJson
                };
                console.log(option);
                option && myChart.setOption(option);
                setTimeout(()=> {
                   myChart.resize();
                });
            },
        },
        mounted() {
            this.getParamList(1);
            this.getParamList1(1);
        }
    }
</script>