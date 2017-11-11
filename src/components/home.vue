<template>
<div>
 <!-- 轮播图的组件引入 -->
  <silder :imgId="id"></silder>
  <!-- 九宫格的插件引入  -->
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
  		   		<router-link to="/shop">
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
import { Toast } from 'mint-ui';//---加载失败提示插件
import silder from "@/comment/silder.vue"
	export default{
		data(){
			return{
				list:[],
        id:"getlunbo"
			}
		},
    components:{
      silder
    }
	}
</script>
<style scoped>
   /*九宫格样式开始*/
  .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
    line-height: 23px;
    height: 23px;
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
  /*九宫格样式结束*/
</style>