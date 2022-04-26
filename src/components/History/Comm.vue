<template>
    <div>
        <div class="btn-mode-toggle">
            <el-button :type="mode == 'table' ? 'primary' : 'default'" size="small" @click="mode='table'">表格</el-button>
            <el-button :type="mode == 'chart' ? 'primary' : 'default'" size="small" @click="mode='chart'">图表</el-button>
        </div>
        <div v-show="mode=='table'">
            <el-table ref="multipleTable" :data="commTable" border stripe size="small"tooltip-effect="dark" style="margin-top: 20px;" empty-text="暂无数据"> 
                <el-table-column prop="time" label="时间" width="143"> </el-table-column>
                <el-table-column prop="COMM_LV1" label="水位传感器1"> 
                    <template slot-scope="scope">
                        <div v-if="scope.row.COMM_LV1 =='1'" class="text-success"> 接通 </div>
                        <div v-if="scope.row.COMM_LV1 == '0'" class="text-fail"> 未通 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="COMM_LV2" label="水位传感器2">
                    <template slot-scope="scope">
                        <div v-if="scope.row.COMM_LV2 =='1'" class="text-success"> 接通 </div>
                        <div v-if="scope.row.COMM_LV2 == '0'" class="text-fail"> 未通 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="COMM_EC1" label="EC传感器1">
                    <template slot-scope="scope">
                        <div v-if="scope.row.COMM_EC1 =='1'" class="text-success"> 接通 </div>
                        <div v-if="scope.row.COMM_EC1 == '0'" class="text-fail"> 未通 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="COMM_EC2" label="EC传感器2">
                    <template slot-scope="scope">
                        <div v-if="scope.row.COMM_EC2 =='1'" class="text-success"> 接通 </div>
                        <div v-if="scope.row.COMM_EC2 == '0'" class="text-fail"> 未通 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="COMM_PH1" label="PH传感器1">
                    <template slot-scope="scope">
                        <div v-if="scope.row.COMM_PH1 =='1'" class="text-success"> 接通 </div>
                        <div v-if="scope.row.COMM_PH1 == '0'" class="text-fail"> 未通 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="COMM_PH2" label="PH传感器2">
                    <template slot-scope="scope">
                        <div v-if="scope.row.COMM_PH2 =='1'" class="text-success"> 接通 </div>
                        <div v-if="scope.row.COMM_PH2 == '0'" class="text-fail"> 未通 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="COMM_W" label="称重传感器">
                    <template slot-scope="scope">
                        <div v-if="scope.row.COMM_W =='1'" class="text-success"> 接通 </div>
                        <div v-if="scope.row.COMM_W == '0'" class="text-fail"> 未通 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="COMM_PP1" label="蠕动泵1">
                    <template slot-scope="scope">
                        <div v-if="scope.row.COMM_PP1 =='1'" class="text-success"> 接通 </div>
                        <div v-if="scope.row.COMM_PP1 == '0'" class="text-fail"> 未通 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="COMM_PP2" label="蠕动泵2">
                    <template slot-scope="scope">
                        <div v-if="scope.row.COMM_PP2 =='1'" class="text-success"> 接通 </div>
                        <div v-if="scope.row.COMM_PP2 == '0'" class="text-fail"> 未通 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="COMM_PP3" label="蠕动泵3">
                    <template slot-scope="scope">
                        <div v-if="scope.row.COMM_PP3 =='1'" class="text-success"> 接通 </div>
                        <div v-if="scope.row.COMM_PP3 == '0'" class="text-fail"> 未通 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="COMM_PP4" label="蠕动泵4">
                    <template slot-scope="scope">
                        <div v-if="scope.row.COMM_PP4 =='1'" class="text-success"> 接通 </div>
                        <div v-if="scope.row.COMM_PP4 == '0'" class="text-fail"> 未通 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="COMM_PP5" label="蠕动泵5">
                    <template slot-scope="scope">
                        <div v-if="scope.row.COMM_PP5 =='1'" class="text-success"> 接通 </div>
                        <div v-if="scope.row.COMM_PP5 == '0'" class="text-fail"> 未通 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="COMM_CO2" label="二氧化碳传感器">
                    <template slot-scope="scope">
                        <div v-if="scope.row.COMM_CO2 =='1'" class="text-success"> 接通 </div>
                        <div v-if="scope.row.COMM_CO2 == '0'" class="text-fail"> 未通 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="COMM_WP" label="压力传感器">
                    <template slot-scope="scope">
                        <div v-if="scope.row.COMM_WP =='1'" class="text-success"> 接通 </div>
                        <div v-if="scope.row.COMM_WP == '0'" class="text-fail"> 未通 </div>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination v-if="total_comm > 0" :page-index="page_comm" :total="total_comm" :page-size="rows" @change="pageChange_comm"> </Pagination>
        </div>
        <div v-show="mode=='chart'" style="padding-top: 30px;">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="水位传感器" name="LV-chart">
                      <div id="LV-chart1" class="line-chart"></div>
                      <div id="LV-chart2" class="line-chart"></div>
                </el-tab-pane>
                <el-tab-pane label="EC传感器" name="EC-chart">
                      <div id="EC-chart1" class="line-chart"></div>
                      <div id="EC-chart2" class="line-chart"></div>
                </el-tab-pane>
                <el-tab-pane label="PH传感器" name="PH-chart">
                      <div id="PH-chart1" class="line-chart"></div>
                      <div id="PH-chart2" class="line-chart"></div>
                </el-tab-pane>
                <el-tab-pane label="称重传感器" name="W-chart">
                      <div id="W-chart" class="normal-line_chart"></div>
                </el-tab-pane>
                <el-tab-pane label="蠕动泵" name="PP-chart">
                      <div id="PP-chart1" class="line-chart"></div>
                      <div id="PP-chart2" class="line-chart"></div>
                      <div id="PP-chart3" class="line-chart"></div>
                      <div id="PP-chart4" class="line-chart"></div>
                      <div id="PP-chart5" class="line-chart"></div>
                </el-tab-pane>
                <el-tab-pane label="二氧化碳传感器" name="CO2-chart">
                      <div id="CO2-chart" class="normal-line_chart"></div>
                </el-tab-pane>
                <el-tab-pane label="压力传感器" name="WP-chart">
                      <div id="WP-chart" class="normal-line_chart"></div>
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
    import {formatTime} from "../../assets/tools/tool"
    import Pagination from "../common/Pagination"
    import * as echarts from 'echarts';
    export default {
        props: ["start_time","end_time","rows"],
         watch: {
            start_time() {
                this.getCommList(1);
            },
            end_time() {
                this.getCommList(1);
            },
            mode() {
                this.resetCommChart();
            }
        },
        data() {
            return {
                mode: "table",
                activeName: 'LV-chart',
                fullData: [],
                commTable: [],
                page_comm: 1,
                rows_comm : 1000,
                total_comm : 0,
                arrParamData: [{
                    param: "COMM_LV1",
                    name: "水位传感器1"
                },{
                    param: "COMM_LV2",
                    name: "水位传感器2"
                },{
                    param: "COMM_EC1",
                    name: "EC传感器1"
                },{
                    param: "COMM_EC2",
                    name: "EC传感器2"
                },{
                    param: "COMM_PH1",
                    name: "PH传感器1"
                },{
                    param: "COMM_PH2",
                    name: "PH传感器2"
                },{
                    param: "COMM_W",
                    name: "称重传感器"
                },{
                    param: "COMM_PP1",
                    name: "蠕动泵1"
                },{
                    param: "COMM_PP2",
                    name: "蠕动泵2"
                },{
                    param: "COMM_PP3",
                    name: "蠕动泵3"
                },{
                    param: "COMM_PP4",
                    name: "蠕动泵4"
                },{
                    param: "COMM_PP5",
                    name: "蠕动泵5"
                },{
                    param: "COMM_CO2",
                    name: "二氧化碳传感器"
                },{
                    param: "COMM_WP",
                    name: "压力传感器"
                },]
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
                this.resetCommChart();
            },
            // 获取操作历史
            getCommList(page) {
                axios({
                    method: "post",
                    url: `${this.apiurl}/la/history/comm/get`,
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
                        this.total_comm = data.data.data_total;
                        data.data.data.forEach(item => {
                            let result = {
                                time: formatTime(item["time"])
                            }
                            item.comm_content.item.forEach(itm1 => {
                                    result[[itm1.param_code]] = itm1["value"]
                            })
                            tb.push(result);
                        });
                        this.commTable = tb;
                        this.resetCommChart();
                    }
                })
            },
            getCommList1(page) {
                axios({
                    method: "post",
                    url: `${this.apiurl}/la/history/comm/get`,
                    data: {
                        data: {
                            start_time: this.start_time,
                            end_time: this.end_time,
                            page_index: page - 1,
                            page_size: this.rows_comm
                        }
                    }
                }).then(data => {
                    if(data.data.code == 200) {
                        let tb = [];
                        // this.total_comm = data.data.data_total;
                        data.data.data.forEach(item => {
                            let result = {
                                time: formatTime(item["time"])
                            }
                            item.comm_content.item.forEach(itm1 => {
                                    result[[itm1.param_code]] = itm1["value"]
                            })
                            tb.push(result);
                        });
                        this.fullData = tb;
                        this.resetCommChart();
                    }
                })
            },
            resetCommChart(tb) {
                 if(!tb) {
                    tb = this.fullData;
                }
                this.createTb(tb,["COMM_LV1"],"LV-chart1",["#c23531"]);
                this.createTb(tb,["COMM_LV2"],"LV-chart2",["#2f4554"]);
                this.createTb(tb,["COMM_EC1"],"EC-chart1",["#c23531"]);
                this.createTb(tb,["COMM_EC2"],"EC-chart2",["#2f4554"]);
                this.createTb(tb,["COMM_PH1"],"PH-chart1",["#c23531"]);
                this.createTb(tb,["COMM_PH2"],"PH-chart2",["#2f4554"]);
                this.createTb(tb,["COMM_W"],"W-chart");
                this.createTb(tb,["COMM_PP1"],"PP-chart1",["#c23531"]);
                this.createTb(tb,["COMM_PP2"],"PP-chart2",["#2f4554"]);
                this.createTb(tb,["COMM_PP3"],"PP-chart3",["#61a0a8"]);
                this.createTb(tb,["COMM_PP4"],"PP-chart4",["#d48265"]);
                this.createTb(tb,["COMM_PP5"],"PP-chart5",["#91c7ae"]);
                this.createTb(tb,["COMM_CO2"],"CO2-chart");
                this.createTb(tb,["COMM_WP"],"WP-chart");
            },
            pageChange_comm(page) {
                this.page_comm = page;
                this.getCommList(page);
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
        },
        mounted() {
            this.getCommList(1);
            this.getCommList1(1);
        }
     }
</script>
