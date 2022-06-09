<template>
	<div id="tempbox" v-if="showLayer">
		<div class="tempinner">
			<ul class="templist">
				<li v-for="item in 4" @click="hideLayer">屏幕{{item}}</li>
			</ul>
		</div>
	</div>
</template>
<style scoped>
	#tempbox {position: fixed;left: 0;top: 0;right: 0;bottom: 0;background: rgba(0,0,0,.6);z-index: 10000;}
	.templist {display: flex;flex-wrap: wrap;}
	ul {margin: 0;padding: 0;}
	li {list-style: none;cursor: pointer;}
	li {width: 49%;height: 50vh;background: rgba(0,0,0,.4);box-sizing: border-box;border: 10px solid rgba(0,0,0,.6);color: #FFF;font-size: 40px;display: flex;justify-content: center;align-items: center}
</style>
<script>
	export default {
		data() {
			return {
				showLayer: true
			}
		},
		methods: {
			hideLayer() {
				this.showLayer = false;
			}
		}
	}
</script>