<template>
	<div>
		<div>
			<mt-header title="图片详情页">
  			<router-link to="/home" slot="left">
    		<mt-button icon="back">返回</mt-button>
 			 </router-link>
			</mt-header>
		</div>


		<div class="box">
			<ul class="clearfix">
				<li @click="getImg(0)">全部</li>
				<li v-for="(item,index) in list" :key="index" v-text="item.title" @click="getImg(item.id)"></li>
			</ul>
		</div>
		<div >
			<ul>
 				<li v-for="item in imglist" class="imgLi">
 				<router-link :to="'/lazyPhone/'+item.id">
 					<img v-lazy="item.img_url">
 				</router-link>
 		  			<div class="imgfont">
 		  				<strong v-text="item.title"></strong>
 		  				<p v-text="item.zhaiyao"></p>
 		  			</div>
 				</li>
			</ul>
		</div>
	</div>	
</template>
<script>
import { Header } from 'mint-ui';
import requrl from "../../comment/request.js";
import { Toast } from 'mint-ui';
import { Lazyload } from 'mint-ui';
	export default{
		data(){
			return{
				list:[],
				imglist:[]
			}
		},
		created(){//页面下载时候需要显示的数据，调用数据的获取
			this.getData();
			var index=0;//初始化页面加载的数据
			this.getImg(index);
		},
		methods:{
			getData(){//获取加载的选项数据！
				var url=requrl.textUrl+"/api/getimgcategory";
				this.$http.get(url).then(function(res){
					if(res.body.status!=0){
						Toast(res.body.message);
					}
					this.list=res.body.message;
					var count=this.list.length+1;
					var li=document.querySelector(".clearfix>li");
					var liWidth=li.offsetWidth;
					var ul = document.querySelector(".box>ul");
					ul.style.width=count*liWidth+"px";
					// var liWidth=
				})
			},
			getImg(index){//获取图片的数据
				var url=requrl.textUrl+"/api/getimages/"+index;
				this.$http.get(url).then(function(res){
					if(res.body.status!=0){
						Toast(res.body.message);
					}
					this.imglist=res.body.message;

				})
			}
		}
	}
</script>

<style scoped>

	.box{
		max-width: 320px;
		width: 320px;
		overflow-x: auto;
	}
	.box>ul{
		list-style: none;
	}
	.box>ul>li{
		float: left;
		width: 80px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		color:purple;
	}
	image[lazy=loading] {
 		 width: 40px;
 		 height: 300px;
 		 margin: auto;
	}
	img{
		width: 100%;
		height: 250px;
		font-size:0;
	}
	.imgfont strong{
		font-size: 14px;
		
	}
	.imgfont p{
		font-size: 12px;
		color:#000;
	}
	.imgLi{
		position: relative;
	}
	.imgfont{
		background-color: rgba(0,0,0,0.1);
		position:absolute;
		bottom: 0;
		left: 0;
	}
	.mint-header{
		background-color: #5b8fb5;
	}
</style>