<!-- 
	组件说明： 本组件为页面头部信息组件，包含PC端及移动端。
	测试帐号：姓名：liujunhui 电话：12345678 密码：1234567
-->
<template>
	<header id="group-header">
		<el-row type="flex" justify="space-between" align="middle" class="head-box">
			<el-col>
				<!-- logo start -->
				<router-link to="/" class="logo mobile-hide"> <h1>工厂智能育苗系统</h1> </router-link>
				<!-- logo end -->
			</el-col>
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
							<el-dropdown-item command="setReqUrl" v-if="isMobile">请求路径设置</el-dropdown-item>
						    <el-dropdown-item command="logout">退出</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					<!-- 用户退出 end -->
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
		</el-row>
		<!-- 计划列表弹窗 start -->
		<PlanList v-show="showLayerPlanList" @changeState="changeState" :showLayer="showLayer"></PlanList>
		<!-- 计划列表弹窗 end -->
		<!-- 用户登录 start -->
		<el-dialog :visible.sync="userLoginDialogVisible" title="用户登录" :width="loginDialogWidth" center>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<!-- 输入用户名/电话 start -->
				<el-form-item label="用户名/电话" prop="account">
				    <el-input v-model="ruleForm.account" size="small"></el-input>
				</el-form-item>
				<!-- 输入用户名/电话 end -->
				<!-- 输入密码 start -->
				<el-form-item label="密码" prop="password">
				    <el-input v-model="ruleForm.password" size="small" show-password></el-input>
				</el-form-item>
				<!-- 输入密码 end -->
			</el-form>
			<!-- 登录按钮 start -->
			<div slot="footer">
		    	<el-button type="primary" @click="handleSubmit('ruleForm')" size="small">{{$t("message.登录")}}</el-button>
			</div>
			<!-- 登录按钮 end -->
		</el-dialog>
		<!-- 用户登录 end -->
	</header>
</template>
<style>
</style>
<style scoped>
	.head-box {padding: 12px 10px;background: #69C25C;}
	.logo {display: inline-block;border: none;text-decoration: none;}
	h1 {margin: 0 0 0 8px;font-size: 22px;color: #FFF;border: none; }
	.el-dropdown-link {color: #FFF;}
	.user-icon, .menu-icon,.setting-icon {font-size: 28px; color: #FFF;cursor: pointer;margin-right: 18px}
	@media screen and (max-width: 500px) {
		.user-icon, .menu-icon,.setting-icon {color: #FFF;}
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
				showLayer: false,  // 是否显示计划列表弹窗
				userLoginDialogVisible: false,  // 是否显示用户登录层
				ruleForm: {
					account: "",
					password: ""
				},  // 设置验证规则字段
				rules: {
					account: [{ required: true, message: '请输入用户名或电话!', trigger: 'blur' }, ],
					password: [{ required: true, message: '请输入密码!', trigger: 'blur' }, ],
				}   // 设置验证规则
			}
		},
		computed: {
			// 模式信息
            localMode() {
            	return this.$store.state.localMode;
            },
            // 是否为单机测试
			noWebTest() {
            	return this.$store.state.noWebTest;
			},
			// 是否为移动端
			isMobile() {
				return this.$store.state.isMobile;
			},
			// 移动端请求地址
			mobileBaseUrl() {
				return this.$store.state.mobileBaseUrl;
			},
			// PC端请求地址
			apiurl() {
                return this.$store.state.apiurl;
            },
			// 用户权限数字
			userPower() {
				return localStorage.userPower || "0";
		    },
		    // 本地模式用户权限
			localUserPower() {
            	return this.$store.state.localUserPower;
			},
            // 用户信息
            userInfo() {
            	return this.$store.state.user;
            },
            // 本地模式用户信息
            localUserInfo() {
            	return this.$store.state.localUserInfo;
            },
            // 配置方案显示层
			showLayerPlanList() {
				return this.$store.state.PlanListLayerState;
			},
            // 层大小
            loginDialogWidth() {
            	return this.isMobile ? "300px" : "50%";
            },
		},
		components: {
			PlanList,
			Nav
		},
		methods: {
			// 登录
			handleSubmit(formName) {
		      	this.$refs[formName].validate(valid => {
			        if (valid) {
			        	let data = {
							account: this.ruleForm.account,
							phone: this.ruleForm.account,
							password: md5(this.ruleForm.password)
						};
						if(/^1\d{10}$/.test(this.account)) {
							data.account = "";
						} else {
							delete data.phone;
						}
						if(this.localMode && this.noWebTest) {
							let [token,userId,operateNo] = [this.localUserInfo.token,this.localUserInfo.userId,this.localUserPower]
							this.cblogin({token,userId,operateNo});
						} else {
					    	axios({
							    method: 'post',
							    url: `${this.apiurl}/lb/login`,
							    data:{
								  data
								}
							}).then(data => {
								if(data.data.code == 200) {
									let [token,userId,operateNo]= [data.data.token,data.data.id, this.ruleForm.account];
									this.cblogin({token,userId,operateNo});
									// this.$message({
						   //            type: 'success',
						   //            message: '登录成功'
						   //          });
						   //          localStorage.token = data.data.token;
						   //          localStorage.userId = data.data.id;
						   //          localStorage.operateNo = this.ruleForm.account;
						   //          this.submitUserInfo();
						   //          this.userLoginDialogVisible = false;
						   //          this.ruleForm = {
									// 	account: "",
									// 	password: ""
									// }
									// window.location.reload();
								} else {
									this.$message({
						              type: 'error',
						              message: '登录失败'
						            });
								}
							})
						}
			        }
		      	});
		    },
		    // 登录回调
		    cblogin({token,userId,operateNo}) {
		    	this.$message({
	              type: 'success',
	              message: '登录成功'
	            });
	            localStorage.token = token;
	            localStorage.userId = userId;
	            localStorage.operateNo = operateNo;
	            this.submitUserInfo();
	            this.userLoginDialogVisible = false;
	            this.ruleForm = {
					account: "",
					password: ""
				}
				window.location.reload();
		    },
		    // vuex中提交用户信息
		    submitUserInfo() {
		    	this.$store.commit("resetUser",{
	            	token: localStorage.token,
	            	userId: localStorage.userId,
	            	operateNo: localStorage.operateNo
	            });
		    },
			// 退出登录
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
			// 点击齿轮按钮
			handleCommand1(command) {
				// 点击退出登录按钮
				if(command == "logout") {
					this.logout()
				}
				// 修改移动端ip
				if(command == "setReqUrl") {
					this.$prompt('', '请求路径设置', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          inputPlaceholder: "请输入ip。如：192.168.1.103",
			          inputValue: this.mobileBaseUrl
			        }).then(({ value }) => {
			        	this.$store.commit("updateMobileBaseUrl",value);
			        	this.$message({
				          message: '修改成功',
				          type: 'success'
				        });
				        setTimeout(()=> {
				        	window.location.reload();
				        },1000);
			        })
				}
			},
			// 点击切换语言按钮
			handleCommand(command) {
			 	this.$i18n.locale = command;
		    },
			// 切换培植方案层显示状态
			tgShowLayer() {
				this.showLayerPlanList && this.$store.commit("changePlanListLayerState",false);
				this.showLayer = !this.showLayer;
			},
			// 改变方案
			changeState(data) {
				data && this.$store.commit("changePlanListLayerState",true);
			},
		},
		mounted() {
			this.submitUserInfo();
		}
	}
</script>