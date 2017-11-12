<template>
<div>
    <!-- 返回按钮  -->
	<div>
		<mt-header title="图片详情页">
  		<router-link to="/lazyPhone" slot="left">
    	<mt-button icon="back">返回</mt-button>
 		 </router-link>
		</mt-header>
	</div>
	
	<div>
		<h4 v-text="imgInfo.title"></h4>
		<p>
			<span >时间：{{imgInfo.add_time | getTime('YYYY-MM-DD HH:mm:ss')}}</span>&nbsp;&nbsp;
			<span>{{imgInfo.click}}次预览</span>&nbsp;&nbsp;
			<span>分类：经济民生</span>
		</p>		
	</div>
	<!-- 放大图片插件开始  -->
	<div class="imgmin clearfix">
		<ul>
			<li v-for="(item,index) in list" :key="index">
				<!-- <img :src="item.src" alt=""> -->
				<img class="preview-img" :src="item.src" height="100" @click="$preview.open(index, list)">
			</li>
		</ul>
	</div>
	<!-- 放大图片结束  -->
	<div>
		<i></i>
		<p v-html="imgInfo.content" class="p"></p>
	</div>	
	<comment :cont=id></comment>
</div>
	
</template>
<script>
import comment from "@/comment/comment"
import { Header } from 'mint-ui';
import { Toast } from 'mint-ui';
import requrl from "../../comment/request.js"
import VuePreview from 'vue-preview'
	export default{

		data(){
			return{
				imgId:this.$route.params.imgId,
				list:[],
				imgInfo:[],
				id:this.$route.params.imgId
			}
		},
		created(){
			this.getImg();
			this.getData();
		},
		components:{
			comment
		},
		methods:{
			getImg(){//获取图片
				var url=requrl.textUrl+"/api/getthumimages/"+this.imgId;
				this.$http.get(url).then(function(res){
					if(res.body.status!=0){
						Toast("加载失败");
					}
					var arr=[];
					res.body.message.forEach(function(config,b){
						arr=[];
						var img=new Image();
						img.src=config.src;
						img.onload=function(){
							var w=img.width;
							var h=img.height;
							console.log(b+"--"+w+"--"+h);
							arr.push({
								src:config.src,
								w:w,
								h:h
							})
						}
					})
					this.list=arr;
/*					for (var i=0;i<res.body.message.length;i++){
						this.list.push({
							src:res.body.message[i].src,
							w:1200,
							h:900
						})
					}	*/				
				})
			},
			getData(){
				var url=requrl.textUrl+"/api/getimageInfo/"+this.imgId;
				this.$http.get(url).then(function(res){
					this.imgInfo=res.body.message[0];
				})
			}
		}

	}
</script>
<style scoped>
	h4{
		color: purple;
		font-size: 18px;
	}
	.imgmin{

	}
	.imgmin>ul{
		width: 100%;
		list-style: none;
	}
	.imgmin>ul>li{
		padding: 10px;
		float: left;
		width: 33.33%;
		height: 100px;
	}
	img{
		width: 100%;
		height: 100%;
	}
	i{
		display: block;
		height: 1px;
		border-top: 1px solid #ccc;
	}
	.p{
		text-indent: 2em;
		line-height: 28px;
	}
	.mint-header{
		background-color: #5b8fb5;
	}
</style>