// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//1.引包
import Vue from 'vue'
import mintui from "mint-ui"
import vueResource from "vue-resource"//服务的请求
import moment from "moment"
import vuePreview from "vue-preview"
//css文件导入
import 'mint-ui/lib/style.min.css'	
import "../static/mui/dist/css/mui.css"
import "../static/css/global.css"


//2.导入vue文件插件：
import App from './App'
import router from './router'
Vue.use(mintui);
Vue.use(vueResource);
Vue.use(moment);
Vue.use(vuePreview);
//Vue.config.productionTip = false//可有可无项

/* eslint-disable no-new */
Vue.filter("getTime",function(config,type){
	var time;
	time=moment(config).format(type); 
	return time;
})
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
