import Vue from "vue"
import Vuex from "vuex"
import {ajax,formatTime} from "../assets/tools/tool"
import opinion from "../assets/tools/agent"
Vue.use(Vuex);
let localMode = true;
// let localMode = false;
let localBaseUrl = "/apis";
let realBaseUrl = window.ip.apiURL;
let isMobile = opinion() == "mobile";
if(isMobile) {
	realBaseUrl = window.localStorage.mobileBaseUrl ? window.localStorage.mobileBaseUrl : window.ip.apiURL;
}
realBaseUrl += "/seedling"
import axios from 'axios'
let store = new Vuex.Store({
	state: {
		localMode,
		runInfo: {
	        ana: {},
	        alarm: {},
	        comm: {},
	        dig: {},
	        param: {},
	        seedling_light_dig: {},
	    },
	    curDevInfo: {},
	    PlanListLayerState: false,
	    // 培植记录
	    recordList: [],
	    op_onOff: false,
	    mobileBaseUrl : opinion() == "mobile" ? (window.localStorage.mobileBaseUrl ||  window.ip.apiURL)  : window.ip.apiURL,
	    // apiurl: localMode ? "/apis" : "./seedling"
	    apiurl: localMode ? localBaseUrl : realBaseUrl,
	    isMobile,
	    user: {
	    	token: "",
	    	operateNo: "",
	    	userId: "",
	    },
	    userPower: 0
	},
	mutations: {
		updateUserPower(state,number) {
			state.userPower = parseInt(number);
		},
		resetUser(state,{token,operateNo,userId}) {
			state.user = {
				token,
				operateNo,
				userId
			}
		},
		changeOpOnoff(state,boolean = true) {
			state.op_onOff = boolean;
		},
		updateRunInfo(state,runInfo) {
			let {alarm,ana,comm,dig,param,version,seedling_light} = runInfo;
			let jsonAna = {};
			let jsonAlarm = {};
			let jsonComm = {};
			let jsonDig = {};
			let jsonParam = {};
			alarm.item.map(item => {
				jsonAlarm[item["param_code"]] = item.value;
			});
			ana.item.map(item => {
				jsonAna[item["param_code"]] = item.value;
			});
			comm.item.map(item => {
				jsonComm[item["param_code"]] = item.value;
			});
			dig.item.map(item => {
				jsonDig[item["param_code"]] = item.value;
			});
			param.item.map(item => {
				jsonParam[item["param_code"]] = item.value;
			});
			state.runInfo.alarm = jsonAlarm;
			state.runInfo.ana = jsonAna;
			state.runInfo.comm = jsonComm;
			state.runInfo.dig = jsonDig;
			state.runInfo.param = jsonParam;
			state.runInfo.seedling_light_dig = seedling_light.dig;
		},
		updateCurDevInfo(state,curDevInfo) {
			state.curDevInfo = curDevInfo;
		},
		changePlanListLayerState(state,s) {
			state.PlanListLayerState = s;
		},
		// 更新培植记录
		updateRecordList(state,s) {
			state.recordList = s;
		},
		updateMobileBaseUrl(state,s) {
			state.mobileBaseUrl = s;
			window.localStorage.mobileBaseUrl = s;
		}
	},
	actions: {
		// 获得当前永辉级别
		updateUserPower({commit}) {
			let {token,userId} = this.state.user;
			if(!token || !userId) {
				delete localStorage.operateNo;
				delete localStorage.token;
				delete localStorage.userId;
				delete localStorage.userPower;
			} else {
				axios({
	                url: `${localMode ? localBaseUrl: realBaseUrl}/la/user/get`,
	                method: "post",
	                data: {
	                    data: {
	                        id: userId
	                    }
	                }
	            }).then(data=> {
	               localStorage.userPower = data.data.data.role;
	               commit("updateUserPower",data.data.data.role);
	            })
			}
		},
		// 更新当前状态
		updateRunInfo({commit}) {
			axios({
	            method: 'post',
	            url: `${localMode ? localBaseUrl: realBaseUrl}/la/run/info`,
	            data: {
	    			data: {
					    dev_id: "1"
					}
	    		}
	        }).then(data=> {
	          if(data.data.code == 200) {
	            commit("updateRunInfo",data.data.data);
	          }
	        })
		},
		updateCurDevInfo({commit}) {
			axios({
	    		method: "post",
	    		url: `${localMode ? localBaseUrl: realBaseUrl}/la/device/param/get_dev`,
	    		data: {
	    			data: {
					    id: "1"
					}
	    		}
	    	}).then(data => {
	    		if(data.data.code == 200) {
	    			commit("updateCurDevInfo",data.data.data);
	    		}
	    	})
		},
		control(d,data1) {
			let {url,data} = data1;
			data.operateNo = d.state.user.operateNo;
			data.op_id = d.state.user.userId;
			data.op_type = "OP_SEEDLING_CTRL";
			data.dev_id = 1;
			ajax({
				url: `${localMode ? localBaseUrl: realBaseUrl}/la/control`,
				data,
				callback(data) {
					if(data.code === 200) {
						d.dispatch("updateRunInfo");
						d.commit("changeOpOnoff");
					}
				}
			})
		},
		adjust(d,data1) {
			let {url,data} = data1;
			data.operateNo = d.state.user.operateNo;
			data.op_id = d.state.user.userId;
			data.op_type = "OP_SEEDLING_ADJUST";
			data.dev_id = 1;
			ajax({
				url: `${localMode ? localBaseUrl: realBaseUrl}/la/adjust`,
				data,
				callback(data) {
					if(data.code === 200) {
						d.dispatch("updateRunInfo");
						d.commit("changeOpOnoff");
					}
				}
			})
		},
		// 获取培植记录
		getRecordList(d,data1) {
			let {plant,scheme_name,start_time,end_time} = data1;
			axios({
				method: "post",
				url: `${localMode ? localBaseUrl: realBaseUrl}/la/plant/record/get_list`,
				data: {
					data: {
						plant,
			            scheme_name,
			            start_time,
			            end_time
					}
				}
			}).then(data => {
				if(data.data.code == 200) {
					let arr = data.data.data;
					arr.map(item => {
						item.status = item.status == "start" ? "开始" : item.status;
						item.start_time = formatTime(item.start_time);
						item.record_time = formatTime(item.record_time);
						item.finish_time = formatTime(item.finish_time);
						return item;
					});
					d.commit("updateRecordList",arr);
				}
			})
		}
	}
});

export default store;