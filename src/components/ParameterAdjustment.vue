<template>
	<div>
		<!-- 头部 start -->
		<Head></Head>
		<!-- 头部 end -->
		<!-- 导航 start -->
		<Nav></Nav>
		<!-- 导航 end -->
		<div class="container-fluid ym-main">
			<a-card>
				<!-- 头部标题 start -->
				<PageHeader title="设置参数值" goBack=true></PageHeader>
				<!-- 头部标题 end -->
				<!-- 表格 start -->
				<el-table ref="multipleTable" :data="tableData" border stripe size="small" height="300px" tooltip-effect="dark" style="margin-top: 20px;">
				    <el-table-column prop="sort_index" label="序号" width="50"></el-table-column>
				    <el-table-column prop="param_code" label="代码" width="100"></el-table-column>
				    <el-table-column prop="name" label="参数项" width="200"></el-table-column>
				    <el-table-column prop="unit" label="单位" width="100"></el-table-column>
				    <el-table-column prop="remark" label="备注" width="200"></el-table-column>
				    <el-table-column prop="ref_value" label="参数值">
			    		<template slot-scope="scope">
			    			<el-input placeholder="请输入内容" size="small" v-model="scope.row.ref_value"></el-input>
						</template>
				    </el-table-column>
				</el-table>
				<!-- 表格 end -->
				<!-- 功能按钮 start -->
				<div style="padding-top: 10px;">
					<el-button type="primary" size="small" @click="save">保存</el-button>
					<el-button type="default" size="small" @click="write" v-loading.fullscreen.lock="fullscreenLoading">写设备参数</el-button>
					<el-button type="warning" size="small" @click="read">读设备参数</el-button>
				</div>
				<!-- 功能按钮 end -->
			</a-card>
		</div>
	</div>
</template>

<script>
	import Head from "./common/Head"
	import Nav from "./common/Nav"
	import PageHeader from "./common/PageHeader"
	import axios from 'axios'
	import {minuteToTime,timeToMinute,switchTimeToShow,switchTimeToSubmit,getUserPower} from "../assets/tools/tool.js"
	export default {
		data() {
			return {
				fullscreenLoading: false,
				param_item: {},
		        tableData: [],
		        originArr: []
	      	}
		},
		components: {
	    	Head,
	    	Nav,
	    	PageHeader
	    },
	    methods: {
	    	// 用来获取左侧的参数列表
	    	getList() {
	    		axios({
	    			url: `${this.apiurl}/la/dev_model/get`,
	    			method: "post",
	    			data: {
	    				data: {
				            model_code: this.$route.query.model_code
				        }
	    			}
	    		}).then(data => {
	    			if(data.data.code == 200) {
	    				let tmpArr = [];
	    				tmpArr = data.data.data.param_item.map(item => {
	    					return {
	    						id: item.id,
	    						dev_model_id: item.dev_model_id,
		    					name: item.name,
		    					sort_index: item.sort_index,
		          				ref_value:  item.ref_value,
		          				unit: item.unit,
		          				remark: item.remark,
		          				param_code: item.param_code
	    					}
	    				})
	    				this.tableData = tmpArr;
	    				this.originArr =  data.data.data.param_item;
	    				this.get_dev();
	    			}
	    		})
	    	},
	    	// 获取实例的对应参数
	    	get_dev() {
	    		axios({
	    			url: `${this.apiurl}/la/device/param/get_dev`,
	    			method: "post",
	    			data: {
	    				data: {
				            id: this.$route.query.dev_inst_id
				        }
	    			}
	    		}).then(data => {
	    			if(data.data.code == 200) {
	    				this.param_item = data.data.data.param_item;
	    				let arrTime = ["SUNRIZE","SUNSET"];
	    				this.param_item.forEach(item => {
	    					this.tableData.forEach(item1 => {
	    						if(item1["param_code"] === item["param_code"]) {
	    							item1["ref_value"] = item["value"];
	    							item1 = switchTimeToShow(item1);
	    						}
	    					});
	    				});
	    			}
	    		})
	    	},
	    	baseSave() {
	    		return new Promise(resolve => {
	    			let param_item = [];
		    		this.tableData.forEach(item => {
		    			item = switchTimeToSubmit(item);
		    			let json = {
		    				dev_model_param_id: item.id,
		    				value: item.ref_value
		    			}
		    			param_item.push(json);
		    		});
		    		axios({
		    			url: `${this.apiurl}/la/device/param_item/save`,
		    			method: "post",
		    			data: {
		    				data: {
					            dev_inst_id: this.$route.query.dev_inst_id,
	        					dev_model_id: this.$route.query.dev_model_id,
	        					param_item
					        }
		    			}
		    		}).then(data => {
		    			if(data.data.code == 200) {
		    				resolve();
		    				
		    			}
		    		})
	    		})
	    	},
	    	// 保存
	    	save() {
	    		let res = this.baseSave();
	    		res.then(_=> {
	    			this.$message({
		              type: 'success',
		              message: '保存成功'
		            });
    				this.getList();
	    		})
	    	},
	    	// 读设备参数
	    	read() {
	    		axios({
	    			url: `${this.apiurl}/la/device/param/read`,
	    			method: "post",
	    			data: {
	    				data: {
	    					"operateNo": "test123",
					        "op_id": "1",
					        "op_type": "OP_SEEDLING_CALL_SET",     
					        "dev_id": parseInt(this.$route.query.dev_inst_id)
				        }
	    			}
	    		}).then(data => {
	    			if(data.data.code == 200) {
	    				let itemList = data.data.data.item;
				        let result = this.tableData.map(item => {
				        	for(let i = 0;i < itemList.length;i++) {
				        		itemList[i] = switchTimeToShow(itemList[i]);
				        		if(itemList[i]["param_code"].toUpperCase() == item["param_code"].toUpperCase()) {
				        			let json = {
				        				name: item["name"],
								        ref_value: itemList[i]["value"],
								        param_code: item["param_code"].toUpperCase(),
								        sort_index: item["sort_index"],
								        unit: item["unit"],
								        remark: item["remark"],
								        id: item["id"],
	    								dev_model_id: item["dev_model_id"]
				        			}
				        			json = switchTimeToShow(json);
				        			return json;
				        		}
				        	}
			        	});
			        	this.tableData = result;
			        	this.$message({
			              type: 'success',
			              message: '读取成功'
			            });
	    			}
	    		})
	    	},
	    	// 写设备参数
	    	write() {
	    		this.$confirm('确认写入设备参数？', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认',
                    cancelButtonText: '取消'
                }).then(()=> {
                	let res = this.baseSave();
                	res.then(_ => {
	                	let param_item = [];
			    		this.tableData.forEach(item => {
			    			// item = switchTimeToSubmit(item);
			    			param_item.push({
			    				param_id: item.sort_index,
			    				param_code: item["param_code"],
			    				value: Number(Number(item.ref_value).toFixed(1))
			    			})
			    		});
			    		this.fullscreenLoading = true;
			    		let data = {
			    			data: {
								"operateNo": "111",
						        "op_id": "1",
						        "op_type": "OP_SEEDLING_SET_SET",
						        "dev_id": 1,
						        "instance_number": this.$route.query.instance_number,     
						        "item_num": param_item.length,
					            dev_inst_id: parseInt(this.$route.query.dev_inst_id),
		    					dev_model_id: parseInt(this.$route.query.dev_model_id),
		    					item: param_item
					        }
			    		};
			    		axios({
			    			url: `${this.apiurl}/la/device/param/write`,
			    			method: "post",
			    			data
			    		}).then(data => {
			    			this.fullscreenLoading = false;
			    			if(data.data.code == 200) {
			    				this.$message({
					              type: 'success',
					              message: '操作成功'
					            });
					            this.getList();
			    			}
			    		})
                	})
                })
	    	},
	    	autoJump() {
                if(getUserPower() !== 1) {
                    this.$router.replace("/");
                }
            }
	    },
	    computed: {
	    	apiurl() {
                return this.$store.state.apiurl;
            }
	    },
	    mounted() {
	    	this.getList();
	    	this.autoJump();
	    },
	}
</script>