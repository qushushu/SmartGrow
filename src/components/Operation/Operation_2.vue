<!-- 
  组件说明： 本组件为手动操作面板配液设置组件。
-->
<template>
	<div>
		<!-- PC基本信息 start -->
		<a-card size="small" class="space-btm1 text-center">
            <el-row justify="space-between" type="flex">
                <el-col v-for="item,key in dataInfo" :key="key">
                    <p class="text-dt">{{item.name}}</p>
                    <p class="text-dd">{{item.value}} <span class="dw" v-if="item.dw">{{item.dw}}</span></p>
                </el-col>
            </el-row>
        </a-card>
		<!-- PC基本信息 end -->
		<!-- PC 转速、重量 start -->
        <a-card>
          	<table class="normal-table text-center">
				<tr>
					<td class="td-name"></td>
					<td class="td-onoff">开关</td>
					<td class="td-zs">转速</td>
                    <td>当前质量(g)</td>
                    <td>起始质量(g)</td>
                    <td>本次增加质量(g)</td>
				</tr>
				<tr v-for="num in 5">
                    <!-- 蠕动泵名称 start -->
                    <td>{{nameList[num - 1]}}</td>
                    <!-- 蠕动泵名称 end -->
                    <!-- 开关 start -->
                    <td> <a-switch @change="onChangeRdb" :disabled="runInfo.dig.AUTO === 1" :asid="num" :checked="radioOnOff[num-1]"></a-switch></td>
                    <!-- 开关 end -->
                    <!-- 转速 start -->
                    <td><el-input-number v-for="i in 5" :key="i" :step="5"  v-if="num == i" :disabled="runInfo.dig.AUTO === 1" v-model="sliderData[i-1]" @change="onChangeZs" :min="0" :max="300" label="描述文字" size="small"></el-input-number></td>
                    <!-- 转速 end -->
                    <!-- 质量 start -->
                    <td>{{runInfo.ana["W" + num]}}</td>
                    <td>{{runInfo.ana["WS" + num] || "--"}}</td>
                    <td>{{(runInfo.ana["W" + num] - runInfo.ana["WS" + num]) || "--"}}</td>
                    <!-- 质量 end -->
				</tr>
          	</table>
		</a-card>
		<!-- PC 转速、重量 end -->
	</div>
</template>
<style scoped>
   .td-name {width: 105px;}
   .td-onoff {width: 65px;}
   .td-zs {width: 165px;}
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
            // 获取当前信息
            runInfo() {
                return this.$store.state.runInfo;
            },
            // EC、PH、液位、液温
            dataInfo() {
                return [{
                    name: "营养液EC值",
                    value: this.runInfo.ana.EC ? this.runInfo.ana.EC.toFixed(2) : '--',
                    dw: "us/cm"
                },{
                    name: "营养液PH值",
                    value: this.runInfo.ana.PH ? this.runInfo.ana.PH.toFixed(2) : '--',
                },{
                    name: "液位",
                    value: this.runInfo.ana.LIQ_B_LV ? this.runInfo.ana.LIQ_B_LV.toFixed(2) : '--',
                    dw: "CM"
                },{
                    name: "液温",
                    value: this.runInfo.ana.LIQ_TEMP ? this.runInfo.ana.LIQ_TEMP.toFixed(2) : '--',
                    dw: "℃"
                }]
            },
            // 转速
	    	showArrZs() {
	    		let {ZS1,ZS2,ZS3,ZS4,ZS5} = this.runInfo.ana;
	    		return [ZS1,ZS2,ZS3,ZS4,ZS5];
	    	},
            // 开关状态
	    	radioOnOff() {
	    		let {PP1,PP2,PP3,PP4,PP5} = this.runInfo.dig;
	    		return [PP1,PP2,PP3,PP4,PP5].map(item => {
	    			return item == "1" ? true: false;
	    		});
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