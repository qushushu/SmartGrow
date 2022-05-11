<!-- 
  组件说明：本组件为历史记录组件。
  进入方式：导航 -> 历史记录
  用户权限：操作员可以使用。未登录用户或其他用户自动跳转至首页。
  其他说明：子组件的地址在同级目录History文件夹下。
-->
<template>
	<div class="ym-main">
		<a-card>
			<!-- 头部标题 start -->
			<PageHeader title="历史记录" goBack=false></PageHeader>
			<!-- 头部标题 end -->
			<a-row type="flex" justify="start">
				<!-- 下拉选项 start -->
				<a-col>
					<a-select :default-value="current" style="width: 120px" @change="handleChange">
				      <a-select-option value="ana"> 模拟量历史 </a-select-option>
				      <a-select-option value="dig"> 开关量历史 </a-select-option>
				      <a-select-option value="alarm"> 告警历史 </a-select-option>
				      <a-select-option value="light"> 植物灯历史 </a-select-option>
				      <a-select-option value="comm"> 通信历史 </a-select-option>
				      <a-select-option value="param"> 参数历史 </a-select-option>
				    </a-select>
				</a-col>
				<!-- 下拉选项 end -->
 				<!-- 日期选择 start -->
				<a-col style="margin-left: 8px;">
					<a-range-picker @change="onChange" :placeholder="['开始日期', '结束日期']" />
				</a-col>
 				<!-- 日期选择 end -->
			</a-row>
			<!-- 模拟量历史 start -->
			<Ana v-if="current === 'ana'" :rows="rows" :start_time="start_time" :end_time="end_time"></Ana>
			<!-- 模拟量历史 end -->

			<!-- 开关量历史 start -->
			<Dig v-if="current === 'dig'" :rows="rows" :start_time="start_time" :end_time="end_time"></Dig>
			<!-- 开关量历史 end -->

			<!-- 警告历史 start -->
			<Alarm v-if="current === 'alarm'" :rows="rows" :start_time="start_time" :end_time="end_time"></Alarm>
			<!-- 警告历史 end -->

			<!-- 警告历史 start -->
			<Light v-if="current === 'light'" :rows="rows" :start_time="start_time" :end_time="end_time"></Light>
			<!-- 警告历史 end -->

			<!-- 通信历史 start -->
			<Comm v-if="current === 'comm'" :rows="rows" :start_time="start_time" :end_time="end_time"></Comm>
			<!-- 通信历史 end -->

			<!-- 参数历史 start -->
			<Param v-if="current === 'param'" :rows="rows" :start_time="start_time" :end_time="end_time"></Param>
			<!-- 参数历史 end -->
		</a-card>
	</div>
</template>
<script>
	import PageHeader from "./common/PageHeader"
	import Dig from "./History/Dig"
	import Alarm from "./History/Alarm"
	import Light from "./History/Light"
	import Comm from "./History/Comm"
	import Param from "./History/Param"
	import Ana from "./History/Ana"
	import {autoJump} from "../assets/tools/tool"
	export default {
		data() {
			return {
		        current: "ana",
				start_time: "",
				end_time: "",
				rows: 24
	      	}
		},
		components: {
	    	PageHeader,
	    	Dig,
	    	Alarm,
	    	Comm,
	    	Param,
	    	Ana,
	    	Light
	    },
		methods: {
			// 下拉框改变
			handleChange(cur) {
				this.current = cur;
			},
			// 修改开始、结束时间
			onChange(date, dateString) {
		      this.start_time = dateString[0];
		      this.end_time = dateString[1];
		    },
		},
		mounted() {
			autoJump(1);
		}
	}
</script>