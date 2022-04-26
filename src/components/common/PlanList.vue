<template>
    <!-- 培植方案列表 start -->
    <ul class="listData">
        <li v-for="item in plantList" @click="readyChangePlan(item.id)"><div class="img_box" v-loading.fullscreen.lock="fullscreenLoading"><img :src="item.plant_image" alt="" @error="unloadImg"></div><p>{{item.scheme_name}}</p></li>
    </ul>
    <!-- 培植方案列表 end -->
</template>
<style scoped>
    .listData {position: absolute;z-index: 20;top: 50px;right: 63px;width: 80%;padding: 0;padding-top: 8px;font-size: 0;background: #FFF;border-radius: 4px;box-shadow: 0 0 10px #a1a1a1;}
    .listData li {display: inline-block;box-sizing: border-box;width: 20%;padding:  10px;text-align: center;font-size: 14px;cursor: pointer;}
    .img_box {display: inline-block;width: 80px;height: 80px;padding: 5px;border: 1px solid #ddd;}
    .img_box img {width: 100%;height: 100%;}
    .listData p {margin-top: 10px;font-size: 12px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}
    @media screen and (max-width: 768px) {
        .listData li {width: 25%;}
    }
    @media screen and (max-width: 500px) {
        .listData li {width: 33.33%;}
    }
    @media screen and (max-width: 400px) {
        .listData li {width: 50%;}
    }
</style>
<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                plantList: [],
                fullscreenLoading: false,
            }
        },
        watch: {
            showLayer(b) {
                b && this.getList();
            }
        },
        computed: {
            apiurl() {
                return this.$store.state.apiurl;
            }
        },
        props: ["showLayer"],
        methods: {
            unloadImg() {
                console.log(123);
            },
            // 获取所有培植方案
            getList() {
                axios({
                    method: "post",
                    url: `${this.apiurl}/la/plant/head/get_list`,
                    data: {
                        data: {
                            formData: {
                                plant: "",
                                scheme_name: "",
                                start_time: "",
                                end_time: ""
                            }
                        }
                    }
                }).then(data => {
                    if(data.data.code == 200) {
                        this.plantList = data.data.data;
                        this.$store.commit("changePlanListLayerState",true);
                    }
                });
            },
            readyChangePlan(plant_id) {
                this.$confirm('是否切换该种植方案?', '提示', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    this.start(plant_id);
                    this.$message({
                        type: 'success',
                        message: '切换成功!'
                    });
                    this.$store.commit("changePlanListLayerState",false);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '切换失败'
                    });
                    this.$store.commit("changePlanListLayerState",false);
                });
            },
            // 开始培植
            start(plant_id) {
                this.fullscreenLoading = true;
                axios({
                    method: "post",
                    url: `${this.apiurl}/la/plant/implement/start`,
                    data: {
                        data: {
                            plant_id,
                            remark: ''
                        }
                    }
                }).then(data => {
                    this.fullscreenLoading = false;
                    if(data.data.code == 200) {
                        this.$message({
                            type: 'success',
                            message: '方案开启成功'
                        });
                        this.$emit("changeState",false);
                    }
                });
            }
        }
    }
</script>