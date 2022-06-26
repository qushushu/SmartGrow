<!-- 
  组件说明： 本组件为设备模板组件。
  进入方式：导航-> 设备模板
  用户权限： 操作员可以使用。未登录用户或其他用户自动跳转至首页。
-->
<template>
	<div class="ym-main">
		<a-card>
			<!-- 标题 start -->
			<PageHeader title="设备模板" goBack=false></PageHeader>
			<!-- 标题 end -->
			<!-- 搜索与新增 start -->
			<a-form-model layout="inline" class="space-btm1">
				<a-form-model-item><a-input-search placeholder="请输入设备型号" enter-button v-model="model" @search="getList" /></a-form-model-item>
				<a-form-model-item><a-button type="solid" block @click="handleEdit">新增</a-button></a-form-model-item>
			</a-form-model>
			<!-- 搜索与新增 end -->
			<!-- 表格 start -->
			<el-table ref="multipleTable" :data="tableData" border stripe size="small" tooltip-effect="dark">
			    <el-table-column prop="model_code" label="型号编号"></el-table-column>
			    <el-table-column prop="model" label="设备型号" width="120"></el-table-column>
			    <el-table-column prop="version" label="版本" width="80"></el-table-column>
			    <el-table-column prop="description" label="描述"></el-table-column>
			    <el-table-column prop="btns" label="操作" width="223">
			      	<template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" @click="handleToParameterConfig(scope.$index, scope.row)">参数</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				    </template>
			    </el-table-column>
			</el-table>
			<!-- 表格 end -->
			<!-- 弹出窗口 start -->
			<el-dialog title="数据详情" :visible.sync="dialogVisible" width="400px">
			  <el-form ref="r" :model="r" label-width="80px" size="mini" modal="true" :rules="rules">
			  	<el-form-item label="型号编号" prop="model_code">
                    <el-input v-model="r.model_code" id="xhbh"></el-input>
                </el-form-item>
			  	<el-form-item label="设备型号" prop="model"><el-input v-model="r.model"></el-input></el-form-item>
			  	<el-form-item label="版本" prop="version"><el-input v-model="r.version"></el-input></el-form-item>
			  	<el-form-item label="描述" prop="description"><el-input v-model="r.description"></el-input></el-form-item>
			  	<el-form-item> 
					<el-button @click="resetForm('r')">取 消</el-button>
			    	<el-button type="primary" @click="submitForm('r')" v-loading.fullscreen.lock="fullscreenLoading">确 定</el-button>
				</el-form-item>
			  </el-form>
			</el-dialog>
			<!-- 弹出窗口 end -->
		</a-card>
    </div>
</template>
<script>
	import PageHeader from "./common/PageHeader"
	import axios from 'axios'
    import {autoJump} from "../assets/tools/tool"
	export default {
		data() {
			return {
				model: "",  // 搜索关键词
    		    tableData: [],   // 表格内容
    		    dialogVisible: false,   // 是否显示弹出层
		        r: {
					model_code: "",
					model: "",
					version: "",
					description: "",
				},   // 弹出层内容文本
                rules: {
                	model_code: [{ required: true, message: '请输入型号编号', trigger: 'blur' }],
        	        model: [{ required: true, message: '请输入设备型号', trigger: 'blur' }],
                },  // 验证规则
        	    visible: false, // 虚拟键盘相关
        	    layout: "normal",  // 虚拟键盘相关
        	    input: null,  // 虚拟键盘相关
        	    options: {useKbEvents: false, preventClickEvent: false },  // 虚拟键盘相关
        	    fullscreenLoading: false,  // 是否显示整屏加载
	        }
		},
		components: {
        	PageHeader,
        },
        computed: {
            apiurl() {
                return this.$store.state.apiurl;
            }
        },
	    methods: {
        	// 获取数据
        	getList() {
        		axios({
    				method: 'post',
                    url: `${this.apiurl}/la/dev_model/get_list`,
    				data:{
    					data: {
    					    model: this.model
    					}
    				}
    			}).then(data => {
                    if(data && data.data) {
    					let {code,data: d} = data.data;
                        (code == 200) && (this.tableData = d);
                    }
				})
        	},
        	// 显示新增/编辑弹层
        	handleEdit(index,row) {
        		this.dialogVisible = true;
                // 新增
                let json = {
                    model_code: "",
                    model: "",
                    version: "",
                    description: "",
                };
                // 编辑
                row && (json = {
                    id: row.id,
                    model_code: row.model_code,
                    model: row.model,
                    version: row.version,
                    description: row.description
                });
        		this.r = json;
        	},
        	// 提交
        	submitForm(formName) {
    	        this.$refs[formName].validate((valid) => {
    	          	if (valid) {
    		          	let data =  {
    		          		data: {
    				      	    id: this.r.id || "",
        				        model_code:this.r.model_code,
        				        model: this.r.model,
        				        version: this.r.version,
        				        description: this.r.description
							}
						}
						this.fullscreenLoading = true;
    		          	axios({
    						method: 'post',
						    url: this.r.id ? `${this.apiurl}/la/dev_model/modify` : `${this.apiurl}/la/dev_model/add`,
						    data
						}).then(data => {
							let {code} = data.data;
							this.fullscreenLoading = false;
							if(code == 200) {
								let message = this.r.id ? "修改成功" : "添加成功";
								this.$message({
        				            type: 'success',
        				            message
        				        });
        				        this.resetForm(formName);
        	          			this.getList();
					        } else {
                                let message = this.r.id ? "修改失败" : "添加失败";
					            this.$message({
        				            type: 'error',
        				            message
        				        });
					        }
				        });
    	          	} else {
    	           		return false;
    	          	}
    	        });
    	   	},
    	   	// 重置
    	    resetForm(formName) {
                this.$refs[formName].resetFields();
                this.dialogVisible = false;
                this.r = {
                    id: "",
                    model_code: "",
                    model: "",
                    version: "",
                    description: "",
                };
    	    },
        	// 删除
        	handleDelete(index,row) {
        		let {id} = row;
      		    this.$confirm('确认删除该设备模板？', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认',
                    cancelButtonText: '取消'
                }).then(() => {
                	axios({
        			    method: 'post',
        			    url: `${this.apiurl}/la/dev_model/delete`,
        			    data:{
        					data: {
        					    id
        					}
        				}
    			    }).then((data)=> {
        				if(data.data.code == 200) { 
            	            this.$message({
            	               type: 'success',
            	               message: '删除成功'
            	            });
            	            this.getList();
    					}
    				});
  	            });
	        },
        	// 跳转到参数页面
        	handleToParameterConfig(index,row) {
        		this.$router.push(`/ParameterConfig?model_code=${row.model_code}`);
        	},
		},
		mounted() {
			this.getList();
            autoJump(1);
		}
	}
</script>