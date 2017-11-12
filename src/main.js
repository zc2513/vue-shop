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
import "@/comment/getTime.js"//时间方法：

//2.导入vue文件插件：
import App from './App'
import router from './router'
//3.使用包--
Vue.use(mintui);
Vue.use(vueResource);
Vue.use(moment);
Vue.use(vuePreview);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
