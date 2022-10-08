<!-- 
  组件说明： 本组件为切换ip组件。
-->
<template>
    <div>
         <a-card size="small" class="space-btm"> 
            <div style="display: flex;justify-content: space-between;">
                <div>
                    <a href="javascript:;" @click="desNum" class="btnChangeUrl">上一个</a>
                </div>
                <div>
                     <span v-if="!ErrDesc" style="font-weight: bold">{{currentNum}} 号</span>
                     <span v-if="ErrDesc">{{ErrDesc}}</span>
                </div>
                <div>
                    <a href="javascript:;" @click="addNumber" class="btnChangeUrl">下一个</a>
                </div>
            </div>
            <div v-loading="loading"></div>
        </a-card>
    </div>
</template>
<style scoped>
    .btnChangeUrl {text-decoration: none;color: #999;}
</style>
<script>
    export default {
        data() {
            return {
                currentNum: 0,
                dataCurNum: 0,
                testUrl: "http://192.168.1.13:3601/#/",
                arrUrl: [],
                hostUrl: [],
                loading: false,
                ErrDesc: ""
            }
        },
        methods: {
            getHost() {
                // 获取编号
                let originData = this.currentUrl;
                let arr = originData.split(":");
                if(arr.length < 3) {
                    this.ErrDesc = "编号获取失败！"
                    return;
                }
                this.arrUrl = arr;

                // 处理编号
                let host = this.arrUrl[1];
                let arr1 = host.split(".");
                if(arr1.length < 4) {
                    this.ErrDesc = "编号获取失败！"
                    return;
                } 
                this.hostUrl = arr1;
                let num = arr1[3];
                this.currentNum = Number(num);
                this.dataCurNum = this.currentNum;
            },
            changeUrl(url) {
                this.loading = true;
                location.href = url;
            },
            addNumber() {
                if(this.ErrDesc) {
                    this.$message({
                      type: 'error',
                      message: "当前编号获取失败，请联系管理员！"
                    });
                    return;
                }
                let index = this.arrNumberList.findIndex(n => n === this.dataCurNum);
                index ++;
                index %=  (this.arrNumberList.length);
                this.dataCurNum = this.arrNumberList[index];
                let newUrl = this.getNewUrl();
                this.changeUrl(newUrl);
            },
            desNum() {
                if(this.ErrDesc) {
                    this.$message({
                      type: 'error',
                      message: "当前编号获取失败，请联系管理员！"
                    });
                    return;
                }
                let index = this.arrNumberList.findIndex(n => n === this.dataCurNum);
                index = index == 0 ? this.arrNumberList.length - 1: index- 1;
                this.dataCurNum = this.arrNumberList[index];
                let newUrl = this.getNewUrl();
                this.changeUrl(newUrl);
            },
            getNewUrl() {
                this.hostUrl[3] = this.dataCurNum;
                let strHost = this.hostUrl.join(".");
                this.arrUrl[1] = strHost;
                let result = "";
                result = this.arrUrl.join(":");
                return result;
            }
        },
        computed: {
            currentUrl() {
                return this.$store.state.currentUrl;
            },
            localMode() {
                return this.$store.state.localMode;
            },
            arrNumberList() {
                return this.$store.state.arrNumberList;
            }
        },
        mounted() {
            this.currentNum1 = location.href;
            if(this.localMode) {
                this.$store.commit("updatecurrentUrl",this.testUrl);
            }
            this.loading = false;
            this.getHost();
        }
    }
</script>