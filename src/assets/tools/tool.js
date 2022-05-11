import axios from 'axios'
import router from "../../router"
String.prototype.toJson = function() {
	const result = {};
	this.substring(1,this.length - 1).split(",").forEach(item => {
		let [key,value] = item.split(':');
		result[key] = value;
	});
	return result;
};
		
function formatTime(time) {
	if(time) {
		return time.substring(0, 19).replace('T', ' ');
	} else {
		return "";
	}
}

function minuteToTime(minute) {
    let hour = String(parseInt(minute / 60)).padStart(2,0);
    let minute1 = String(minute % 60).padStart(2,0);
    return `${hour}:${minute1}`;
}

function timeToMinute(time) {
    let [hour,min] = time.split(":");
    return hour * 60 + parseInt(min);
}

function switchTimeToShow(obj,params="param_code",valueType="ref_value") {
    let arrTime = ["SUNRIZE","SUNSET"];
    if(arrTime.includes(obj[params])) {
        obj[valueType] = minuteToTime(obj[valueType]);
    }
    return obj;
}

function switchTimeToSubmit(obj,params="param_code",valueType="ref_value") {
    let arrTime = ["SUNRIZE","SUNSET"];
    if(arrTime.includes(obj[params])) {
        obj[valueType] = timeToMinute(obj[valueType]);
    }
    return obj;
}

function getUserPower() {
    if(!localStorage.userPower) {
        return 0;
    } else {
        return Number(localStorage.userPower) || 0;
    }
}

// ajax
function ajax(obj) {
	let {url,data,callback} = obj;
	axios({
		method: 'post',
        url,
        data: {
        	data
        }
	}).then(data => {
		if(data.data.code == 200) {
    		callback(data.data);
    	}
	})
}

// 自动跳转到指定页面
function autoJump() {
    let data = [{
        number: 0,       // 未登录用户
        redirect: "/",   // 跳转至首页
    },{
        number: 1,       // 操作员
        redirect: "/",   // 跳转至首页
    },{
        number: 2,        // 操作员
        redirect: "/User",// 跳转至首页
    }];
    if(!([...arguments].includes(getUserPower()))) {
        let url = data.filter(item => item.number == getUserPower());
        url.length && router.replace(url[0].redirect);
    }
}

export {formatTime,ajax,minuteToTime,timeToMinute,switchTimeToShow,switchTimeToSubmit,getUserPower,autoJump};