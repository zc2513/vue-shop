<template>
  <div id="app">

    <header class="mint-header is-fixed">
      <div class="mint-header-button is-left" @click="goBack" v-if="flag">返回</div> 
      <h1 class="mint-header-title">购物系统管理</h1> 
      <div class="mint-header-button is-right"></div>
    </header>

      <router-view/>



    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item " to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/vip">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item" to="/shopcar">
        <span class="mui-icon mui-icon-extra-cart"><span class="mui-badge" v-text="val">0</span></span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" to="/setting">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
         
  </div>
</template>

<script>
import {vm,send} from "@/comment/newVue.js"
import {Toast} from 'mint-ui';
export default {
    data(){
      return{
        val:0,
        flag:false
      }
    },
    created(){
      var that=this;//function内this的指向为vm
      vm.$on(send,function(config){       
        that.val+=config;
        Toast({message:"商品添加成功", duration: 500});
      })
    },
    watch:{//监视路由当路由在主页的时候让返回按钮隐藏
      $route:function(news,old){
        console.log(news.path.toLowerCase());
        if(news.path.toLowerCase()=="/home"){
          this.flag=false
        }else{
          this.flag=true
        }
      }
    },
    methods:{
      goBack(){//返回上一页
        this.$router.go(-1);
      }
    }
}
</script>

<style>
#app {
  margin-top: 40px;
  padding-bottom: 50px;
}
.mui-icon-extra-cart:before{
  content:"\e107";
}
.mint-header-button.is-left{
  color:#9a719a;
}
</style>
