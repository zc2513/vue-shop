import Vue from 'vue';
import moment from "moment";
Vue.filter("getTime",function(config,type){
	var time;
	time=moment(config).format(type); 
	return time;
})