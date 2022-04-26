<!-- 组件说明： 本组件为页面头部信息组件，包含PC端及移动端 -->
<template>
	<header id="group-header">
		<!-- 移动端头部 start -->
		<div class="mobile-show">
			<el-drawer title="工厂智能育苗系统" :visible.sync="drawer" :direction="direction">
				<Nav mode="vertical" mobile="true"></Nav>
			</el-drawer>
		</div>
		<!-- 移动端头部 end -->
		<el-row type="flex" justify="space-between" align="middle" class="head-box">
			<!-- 移动端左侧导航与logo start -->
			<el-col>
				<!-- 移动端左侧导航 start -->
				<div class="mobile-show"> <i class="el-icon-more more-icon" @click="drawer = true"></i> </div>
				<!-- 移动端左侧导航 end -->
				<!-- logo start -->
				<router-link to="/" class="logo mobile-hide">
					<el-row type="flex" align="middle">
						<img src="../../assets/img/logo.png" alt="工厂智能育苗系统" />
						<h1>工厂智能育苗系统</h1>
					</el-row>
				</router-link>
				<!-- logo end -->
			</el-col>
			<!-- 移动端左侧导航与logo end -->
			<!-- 全部培植方案按钮、 用户登录、切换语言及移动端ip start -->
			<el-col>
				<el-row type="flex" justify="end" align="middle">
					<!-- 全部培植方案按钮 start -->
					<i class="el-icon-menu menu-icon" @click="tgShowLayer" v-if="userPower == '1'"></i>
					<!-- 全部培植方案按钮 end -->
					<!-- 用户登录 start -->
					<i class="el-icon-user user-icon" @click="userLoginDialogVisible=true" v-if="!userInfo.token"></i>
					<!-- 用户登录 end -->
					<!-- 用户退出 start -->
					<el-dropdown @command="handleCommand1" trigger="click" v-if="userInfo.token">
						<span class="el-dropdown-link"><i class="el-icon-setting user-icon"></i></span>
						<el-dropdown-menu slot="dropdown">
						    <el-dropdown-item command="logout">退出</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					<!-- 用户退出 end -->
					<!-- ip设置 start -->
					<i class="el-icon-setting setting-icon" v-if="isMobile" @click="userBaseUrlDialogVisible=true"></i>
					<!-- ip设置 end -->
					<!-- 切换语言 start -->
					<el-dropdown @command="handleCommand" trigger="click">
						<span class="el-dropdown-link">{{$t("message.选择语言")}}<i class="el-icon-arrow-down el-icon--right"></i></span>
						<el-dropdown-menu slot="dropdown">
						    <el-dropdown-item command="zh">中文</el-dropdown-item>
						    <el-dropdown-item command="en">English</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					<!-- 切换语言 end -->
				</el-row>
			</el-col>
			<!-- 全部培植方案按钮、 用户登录、切换语言及移动端ip end -->
		</el-row>
		<!-- 计划列表弹窗 start -->
		<PlanList v-show="showLayer1" @changeState="changeState" :showLayer="showLayer"></PlanList>
		<!-- 计划列表弹窗 end -->
		<!-- 移动端ip修改 start -->
		<el-dialog :visible.sync="userBaseUrlDialogVisible" title="请求路径设置" width="308px" center>
			  <el-input placeholder="请输入ip。如：192.168.1.103" size="small" v-model="mobileBaseUrl1"></el-input>
			  <div slot="footer" class="dialog-footer">
			  	<el-button type="primary" size="small" @click="updateMobileBaseUrl">确认</el-button>
			  </div>
		</el-dialog>
		<!-- 移动端ip修改 end -->
		<!-- 用户登录 start -->
		<el-dialog :visible.sync="userLoginDialogVisible" title="用户登录" :width="loginDialogWidth" center>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="用户名/电话" prop="account">
				    <el-input v-model="ruleForm.account" size="small"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
				    <el-input v-model="ruleForm.password" size="small" show-password></el-input>
				</el-form-item>
			</el-form>
			<div class="txt-center">
		    	<el-button type="primary" @click="handleSubmit('ruleForm')" size="small">{{$t("message.登录")}}</el-button>
			</div>
		</el-dialog>
		<!-- 用户登录 end -->
	</header>
</template>
<style scoped>
	.head-box {padding: 6px 0}
	.logo {display: inline-block;border: none !important;text-decoration: none;}
	.logo img {width: 40px;height: auto;border: none !important;}
	h1 {margin: 0;margin-left: 8px;font-size: 22px;color: #FFF;border: none !important; }
	.el-dropdown-link {color: #FFF;}
	.user-icon, .menu-icon,.setting-icon {font-size: 28px; color: #FFF;cursor: pointer;margin-right: 18px}
	.more-icon {font-size: 20px; cursor: pointer;color: #10131a}
	.txt-center {text-align: center;}
	@media screen and (max-width: 500px) {
		.user-icon, .menu-icon,.setting-icon {color: #10131a;}
	}
</style>
<script>
	import PlanList from "./PlanList"
	import Nav from "./Nav"
    import md5 from "md5"
	import axios from 'axios'
	export default {
		data() {
			return {
				showLayer: false,
				drawer: false,
				direction: 'ltr',
				userBaseUrlDialogVisible: false,
				userLoginDialogVisible: false,
				mobileBaseUrl1: "",
				ruleForm: {
					account: "",
					password: ""
				},
				rules: {
					account: [{ required: true, message: '请输入用户名或电话!', trigger: 'blur' }, ],
					password: [{ required: true, message: '请输入密码!', trigger: 'blur' }, ],
				}
			}
		},
		computed: {
			userPower() {
				return localStorage.userPower || "0";
		    },
			showLayer1() {
				return this.$store.state.PlanListLayerState;
			},
			mobileBaseUrl() {
				return this.$store.state.mobileBaseUrl;
			},
			isMobile() {
				return this.$store.state.isMobile;
			},
			apiurl() {
                return this.$store.state.apiurl;
            },
            loginDialogWidth() {
            	return this.isMobile ? "300px" : "50%";
            },
            userInfo() {
            	return this.$store.state.user;
            }
		},
		components: {
			PlanList,
			Nav
		},
		methods: {
			logout() {
				delete localStorage.operateNo;
				delete localStorage.token;
				delete localStorage.userId;
				delete localStorage.userPower;
				this.$message({
	              type: 'success',
	              message: '退出成功'
	            });
				if(this.$route.name !== "Home") {
					this.$router.replace({path: "/"});
				} 
				window.location.reload();
			},
			handleCommand1(command) {
				if(command == "logout") {
					this.logout()
				}
			},
			// 点击切换语言按钮
			handleCommand(command) {
			 	this.$i18n.locale = command;
		    },
			// 切换培植方案层显示状态
			tgShowLayer() {
				this.showLayer1 && this.$store.commit("changePlanListLayerState",false);
				this.showLayer = !this.showLayer;
			},
			// 改变方案
			changeState(data) {
				data && this.$store.commit("changePlanListLayerState",true);
			},
			// 修改移动端ip
			updateMobileBaseUrl() {
				this.$store.commit("updateMobileBaseUrl",this.mobileBaseUrl1);
				this.userBaseUrlDialogVisible = false;
				this.$message({
		          message: '修改成功',
		          type: 'success'
		        });
		        setTimeout(()=> {
		        	window.location.reload();
		        },1000);
			},
			handleSubmit(formName) {
		      this.$refs[formName].validate(valid => {
		        if (valid) {
		        	this.login();
		        }
		      });
		    },
		    login() {
		    	let data = {
					// account: "liujunhui",      
				    // phone: "12345678",      
				    // password: "fcea920f7412b5da7be0cf42b8c93759",
					account: this.ruleForm.account,
					phone: this.ruleForm.account,
					password: md5(this.ruleForm.password)
				};
				if(/^1\d{10}$/.test(this.account)) {
					data.account = "";
				} else {
					delete data.phone;
				}
		    	axios({
				    method: 'post',
				    url: `${this.apiurl}/lb/login`,
				    data:{
					  data
					}
				}).then(data => {
					if(data.data.code == 200) {
						this.$message({
			              type: 'success',
			              message: '登录成功'
			            });
			            localStorage.token = data.data.token;
			            localStorage.userId = data.data.id;
			            localStorage.operateNo = this.ruleForm.account;
			            this.submitUserInfo();
			            this.userLoginDialogVisible = false;
			            this.ruleForm = {
							account: "",
							password: ""
						}
						window.location.reload();
					} else {
						this.$message({
			              type: 'error',
			              message: '登录失败'
			            });
					}
				})
		    },
		    submitUserInfo() {
		    	this.$store.commit("resetUser",{
	            	token: localStorage.token,
	            	userId: localStorage.userId,
	            	operateNo: localStorage.operateNo
	            });
	            
		    }
		},
		mounted() {
			this.mobileBaseUrl1 = this.mobileBaseUrl;
			this.submitUserInfo();
		}
	}
</script>