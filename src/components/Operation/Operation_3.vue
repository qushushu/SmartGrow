<template>
	<div>
		<!-- 当前环境信息展示 start -->
		<a-card class="space-btm1 mobile-hide">
			<!-- 温度 start -->
			<a-row type="flex" align="top" class="space-btm1">
				<a-col :span="6"><a-statistic title="当前温度(℃)" :value="runInfo.ana.TEMP ? runInfo.ana.TEMP.toFixed(2) : '--'" /></a-col>
				<a-col :span="6">
					<a-statistic title="当前湿度(%)" :value="runInfo.ana.HUM ? runInfo.ana.HUM.toFixed(2) : '--'" />
				</a-col>
				<a-col :span="6"><a-statistic title="当前二氧化碳浓度(ppm)" :value="runInfo.ana.CO2 ? runInfo.ana.CO2.toFixed(2) : '--'" /></a-col>
				<a-col :span="6">
					<div class="ant-statistic">
						<div class="ant-statistic-title">当前设备状态：</div>
						<div class="ant-statistic-content">
							<div class="ant-statistic-content-value">
								<div class="ant-statistic-content-value-int"><a-switch :disabled="runInfo.dig.AUTO === 1" checked-children="已开启" un-checked-children="已关闭" :default-checked="runInfo.dig.CO2_valve=='1'" @change="onChange" /></div>
							</div>
						</div>
					</div>
				</a-col>	
			</a-row>
			<!-- 温度 end -->
			<!-- 湿度 start -->
			<a-row type="flex" align="top" class="space-btm">
				<a-col :span="6">
					<div class="ant-statistic">
						<div class="ant-statistic-title">目标温度(℃)</div>
						<div class="ant-statistic-content">
							<div class="ant-statistic-content-value">
								<div class="ant-statistic-content-value-int"><span v-show="!showIptWd">{{value_wd}}</span> <a-input-number id="inputNumber_wd" v-show="showIptWd" v-model="value_wd" :min="1" :max="100" class
								="space-right" /><a href="javascript:;" class="f-n"><i class="el-icon-edit" @click="toggleShowIptWd(value_wd)"></i></a></div>
							</div>
						</div>
					</div>
				</a-col>
				<a-col :span="6">
					<div class="ant-statistic">
						<div class="ant-statistic-title">目标湿度(%)</div>
						<div class="ant-statistic-content">
							<div class="ant-statistic-content-value">
								<div class="ant-statistic-content-value-int"><span v-show="!showIptSd">{{value_sd}}</span> <a-input-number id="inputNumber_sd" v-show="showIptSd" v-model="value_sd" :min="1" :max="100" class
								="space-right"  /><a href="javascript:;" class="f-n"><i class="el-icon-edit" @click="toggleShowIptSd(value_sd)"></i></a></div>
							</div>
						</div>
					</div>
				</a-col>
				<a-col :span="6">
					<div class="ant-statistic">
						<div class="ant-statistic-title">日出时间：</div>
						<div class="ant-statistic-content">
							<el-time-select
							  v-model="valueRc"
							  :picker-options="{
							    start: '05:00',
							    step: '00:15',
							    end: '10:00'
							  }"
							  placeholder="选择时间">
							</el-time-select>
						</div>
					</div>
				</a-col>
				<a-col :span="6">
					<div class="ant-statistic">
						<div class="ant-statistic-title">日落时间：</div>
						<div class="ant-statistic-content">
							<div class="ant-statistic-content">
							<el-time-select
							  v-model="valueRl"
							  :picker-options="{
							    start: '15:00',
							    step: '00:15',
							    end: '19:30'
							  }"
							  placeholder="选择时间">
							</el-time-select>
						</div>
						</div>
					</div>
				</a-col>
			</a-row>
			<!-- 湿度 end -->
		</a-card>

		<a-card class="space-btm1 mobile-show">
			<!-- 温度 start -->
			<a-row type="flex" align="middle" class="space-btm">
				<a-col :span="12"><a-statistic title="当前温度(℃)" :value="runInfo.ana.TEMP ? runInfo.ana.TEMP.toFixed(2) : '--'" /></a-col>
				<a-col :span="12">
					<div class="ant-statistic">
						<div class="ant-statistic-title">目标温度(℃)</div>
						<div class="ant-statistic-content">
							<div class="ant-statistic-content-value">
								<div class="ant-statistic-content-value-int"><span v-show="!showIptWd">{{value_wd}}</span> <a-input-number id="inputNumber_wd" v-show="showIptWd" v-model="value_wd" :min="1" :max="100" class
								="space-right" /><a href="javascript:;" class="f-n"><i class="el-icon-edit" @click="toggleShowIptWd(value_wd)"></i></a></div>
							</div>
						</div>
					</div>
				</a-col>
			</a-row>
			<!-- 温度 end -->
			<!-- 湿度 start -->
			<a-row type="flex" align="middle" class="space-btm">
				<a-col :span="12">
					<a-statistic title="当前湿度(%)" :value="runInfo.ana.HUM ? runInfo.ana.HUM.toFixed(2) : '--'" />
				</a-col>
				<a-col :span="12">
					<div class="ant-statistic">
						<div class="ant-statistic-title">目标湿度(%)</div>
						<div class="ant-statistic-content">
							<div class="ant-statistic-content-value">
								<div class="ant-statistic-content-value-int"><span v-show="!showIptSd">{{value_sd}}</span> <a-input-number id="inputNumber_sd" v-show="showIptSd" v-model="value_sd" :min="1" :max="100" class
								="space-right"  /><a href="javascript:;" class="f-n"><i class="el-icon-edit" @click="toggleShowIptSd(value_sd)"></i></a></div>
							</div>
						</div>
					</div>
				</a-col>
			</a-row>
			<!-- 湿度 end -->
			<!-- co2浓度及设备状态 start -->
			<a-row type="flex" justify="space-around" align="middle" class="space-btm">
				<a-col :span="12"><a-statistic title="当前CO2浓度(ppm)" :value="runInfo.ana.CO2 ? runInfo.ana.CO2.toFixed(2) : '--'" /></a-col>
				<a-col :span="12">
					<div class="ant-statistic">
						<div class="ant-statistic-title">当前设备状态：</div>
						<div class="ant-statistic-content">
							<div class="ant-statistic-content-value">
								<div class="ant-statistic-content-value-int"><a-switch :disabled="runInfo.dig.AUTO === 1" checked-children="已开启" un-checked-children="已关闭" :default-checked="runInfo.dig.CO2_valve=='1'" @change="onChange" /></div>
							</div>
						</div>
					</div>
				</a-col>
				<a-col :span="8"></a-col>
			</a-row>
			<!-- co2浓度及设备状态 end -->
			<a-row type="flex" align="middle" class="space-btm">
				<a-col :span="12">
					<div class="ant-statistic">
						<div class="ant-statistic-title">日出时间：</div>
						<div class="ant-statistic-content">
							<el-time-select
							  v-model="valueRc"
							  :picker-options="{
							    start: '05:00',
							    step: '00:15',
							    end: '10:00'
							  }"
							  placeholder="选择时间">
							</el-time-select>
						</div>
					</div>
				</a-col>
				<a-col :span="12">
					<div class="ant-statistic">
						<div class="ant-statistic-title">日落时间：</div>
						<div class="ant-statistic-content">
							<div class="ant-statistic-content">
							<el-time-select
							  v-model="valueRl"
							  :picker-options="{
							    start: '15:00',
							    step: '00:15',
							    end: '19:30'
							  }"
							  placeholder="选择时间">
							</el-time-select>
						</div>
						</div>
					</div>
				</a-col>
			</a-row>
		</a-card>
		<!-- 当前环境信息展示 end -->
		<!-- 植物灯开关 start -->
		<a-card v-loading="fullscreenLoading" :class="{isloading: fullscreenLoading}">
			<div v-if="seedling_light_dig.length">
				<div v-if="seedling_light_dig.length && seedling_light_dig[0].length">
			    	<h5 class="light-tit light-tit_spe">第{{ 1 }}组植物灯</h5>
			        <el-table :data="tableData" size="small" border>
					    <el-table-column prop="title"></el-table-column>
					    <el-table-column label="左侧">
					    	<template slot-scope="scope">植物灯开关：
					    		<el-switch @change="changeLight(0)" :disabled="runInfo.dig.AUTO === 1" v-model="show_seedling_light_dig[0][scope.row.index - 1]"> </el-switch>
					    	</template>
					    </el-table-column>
					    <el-table-column label="右侧">
					    	<template slot-scope="scope">植物灯开关：
					    		<el-switch @change="changeLight(0)" :disabled="runInfo.dig.AUTO === 1" v-model="show_seedling_light_dig[0][scope.row.index + 3]"> </el-switch>
					    	</template>
					    </el-table-column>
					</el-table>
				</div>

				<div v-if="seedling_light_dig.length && seedling_light_dig[1].length">
					<h5 class="light-tit">第{{ 2 }}组植物灯</h5>
			        <el-table :data="tableData" size="small" border>
					    <el-table-column prop="title"></el-table-column>
					    <el-table-column label="左侧">
					    	<template slot-scope="scope">植物灯开关：
					    		<el-switch @change="changeLight(1)" :disabled="runInfo.dig.AUTO === 1" v-model="show_seedling_light_dig[1][scope.row.index - 1]"> </el-switch>
					    	</template>
					    </el-table-column>
					    <el-table-column label="右侧">
					    	<template slot-scope="scope">植物灯开关：
					    		<el-switch @change="changeLight(1)" :disabled="runInfo.dig.AUTO === 1"  v-model="show_seedling_light_dig[1][scope.row.index + 3]"> </el-switch>
					    	</template>
					    </el-table-column>
					</el-table>
				</div>

				<div v-if="seedling_light_dig.length && seedling_light_dig[2].length">
					<h5 class="light-tit">第{{ 3 }}组植物灯</h5>
			        <el-table :data="tableData" size="small" border>
					    <el-table-column prop="title"></el-table-column>
					    <el-table-column label="左侧">
					    	<template slot-scope="scope">植物灯开关：
					    		<el-switch @change="changeLight(2)" :disabled="runInfo.dig.AUTO === 1" v-model="show_seedling_light_dig[2][scope.row.index - 1]"> </el-switch>
					    	</template>
					    </el-table-column>
					    <el-table-column label="右侧">
					    	<template slot-scope="scope">植物灯开关：
					    		<el-switch @change="changeLight(2)" :disabled="runInfo.dig.AUTO === 1" v-model="show_seedling_light_dig[2][scope.row.index + 3]"> </el-switch>
					    	</template>
					    </el-table-column>
					</el-table>
				</div>
			</div>
			<el-empty v-if="seedling_light_dig.length && !seedling_light_dig[0].length  && !seedling_light_dig[1].length  && !seedling_light_dig[2].length"></el-empty>
		</a-card>
		<!-- 植物灯开关 end -->
	</div>
</template>
<style scoped>
	td {vertical-align: middle;}
	.space-btm {margin-bottom: 10px;}
	.space-btm1 {margin-bottom: 20px;}
	.space-right {margin-right: 4px;}
	.f-n {font-size: 14px;}
	.light-tit {text-align: center;margin-top: 10px;margin-bottom: 8px;font-size: 14px;}
	.light-tit_spe {margin-top: 0;}
	.isloading {padding-bottom: 100px;}
</style>
<script>
	import axios from 'axios'
	import {minuteToTime} from "../../assets/tools/tool"
	export default {
		data() {
		    return {
		    	defData: false,
		    	radio: "1",
		    	value_wd:20,
		    	value_sd:40,
		    	showIptWd: false,
		    	showIptSd: false,
		    	tableData: [{title: "第四层",index: 4}, {title: "第三层",index: 3}, {title: "第二层",index: 2},{title: "第一层",index: 1}],
		    	valueRc:  "",
		    	valueRl: "",
		    	seedling_light_dig: [],
		    	fullscreenLoading: false
		    };
		},
		methods: {
			minuteToTime,
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
		    // 修改目标温度
		    toggleShowIptWd(target) {
		    	this.showIptWd = !this.showIptWd;
		    	if(!this.showIptWd) {
		    		axios({
		    			method: "post",
		    			 url: `${this.apiurl}/la/control`,
		    			 data: {
			            	data: {
				            	ana: {
				                    TEMP: this.value_wd
				                }
			            	}
			            }
		    		});
		    	}
		    },
		    // 修改目标湿度
		    toggleShowIptSd(target) {
		    	this.showIptSd = !this.showIptSd;
		    	if(!this.showIptSd) {
		    		axios({
		    			method: "post",
		    			 url: `${this.apiurl}/la/control`,
		    			 data: {
			            	data: {
				            	ana: {
				                    Datas: this.value_sd
				                }
			            	}
			            }
		    		})
		    	}
		    },
			// 获取所有指示灯状态
			async getReadLight() {
				this.fullscreenLoading = true;
				let seedling_light_dig = [];
				let res1 = await this.getLight(1);
				seedling_light_dig.push(res1);
				let res2 = await this.getLight(2);
				seedling_light_dig.push(res2);
				let res3 = await this.getLight(3);
				seedling_light_dig.push(res3);
				this.seedling_light_dig = seedling_light_dig;
				this.fullscreenLoading = false;
			},
			// 获取第num组指示灯状态
			getLight(n) {
				let _this = this;
				return new Promise(resolve => {
					axios({
						method: 'post',
			            url: `${this.apiurl}/la/device/param/read`,
			            data: {
			            	data: { 
						        "operateNo": "hhhdddgg",
						        "op_id": "2",
						        "op_type": "OP_LT_SDL_CALL_SET",     
						        "dev_id": n
						  }
			            }
					}).then(data=> {
			        	if(data.data.code == 200) {
			        		if(data.data.data) {
				        		let ord = data.data.data.item;
				        		let arr = ord.map(item => item.value);
				        		let base = arr.splice(0,3);
				        		let rc = base[1];
				        		let rl = base[2];
				        		_this.valueRc = this.minuteToTime(rc);
				        		_this.valueRl = this.minuteToTime(rl);
				        		arr = arr.map(item => item == 1);
				        		resolve(arr);
			        		} else {
			        			resolve([])
			        		}
			        	} else {
			        		resolve([])
			        	}
			        });
				});
			},
			// 修改第num组指示灯状态
			changeLight(num) {
				this.$confirm('是否修改照明灯开关？', '提示', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(()=> {
					// 获取dev_id
					let dev_id = num + 1;
					// 获取DAY_OFFSET
					let DAY_OFFSET = 1;
					// 获取SUNRIZE（日出时间）
		    		let [m,n] = this.valueRc.split(":");
		    		m = Number(m)
		    		n = Number(n)
		    		let SUNRIZE = 60 * m + n;
					// 获取SUNSET（日落时间）
					let [m1,n1] = this.valueRl.split(":");
		    		m1 = Number(m1)
		    		n1 = Number(n1)
		    		let SUNSET = 60 * m1 + n1;
					// 获取4组植物灯状态
					let LT_L1 = this.show_seedling_light_dig[num][0] ? 1 : 0;
					let LT_L2 = this.show_seedling_light_dig[num][1] ? 1 : 0;
					let LT_L3 = this.show_seedling_light_dig[num][2] ? 1 : 0;
					let LT_L4 = this.show_seedling_light_dig[num][3] ? 1 : 0;
					let LT_R1 = this.show_seedling_light_dig[num][4] ? 1 : 0;
					let LT_R2 = this.show_seedling_light_dig[num][5] ? 1 : 0;
					let LT_R3 = this.show_seedling_light_dig[num][6] ? 1 : 0;
					let LT_R4 = this.show_seedling_light_dig[num][7] ? 1 : 0;
					// 构建基础数据
					let baseJson = {
						operateNo: "111",
				        op_id: "1",
				        op_type: "OP_LT_SDL_SET_SET",
				        dev_id,
				        item_num: 11
					}
					// 构建灯数据
					let lightJson = {
						item: [
				            {
				                param_id: 1,
				                param_code: "DAY_OFFSET",
				                value: DAY_OFFSET
				            },
				            {
				                param_id: 2,
				                param_code: "SUNRIZE",
				                value: SUNRIZE
				            },
				            {
				                "param_id": 3,
				                "param_code": "SUNSET",
				                "value": SUNSET
				            },
				            {
				                "param_id": 4,
				                "param_code": "LT_L1",
				                "value": LT_L1
				            },
				            {
				                "param_id": 5,
				                "param_code": "LT_L2",
				                "value": LT_L2
				            },
				            {
				                "param_id": 6,
				                "param_code": "LT_L3",
				                "value": LT_L3
				            },
				            {
				                "param_id": 7,
				                "param_code": "LT_L4",
				                "value": LT_L4
				            },
				            {
				                "param_id": 8,
				                "param_code": "LT_R1",
				                "value": LT_R1
				            },
				            {
				                "param_id": 9,
				                "param_code": "LT_R2",
				                "value": LT_R2
				            },
				            {
				                "param_id": 10,
				                "param_code": "LT_R3",
				                "value": LT_R3
				            },
				            {
				                "param_id": 11,
				                "param_code": "LT_R4",
				                "value": LT_R4
				            }
				        ]
					}

					let data = { 
				        ...baseJson,
				        ...lightJson
				  	};
					// 调用接口
					axios({
			            method: 'post',
			            url: `${this.apiurl}/la/device/param/write`,
			            data: {
			            	data 
			            }
			        }).then(data=> {
			        	if(data.data.code == 200) {
			        		this.$store.commit("changeOpOnoff",true);
			        	}
			        });
                })
			}
		},
		watch: {
			op_onOff(value) {
				if(value) {
					this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                    this.$store.commit("changeOpOnoff",false);
				}
			}
		},
	    computed: {
	    	runInfo() {
		        return this.$store.state.runInfo;
		    },
		    show_seedling_light_dig() {
	    		return this.seedling_light_dig;
		    },
		    apiurl() {
                return this.$store.state.apiurl;
            },
            op_onOff() {
            	return this.$store.state.op_onOff;
            }
	    },
	    mounted() {
			this.getReadLight();
		}
	}
</script>