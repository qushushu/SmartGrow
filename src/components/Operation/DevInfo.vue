<template>
    <a-card class="space-btm1">
        <!-- 当前环境信息展示 start -->
        <a-row type="flex" align="top" class="space-btm1">
            <a-col :span="6"><a-statistic :title="$t('message.当前温度') + '(℃)'" :value="currentTemp" /></a-col>
            <a-col :span="6"><a-statistic :title="$t('message.当前湿度') + '(%)'" :value="currentHum" /></a-col>
            <a-col :span="6"><a-statistic :title="$t('message.当前二氧化碳浓度') + '(ppm)'" :value="currentCO2" /></a-col>
            <a-col :span="6"><h5 class="ant-statistic-title" style="padding-top: 2px;"> {{$t("message.二氧化碳电磁阀")}}</h5><div><a-switch v-model="runInfo.dig.CO2V == 1" style="margin-top: 12px;" @change="onChangeCO2V" :disabled="runInfo.dig.AUTO === 1" /></div></a-col>
        </a-row>
        <!-- 当前环境信息展示 end -->  
        <a-row type="flex" align="top" class="space-btm" v-if="planInfo.curStage.stage_content.length">
            <a-col :span="6"><a-statistic :title="$t('message.日目标温度') + '(℃)'" :value="temp_day" /></a-col>
            <a-col :span="6"><a-statistic :title="$t('message.夜目标温度') + '(℃)'" :value="temp_night" /></a-col>
            <a-col :span="6"><a-statistic :title="$t('message.日目标湿度') + '(%)'" :value="humidity_day" /></a-col>
            <a-col :span="6"><a-statistic :title="$t('message.夜目标湿度') + '(%)'" :value="humidity_night" /></a-col>
        </a-row>
        <a-row type="flex" align="top" class="space-btm" v-if="planInfo.curStage.stage_content.length">
            <a-col :span="6"><a-statistic :title="$t('message.日出时间') " :value="SUNRIZE" /></a-col>
            <a-col :span="6"><a-statistic :title="$t('message.日落时间') " :value="SUNSET" /></a-col>
        </a-row>
        <!-- 设备信息 start -->
        <a-row type="flex" align="top" class="space-btm" v-if="false">
            <a-col :span="6">
                <div class="ant-statistic">
                    <div class="ant-statistic-title">{{$t('message.目标温度')}}(℃)</div>
                    <div class="ant-statistic-content">
                        <div class="ant-statistic-content-value">
                            <div class="ant-statistic-content-value-int"><span v-show="!showIptWd">{{TEMP_TV}}</span> <a-input-number v-show="showIptWd" v-model="show_temp_tv" :min="1" :max="100" class
                            ="space-right" /><a href="javascript:;" class="f-n"><i class="el-icon-edit" @click="toggleShowIptWd(show_temp_tv)"></i></a></div>
                        </div>
                    </div>
                </div>
            </a-col>
            <a-col :span="6">
                <div class="ant-statistic">
                    <div class="ant-statistic-title">{{$t('message.目标湿度')}}(%)</div>
                    <div class="ant-statistic-content">
                        <div class="ant-statistic-content-value">
                            <div class="ant-statistic-content-value-int"><span v-show="!showIptSd">{{HUM_TV}}</span> <a-input-number v-show="showIptSd" v-model="show_hum_tv" :min="1" :max="100" class
                            ="space-right"  /><a href="javascript:;" class="f-n"><i class="el-icon-edit" @click="toggleShowIptSd(show_hum_tv)"></i></a></div>
                        </div>
                    </div>
                </div>
            </a-col>
            <a-col :span="6">
                <div class="ant-statistic">
                    <div class="ant-statistic-title">{{$t('message.日出时间')}}：</div>
                    <div class="ant-statistic-content">
                        <el-time-select
                          v-model="SUNRIZE"
                          :picker-options="{
                            start: '05:00',
                            step: '00:15',
                            end: '10:00'
                          }"
                          placeholder="选择时间"
                          @change="changeRc"
                          >
                        </el-time-select>
                    </div>
                </div>
            </a-col>
            <a-col :span="6">
                <div class="ant-statistic">
                    <div class="ant-statistic-title">{{$t('message.日落时间')}}：</div>
                    <div class="ant-statistic-content">
                        <div class="ant-statistic-content">
                            <el-time-select
                              v-model="SUNSET"
                              :picker-options="{
                                start: '15:00',
                                step: '00:15',
                                end: '19:30'
                              }"
                              @change="changeRl"
                              placeholder="选择时间">
                            </el-time-select>
                        </div>
                    </div>
                </div>
            </a-col>
        </a-row>
        <!-- 设备信息 end -->
    </a-card>

</template>
<style scoped>
.space-right {margin-right: 4px;}
.f-n {font-size: 14px;}
</style>
<script>
    import axios from 'axios'
    import {formatTime,minuteToTime} from "../../assets/tools/tool.js"
    import {switchTimeToShow,switchTimeToSubmit} from "../../assets/tools/tool.js"
    export default {
        data() {
            return {
                showIptWd: false,
                showIptSd: false,
                show_temp_tv: 0,
                show_hum_tv: 0,
                TEMP_TV: "",
                HUM_TV: "",
                itemList: []   // 设备各项参数列表
            };
        },
        computed: {
            apiurl() {
                return this.$store.state.apiurl;
            },
            isPlant() {
                return this.$store.state.isPlant;
            },
            operateNo() {
                return this.$store.state.user.operateNo;
            },
            op_id() {
                return this.$store.state.user.userId;
            },
            // 运行信息
            runInfo() {
                return this.$store.state.runInfo;
            },
            // 当前温度
            currentTemp() {
                return this.runInfo.ana.TEMP ? this.runInfo.ana.TEMP.toFixed(2) : '--';
            },
            // 当前湿度
            currentHum() {
                return this.runInfo.ana.HUM ? this.runInfo.ana.HUM.toFixed(2) : '--';
            },
            // 当前CO2浓度
            currentCO2() {
                return this.runInfo.ana.CO2 ? this.runInfo.ana.CO2.toFixed(2) : '--';
            },
            planInfo() {
                return this.$store.state.currentPlanInfo;
            },
            temp_day () {
                return this.planInfo.curStage.stage_content.length ? (this.planInfo.curStage.stage_content[0].TEMP_DAY || '--') :  "--";
            },
            temp_night () {
                return this.planInfo.curStage.stage_content.length ? (this.planInfo.curStage.stage_content[0].TEMP_NIGHT || '--') :  "--";
            },
            humidity_day() {
                return this.planInfo.curStage.stage_content.length ? (this.planInfo.curStage.stage_content[0].HUM_DAY || '--') :  "--";
            },
            humidity_night() {
                return this.planInfo.curStage.stage_content.length ? (this.planInfo.curStage.stage_content[0].HUM_NIGHT || '--') :  "--";
            },
            SUNRIZE() {
                return  this.planInfo.curStage.stage_content.length ? (this.minuteToTime(this.planInfo.curStage.stage_content[0].SUNRIZE) || '--') :  "--";
            },
            SUNSET() {
                return this.planInfo.curStage.stage_content.length ? (this.minuteToTime(this.planInfo.curStage.stage_content[0].SUNSET) || '--') :  "--";
            },
        },
        watch: {
            planInfo(data) {
                // 获取当前阶段
                let arr_stage_item = data.plant.stage_item;
                if(arr_stage_item.length) {
                      let disDay = (new Date() - new Date(data.start_time) ) / (24 * 3600 * 1000) - 1;
                      data.curStage = arr_stage_item[arr_stage_item.length - 1];
                      let tmp = arr_stage_item.find((item,index)=> (item.stage_content.day_offset >= disDay));
                      tmp && (data.curStage = tmp);
                } else {
                    data.curStage = {
                        stage_content: []
                    }
                }
            }
        },
        methods: {
            // 获取当前设备值
            read() {
                axios({
                    url: `${this.apiurl}/la/device/param/read`,
                    method: "post",
                    data: {
                        data: {
                            operateNo: this.operateNo,
                            op_id: this.op_id,
                            op_type: this.isPlant ? "OP_PLANT_CALL_SET" : "OP_SEEDLING_CALL_SET",     
                            dev_id: 1
                        }
                    }
                }).then(data => {
                    if(data.data.code == 200) {
                        let itemList = data.data.data.item;
                        for(let i = 0;i < itemList.length;i++) {
                            itemList[i] = switchTimeToShow(itemList[i],"param_code","value");
                        }
                        this.itemList = itemList;
                        this.TEMP_TV = this.getValueFromParam("TEMP_TV")
                        this.HUM_TV = this.getValueFromParam("HUM_TV")
                        this.SUNRIZE = this.getValueFromParam("SUNRIZE")
                        this.SUNSET = this.getValueFromParam("SUNSET")
                    }
                })
            },
            // 工具函数
            getValueFromParam(param_code) {
                let arr = this.itemList.filter(item => item["param_code"] == param_code);
                return arr.length ? arr[0].value : "";
            },
            setValueFromParam(param_code,newData) {
                let arr = this.itemList.filter(item => item["param_code"] == param_code);
                arr[0].value = newData;
            },
            // 修改目标温度
            toggleShowIptWd(target) {
                this.showIptWd = !this.showIptWd;
                this.show_temp_tv = this.TEMP_TV;
                if(!this.showIptWd) {
                    this.setValueFromParam("TEMP_TV",target);
                    this.save();
                }
            },
            // 修改目标湿度
            toggleShowIptSd(target) {
                this.showIptSd = !this.showIptSd;
                this.show_hum_tv = this.HUM_TV;
                if(!this.showIptSd) {
                    this.setValueFromParam("HUM_TV",target);
                    this.save();
                }
            },
            // 修改日出时刻
            changeRc(target) {
                this.setValueFromParam("SUNRIZE",target);
                this.save();
            },
            // 修改日落时刻
            changeRl(target) {
                this.setValueFromParam("SUNSET",target);
                this.save();
            },
            // 保存
            save() {
                return new Promise(resolve => {
                    this.itemList.forEach(item => {
                        switchTimeToSubmit(item,"param_code","value");
                    });
                    axios({
                        url: `${this.apiurl}/la/device/param/write`,
                        method: "post",
                        data: {
                            data: {
                                operateNo: this.operateNo,
                                op_id: this.op_id,
                                op_type: this.isPlant ? "OP_PLANT_SET_SET" : "OP_SEEDLING_SET_SET",
                                dev_id: 1,
                                item_num:46,
                                item: this.itemList
                            }
                        }
                    }).then(data => {
                        if(data.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: $t('message.修改成功')
                            });
                            this.read();
                        }
                    });
                });
            },
            // 修改设备状态
            onChange(checked) {
                axios({
                    method: 'post',
                    url: `${this.apiurl}/la/control`,
                    data: {
                        data: {
                            dig: {
                                CO2_valve: checked ? 1 : 0
                            }
                        }
                    }
                }).then(data=> {
                    if(data.data.code == 200) {
                        this.$store.dispatch("updateRunInfo");
                    }
                })
            },
            onChangeCO2V(checked) {
                this.$confirm('确认修改二氧化碳电磁阀状态?', '提示', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(()=> {
                    let value = checked ? 1 : 0;
                    this.$store.dispatch("control",{
                        data: {
                            data_id: 7,
                            data_code: "C_CO2_V",
                            value
                        }
                    });
                })
            },
            // 获取当前种植计划及当前阶段信息
            getCurrPlan() {
                this.$store.dispatch("getCurrentPlan");
            },
            minuteToTime
        },
        mounted() {
            this.read();
            this.getCurrPlan();
        }
    }
</script>