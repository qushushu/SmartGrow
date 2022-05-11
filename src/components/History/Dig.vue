<!-- 
  组件说明： 本组件为历史记录中开关量历史组件。
-->
<template>
    <div>
        <div class="btn-mode-toggle">
            <el-button :type="mode == 'table' ? 'primary' : 'default'" size="small" @click="mode='table'">表格</el-button>
            <el-button :type="mode == 'chart' ? 'primary' : 'default'" size="small" @click="mode='chart'">图表</el-button>
        </div>
        <div v-show="mode=='table'">
            <el-table ref="multipleTable" :data="digTable" border stripe size="small" tooltip-effect="dark" style="margin-top: 20px;" empty-text="暂无数据">
                <el-table-column prop="time" label="时间" width="143"> </el-table-column>
                <el-table-column prop="AUTO" label="工作模式"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.AUTO =='1'"> 自动 </div>
                        <div v-if="scope.row.AUTO == '0'"> 手动 </div>
                    </template>
                </el-table-column>
                 <el-table-column prop="SIP1" label="喷灌泵1"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.SIP1 =='1'" class="text-success"> 运行 </div>
                        <div v-if="scope.row.SIP1 == '0'" class="text-fail"> 停止 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="SIP2" label="喷灌泵2"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.SIP2 =='1'" class="text-success"> 运行 </div>
                        <div v-if="scope.row.SIP2 == '0'" class="text-fail"> 停止 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="BWP1" label="回水泵1"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.BWP1 =='1'" class="text-success"> 运行 </div>
                        <div v-if="scope.row.BWP1 == '0'" class="text-fail"> 停止 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="BWP2" label="回水泵2"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.BWP2 =='1'" class="text-success"> 运行 </div>
                        <div v-if="scope.row.BWP2 == '0'" class="text-fail"> 停止 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="MIX_P" label="搅拌泵"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.MIX_P =='1'" class="text-success"> 运行 </div>
                        <div v-if="scope.row.MIX_P == '0'" class="text-fail"> 停止 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="WSV" label="补水阀"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.WSV =='1'" class="text-success"> 开 </div>
                        <div v-if="scope.row.WSV == '0'" class="text-fail"> 关 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="CO2V" label="二氧化碳阀"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.CO2V =='1'" class="text-success"> 开 </div>
                        <div v-if="scope.row.CO2V == '0'" class="text-fail"> 关 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="PP1" label="蠕动泵1状态"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.PP1 =='1'" class="text-success"> 运行 </div>
                        <div v-if="scope.row.PP1 == '0'" class="text-fail"> 停止 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="PP2" label="蠕动泵2状态"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.PP2 =='1'" class="text-success"> 运行 </div>
                        <div v-if="scope.row.PP2 == '0'" class="text-fail"> 停止 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="PP3" label="蠕动泵3状态"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.PP3 =='1'" class="text-success"> 运行 </div>
                        <div v-if="scope.row.PP3 == '0'" class="text-fail"> 停止 </div>
                    </template>
                </el-table-column>
                 <el-table-column prop="PP4" label="蠕动泵4状态"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.PP4 =='1'" class="text-success"> 运行 </div>
                        <div v-if="scope.row.PP4 == '0'" class="text-fail"> 停止 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="PP5" label="蠕动泵5状态"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.PP5 =='1'" class="text-success"> 运行 </div>
                        <div v-if="scope.row.PP5 == '0'" class="text-fail"> 停止 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="PP1_ZF" label="蠕动泵1方向"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.PP1_ZF =='1'" class="text-success"> 正转 </div>
                        <div v-if="scope.row.PP1_ZF == '0'" class="text-fail"> 反转 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="PP2_ZF" label="蠕动泵2方向"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.PP2_ZF =='1'" class="text-success"> 正转 </div>
                        <div v-if="scope.row.PP2_ZF == '0'" class="text-fail"> 反转 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="PP3_ZF" label="蠕动泵3方向"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.PP3_ZF =='1'" class="text-success"> 正转 </div>
                        <div v-if="scope.row.PP3_ZF == '0'" class="text-fail"> 反转 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="PP4_ZF" label="蠕动泵4方向"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.PP4_ZF =='1'" class="text-success"> 正转 </div>
                        <div v-if="scope.row.PP4_ZF == '0'" class="text-fail"> 反转 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="PP5_ZF" label="蠕动泵5方向"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.PP5_ZF =='1'" class="text-success"> 正转 </div>
                        <div v-if="scope.row.PP5_ZF == '0'" class="text-fail"> 反转 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="IND_RUN" label="运行灯"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.IND_RUN =='1'" class="text-success"> 开 </div>
                        <div v-if="scope.row.IND_RUN == '0'" class="text-fail"> 关 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="IND_EC" label="EC告警灯"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.IND_EC =='1'" class="text-success"> 开 </div>
                        <div v-if="scope.row.IND_EC == '0'" class="text-fail"> 关 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="IND_PH" label="PH告警灯"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.IND_PH =='1'" class="text-success"> 开 </div>
                        <div v-if="scope.row.IND_PH == '0'" class="text-fail"> 关 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="IND_LV" label="液位灯"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.IND_LV =='1'" class="text-success"> 开 </div>
                        <div v-if="scope.row.IND_LV == '0'" class="text-fail"> 关 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="VL1" label="阀左1"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.VL1 =='1'" class="text-success"> 开 </div>
                        <div v-if="scope.row.VL1 == '0'" class="text-fail"> 关 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="VL2" label="阀左2"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.VL2 =='1'" class="text-success"> 开 </div>
                        <div v-if="scope.row.VL2 == '0'" class="text-fail"> 关 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="VL3" label="阀左3"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.VL3 =='1'" class="text-success"> 开 </div>
                        <div v-if="scope.row.VL3 == '0'" class="text-fail"> 关 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="VL4" label="阀左4"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.VL4 =='1'" class="text-success"> 开 </div>
                        <div v-if="scope.row.VL4 == '0'" class="text-fail"> 关 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="VR1" label="阀右1"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.VR1 =='1'" class="text-success"> 开 </div>
                        <div v-if="scope.row.VR1 == '0'" class="text-fail"> 关 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="VR2" label="阀右2"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.VR2 =='1'" class="text-success"> 开 </div>
                        <div v-if="scope.row.VR2 == '0'" class="text-fail"> 关 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="VR3" label="阀右3"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.VR3 =='1'" class="text-success"> 开 </div>
                        <div v-if="scope.row.VR3 == '0'" class="text-fail"> 关 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="VR4" label="阀右4"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.VR4 =='1'" class="text-success"> 开 </div>
                        <div v-if="scope.row.VR4 == '0'" class="text-fail"> 关 </div>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination v-if="total_dig > 0" :page-index="page_dig" :total="total_dig" :page-size="rows" @change="pageChange_dig"> </Pagination>
        </div>
        <div v-show="mode=='chart'" style="padding-top: 30px;">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                 <el-tab-pane label="喷灌泵" name="SIP-chart">
                      <div id="SIP-chart1" class="line-chart"></div>
                      <div id="SIP-chart2" class="line-chart"></div>
                 </el-tab-pane>
                 <el-tab-pane label="回水泵" name="BWP-chart">
                     <div id="BWP-chart1" class="line-chart"></div>
                     <div id="BWP-chart2" class="line-chart"></div>
                 </el-tab-pane>
                 <el-tab-pane label="搅拌泵" name="MIX-chart">
                     <div id="MIX-chart" class="normal-line_chart"></div>
                 </el-tab-pane>
                 <el-tab-pane label="补水阀" name="WSV-chart">
                     <div id="WSV-chart" class="normal-line_chart"></div>
                 </el-tab-pane>
                 <el-tab-pane label="二氧化碳阀" name="CO2V-chart">
                     <div id="CO2V-chart" class="normal-line_chart"></div>
                 </el-tab-pane>
                 <el-tab-pane label="蠕动泵状态" name="PP-chart">
                     <div id="PP-chart1" class="line-chart"></div>
                     <div id="PP-chart2" class="line-chart"></div>
                     <div id="PP-chart3" class="line-chart"></div>
                     <div id="PP-chart4" class="line-chart"></div>
                     <div id="PP-chart5" class="line-chart"></div>
                 </el-tab-pane>
                 <el-tab-pane label="蠕动泵方向" name="PP_ZF-chart">
                     <div id="PP_ZF1-chart" class="line-chart"></div>
                     <div id="PP_ZF2-chart" class="line-chart"></div>
                     <div id="PP_ZF3-chart" class="line-chart"></div>
                     <div id="PP_ZF4-chart" class="line-chart"></div>
                     <div id="PP_ZF5-chart" class="line-chart"></div>
                 </el-tab-pane>
                 <el-tab-pane label="运行灯" name="IND-chart">
                     <div id="IND-chart1" class="line-chart"></div>
                     <div id="IND-chart2" class="line-chart"></div>
                     <div id="IND-chart3" class="line-chart"></div>
                     <div id="IND-chart4" class="line-chart"></div>
                 </el-tab-pane>
                 
                 <el-tab-pane label="阀左" name="VL-chart">
                     <div id="VL-chart1" class="line-chart"></div>
                     <div id="VL-chart2" class="line-chart"></div>
                     <div id="VL-chart3" class="line-chart"></div>
                     <div id="VL-chart4" class="line-chart"></div>
                 </el-tab-pane>
                 <el-tab-pane label="阀右" name="VR-chart">
                     <div id="VR-chart1" class="line-chart"></div>
                     <div id="VR-chart2" class="line-chart"></div>
                     <div id="VR-chart3" class="line-chart"></div>
                     <div id="VR-chart4" class="line-chart"></div>
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
    import Pagination from "../common/Pagination"
    import {formatTime} from "../../assets/tools/tool"
    import * as echarts from 'echarts';
    export default {
        props: ["start_time","end_time","rows"],
        watch: {
            start_time() {
                this.getDiginfoList(1);
            },
            end_time() {
                this.getDiginfoList(1);
            },
            mode() {
                this.resetDigChart();
            }
        },
        data() {
            return {
                mode: "table",
                activeName: 'SIP-chart',
                fullData: [],
                digTable: [],
                page_dig: 1,
                rows_dig : 1000,
                total_dig: 0,
                arrParamData: [{
                    param: "SIP1",
                    name: "喷灌泵1"
                },{
                    param: "SIP2",
                    name: "喷灌泵2"
                },{
                    param: "BWP1",
                    name: "回水泵1"
                },{
                    param: "BWP2",
                    name: "回水泵2"
                },{
                    param: "MIX_P",
                    name: "搅拌泵"
                },{
                    param: "WSV",
                    name: "补水阀"
                },{
                    param: "CO2V",
                    name: "二氧化碳阀"
                },{
                    param: "PP1",
                    name: "蠕动泵1状态"
                },{
                    param: "PP2",
                    name: "蠕动泵2状态"
                },{
                    param: "PP3",
                    name: "蠕动泵3状态"
                },{
                    param: "PP4",
                    name: "蠕动泵4状态"
                },{
                    param: "PP5",
                    name: "蠕动泵5状态"
                },{
                    param: "PP1_ZF",
                    name: "蠕动泵1方向"
                },{
                    param: "PP2_ZF",
                    name: "蠕动泵2方向"
                },{
                    param: "PP3_ZF",
                    name: "蠕动泵3方向"
                },{
                    param: "PP4_ZF",
                    name: "蠕动泵4方向"
                },{
                    param: "PP5_ZF",
                    name: "蠕动泵5方向"
                },{
                    param: "IND_RUN",
                    name: "运行灯"
                },{
                    param: "IND_EC",
                    name: "EC告警灯"
                },{
                    param: "IND_PH",
                    name: "PH告警灯"
                },{
                    param: "IND_LV",
                    name: "液位灯"
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
                this.resetDigChart();
            },
            // 获取开关历史
            getDiginfoList(page) {
                axios({
                    method: "post",
                    url: `${this.apiurl}/la/history/dig/get`,
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
                        this.total_dig = data.data.data_total;
                        data.data.data.forEach(item => {
                            let result = {
                                time: formatTime(item["time"])
                            }
                            item.dig_content.item.forEach(itm1 => {
                                result[[itm1.param_code]] = itm1["value"]
                            })
                            tb.push(result);
                        });
                        this.digTable = tb;
                        this.resetDigChart();
                    }
                })
            },
            getDiginfoList1(page) {
                axios({
                    method: "post",
                    url: `${this.apiurl}/la/history/dig/get`,
                    data: {
                        data: {
                            start_time: this.start_time,
                            end_time: this.end_time,
                            page_index: page - 1,
                            page_size: this.rows_dig
                        }
                    }
                }).then(data => {
                    if(data.data.code == 200) {
                        let tb = [];
                        // this.total_dig = data.data.data_total;
                        data.data.data.forEach(item => {
                            let result = {
                                time: formatTime(item["time"])
                            }
                            item.dig_content.item.forEach(itm1 => {
                                result[[itm1.param_code]] = itm1["value"]
                            })
                            tb.push(result);
                        });
                        this.fullData = tb;
                        this.resetDigChart();
                    }
                })
            },
            resetDigChart(tb) {
                if(!tb) {
                    tb = this.fullData;
                }
                this.createTb(tb,["SIP1"],"SIP-chart1",["#c23531"]);
                this.createTb(tb,["SIP2"],"SIP-chart2",["#2f4554"]);
                this.createTb(tb,["BWP1"],"BWP-chart1",["#c23531"]);
                this.createTb(tb,["BWP2"],"BWP-chart2",["#2f4554"]);
                this.createTb(tb,["MIX_P"],"MIX-chart");
                this.createTb(tb,["WSV"],"WSV-chart");
                this.createTb(tb,["CO2V"],"CO2V-chart");
                this.createTb(tb,["PP1"],"PP-chart1",["#c23531"]);
                this.createTb(tb,["PP2"],"PP-chart2",["#2f4554"]);
                this.createTb(tb,["PP3"],"PP-chart3",["#61a0a8"]);
                this.createTb(tb,["PP4"],"PP-chart4",["#d48265"]);
                this.createTb(tb,["PP5"],"PP-chart5",["#91c7ae"]);
                this.createTb(tb,["PP1_ZF"],"PP_ZF1-chart",["#c23531"]);
                this.createTb(tb,["PP2_ZF"],"PP_ZF2-chart",["#2f4554"]);
                this.createTb(tb,["PP3_ZF"],"PP_ZF3-chart",["#61a0a8"]);
                this.createTb(tb,["PP4_ZF"],"PP_ZF4-chart",["#d48265"]);
                this.createTb(tb,["PP5_ZF"],"PP_ZF5-chart",["#91c7ae"]);
                this.createTb(tb,["IND_RUN"],"IND-chart1",["#c23531"]);
                this.createTb(tb,["IND_EC"],"IND-chart2",["#2f4554"]);
                this.createTb(tb,["IND_PH"],"IND-chart3",["#61a0a8"]);
                this.createTb(tb,["IND_LV"],"IND-chart4",["#d48265"]);
                this.createTb(tb,["VL1"],"VL-chart1",["#c23531"]);
                this.createTb(tb,["VL2"],"VL-chart2",["#2f4554"]);
                this.createTb(tb,["VL3"],"VL-chart3",["#61a0a8"]);
                this.createTb(tb,["VL4"],"VL-chart4",["#d48265"]);
                this.createTb(tb,["VR1"],"VR-chart1",["#c23531"]);
                this.createTb(tb,["VR2"],"VR-chart2",["#2f4554"]);
                this.createTb(tb,["VR3"],"VR-chart3",["#61a0a8"]);
                this.createTb(tb,["VR4"],"VR-chart4",["#d48265"]);
            },
            createTb(tb,arr,chartId,color) {
                var chartDom = document.getElementById(chartId);
                var myChart = echarts.init(chartDom);
                var option;
                let xAxisData = tb.map(item => item.time);
                let computedJson = arr.map(item => {
                    let name =  this.arrParamData.filter(i=>i["param"] == item)[0].name;
                    return {
                        name,
                        step: 'end',
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
                        axisLabel : {
                            formatter: function(){
                                  return "";
                            }
                        }
                    },
                    dataZoom:[{
                　　     type:"inside"         //详细配置可见echarts官网
                 　　}],
                    series: computedJson
                };
                if(color) {
                    option.color = color;
                }
                option && myChart.setOption(option);
                setTimeout(()=> {
                   myChart.resize();
                });
            },
            pageChange_dig(page) {
                this.getDiginfoList(page);
            },
        },
        mounted() {
            this.getDiginfoList(1);
            this.getDiginfoList1(1);
        }
    }
</script>