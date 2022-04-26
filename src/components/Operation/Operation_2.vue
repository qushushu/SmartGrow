<template>
	<div>
		<!-- PC基本信息 start -->
		<a-card class="space-btm1 mobile-hide">
			<a-row type="flex" justify="space-between">
	            <a-col><a-statistic title="营养液EC值（us/cm）" :value="runInfo.ana.EC ? runInfo.ana.EC.toFixed(2) : '--'" /></a-col>
	            <a-col><a-statistic title="营养液PH值" :value="runInfo.ana.PH ? runInfo.ana.PH.toFixed(2) : '--'" /></a-col>
	            <a-col><a-statistic title="液位（CM）：" :value="runInfo.ana.LIQ_B_LV ? runInfo.ana.LIQ_B_LV.toFixed(2) : '--'" /></a-col>
	            <a-col><a-statistic title="营养液液温（℃）：" :value="runInfo.ana.LIQ_TEMP ? runInfo.ana.LIQ_TEMP.toFixed(2) : '--'" /></a-col>
          	</a-row>
        </a-card>
		<!-- PC基本信息 end -->
		<!-- 移动基本信息 start -->
        <a-card class="space-btm1 mobile-show">
        	<div class="mobile-capsule">
        		<p>营养液EC值（us/cm）</p>
        		<p>{{runInfo.ana.EC ? runInfo.ana.EC.toFixed(2) : '--'}}</p>
        	</div>

        	<div class="mobile-capsule">
        		<p>营养液PH值</p>
        		<p>{{runInfo.ana.PH ? runInfo.ana.PH.toFixed(2) : '--'}}</p>
        	</div>

        	<div class="mobile-capsule">
        		<p>液位（CM）</p>
        		<p>{{runInfo.ana.LIQ_B_LV ? runInfo.ana.LIQ_B_LV.toFixed(2) : '--'}}</p>
        	</div>

        	<div class="mobile-capsule">
        		<p>营养液液温(℃)</p>
        		<p>{{runInfo.ana.LIQ_TEMP ? runInfo.ana.LIQ_TEMP.toFixed(2) : '--'}}</p>
        	</div>
        </a-card>
        <!-- 移动基本信息 end -->

		<!-- PC 转速、重量 start -->
        <a-card class="mobile-hide">
          	<table id="tb1"  class="normal-table">
          		<!-- 当前转速 start -->
				<tr>
					<td style="max-width: 100px;"></td>
					<td style="max-width: 60px;">开关</td>
					<!-- <td style="width: 70px;">方向</td> -->
					<td style="max-width: 50px">转速</td>
					<td style="max-width: 58px;">当前<br />质量(g)</td>
					<td style="max-width: 58px;">起始<br />质量(g)</td>
					<td style="max-width: 65px;">本次增加<br />质量(g)</td>
				</tr>
				<tr v-for="num in 5">
					<td>{{nameList[num - 1]}}</td>
					<td> <a-switch @change="onChangeRdb" :disabled="runInfo.dig.AUTO === 1" :asid="num" :checked="radioOnOff[num-1]"></a-switch></td>
					<!-- <td>
						<el-radio v-model="radioArr[num - 1]" :disabled="runInfo.dig.AUTO === 1" label="1" :asid="num" @change="changeZf(1)">正向</el-radio> 
						<el-radio v-model="radioArr[num - 1]" :disabled="runInfo.dig.AUTO === 1" label="0" :asid="num" @change="changeZf(0)" >逆向</el-radio>
					</td> -->
 					<td>
 						<el-input-number :step="5"  v-if="num == 1" :disabled="runInfo.dig.AUTO === 1" v-model="sliderData[0]" @change="onChangeZs1" :min="1" :max="300" label="描述文字" size="small"></el-input-number>
 						<el-input-number :step="5"  v-if="num == 2" :disabled="runInfo.dig.AUTO === 1" v-model="sliderData[1]" @change="onChangeZs2" :min="1" :max="300" label="描述文字" size="small"></el-input-number>
 						<el-input-number :step="5"  v-if="num == 3" :disabled="runInfo.dig.AUTO === 1" v-model="sliderData[2]" @change="onChangeZs3" :min="1" :max="300" label="描述文字" size="small"></el-input-number>
 						<el-input-number :step="5"  v-if="num == 4" :disabled="runInfo.dig.AUTO === 1" v-model="sliderData[3]" @change="onChangeZs4" :min="1" :max="300" label="描述文字" size="small"></el-input-number>
 						<el-input-number :step="5"  v-if="num == 5" :disabled="runInfo.dig.AUTO === 1" v-model="sliderData[4]" @change="onChangeZs5" :min="1" :max="300" label="描述文字" size="small"></el-input-number>
 					</td>
 					<td><span class="num-text">{{runInfo.ana["W" + num]}}</span> </td>
 					<td><span class="num-text">{{runInfo.ana["WS" + num] || "--"}}</span></td>
 					<td><span class="num-text">{{(runInfo.ana["W" + num] - runInfo.ana["WS" + num]) || "--"}}</span></td>
				</tr>
          		<!-- 当前重量 end -->
          	</table>
		</a-card>
		<!-- PC 转速、重量 end -->
		<!-- 移动端 转速、重量 start -->
		<a-card class="mobile-show">
		    <ul class="yys-list">
		        <li v-for="num in 5">
		            <div class="yys-top">
		                <p class="yys-title">{{nameList[num - 1]}}</p>
		                <a-switch @change="onChangeRdb" :asid="num" :checked="radioOnOff[num-1]" :disabled="runInfo.dig.AUTO === 1"></a-switch>
		            </div>
		           <!--  <div class="yys-set">
		                <el-radio v-model="radioArr[num - 1]" label="1" :asid="num" @change="changeZf(1)">正向</el-radio> 
		                <el-radio v-model="radioArr[num - 1]" label="0" :asid="num" @change="changeZf(0)">逆向</el-radio>
		                <span v-show="!showIptZs[num - 1]">{{showArrZs[num - 1] || '--'}} </span> 
		                <a-input-number v-show="showIptZs[num - 1]" :index="num - 1" :defaultValue="showArrZs[num - 1]" :min="0" step=10 :max="100" @change="onChangeZs" class="space-right1" />
		                <a href="javascript:;" class="f-normal"><i class="el-icon-edit" @click="toggleShowIptZs(num - 1)"></i></a>
		            </div> -->
		            <div class="yys-btm">
		                <div>
		                    <p class="yys-zl_b">{{runInfo.ana["W" + num] ? runInfo.ana["W" + num] : "--"}}</p>
		                    <p class="yys-zl_t">当前质量(g)</p>
		                </div>
		                <div>
		                    <p class="yys-zl_b">{{runInfo.ana["WS" + num] ? runInfo.ana["WS" + num] : "--"}}</p>
		                    <p class="yys-zl_t">起始质量(g)</p>
		                </div>
		                <div>
		                    <p class="yys-zl_b">{{(runInfo.ana["W" + num] - runInfo.ana["WS" + num]) || "--"}}</p>
		                    <p class="yys-zl_t">本次增加质量(g)</p>
		                </div>
		            </div>
		        </li>
		    </ul>
		</a-card>
		<!-- 移动端 转速、重量 end -->
	</div>
</template>
<style scoped>
	td {vertical-align: middle;}
	#tb1 {width: 100%;table-layout: fixed;}
	#tb1,#tb1 td {border: 1px solid #ebeef5;color: #172b4d;}
	.normal-table {border-collapse: collapse; border: 1px solid #f1f1f1; width: 100%; font-size: 12px; color: #606266; }
  	.normal-table td { border:  1px solid #f1f1f1;padding: 8px;}
	.space-btm1 {margin-bottom: 20px;}
	.space-btm2 {margin-bottom: 5px;}
	.pd-text {padding: 0 8px;}
	.box-zsheader {display: flex;justify-content: space-between;padding: 8px;}
	.t-center {text-align: center;}
	.box-weight {width: 180px;height: 180px;margin: auto;}
	.f-normal {font-size: 14px;}
	.space-right1 {margin-right: 4px;}
	.num-text {overflow: hidden;text-overflow: ellipsis;max-width: 100%;display: block;white-space: nowrap;}
</style>
<script>
	export default {
		data() {
			return {
				showIptZs: [false,false,false,false,false],
				nameList: ["营养液A蠕动泵","营养液B蠕动泵","营养液C蠕动泵","酸液蠕动泵","碱液蠕动泵"],
				sliderData: [],
			}
		},
		methods: {
			// 方向修改
			changeZf(value) {
				let baseNum = parseInt(event.target.parentNode.parentNode.getAttribute("asid"));
				this.$confirm('是否切换蠕动泵转向?', '提示', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(()=> {
					let data = {
						data_id: 261 + baseNum,
					    data_code: "C_PP" + baseNum + "_ZF",
					    value
					};
					this.$store.dispatch("control",{
						data
		    		});
                })
			},
			// 蠕动泵开关修改
			onChangeRdb(checked) {
				let value = checked ? 1 : 0;
				let baseNum = parseInt(event.target.getAttribute("asid"));
				this.$confirm(value ? '是否开启蠕动泵开关?' : '是否关闭蠕动泵开关?', '提示', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(()=> {
					let data = {
						data_id: 256 + baseNum,
					    data_code: "C_PP" + baseNum,
					    value
					}
					this.$store.dispatch("control",{
						data
		    		});
                })
			},
			// 切换转速编辑状态
			toggleShowIptZs(n) {
				let arr = [...this.showIptZs];
				let value = this.showArrZs[n];
				arr[n] = !arr[n];
				this.showIptZs = arr;
			},
			// 改变A蠕动泵转速值
			onChangeZs1(value) {
				this.$confirm('是否修改A蠕动泵转速值', '提示', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(()=> {
					this.$store.dispatch("adjust",{
						data: {
						    data_id: 1,
						    data_code: "ADJ_ZS1",
						    value
						}
		    		});
                })
			},
			// 改变B蠕动泵转速值
			onChangeZs2(value) {
				this.$confirm('是否修改A蠕动泵转速值', '提示', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(()=> {
					this.$store.dispatch("adjust",{
						data: {
						    data_id: 2,
						    data_code: "ADJ_ZS2",
						    value
						}
		    		});
                })
			},
			// 改变C蠕动泵转速值
			onChangeZs3(value) {
				this.$confirm('是否修改A蠕动泵转速值', '提示', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(()=> {
					this.$store.dispatch("adjust",{
						data: {
						    data_id: 3,
						    data_code: "ADJ_ZS3",
						    value
						}
		    		});
                })
			},
			// 改变D蠕动泵转速值
			onChangeZs4(value) {
				this.$confirm('是否修改A蠕动泵转速值', '提示', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(()=> {
					this.$store.dispatch("adjust",{
						data: {
						    data_id: 4,
						    data_code: "ADJ_ZS4",
						    value
						}
		    		});
                })
			},
			// 改变酸液蠕动泵转速值
			onChangeZs5(value) {
				this.$confirm('是否修改A蠕动泵转速值', '提示', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(()=> {
					this.$store.dispatch("adjust",{
						data: {
						    data_id: 5,
						    data_code: "ADJ_ZS5",
						    value
						}
		    		});
                })
			},
			closest(cname,cd) {
				let tar = cd.parentNode;
				return Array.from(tar.classList).includes(cname) ? tar : this.closest(cname,tar);
			},
		},
		watch: {
			showArrZs(data) {
				this.sliderData = data;
			},
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
	    	showArrZs() {
	    		let {ZS1,ZS2,ZS3,ZS4,ZS5} = this.runInfo.ana;
	    		return [ZS1,ZS2,ZS3,ZS4,ZS5];
	    	},
	    	radioArr() {
	    		let {PP1_ZF,PP2_ZF,PP3_ZF,PP4_ZF,PP5_ZF} = this.runInfo.dig;
	    		return [PP1_ZF,PP2_ZF,PP3_ZF,PP4_ZF,PP5_ZF].map(item => String(item));
	    	},
	    	radioOnOff() {
	    		let {PP1,PP2,PP3,PP4,PP5} = this.runInfo.dig;
	    		return [PP1,PP2,PP3,PP4,PP5].map(item => {
	    			return item == "1" ? true: false;
	    		});
	    	},
	    	// 获取当前信息
	    	runInfo() {
		        return this.$store.state.runInfo;
		    },
		    op_onOff() {
            	return this.$store.state.op_onOff;
            }
	    },
	    mounted() {
	    	this.$store.dispatch("updateRunInfo");
		}
	}
</script>