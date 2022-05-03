<template>
	<div>
		<!-- 头部 start -->
		<Head></Head>
		<!-- 头部 end -->
		<!-- 导航 start -->
		<Nav></Nav>
		<!-- 导航 end -->
		<!-- 主体 start -->
		<div class="container-fluid ym-main">
			<a-card>
				<!-- 头部标题 start -->
				<PageHeader title="方案管理" goBack=false></PageHeader>
				<!-- 头部标题 end -->
				<!-- 搜索新增 start -->
				<a-form-model layout="inline" class="space-btm1"> 
					<a-form-model-item>
                        <a-input-search data-layout="normal" placeholder="请输入育苗名称" enter-button v-model="plant" @search="getList" />
                    </a-form-model-item>
				    <a-form-model-item><a-button type="solid" block @click="handleCreate">新增</a-button></a-form-model-item>
				</a-form-model>
				<!-- 搜索新增 end -->
				<!-- 表格 start -->
				<el-table ref="multipleTable" :data="tableData" border stripe size="small" tooltip-effect="dark">
				    <el-table-column prop="scheme_name" label="方案名称" width="135"></el-table-column>
				    <el-table-column prop="plant" label="育苗名称" width="120"></el-table-column>
				    <el-table-column prop="grow_cycle" label="生长周期" width="70"></el-table-column>
				    <el-table-column prop="create_time" label="创建时间" width="150"></el-table-column>
				    <el-table-column prop="remark" label="评价"></el-table-column>
				    <el-table-column prop="btns" label="操作" width="405">
				      	<template slot-scope="scope">
					        <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					        <el-button size="mini" type="warning" @click="handleCopy(scope.$index, scope.row)" v-loading.fullscreen.lock="fullscreenLoading">复制</el-button> 
					        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" v-loading.fullscreen.lock="fullscreenLoading" disabled v-if="scope.row.id == currentPlantId">删除 </el-button>
					        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" v-loading.fullscreen.lock="fullscreenLoading" v-if="scope.row.id != currentPlantId">删除</el-button>
					        <el-button size="mini" @click="handleToPlanStageShow(scope.$index, scope.row)">查看阶段</el-button>
					        <el-button size="mini" @click="handToCulRecords(scope.$index, scope.row)">培植记录</el-button>
					    </template>
				    </el-table-column>
				</el-table>
				<!-- 表格 start -->
				<!-- 种植计划弹窗 start -->
				<el-dialog title="培植计划" :visible.sync="dialogVisible" width="400px">
					<el-form ref="r" :model="r" label-width="80px" size="mini" modal="true" :rules="rules">
						<el-form-item label="计划名称" prop="scheme_name"><el-input v-model="r.scheme_name"></el-input></el-form-item>
						<el-form-item label="育苗图片" prop="plant_image">
							<label>
								<input type="file" @change="upload($event)" style="position: fixed;left: -9999999px;">
								<img :src="r.plant_image || defaultImg" alt="" style="width: 80px;height: 80px;cursor: pointer;">
							</label>
						</el-form-item>
						<el-form-item label="种植作物" prop="plant"><el-input v-model="r.plant"></el-input></el-form-item>
						<el-form-item label="生长周期（天）" prop="grow_cycle"><el-input v-model="r.grow_cycle"></el-input></el-form-item>
						<el-form-item label="评价" prop="remark"><el-input v-model="r.remark" type="textarea"></el-input></el-form-item>
						<el-form-item> 
							<el-button @click="resetForm('r')">取 消</el-button>
				    		<el-button type="primary" @click="submitForm('r')" v-loading.fullscreen.lock="fullscreenLoading">确 定</el-button>
  						</el-form-item>
					</el-form>
				</el-dialog>
				<!-- 种植计划弹窗 end -->
			</a-card>
		</div>
		<!-- 主体 end -->
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
	import {formatTime,getUserPower} from "../assets/tools/tool"
	export default {
		data() {
			return {
				currentPlantId: 0,
				defaultImg: "/static/upload_img.jpg",
				plant: "",
				r: {
					id: 0,
					scheme_name: "",
					plant: "",
					grow_cycle: "",
					remark: "",
					plant_image: ''
				},
		        tableData: [],
		        dialogVisible: false,
		        rules: {
		        	scheme_name: [{required: true, message: '请输入计划名称', trigger: 'blur'}],
			        plant: [{required: true, message: '请输入种植作物', trigger: 'blur'}]
		        },
		        fullscreenLoading: false,  // 是否显示整屏加载
	      	}
		},
		components: {
	    	Head,
	    	Nav,
	    	PageHeader,
	    	// MyKeyBoard
	    },
	    computed: {
	    	apiurl() {
                return this.$store.state.apiurl;
            }
	    },
		methods: {
			// 获取列表
			getList() {
				new Promise((resolve)=> {
					axios({
	                    method: 'post',
	                    url: `${this.apiurl}/la/plant/implement/get`
	                }).then(data=> {
	                  if(data.data.code == 200) {
	                  	this.currentPlantId = data.data.data.plant.id;
	                    resolve();
	                  }
	                });
				}).then(()=> {
					axios({
						url: `${this.apiurl}/la/plant/head/get_list`,
						method: "post",
						data: {
							data: {
		            			plant: this.plant
							}
						}
					}).then(data => {
						let {code,data: d} = data.data;
						if(code == 200) {
							d.map(item => {
								item.create_time = formatTime(item.create_time);
								return item;
							});
							this.tableData = d;
						}
					});
				})
			},
			// 新增计划
			handleCreate() {
				this.dialogVisible = true;
				this.resetFormData();
			},
			// 点击编辑
			handleEdit(index,row) {
				this.dialogVisible = true;
				this.r = row;
			},
			// 上传图片
			upload(el) {
				let file = el.target.files[0];
				let param = new FormData()  // 创建form对象
			    param.append('file', file)  // 通过append向form对象添加数据
			    let config = {
			      headers: {'Content-Type': 'multipart/form-data'}
			    }
				axios.post(`${this.apiurl}/la/img`, param, config).then(data => {
					if(data.data.code == 200) {
						this.r.plant_image = data.data.data
					}
				})
			},
			// 提交
			submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          	if (valid) {
	          			let data = {
	          				scheme_name: this.r.scheme_name,
	      					plant: this.r.plant,
	      					grow_cycle: this.r.grow_cycle,
	      					remark: this.r.remark,
	      					plant_image: this.r.plant_image,
	          			}
	          			if(this.r.id) {
	          				data.id =  this.r.id
	          			} else {
	          				data.create_time = "";
	          			}
	          			this.fullscreenLoading = true;
	          			axios({
		          			method: "post",
		          			url:this.r.id ? `${this.apiurl}/la/plant/head/modify` : `${this.apiurl}/la/plant/head/add`,
		          			data: {
		          				data
		          			}
		          		}).then(data => {
		          			this.fullscreenLoading = false;
		          			if(data.data.code == 200) {
		          				let message = this.r.id ? "修改成功" : "添加成功"
		          				this.$refs[formName].resetFields();
		          				this.dialogVisible = false
		          				this.$message({
					              type: 'success',
					              message
					            });
					            this.getList();
		          			}
		          		})
		          	} else {
		            	return false;
		          	}
		        });
		    },
		    // 重置
		    resetForm(formName) {
		    	this.resetFormData();
		        this.dialogVisible = false
		    },
		    // 数据重置
		    resetFormData() {
		    	this.r = {
					id: 0,
					scheme_name: "",
					plant: "",
					grow_cycle: "",
					remark: "",
					plant_image: ''
				}
		    },
		    // 删除
			handleDelete(index,row) {
				this.$confirm('确认删除该管理方案？', '确认信息', {
		          distinguishCancelAndClose: true,
		          confirmButtonText: '确认',
		          cancelButtonText: '取消'
		        }).then(() => {
		        	this.fullscreenLoading = true;
		          	axios({
		          		method: "post",
		          		url: `${this.apiurl}/la/plant/head/del`,
		          		data: {
		          			data: {
		          				id: row.id
		          			}
		          		}
		          	}).then(data => {
		          		this.fullscreenLoading = false;
		          		let d = data.data
						if(d.code == 200) {
							this.$message({
				              type: 'success',
				              message: '删除成功'
				            });
				            this.getList()
						}
		          	})
		        })
			},
			// 拷贝
			handleCopy(index,row) {
				let {scheme_name,plant,plant_image,grow_cycle,create_time,remark} = row;
				this.fullscreenLoading = true;
				axios({
	          		method: "post",
	          		url: `${this.apiurl}/la/plant/head/copy`,
	          		data: {
	          			data: {
	          				old_id: row.id,
	          				scheme_name: scheme_name + "_copy",
	          				plant,
	          				plant_image,
	          				grow_cycle,
	          				create_time,
	          				remark
	          			}
	          		}
	          	}).then(data => {
	          		this.fullscreenLoading = false;
	          		let d = data.data
					if(d.code == 200) {
						this.$message({
			              type: 'success',
			              message: '复制成功'
			            });
			            this.getList();
					}
	          	})
			},
			// 跳转到设置阶段页面
			handleToPlanStageShow(index,row) {
				this.$router.push("/PlanStageShow?id=" + row.id + "&scheme_name=" + row.scheme_name);
			},
			// 跳转到配置记录页面
			handToCulRecords(index,row) {
		      	this.$router.push(`/CulRecords?plant=${row.plant}&scheme_name=${row.scheme_name}`);
		    },
		    changeModel(plant) {
                this.plant = plant;
            },
            autoJump() {
                if(getUserPower() !== 1) {
                    this.$router.replace("/");
                }
            }
		},
		mounted() {
			this.getList();
			this.autoJump();
		}
	}
</script>