<!-- 
  组件说明： 本组件为设置参数字典组件。
  进入方式： 导航 -> 设备模板 -> 某一条目下参数按钮
  用户权限： 操作员可以使用。未登录用户或其他用户自动跳转至首页。
-->
<template>
	<div class="ym-main">
		<a-card>
			<!-- 头部标题 start -->
			<PageHeader title="设置参数字典" goBack=true></PageHeader>
			<!-- 头部标题 end -->
			<el-row type="flex" justify="space-between">
				<el-col>
					<!-- 导入按钮 start -->
					<label>
						<span class="nmbtn">导入excel</span>
						<input type="file" @change="importExcel" style="display: none;" >
					</label>
					<!-- 导入按钮 end -->
				</el-col>
				<el-col style="text-align: right">
					<!-- 导出按钮 start -->
					<a-button type="solid" @click="downloadExl" v-if="tableData.length">导出excel</a-button>
					<!-- 导出按钮 end -->
				</el-col>
			</el-row>
			<!-- 表格 start -->
			<el-table ref="multipleTable" :data="tableData" border stripe size="small" tooltip-effect="dark" class="space-tp1" height="450">
			    <el-table-column prop="sort_index" label="序号" width="50"></el-table-column>
			    <el-table-column prop="param_code" label="代码"></el-table-column>
			    <el-table-column prop="name" label="参数项"></el-table-column>
			    <el-table-column prop="unit" label="单位"></el-table-column>
			    <el-table-column prop="show_ref_value" label="默认值"></el-table-column>
			    <el-table-column prop="remark" label="备注"></el-table-column>
			    <el-table-column prop="btns" label="操作" width="150">
			      	<template slot-scope="scope">
				        <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> 
				        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				    </template>
			    </el-table-column>
			</el-table>
			<!-- 表格 end -->
			<!-- 弹出窗口 start -->
			<el-dialog title="参数字典" :visible.sync="dialogVisible" width="400px">
			    <el-form ref="r" :model="r" label-width="80px" size="mini" modal="true" :rules="rules">
				  	<el-form-item label="参数项" prop="name"><el-input v-model="r.name"></el-input></el-form-item>
				  	<el-form-item label="单位" prop="unit"> <el-input v-model="r.unit"></el-input> </el-form-item>
				  	<el-form-item label="默认值" prop="show_ref_value"> <el-input v-model="r.show_ref_value"></el-input> </el-form-item>
				  	<el-form-item label="备注" prop="remark"> <el-input v-model="r.remark"></el-input> </el-form-item>
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
<style scoped>
	.space-tp1 {margin-top: 20px;}
	.nmbtn {padding: 9px 15px; font-size: 12px; border-radius: 3px;display: inline-block; line-height: 1; white-space: nowrap; cursor: pointer; background: #409EFF; border: 1px solid #409EFF; color: #FFF; -webkit-appearance: none; text-align: center; box-sizing: border-box; outline: none; margin: 0; transition: .1s; font-weight: 500; -moz-user-select: none; -webkit-user-select: none; -ms-user-select: none; border-radius: 4px;}
    .nmbtn:hover {color: #fff; border-color: #66b1ff; background-color: #66b1ff; }
</style>
<script>
	import PageHeader from "./common/PageHeader"
	import axios from 'axios'
	import * as XLSX from "XLSX"
	import download from "../assets/tools/downloadExcel"
	import {minuteToTime,timeToMinute,autoJump} from "../assets/tools/tool.js"
	export default {
		data() {
			return {
				current_model_code: "",
				current_model_id: 0,
				type: 0,
				init_r: {
					sort_index: 0,
					id: 0,
					param_code: "",
					name: "",
					unit: "",
					ref_value: "",
					show_ref_value: "",
					remark: ""
				},
				r: {...init_r},
		        tableData: [],
		        dialogVisible: false,
		        fullscreenLoading: false,  // 是否显示整屏加载
		        rules: {name: [{ required: true, message: '请选择参数项', trigger: 'blur'}]}
	      	}
		},
		computed: {
			apiurl() {
                return this.$store.state.apiurl;
            }
		},
		components: {
	    	PageHeader
	    },
	    methods: {
	    	create() {
	    		this.dialogVisible = true;
	    		this.r = {...this.init_r};
	    		this.type = 0;
	    	},
	    	// 获取数据
	    	getList() {
	    		this.fullscreenLoading = true;
	    		axios({
	    			method:"post",
	    			url: `${this.apiurl}/la/dev_model/get`,
	    			data: {
	    				data: {
	    					model_code: this.current_model_code
	    				}
	    			}
	    		}).then(data => {
	    			this.fullscreenLoading = false;
	    			if(data.data.code == 200) {
	    				this.current_model_id =  data.data.data.id;
	    				this.tableData = data.data.data.param_item;
	    				let arrTemp = ["SUNRIZE","SUNSET"]
	    				this.tableData = this.tableData.map(item => {
	    					if(arrTemp.includes(item.param_code)) {
	    						if(isNaN(item.ref_value)) {
	    							item.show_ref_value = item.ref_value;
	    						} else {
	    							item.show_ref_value = minuteToTime(item.ref_value)
	    						}
	    					} else {
	    						item.show_ref_value = item.ref_value;
	    					}
    						return item;
	    				})
	    			}
	    		})
	    	},
	    	// 编辑
		    handleEdit(index,row) {
		    	this.dialogVisible = true;
		    	this.r.param_code = row.param_code;
		    	this.r.name = row.name;
		    	this.r.unit = row.unit;
		    	this.r.ref_value = row.ref_value;
		    	this.r.show_ref_value = row.show_ref_value;
		    	this.r.remark = row.remark;
		    	this.r.id = row.id;
		    	this.r.sort_index = row.sort_index;
		    	this.type = 1;
		    },
			// 提交
		    submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		          	let dev_model_id = this.current_model_id;
		          	let arrTime = ["SUNRIZE","SUNSET"];
		          	if(arrTime.includes(this.r.param_code)) {
		          		this.r.ref_value = timeToMinute(this.r.show_ref_value);
		          	}
		          	let param_item = [{
  						param_code: this.r.param_code,
  						name: this.r.name,
  						unit:this.r.unit,
  						ref_value: arrTime.includes(this.r.param_code) ? this.r.ref_value : this.r.show_ref_value,
  						sort_index: this.r.sort_index,
  						remark: this.r.remark
  					}];
		          	if(this.type == 0) {
			          	axios({
			          		method: "post",
			          		url: `${this.apiurl}/la/dev_model/param/add`,
			          		data: {
			          			data: {
		          					dev_model_id,
		          					param_item
			          			}
			          		}
			          	}).then(data => {
			          		this.cbSubmit(0,data,formName);
			          	})
		          	} else if(this.type == 1) {
		          		param_item[0].id = this.r.id;
		          		param_item[0].dev_model_id = dev_model_id;
		          		axios({
			          		method: "post",
			          		url: `${this.apiurl}/la/dev_model/param/modify`,
			          		data: {
			          			data: {
		          					dev_model_id,
		          					param_item
			          			}
			          		}
			          	}).then(data => {
			          		this.cbSubmit(1,data,formName);
			          	})
		          	}
		          } else {
		          	return false;
		          }
		        });
		    },
		    // 添加/修改回调
		    cbSubmit(type,data,formName) {
		    	if(data.data.code == 200) {
		    		let message = type == 0 ? "添加成功" : "修改成功";
          			this.$refs[formName].resetFields();
      				this.dialogVisible = false;
      				this.$message({
		              type: 'success',
		              message
		            });
		            this.$refs[formName].resetFields();
		            this.r = {
		    			...this.init_r
		    		}
          			this.dialogVisible = false
      				this.getList();
          		}
		    },
		    // 重置
		    resetForm(formName) {
		        this.$refs[formName].resetFields();
		        this.dialogVisible = false;
		    },
		    // 下载excel
		    downloadExl() {
		    	let result = this.tableData.map(item => {
		    		return {
		    			"序号": item.sort_index,
		    			"代码": item.param_code,
		    			"参数项": item.name,
		    			"单位": item.unit,
		    			"参考值": item.ref_value,
		    			"描述":item.remark
		    		}
		    	});
		    	download(result, `${this.$route.query.model_code}设备参数字典表.xlsx`);
		    },
		    // 删除
			handleDelete(index,row) {
				this.$confirm('确认删除该字典？', '确认信息', {
		          distinguishCancelAndClose: true,
		          confirmButtonText: '确认',
		          cancelButtonText: '取消'
		        }).then(() => {
		          	axios({
		          		method: "post",
		          		url: `${this.apiurl}/la/dev_model/param/delete`,
		          		data: {
		          			data: {
		          				model_code: this.current_model_code,
		          				param_item:[{
		          					id: row.id,
		          					param_code: row.param_code
		          				}]
		          			}
		          		}
		          	}).then(data => {
		          		if(data.data.code == 200) {
		          			this.$message({
				              type: 'success',
				              message: '删除成功'
				            });
		          		}
		          		this.getList();
		          	})
		        })
			},
			// 导入excel
			importExcel(e) {
				let file = e.target.files[0];
				if(!/sheet/.test(file.type)) {
					this.$message({
		              type: 'error',
		              message: '文件类型不正确'
		            });
		            return;
				}
				this.$confirm('确认导入该文件（导入文件后原有的参数字典都会被清空）？', '确认信息', {
		          distinguishCancelAndClose: true,
		          confirmButtonText: '确认',
		          cancelButtonText: '取消'
		        }).then(()=> {
		        	new Promise((resolve,reject)=> {
						let param_item = this.tableData.map(item=> {
				    		return {
				    			id: item.id,
				    			param_code: item.param_code
				    		}
				    	});
				    	axios({
			          		method: "post",
			          		url: `${this.apiurl}/la/dev_model/param/delete`,
			          		data: {
			          			data: {
			          				model_code: this.current_model_code,
			          				param_item
			          			}
			          		}
			          	}).then(data => {
			          		if(data.data.code == 200) {
			          			resolve();
			          		}
			          	})
					}).then(()=> {
						const fileReader = new FileReader();
						fileReader.readAsBinaryString(file);
						let _this = this;
						fileReader.onload = function(event) {
							try {
								const { result } = event.target;
					            const workbook = XLSX.read(result, { type: 'binary' });
					            let data = [];
					            for (const sheet in workbook.Sheets) {
						            if (workbook.Sheets.hasOwnProperty(sheet)) {
						                data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
						            }
								}
								let dev_model_id = _this.current_model_id;
								let param_item = data.map(item=> {
									return {
										name: item["描述"],
										param_code: item["代码"],
										ref_value: item["参考值"],
										remark: item["描述"],
										sort_index: item["序号"],
										unit: item["单位"] || '--',
									}
								});
								axios({
					          		method: "post",
					          		url: `${_this.apiurl}/la/dev_model/param/add`,
					          		data: {
					          			data: {
				          					dev_model_id,
				          					param_item
					          			}
					          		}
					          	}).then(data => {
					          		_this.$message({
						              type: 'success',
						              message: '导入成功'
						            });
						            _this.getList();
						            e.target.value="";
					          	})
							} catch(e) {
								_this.$message({
					              type: 'error',
					              message: '文件类型不正确'
					            });
							}
						}
			        }).catch(()=> {
			        	e.target.value = "";
			        })
				});
			},
		},
		mounted() {
			this.current_model_code = this.$route.query.model_code;
			this.getList();
			autoJump(1);
		}
	}
</script>