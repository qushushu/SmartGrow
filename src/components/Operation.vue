<!-- 
  组件说明： 本组件为手动调节组件。
  进入方式： 导航 -> 手动操作
  用户权限：操作员可以使用。未登录用户或其他用户自动跳转至首页。
  其他说明：子组件的地址在同级目录Operation文件夹下。
-->
<template>
	<div class="container-fluid ym-main">
		<div class="mobile-home-tab mobile-bg-cd">
			<a-card>
				<el-tabs tab-position="top">
				    <el-tab-pane label="喷灌"><Operation_1></Operation_1></el-tab-pane>
				    <el-tab-pane label="配液"><Operation_2></Operation_2></el-tab-pane>
				    <el-tab-pane label="环境"><Operation_3 ></Operation_3></el-tab-pane>
				</el-tabs>
			</a-card>
		</div>
	</div>
</template>
<style scoped>
    .mobile-hide {display: none;}
    .pc-show {display: block;}
    @media screen and (max-width: 768px) {
	     .pad-hide {display: none;}
	     .pad-show {display: block;}
	}
	@media screen and (max-width: 500px) {
	    .mobile-hide {display: block;}
	    .pc-show {display: none;}
	    .ant-card-body {padding: 0;}
	}
</style>
<script>
	import Operation_1 from "./Operation/Operation_1"
	import Operation_2 from "./Operation/Operation_2"
	import Operation_3 from "./Operation/Operation_3"
	import {getUserPower} from "../assets/tools/tool"
	export default {
	    components: {
	    	Operation_1,
	    	Operation_2,
	    	Operation_3
	    },
	    methods: {
	    	autoJump() {
                if(getUserPower() !== 1) {
                    this.$router.replace("/");
                }
            }
	    },
	    mounted() {
	    	this.autoJump();
	    }
	}
</script>