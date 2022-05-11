<!-- 
	组件说明： 本组件为查看培植记录组件。
	进入方式： 方案管理 -> 培植记录。
	用户权限： 操作员可以使用。未登录用户或其他用户自动跳转至首页。
 -->
<template>
	<div class="container-fluid ym-main">
		<a-card>
			<!-- 头部标题 start -->
			<PageHeader title="培植记录" goBack=true></PageHeader>
			<!-- 头部标题 end -->
			<!-- 导出excel start -->
			<el-button type="primary" size="small" @click="downloadExl" style="margin-bottom: 20px;">导出excel</el-button>
			<!-- 导出excel end -->
			<!-- 表格 start -->
			<el-table ref="multipleTable" :data="recordList" border stripe size="small" tooltip-effect="dark">
			    <el-table-column prop="plant" label="育苗名称"></el-table-column>
			    <el-table-column prop="scheme_name" label="方案名称"></el-table-column>
			    <el-table-column prop="grow_cycle" label="生产周期(天)" width="100"></el-table-column>
			    <el-table-column prop="start_time" label="开始时间"></el-table-column>
			    <el-table-column prop="finish_time" label="结束时间"></el-table-column>
			    <el-table-column prop="record_time" label="记录时间"></el-table-column>
			    <el-table-column prop="status" label="状态"></el-table-column>
			    <el-table-column prop="remark" label="评价"></el-table-column>
			</el-table>
			<!-- 表格 end -->
		</a-card>
	</div>
</template>
<script>
	import PageHeader from "./common/PageHeader"
	import download from "../assets/tools/downloadExcel"
	import {getUserPower} from "../assets/tools/tool"
	export default {
		components: {
	    	PageHeader
	    },
	    computed: {
	    	// 培植记录
            recordList() {
            	return this.$store.state.recordList;
            }
	    },
	    methods: {
	    	// 获取培植记录
	    	getRecordList() {
	    		this.$store.dispatch("getRecordList",{
					plant: this.$route.query.plant,
		            scheme_name: this.$route.query.scheme_name,
		            start_time: "",
		            end_time: ""
				});
	    	},
	    	// 导出excel
	    	downloadExl() {
	    		let result = this.recordList.map(item=> {
	    			return {
		    			"育苗名称": item.plant,
		    			"方案名称": item.scheme_name,
		    			"生产周期(天)": item.grow_cycle,
		    			"开始时间": item.start_time,
		    			"结束时间": item.finish_time,
		    			"记录时间": item.record_time,
		    			"评价": item.remark,
		    			"状态": item.status,
	    			}
	    		})
			    download(result, this.$route.query.scheme_name +'的培植记录列表.xlsx');//导出的文件名
	    	},
	    	// 未登录用户跳转到首页
	    	autoJump() {
                if(getUserPower() !== 1) {
                    this.$router.replace("/");
                }
            }
	    },
		mounted() {
			this.getRecordList();
			this.autoJump();
		}
	}
</script>