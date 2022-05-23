<!-- 
  组件说明： 本组件为仪表盘页面右侧蓝色区域当前方案组件。
-->
<template>
    <a-card size="small" class="card-box_dark space-btm">
        <div class="mycard-body mobile-hide">
            <!-- 预览图片 start -->
            <div class="card-imgbox"> <img :src="planInfo.plant.plant_image || defaultImg" class="card-img" alt=""> </div>
            <!-- 预览图片 end -->
            <!-- PC端详细信息 start -->
            <div class="normal-list">
              <a-descriptions class="form-text" size="middle" :column="2">
                <a-descriptions-item label="定做育苗">{{plantName}} </a-descriptions-item>
                <a-descriptions-item label="EC目标值">{{EC_TV}} </a-descriptions-item>
                <a-descriptions-item label="定植日期">{{start_time}} </a-descriptions-item>
                <a-descriptions-item label="PH目标值"> {{PH_TV}} </a-descriptions-item>
                <a-descriptions-item label="运行方案">{{scheme_name}}</a-descriptions-item>
                <a-descriptions-item label="温度目标值">{{temp_day}}（日） / {{temp_night}}（夜）</a-descriptions-item>
                <a-descriptions-item label="生产周期">{{grow_cycle}} 天</a-descriptions-item>
                <a-descriptions-item label="湿度目标值">{{humidity_day}}（日） / {{humidity_night}}（夜）</a-descriptions-item>
                <a-descriptions-item label="方案备注">{{remark}} </a-descriptions-item>
                <a-descriptions-item label="日出 / 日落">{{SUNRIZE}} / {{SUNSET}}</a-descriptions-item>
                <a-descriptions-item label="当前阶段">{{stage_name}}</a-descriptions-item>
                <a-descriptions-item label="CO2目标值">{{CO2}}</a-descriptions-item>
              </a-descriptions>
            </div>
            <!-- PC端详细信息 end -->
        </div>

        <div class="mycard-body pc-hide mobile-show">
            <!-- 移动端详细信息 start -->
            <div class="normal-list mobile-normal-list">
                <div class="mobile-capsule">
                    <p>定做育苗</p>
                    <p>{{plantName}}</p>
                </div>
                <div class="mobile-capsule">
                    <p>定植日期</p>
                    <p>{{start_time}}</p>
                </div>
                <div class="mobile-capsule">
                    <p>方案备注</p>
                    <p>{{scheme_name}}</p>
                </div>
                <div class="mobile-capsule">
                    <p>运行方案</p>
                    <p>{{remark}}</p>
                </div>
                <div class="mobile-capsule">
                    <p>EC目标值</p>
                    <p>{{EC_TV}}</p>
                </div>
                <div class="mobile-capsule">
                    <p>PH目标值</p>
                    <p>{{PH_TV}}</p>
                </div>
                 <div class="mobile-capsule">
                    <p>生产周期</p>
                    <p>{{grow_cycle}} 天</p>
                </div>
                <div class="mobile-capsule">
                    <p>温度目标值</p>
                    <p>{{temp_day}}（日） / {{temp_night}}（夜）</p>
                </div>
                <div class="mobile-capsule">
                    <p>湿度目标值</p>
                    <p>{{humidity_day}}（日） / {{humidity_night}}（夜）</p>
                </div>
                <div class="mobile-capsule">
                    <p>CO2目标值</p>
                    <p>{{CO2}}</p>
                </div>
            </div>
            <!-- 移动端详细信息 end -->
        </div>
    </a-card>
</template>
<style scoped>
    .space-btm {margin-bottom: 10px;}
    .card-box_dark {background: #78db6a;color: #FFF;}
    .mycard-body {align-items: center;display: flex;}
    .card-imgbox {width: 18%;top: -3px;}
    .card-img {width: 90%;height: auto;display: block;border-radius: 2px;margin-left: 5%;}
    .normal-list {width: 75%;box-sizing: border-box;padding-left: 20px;}
</style>
<script>
    import axios from 'axios'
    import {formatTime,minuteToTime} from "../../assets/tools/tool.js"
    export default {
        data() {
            return {
                defaultImg: "/static/temp.png",
                planInfo: {
                  plant: {},
                  start_time: "",
                  curStage: {
                    stage_content: {}
                  }
                },
            }
        },
        computed: {
            apiurl() {
                return this.$store.state.apiurl;
            },
            plantName() {
                return this.planInfo.plant.plant ||  "--";
            },
            EC_TV() {
                return this.planInfo.curStage.stage_content.length ? (this.planInfo.curStage.stage_content[0].EC_TV || '--') :  "--";
            },
            start_time() {
                return formatTime(this.planInfo.start_time) || "--";
            },
            PH_TV() {
                return this.planInfo.curStage.stage_content.length ? (this.planInfo.curStage.stage_content[0].PH_TV || '--') :  "--";
            },
            scheme_name () {
                return this.planInfo.plant.scheme_name || "--";
            },
            temp_day () {
                return this.planInfo.curStage.stage_content.length ? (this.planInfo.curStage.stage_content[0].TEMP_DAY || '--') :  "--";
            },
            temp_night () {
                return this.planInfo.curStage.stage_content.length ? (this.planInfo.curStage.stage_content[0].TEMP_NIGHT || '--') :  "--";
            },
            grow_cycle() {
                return this.planInfo.plant.grow_cycle ||  "--";
            },
            humidity_day() {
                return this.planInfo.curStage.stage_content.length ? (this.planInfo.curStage.stage_content[0].HUM_DAY || '--') :  "--";
            },
            humidity_night() {
                return this.planInfo.curStage.stage_content.length ? (this.planInfo.curStage.stage_content[0].HUM_NIGHT || '--') :  "--";
            },
            remark() {
                return this.planInfo.plant.remark ||  "--";
            },
            CO2() {
                return this.planInfo.curStage.stage_content.length ? (this.planInfo.curStage.stage_content[0].CO2 || '--') :  "--";
            },
            SUNRIZE() {
                return  this.planInfo.curStage.stage_content.length ? (this.minuteToTime(this.planInfo.curStage.stage_content[0].SUNRIZE) || '--') :  "--";
            },
            SUNSET() {
                return this.planInfo.curStage.stage_content.length ? (this.minuteToTime(this.planInfo.curStage.stage_content[0].SUNSET) || '--') :  "--";
            },
            stage_name() {
                return this.planInfo.curStage.stage_content.length ? (this.planInfo.curStage.stage_content[0].stage_name || '--') :  "--";
            }
        },
        methods: {
            minuteToTime,
            // 获取当前种植计划及当前阶段信息
            getCurrPlan() {
                axios({
                    method: 'post',
                    url: `${this.apiurl}/la/plant/implement/get`
                }).then(data=> {
                  if(data.data.code == 200) {
                    // 当前种植计划
                    this.planInfo = data.data.data;
                    // 获取当前阶段
                    let arr_stage_item = this.planInfo.plant.stage_item;
                    if(arr_stage_item.length) {
                      let disDay = (new Date() - new Date(this.planInfo.start_time) ) / (24 * 3600 * 1000) - 1;
                      this.planInfo.curStage = arr_stage_item[arr_stage_item.length - 1];
                      let tmp = arr_stage_item.find((item,index)=> (item.stage_content.day_offset >= disDay));
                      tmp && (this.planInfo.curStage = tmp);
                    } else {
                        this.planInfo.curStage = {
                            stage_content: []
                        }
                    }
                  }
                })
            },
            // 格式化时间
            formatTime
        },
        mounted() {
            this.getCurrPlan();
        }
    }
</script>