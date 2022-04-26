<template>
	<div>
		<Head></Head>
		<Nav></Nav>
		<div class="container-fluid ym-main">
			<a-card>
				<!-- 标题 start -->
				<PageHeader title="设备信息" goBack=false></PageHeader>
				<!-- 标题 end -->
				<el-tabs v-model="activeName" @tab-click="handleClick">
				    <el-tab-pane label="模拟量列表" name="list1">
				    	<el-table ref="multipleTable" :data="tableDataAna" border stripe size="small" tooltip-effect="dark">
							<el-table-column prop="param_id" label="序号" width="50"></el-table-column>
							<el-table-column prop="param_code" label="代码"></el-table-column>
							<el-table-column prop="name" label="参数项" style="width: 100px;"></el-table-column>
							<el-table-column prop="value" label="当前值"></el-table-column>
						</el-table>
				    </el-tab-pane>
				    <el-tab-pane label="开关量列表" name="list2">
				    	<el-table ref="multipleTable" :data="tableDataDig" border stripe size="small" tooltip-effect="dark">
							<el-table-column prop="param_id" label="序号" width="50"></el-table-column>
							<el-table-column prop="param_code" label="代码"></el-table-column>
							<el-table-column prop="name" label="参数项" style="width: 100px;"></el-table-column>
							<el-table-column prop="value" label="当前值"></el-table-column>
						</el-table>
				    </el-tab-pane>
				    <el-tab-pane label="告警列表" name="list3">
				    	<el-table ref="multipleTable" :data="tableDataAlarm" border stripe size="small" tooltip-effect="dark">
							<el-table-column prop="param_id" label="序号" width="50"></el-table-column>
							<el-table-column prop="param_code" label="代码"></el-table-column>
							<el-table-column prop="name" label="参数项" style="width: 100px;"></el-table-column>
							<el-table-column prop="value" label="当前值">
								<template slot-scope="scope">
						    		<div :style="{color: (scope.row.value == '异常' ? 'red' : 'green')}">{{scope.row.value}} </div>
						    	</template>
							</el-table-column>
						</el-table>
				    </el-tab-pane>
				    <el-tab-pane label="传感器通信状态列表" name="list4">
				    	<el-table ref="multipleTable" :data="tableDataComm" border stripe size="small" tooltip-effect="dark">
							<el-table-column prop="param_id" label="序号" width="50"></el-table-column>
							<el-table-column prop="param_code" label="代码"></el-table-column>
							<el-table-column prop="name" label="参数项" style="width: 100px;"></el-table-column>
							<el-table-column prop="value" label="当前值">
								<template slot-scope="scope">
						    		<div :style="{color: (scope.row.value == '异常' ? 'red' : 'green')}">{{scope.row.value}} </div>
						    	</template>
							</el-table-column>
						</el-table>
				    </el-tab-pane>
				    <el-tab-pane label="版本信息" name="list5">
				    	<el-table ref="multipleTable" :data="tableDataVersion" border stripe size="small" tooltip-effect="dark">
				    		<el-table-column prop="dev_id" label="序号" width="50"></el-table-column>
							<el-table-column prop="hardwareVersion" label="硬件版本"></el-table-column>
							<el-table-column prop="softwareVersion" label="软件版本"></el-table-column>
				    	</el-table>
				    </el-tab-pane>
				    <el-tab-pane label="灯控装置版本信息" name="list6">
				    	<el-table ref="multipleTable" :data="tableDataSeedlingLight" border stripe size="small" tooltip-effect="dark">
							<el-table-column prop="dev_id" label="序号" width="50"></el-table-column>
							<el-table-column prop="hardwareVersion" label="硬件版本"></el-table-column>
							<el-table-column prop="softwareVersion" label="软件版本"></el-table-column>
						</el-table>
				    </el-tab-pane>
				  </el-tabs>
				
			</a-card>
		</div>
	</div>
</template>
<style scoped>
	.space-btm1 {margin-bottom: 20px;}
</style>
<script>
	import Head from "./common/Head"
	import Nav from "./common/Nav"
	import PageHeader from "./common/PageHeader"
	import {formatTime} from "../assets/tools/tool"
	import axios from 'axios'
	import {getUserPower} from "../assets/tools/tool"
	export default {
		data() {
			return {
		        tableDataAna: [],
		        tableDataDig: [],
		        tableDataAlarm: [],
		        tableDataComm: [],
		        tableDataSeedlingLight: [],
		        tableDataVersion: [],
		        activeName: 'list1'
	      	}
		},
		components: {
	    	Head,
	    	Nav,
	    	PageHeader,
	    },
	    computed: {
	    	apiurl() {
                return this.$store.state.apiurl;
            }
	    },
	    methods: {
	    	handleClick(tab, event) {
		        console.log(tab, event);
		    },
	    	// 获取仪表盘主体信息
		    info() {
		        axios({
		            method: 'post',
		            url: `${this.apiurl}/la/run/info`,
		            data: {
		    			data: {
						    dev_id: "1"
						}
		    		}
		        }).then(data=> {
		          if(data.data.code == 200) {
		            this.tableDataAna = data.data.data.ana["item"];
		            this.tableDataDig = data.data.data.dig["item"];
		            this.tableDataDig = this.tableDataDig.map(item => {
		            	item.value = item.value ? "开" : "关";
		            	return item;
		            });
		            // 告警0：正常
		            this.tableDataAlarm = data.data.data.alarm["item"];
		            this.tableDataAlarm = this.tableDataAlarm.map(item => {
		            	item.value = item.value ? "异常" : "正常";
		            	return item;
		            });
		            // 通信 1：正常
		            this.tableDataComm = data.data.data.comm["item"];
		            this.tableDataComm = this.tableDataComm.map(item => {
		            	item.value = item.value ? "正常" : "异常";
		            	return item;
		            });
		            this.tableDataSeedlingLight = Object.values(data.data.data.seedling_light["ver"]);
		            this.tableDataVersion.push(data.data.data.version);
		          }
		        })
		    },
		},
		mounted() {
			this.info();
		}
	}
</script>