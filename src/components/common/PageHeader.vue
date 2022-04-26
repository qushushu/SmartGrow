<template>
	<div>
		<span v-if="showBack" @click="toBack"><el-link :underline="false"><i class="el-icon-back"></i> 返回</el-link><a-divider type="vertical" /></span>
		<span class="title"> {{title}} </span>
		<a-divider />
	</div>
</template>
<style scoped>
	.title {font-size: 16px;color: #303133;font-weight: bold;}
	.ant-divider-horizontal {margin: 12px 0;}
</style>
<script>
	export default {
		data() {
			return {
				title: this.$attrs.title,
				showBack: this.$attrs.goBack !== "false"
			}
		},
		methods: {
			toBack() {
				this.$router.back();
			}
		}
	}
</script>