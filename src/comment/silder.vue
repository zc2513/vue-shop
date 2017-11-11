<!-- 轮播图控件 -->
<!-- 解决img的照片的地址不统一，遍历不出内容的问题  -->
<template>
	<section>
	<mt-swipe :auto="2000" class="cls">
	  <mt-swipe-item v-for="(item,index) in list" :key="index">
	  		<img :src="item.img" height="500" width="800" alt="">
	  </mt-swipe-item>
	</mt-swipe>		
</section>
</template>
<script>
import requrl from "../comment/request.js"//地址的引入
import { Swipe, SwipeItem } from 'mint-ui';//轮播图需要引入的文件！
import { Toast } from 'mint-ui';
	export default{
		props:["imgId"],
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
		        var url=requrl.textUrl+"/api/"+this.imgId;
		        this.$http.get(url).then(function(result){
			            if(result.body.status!=0){
			              Toast("加载失败！")
			            }
		            for(var i=0;i<result.body.message.length;i++){
		            	if(result.body.message[i].src){//对没有此类数据的内容进行转换！
		            		this.list.push({
		            			img:result.body.message[i].src
		            		})
		            	}else{//如果数据正常则正常的赋值就好了;
		            		this.list=result.body.message;
			            	}
			            }
			        })
				}
			}

	}
</script>
<style scoped>
	/*轮播图开始*/
	.cls{
		width: 100%;
		height: 300px;
		background-color: red;
	}
	.cls img{
		width: 100%;
		height: 100%;
	}
  /*轮播图结束*/
</style>