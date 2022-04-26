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
				<PageHeader title="设置阶段" goBack=true></PageHeader>
				<!-- 头部标题 end -->
				<el-row :gutter="4" v-if="stageList.length">
					<el-col :lg="10" :md="10" :sm="10">
						<div style="padding-right: 8px;">
							<el-table :data="stageList" border  size="small" tooltip-effect="dark" id="planListTable" :row-class-name="tableRowClassName" :highlight-current-row="true">
						      <el-table-column prop="stage_content[0].stage_name" label="阶段名称">
						      	<template slot-scope="scope">
						    		<el-input type="text" @focus="changeCurrentSort(scope)" placeholder="请输入内容" v-model="scope.row.stage_content[0].stage_name" maxlength="10" show-word-limit style="width: 99%" size="small"> </el-input>
						    	</template>
						      </el-table-column>
						      <el-table-column prop="remark" label="阶段备注">
						      	<template slot-scope="scope">
						      		<el-input type="text" placeholder="请输入内容" @focus="changeCurrentSort(scope)" v-model="scope.row.remark" maxlength="10" show-word-limit style="width: 99%" size="small"> </el-input>
						      	</template>
						      </el-table-column>
						      <el-table-column prop="edit" label="操作" width="80">
						      	<template slot-scope="scope">
						      		<el-button size="small" @click="handleDelete1(scope)">删除</el-button>
						      	</template>
						      </el-table-column>
						    </el-table>
						</div>
					</el-col>
					<el-col :lg="14" :md="14" :sm="14">
						<div style="padding-left: 8px;">
							<el-table ref="multipleTable" :data="tableData" height="300" border stripe size="small" tooltip-effect="dark">
							    <el-table-column prop="cs" label="参数" size="small"></el-table-column>
							    <el-table-column prop="csz" label="参数值" size="small">
							    	<template slot-scope="scope">
							    		<el-input placeholder="请输入内容" size="small" v-model="scope.row.csz" @input="handleInputText(scope.row.csz,scope.row)"></el-input>
								    </template>
							    </el-table-column>
							</el-table>
						</div>
					</el-col>
				</el-row>
				<a-empty v-if="!stageList.length" description="暂无数据" />
				<!-- 功能按钮 start -->
				<div style="padding-top: 8px;">
					<el-button type="primary" size="small" @click="handleCreate">新增</el-button>
					<!-- 导入按钮 start -->
					<label>
						<span class="nmbtn">导入excel</span>
						<input type="file" @change="importExcel" style="display: none;" >
					</label>
					<!-- 导入按钮 end -->
					<el-button type="default" size="small" @click="save" v-loading.fullscreen.lock="fullscreenLoading">保存</el-button>
				</div>
				<!-- 功能按钮 end -->
			</a-card>
		</div>
	</div>
</template>
<style scoped>
	.nmbtn {padding: 9px 15px; font-size: 12px; border-radius: 3px;display: inline-block; line-height: 1; white-space: nowrap; cursor: pointer; background: #e6a23c; border: 1px solid #e6a23c; color: #FFF; -webkit-appearance: none; text-align: center; box-sizing: border-box; outline: none; margin: 0; transition: .1s; font-weight: 500; -moz-user-select: none; -webkit-user-select: none; -ms-user-select: none; border-radius: 4px;}
    .nmbtn:hover {color: #fff; border-color: #ebb563; background-color: #ebb563; }
</style>
<script>
	import Head from "./common/Head"
	import Nav from "./common/Nav"
	import PageHeader from "./common/PageHeader"
	import axios from 'axios'
	import {getUserPower} from "../assets/tools/tool"
	import * as XLSX from "XLSX"
	export default {
		data() {
			return {
				fullscreenLoading: false,
				id: 0,
				stageList: [],
		        tableData: [
		        {
	        		ename: "DAY_OFFSET",
		        	cs: '天数',
		        	csz: '',
		        },{
	        		ename: "EC_TV",
		          	cs: 'EC',
		          	csz: '',
		        },{
		        	ename: "PH_TV",
		          	cs: 'PH',
		          	csz: '',
		        },{
		        	ename: "SUNRIZE",
		          	cs: '日出时间',
		          	csz: '',
		        },{
		        	ename: "SUNSET",
		          	cs: '日落时间',
		          	csz: '',
		        },{
		        	ename: "TEMP_DAY",
			        cs: '日间温度',
			        csz: '',
		        },{
		        	ename: "TEMP_NIGHT",
		          	cs: '夜间温度',
		          	csz: '',
		        },{
		        	ename: "HUM_DAY",
		          	cs: '日间湿度',
		          	csz: '',
		        },{
		        	ename: "HUM_NIGHT",
		          	cs: '夜间湿度',
		          	csz: '',
		        },{
		        	ename: "CO2",
		          	cs: 'CO2浓度',
		          	csz: '',
		        },{
		        	ename: "LIQ_TEMP",
		          	cs: '营养液温度',
		          	csz: '',
		        }],
		        curStageSort: 0,
		        currentIndex: 0,
		        selectData: []
	      	}
		},
		components: {
	    	Head,
	    	Nav,
	    	PageHeader
	    },
	    computed: {
	    	apiurl() {
                return this.$store.state.apiurl;
            }
	    },
	    methods: {
	    	tableRowClassName({row, rowIndex}) {
		        if (rowIndex === this.currentIndex) {
		          return 'warning-row';
		        }
		        return '';
		    },
	    	// 获取数据
	    	getList() {
	    		axios({
	    			method: "post",
	    			url: `${this.apiurl}/la/plant/get`,
	    			data: {
	    				data: {
	    					id: this.id
	    				}
	    			}
	    		}).then(data => {
	    			if(data.data.code == 200) {
	    				this.stageList = data.data.data.stage_item;
	    				if(this.stageList.length) {
	    					this.viewDetail(this.stageList[this.currentIndex]);
	    				}
	    			}
	    		})
	    	},
	    	// 修改查看阶段
	    	changeCurrentSort(scope) {
	    		this.currentIndex = scope.$index;
	    		this.curStageSort = scope.row.sort_index;
	    		this.viewDetail(scope.row);
	    	},
	    	// 查看阶段内的参数
	    	viewDetail(item) {
	    		this.curStageSort = item.sort_index;
	    		let json = item.stage_content[0];
	    		this.tableData.forEach(item => {
	    			if(item.ename in json) {
	    				item.csz = json[item.ename];
	    			}
	    		})
	    	},
	    	// 新增阶段
	    	handleCreate() {
	    		// 获取最大的id
	    		let sort_max = 0;
	    		if(this.stageList.length) {
	    			sort_max = Math.max(...this.stageList.map(item => item.sort_index));
	    		}
	    		this.stageList.push({
	    			id: "",
	    			plant_id: this.id,
	    			sort_index: sort_max + 1,
					remark: "",
					stage_content: [{
						DAY_OFFSET: "",
						EC_TV: "",
						PH_TV: "",
						SUNRIZE: "",
						SUNSET: "",
						TEMP_DAY: "",
						TEMP_NIGHT: "",
						HUM_DAY: "",
						HUM_NIGHT: "",
						CO2: "",
						LIQ_TEMP: "",
					}]
	    		});
	    	},
	    	// 修改参数值
	    	handleInputText(value,d2) {
	    		let tarJson = this.stageList.filter(item => item.sort_index == this.curStageSort);
	    		tarJson[0].stage_content[0][d2.ename] = value;
	    	},
	    	// 保存阶段
	    	save() {
	    		let plant_id = this.id;
	    		let stage_item = this.stageList;
	    		let stageNameList = stage_item.map(item=> item.stage_content[0].stage_name);
	    		if(stageNameList.includes("")) {
	    			this.$message.error('保存失败，阶段名称不能为空值！');
	    			return;
	    		}
	    		let tmpSet = new Set([...stageNameList])
	    		let len1 = stageNameList.length;
	    		let len2 = tmpSet.size;
	    		if(len1 !== len2) {
	    			this.$message.error('保存失败，有重复阶段名称！');
	    			return;
	    		}
	    		this.fullscreenLoading = true;
	    		axios({
	    			method: "post",
	    			url: `${this.apiurl}/la/plant/stage/save`,
	    			data: {
	    				data: {
	    					plant_id,
							stage_item
	    				}
	    			}
	    		}).then(data => {
	    			if(data.data.code == 200) {
	    				this.$message({
			              type: 'success',
			              message: '修改成功'
			            });
			            this.getList();
			            this.fullscreenLoading = false;
	    			}
	    		})
	    	},
	    	// 删除阶段
	    	handleDelete1(scope) {
	    		this.stageList = this.stageList.filter(item => item !== scope.row);
	    		;
	    		if(this.stageList.length) {
		    		if(scope.$index >= this.stageList.length) {
		    			this.currentIndex = this.stageList.length - 1;
		    			this.viewDetail(this.stageList[this.currentIndex]);
		    		} else {
			    		if(this.currentIndex == scope.$index) {
			    			if(this.stageList.length == 1) {
			    				this.currentIndex = 0;
			    				this.viewDetail(this.stageList[0]);
			    			} else if(this.stageList.length > 0) {
			    				this.viewDetail(this.stageList[this.currentIndex]);
			    			}
			    		} 
		    		}
	    		}
	    	},
	    	importExcel(e) {
	    		let _this = this;
	    		let file = e.target.files[0];
				if(!/sheet/.test(file.type)) {
					this.$message({
		              type: 'error',
		              message: '文件类型不正确'
		            });
		            return;
				}
				this.$confirm('确认导入该文件（导入文件后原有的阶段都会被清空）？', '确认信息', {
		          distinguishCancelAndClose: true,
		          confirmButtonText: '确认',
		          cancelButtonText: '取消'
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
							let plant_id = String(_this.id);
							data.shift();
							let stage_item = data.map((item,key)=> {
								let id = "";
								let remark = "";
								let sort_index = key + 1;
								return {
									id,
									plant_id,
									remark,
									sort_index,
									stage_content: [{
										CO2: item["CO2浓度"],
										DAY_OFFSET: item["天数"],
										EC_TV: item["EC"],
										HUM_DAY: item["日间湿度"],
										HUM_NIGHT: item["夜间湿度"],
										LIQ_TEMP: item["营养液温度"],
										PH_TV: item["PH"],
										SUNRIZE: item["日出时间"],
										SUNSET: item["日落时间"],
										TEMP_DAY: item["日间温度"],
										TEMP_NIGHT: item["夜间温度"],
										stage_name: item["阶段名称"]
									}]
								}
							});
							let res = {
								data: {
									plant_id,
									stage_item
								}
							}
							axios({
				          		method: "post",
				          		url: `${_this.apiurl}/la/plant/stage/save`,
				          		data: res
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
				});
	    	}
		},
		mounted() {
	    	this.id = this.$route.query.id;
	    	this.getList();
		}
	}
</script>