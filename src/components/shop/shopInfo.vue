<template>	
	<section>
		<div>
			<mt-header title="商品详情页">
  			<router-link to="/shop" slot="left">
    		<mt-button icon="back">返回</mt-button>
 			 </router-link>
			</mt-header>
		</div>
		<!-- 引入轮播图插件  -->
		<div class="box">
			<silder :imgId="config+id"></silder>
		</div>
		<!-- 轮播图结束  -->
		<!-- 价格区域 -->
		<div class="box">
			<h4>华为手机非常好</h4>
			<i></i>
			<ul>
				<li>
					<span>市场价格：<s>￥2500</s></span>&nbsp;
					<span>销售价：<b>￥1500</b></span>
				</li>
				<li class="father">
					<span>购买数量：</span>
					<goolsNumber class="son" v-on:send="getSum"></goolsNumber>
				</li>
				<li>
					<mt-button size="small" type="danger">立即购买</mt-button>
					<mt-button size="small" type="danger" @click="getNum">加入购物车</mt-button>					
				</li>
			</ul>
		</div>
		<!-- 价格区域结束 -->
		<!-- 图文/商品介绍 插件引入 -->
		<div class="box">
			<router-link :to="'/shop/getdesc/'+id">
				<mt-button size="large" type="default">图文介绍</mt-button>
			</router-link>
			<router-link :to="'/shop/pl/'+id">
			<mt-button size="large" type="default" >商品评论</mt-button>
			</router-link>
		</div>
		<!-- 图文/商品介绍结束 -->
		
	</section>
</template>
<script>
import { Header } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Button } from 'mint-ui';
import goolsNumber from "@/comment/goolsNumber"	
import requrl from "@/comment/request.js"
import silder from "@/comment/silder"
	export default{
		data(){
			return{
				id:this.$route.params.shopId,
				config:"getthumimages/",
				sum:0
			}
		},
		components:{
			silder,
			goolsNumber
		},
		created(){
			this.getData();
			this.getSum();
		},
		methods:{
			getData(){//获取购物页面的数据
				var url=requrl.textUrl+"/api/goods/getdesc/"+this.id;
				this.$http.get(url).then(function(res){
					if(res.body.status!=0){
						Toast("数据加载失败")
					}
				})
			},
			getSum(config){//获取子组件传过来的值
				this.sum=config;
			},
			getNum(){
				console.log(this.sum)
			}
		}
	}
</script>
<style scoped>
/*返回部分的背景色设置*/
	.mint-header{
		background-color: #5b8fb5;
	}	
/*盒子边框样式设置：*/	
	.box{
		border: 1px solid #ccc;
		margin: 5px;
		padding: 2px;
		border-radius:8px;
	}
	i{
		display: block;
		height: 1px;
		border-top: 1px solid #ccc;
	}
/*价格区域开始*/	
	b{
		color: red;
	}
	.box>h4{
		font-size:17px;
		color:purple;
		padding-left: 5px;
	}
	.box>ul{
		padding-left: 5px;
		list-style: none;
	}
	.box>ul>li{
		height: 50px;
		line-height: 50px;
	}
	.box>ul>li:nth-of-type(1){
		color: #a07bbf;
		height: 30px;
		line-height: 40px;
		font-size:16px;
	}
/*商品评论与图文样式*/
	.mint-button--large{
		width: 95%;
		margin: 2.5%;
	}
	.mint-button:after{
		background-color: #fff;
		border: 1px solid #ccc;
		opacity:0.1;
	}
/*加减区的插件定位样式*/	
	.father{
		position: relative;
	}
	.son{
		position: absolute;
		top: 0;
		left: 85px;
	}
</style>