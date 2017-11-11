import Vue from 'vue'
import Router from 'vue-router'
import home from "@/components/home"
import vip from "@/vip/vip"
import shopcar from "@/shopcar/shopcar"
import setting from "@/setting/setting"
import info from "@/newinfo/newinfo"
import news from "@/components/news"
import lazyPhone from "@/components/lazyPhoto/lazyPhoto.vue"
import phoneInfo from "@/components/lazyPhoto/phoneInfo.vue"
import shop from "@/components/shop/shop"
import shopInfo from "@/components/shop/shopInfo"
Vue.use(Router)

export default new Router({
  linkActiveClass :'mui-active',		
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
    	path:"/home/",
    	component:home
    },
    {
    	path:"/vip",
    	component:vip
    },
    {
    	path:"/shopcar",
    	component:shopcar
    },
    {
    	path:"/setting",
    	component:setting
    },
    {
      path:"/news",
      component:news
    },
    {
      path:"/news/:id",
      component:info
    },{
      path:"/lazyPhone",
      component:lazyPhone
    },
    {
      path:"/lazyPhone/:imgId",
      component:phoneInfo
    },
    {
      path:"/shop",
      component:shop
    },
    {
      path:"/shop/:shopId",
      component:shopInfo
    }
  ]
})
