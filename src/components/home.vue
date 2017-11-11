<template>
<div>
	<mt-swipe :auto="2000" class="cls">
	  <mt-swipe-item v-for="(item,index) in list" :key="index">
	  		<img :src="item.img" height="500" width="800" alt="">
	  </mt-swipe-item>
	</mt-swipe>
	<div class="mui-content">
  		<ul class="mui-table-view mui-grid-view mui-grid-9">
  		    <li class="mui-table-view-cell mui-media mui-col-xs-4">
  		    	<router-link to="/news">
  		            <span class="mui-icon mui-icon-home"></span>
  		            <div class="mui-media-body">新闻资讯</div>
  		        </router-link>
  		    </li>
  		    <li class="mui-table-view-cell mui-media mui-col-xs-4">
  		    	<router-link to="/lazyPhone">
  		            <span class="mui-icon mui-icon-email">
                  <!-- <span class="mui-badge">0</span> -->
                  </span>
  		            <div class="mui-media-body">图片分享</div>
  		   		 </router-link>
	   		</li>
  		    <li class="mui-table-view-cell mui-media mui-col-xs-4">
  		   		<router-link to="/news">
  		            <span class="mui-icon mui-icon-chatbubble"></span>
  		            <div class="mui-media-body">商品购物</div>
  		        </router-link>
	       </li>
  		    <li class="mui-table-view-cell mui-media mui-col-xs-4">
  		    	<router-link to="/news">
  		            <span class="mui-icon mui-icon-location"></span>
  		            <div class="mui-media-body">留言反馈</div>
  		        </router-link>
	       </li>
  		    <li class="mui-table-view-cell mui-media mui-col-xs-4">
  		    	<router-link to="/news">
  		            <span class="mui-icon mui-icon-search"></span>
  		            <div class="mui-media-body">视频专区</div>
            	</router-link>
        	</li>
  		    <li class="mui-table-view-cell mui-media mui-col-xs-4">
  		    	<router-link to="/news">
  		            <span class="mui-icon mui-icon-phone"></span>
  		            <div class="mui-media-body">联系我们</div>
            	</router-link>
        	</li>
  		</ul> 
	</div>
</div>
</template>
<script>
import requrl from "../comment/request.js"
import { Swipe, SwipeItem } from 'mint-ui';//萝卜头
import { Toast } from 'mint-ui';//---加载失败提示插件
	export default{
		data(){
			return{
				list:[]
			}
		},
		created(){
			this.getImg()
		},
		methods:{
			getImg(){
          var url=requrl.textUrl+"/api/getlunbo";
          // var url="http://vue.studyit.io/api/getlunbo";
          this.$http.get(url).then(function(result){
            if(result.body.status!=0){
              Toast("加载失败！")
            }
            this.list=result.body.message;
          })
			}
		}

	}
</script>
<style scoped>
  .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
    line-height: 23px;
    height: 23px;
  }

	.cls{
		width: 100%;
		height: 300px;
		background-color: red;
	}
	.cls img{
		width: 100%;
		height: 100%;
	}
	.mui-grid-view.mui-grid-9{
		background-color: #fff;
		border: 0;
	}
	.mui-grid-view.mui-grid-9 .mui-table-view-cell{
		border:0;
	}
  .mui-icon-home:before,
  .mui-icon-email:before,
  .mui-icon-chatbubble:before,
  .mui-icon-phone:before{
    content:'';
    display: inline-block;
    width: 50px;
    height: 50px;
    background-repeat: round;
  }



  .mui-icon-home:before{  
   background-image: url(../assets/1.png);
  }
  .mui-icon-email:before{  
   background-image: url(../assets/2.png);
  }
  .mui-icon-chatbubble:before{  
   background-image: url(../assets/3.png);
  }
  .mui-icon-phone:before{  
   background-image: url(../assets/6.png);
  }

</style>