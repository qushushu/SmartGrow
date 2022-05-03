<template>
	<div>
		<!-- 头部 start -->
		<Head></Head>
		<!-- 头部 end -->
		<!-- 导航 start -->
		<Nav></Nav>
		<!-- 导航 ebd -->
		<div class="container-fluid ym-main">
			<a-card>
				<!-- 头部标题 start -->
				<PageHeader title="查看阶段" goBack=true></PageHeader>
				<!-- 头部标题 end -->
				<!-- 导出excel start -->
				<el-button type="primary" size="small" @click="downloadExl" :disabled="!!!tableData1.length">导出excel</el-button>
				<!-- 导出excel end -->
				<el-table ref="multipleTable" :data="tableData1" height="300" border stripe size="small" empty-text tooltip-effect="dark" style="margin-top: 20px;">
					<el-table-column size="small" v-for="item,key in colList" :key="key" :prop="item.prop" :label="item.label"></el-table-column>
				</el-table>
				<div style="margin-top: 10px;">
					<el-button type="primary" size="small" @click="handleEdit">编辑</el-button>
				</div>
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
	import axios from 'axios'
	import download from "../assets/tools/downloadExcel"
	import {minuteToTime,timeToMinute,getUserPower} from "../assets/tools/tool.js"
	export default {
		data() {
			return {
				id: 0,
				scheme_name: "",
		        tableData: [{
		        	ename: "stage_name",
		        	cs: '阶段名称',
		        	csz: '',
		        },{
	        		ename: "DAY_OFFSET",
		        	cs: '天数',
		        	csz: '',
		        },{
	        		ename: "EC_TV",
		          	cs: 'EC',
		          	csz: '',
		        },{
		        	ename: "PH_TV",
		          	cs: 'PH',
		          	csz: '',
		        },{
		        	ename: "SUNRIZE",
		          	cs: '日出时间',
		          	csz: '',
		        },{
		        	ename: "SUNSET",
		          	cs: '日落时间',
		          	csz: '',
		        },{
		        	ename: "TEMP_DAY",
			        cs: '日间温度',
			        csz: '',
		        },{
		        	ename: "TEMP_NIGHT",
		          	cs: '夜间温度',
		          	csz: '',
		        },{
		        	ename: "HUM_DAY",
		          	cs: '日间湿度',
		          	csz: '',
		        },{
		        	ename: "HUM_NIGHT",
		          	cs: '夜间湿度',
		          	csz: '',
		        },{
		        	ename: "CO2",
		          	cs: 'CO2浓度',
		          	csz: '',
		        },{
		        	ename: "LIQ_TEMP",
		          	cs: '营养液温度',
		          	csz: '',
		        }],
		        tableData1: [],
		        curStageId: 0
	      	}
		},
		components: {
	    	Head,
	    	Nav,
	    	PageHeader
	    },
	    computed: {
	    	apiurl() {
                return this.$store.state.apiurl;
            },
            colList() {
				return this.tableData.map(item => {
					return {
						prop: item.ename,
						label: item.cs
					}
				})
			}
	    },
	    methods: {
	    	// 获取数据
	    	getList() {
	    		axios({
	    			method: "post",
	    			url: `${this.apiurl}/la/plant/get`,
	    			data: {
	    				data: {
	    					id: this.id
	    				}
	    			}
	    		}).then(data => {
	    			if(data.data.code == 200) {
	    				data.data.data.stage_item.forEach(item => {
		    				const itm = {
		    					...item.stage_content[0]
		    				}
		    				itm.SUNRIZE = minuteToTime(itm.SUNRIZE);
		    				itm.SUNSET = minuteToTime(itm.SUNSET);
		    				this.tableData1.push(itm);
	    				});
	    			}
	    		})
	    	},
	    	handleEdit() {
	    		this.$router.push("/PlanStage?id=" + this.id);
	    	},
	    	downloadExl() {
                let baseJson = {
                    "阶段名称" : "阶段名称",
                    "天数" : "DAY_OFFSET",
                    "EC" : "EC_TV",
                    "PH" : "PH_TV",
                    "日出时间" :"SUNRIZE",
                    "日落时间" : "SUNSET",
                    '日间温度' : "TEMP_DAY",
                    '夜间温度' : "TEMP_NIGHT",
                    '日间湿度' : "HUM_DAY",
                    '夜间湿度' : "HUM_NIGHT",
                    'CO2浓度' : "CO2",
                    '营养液温度' : "LIQ_TEMP"
                };
			    let result = this.tableData1.map(item => {
			    	return {
			    		"阶段名称" : item.stage_name || "-",
			    		"天数" : item.DAY_OFFSET || "--",
			    		"EC" : item.EC_TV || "--",
			    		"PH" : item.PH_TV || "--",
			    		"日出时间" : item.SUNRIZE || "--",
			    		"日落时间" : item.SUNSET || "--",
			    		'日间温度' : item.TEMP_DAY || "--",
			    		'夜间温度' : item.TEMP_NIGHT || "--",
			    		'日间湿度' : item.HUM_DAY || "--",
			    		'夜间湿度' : item.HUM_NIGHT || "--",
			    		'CO2浓度' : item.CO2 || "--",
			    		'营养液温度' : item.LIQ_TEMP || "--"
			    	}
			    });
                result.unshift(baseJson);
			    download(result, this.scheme_name +'方案阶段列表.xlsx')//导出的文件名
	    	},
	    	autoJump() {
                if(getUserPower() !== 1) {
                    this.$router.replace("/");
                }
            }
		},
		mounted() {
	    	this.id = this.$route.query.id;
	    	this.scheme_name = this.$route.query.scheme_name;
	    	this.getList();
	    	this.autoJump();
		},
	}
</script>