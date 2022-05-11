<!-- 
  组件说明： 本组件为设备参数组件。
  进入方式：导航->设备参数
  用户权限： 操作员可以使用。未登录用户或其他用户自动跳转至首页。
-->
<template>
	<!-- 入口：设备参数 -->
	<div>
		<!-- 头部 start -->
		<Head></Head>
		<!-- 头部 end -->
		<!-- 导航 start -->
		<Nav></Nav>
		<!-- 导航 end -->
		<div class="container-fluid ym-main">
			<a-card>
				<!-- 标题 start -->
				<PageHeader title="设备参数" goBack=false></PageHeader>
				<!-- 标题 end -->
				<!-- 搜索栏、新增 start -->
				<a-form-model layout="inline" class="space-btm1"> 
					<a-form-model-item>
						<a-input-search placeholder="请输入设备型号" enter-button v-model="search_model_code" @search="onSearch" />
					</a-form-model-item>
					<a-form-model-item><a-button type="solid" block @click="handleEdit">新增</a-button></a-form-model-item>
				</a-form-model>
				<!-- 搜索栏、新增 end -->
				<!-- 表格 start -->
				<el-table ref="multipleTable" :data="tableData" border stripe size="small" tooltip-effect="dark">
				    <el-table-column prop="instance_number" label="设备编号"></el-table-column>
				    <el-table-column prop="model" label="设备型号"></el-table-column>
				    <el-table-column prop="description" label="描述"></el-table-column>
				    <el-table-column prop="create_time" label="创建时间"></el-table-column>
				    <el-table-column prop="btns" label="操作" width="220">
				      	<template slot-scope="scope">
					        <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					        <el-button size="mini" @click="handleToParameterAdjustment(scope.$index, scope.row)">参数</el-button>
				            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					    </template>
				    </el-table-column>
				</el-table>
				<!-- 表格 end -->
				<!-- 弹窗 start -->
				<el-dialog title="数据详情" :visible.sync="dialogVisible" width="400px">
					<el-form ref="r" :model="r" label-width="80px" size="mini" modal="true" :rules="rules">
						<el-form-item label="模板" prop="model_code">
						    <el-select v-model="t" placeholder="模板">   
						    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option> 
						    </el-select>
						</el-form-item>
						<el-form-item label="设备编号" prop="instance_number"><el-input v-model="r.instance_number"></el-input></el-form-item>
						<el-form-item label="描述" prop="description"><el-input v-model="r.description"></el-input></el-form-item>
						<el-form-item label="设备地址" prop="dev_inst_id"><el-input v-model="r.dev_inst_id"></el-input></el-form-item>
						<el-form-item> 
							<el-button @click="resetForm('r')">取 消</el-button>
				    		<el-button type="primary" @click="submitForm('r')">确 定</el-button>
  						</el-form-item>
					</el-form>
				</el-dialog>
				<!-- 弹窗 end -->
			</a-card>
		</div>
	</div>
</template>
<style scoped>
	.space-btm1 {margin-bottom: 20px;}
</style>
<script>
	import Head from "./common/Head"
	import Nav from "./common/Nav"
	import PageHeader from "./common/PageHeader"
	import {formatTime} from "../assets/tools/tool"
	import axios from 'axios'
	import {getUserPower} from "../assets/tools/tool"
	export default {
		data() {
			return {
				search_model_code: "",    // 设备型号
				r: {
					id: 0,   // 设备id(数字的)
					instance_number: "",  // 设备名称(字符串的)
					dev_model_id: 0,   // 模板id(数字的)
					model: "",    // 模板设备型号(字符串的)
					model_code: "",    // 模板设备编号(字符串的)
					description: "",
					dev_inst_id: ""
				},
		        tableData: [],
		        t: "",
		        dialogVisible: false,
		        options: [{
		        	value: '',
		        	label: ''
		        }],
		        modelList: [],
		        rules: {
		        	t: [{ required: true, message: '请选择模板', trigger: 'blur' }],
			        instance_number: [{ required: true, message: '请输入设备编号', trigger: 'change' }],
			        dev_inst_id: [{ required: true, message: '请输入设备地址', trigger: 'change'}]
		        }
	      	}
		},
		components: {
	    	Head,
	    	Nav,
	    	PageHeader,
	    },
	    computed: {
	    	apiurl() {
                return this.$store.state.apiurl;
            }
	    },
	    methods: {
	    	// 获取设备列表
	    	getDevParamList() {
	    		axios({
	    			url: `${this.apiurl}/la/device/param/get_list`,
	    			method: "post",
	    			data: {
	    				data: {
				            model: "",
				            model_code: this.search_model_code,
				            start_time: "",
				            end_time: ""
				        }
	    			}
	    		}).then(data => {
	    			if(data.data && data.data.code === 200) {
	    				data.data.data.forEach(item => {
	    					item.create_time = formatTime(item.create_time);
	    				})
	    				this.tableData = data.data.data;
	    			}
	    		})
	    	},
	    	// 点击搜索按钮
			onSearch() {
				this.getDevParamList();
			},
	    	// 展示新建/编辑层
	    	async handleEdit(index,row) {
	    		await this.getDevModelList();
	    		this.dialogVisible = true;
	    		if(row) {
	    			this.t = row.dev_model_id
		    		this.r.id = row.id;
	    			this.r.instance_number =  row.instance_number; 
		    		this.r.dev_model_id = row.dev_model_id;
		    		this.r.model = row.model;
		    		this.r.model_code = row.model_code;
		    		this.r.description = row.description;
		    		this.r.create_time = row.create_time;
		    		this.r.dev_inst_id = row.dev_inst_id;
	    		} else {
	    			this.r = {
						id: 0,   // 设备id(数字的)
						instance_number: "",  // 设备名称(字符串的)
						dev_model_id: 0,   // 模板id(数字的)
						model: "",    // 模板设备型号(字符串的)
						model_code: "",    // 模板设备编号(字符串的)
						description: "",
					}
	    		}
	    	},
	    	// 获取模板列表
	    	async getDevModelList() {
	    		return new Promise((resolve,reject) => {
	    			axios({
		    			url: `${this.apiurl}/la/dev_model/get_list`,
		    			method: "post",
		    			data: {
		    				data: {model:""}
		    			}
		    		}).then(data => {
		    			if(data.data && data.data.code === 200 && data.data.data.length) {
		    				this.modelList = data.data.data;
		    				this.options = data.data.data.map(item=> ({
		    					value: item.id,
		    					label: item.model_code
		    				}));
		    				resolve(this.options);
		    			};
		    		})
	    		});
	    	},
	    	// 重置修改
		    resetForm(formName) {
		        this.$refs[formName].resetFields();
		        this.dialogVisible = false;
	    		this.r.id = 0;
		        this.r.instance_number = "";
	    		this.r.model = "";
	    		this.r.dev_model_id = 0,
	    		this.r.model_code = "";
	    		this.r.description = "";
	    		this.t = "";
		    },
		    getModelInfo(id) {
		    	return this.modelList.filter(item=> item.id === id);
		    },
	    	// 提交修改
	    	submitForm(formName) {
		        this.$refs[formName].validate(valid => {
		          	if (valid) {
		          		let {id,model,model_code,dev_inst_id} = this.getModelInfo(this.t)[0];
		          		let url = (this.r.id == 0) ? `${this.apiurl}/la/device/param/add_dev` : `${this.apiurl}/la/device/param/modify_dev`;
		          		let submitData = {
				            id: "",
		          			instance_number: this.r.instance_number,
		          			description: this.r.description,
				            dev_model_id: id,
				            model: model,
				            model_code: model_code,
				            dev_inst_id: this.r.dev_inst_id
		          		};
		          		(this.r.id !== 0) && (submitData.id = this.r.id);
		          		axios({
		          			method: "post",
		          			url,
		          			data: {
		          				data: submitData
		          			}
		          		}).then(data=> {
			          		if(data.data && data.data.code == 200) {
			          			this.resetForm(formName);
					          	this.getDevParamList();
			          		}
			          	});
		          	} else {
		            	return false;
		         	}
		        });
		    },
	    	// 点击删除按钮
	    	handleDelete(index,row) {
	    		this.$confirm('确认删除该设备参数？', '确认信息', {
		          distinguishCancelAndClose: true,
		          confirmButtonText: '确认',
		          cancelButtonText: '取消'
		        }).then(() => {
		          	axios({
		          		url: `${this.apiurl}/la/device/param/del_dev`,
		          		method: "post",
		          		data: {
		          			data: {
		          				id: row.id
		          			}
		          		}
		          	}).then(data => {
		          		if(data.data && data.data.code == 200) {
		          			this.$message({
				              type: 'success',
				              message: '删除成功'
				            });
		          			this.getDevParamList();
		          		}
		          	})
		        })
	    	},
	    	// 点击参数栏目
	    	async handleToParameterAdjustment(index,row) {
	    		let data = await this.getDevModelList();
	    		let dev_model_id = data.filter(item => (item.label === row.model_code));
	    		if(dev_model_id.length) {
	    			this.$router.push("/ParameterAdjustment?model_code=" + row.model_code + "&instance_number=" + row.instance_number + "&dev_inst_id=" + row.dev_inst_id + "&dev_model_id=" + dev_model_id[0].value);
	    		} else {
	    			this.$message({
		            	type: 'error',
		            	message: '数据错误，请联系管理员'
		            });
	    		}
	    	},
	    	changeModel(search_model_code) {
                this.search_model_code = search_model_code;
            },
            autoJump() {
                if(getUserPower() !== 1) {
                    this.$router.replace("/");
                }
            }
		},
		mounted() {
			this.getDevParamList();
			this.autoJump();
		}
	}
</script>