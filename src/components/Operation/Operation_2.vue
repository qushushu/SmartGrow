<!-- 
  组件说明： 本组件为手动操作面板配液设置组件。
-->
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
					<td style="max-width: 50px">转速</td>
					<td>当前质量(g) / 起始质量(g) / 本次增加质量(g)</td>
				</tr>
				<tr v-for="num in 5">
					<td>{{nameList[num - 1]}}</td>
					<td> <a-switch @change="onChangeRdb" :disabled="runInfo.dig.AUTO === 1" :asid="num" :checked="radioOnOff[num-1]"></a-switch></td>
 					<td><el-input-number v-for="i in 5" :key="i" :step="5"  v-if="num == i" :disabled="runInfo.dig.AUTO === 1" v-model="sliderData[i-1]" @change="onChangeZs" :min="0" :max="300" label="描述文字" size="small"></el-input-number></td>
 					<td class="t-center"><span class="num-text">{{runInfo.ana["W" + num]}} / {{runInfo.ana["WS" + num] || "--"}} / {{(runInfo.ana["W" + num] - runInfo.ana["WS" + num]) || "--"}}</span> </td>
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
	.t-center {text-align: center;}
	.num-text {overflow: hidden;text-overflow: ellipsis;max-width: 100%;display: block;white-space: nowrap;}
</style>
<script>
	export default {
		data() {
			return {
				nameList: ["营养液A蠕动泵","营养液B蠕动泵","营养液C蠕动泵","酸液蠕动泵","碱液蠕动泵"],
                oldSliderData: [],
				sliderData: [],
			}
		},
		methods: {
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
            // 改变酸液蠕动泵转速值
            onChangeZs(value) {
                let data_id = 0;
                this.sliderData.forEach((item,key) => {
                    if(item !== this.oldSliderData[key]) {
                        data_id = key + 1;
                    }
                });
                this.$confirm('确认修改蠕动泵转速值', '提示', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(()=> {
                    this.oldSliderData = [...this.sliderData];
                    this.$store.dispatch("adjust",{
                        data: {
                            data_id,
                            data_code: `ADJ_ZS${data_id}`,
                            value
                        }
                    });
                }).catch(err => {
                    this.sliderData = [...this.oldSliderData];
                });
            }
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