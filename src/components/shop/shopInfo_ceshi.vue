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
			<h4 v-text="list.title"></h4>
			<i></i>
			<ul>
				<li>
					<span>市场价格：<s>￥{{list.market_price
}}</s></span>&nbsp;
					<span>销售价：<b>￥{{list.sell_price}}</b></span>
				</li>
				<li class="father">
					<span>购买数量：</span>
					<goolsNumber class="son" v-on:send="getSum"></goolsNumber>
					<transition name="gds">
						<div class="radius" v-if="flag" v-text="sum"></div>
					</transition>
				</li>
				<li>
					<mt-button size="small" type="danger">立即购买</mt-button>
					<mt-button size="small" type="danger" @click="getNum">加入购物车</mt-button>					
				</li>
			</ul>
		</div>
		<div class="box config">
			<h4>商品参数</h4>
			<i></i>
			<p>商品货号：{{list.goods_no}}</p>
			<p>货存数量：{{list.stock_quantity}}</p>
			<p>上架时间：{{list.add_time | getTime("YYYY-MM-DD HH:mm:ss")}}</p>
		</div>
		<!-- 价格区域结束 -->
		<!-- 图文/商品介绍 插件引入 -->
		<div class="box">
			<router-link :to="'/shop/getdesc/'+id">
				<mt-button size="large"  type="default">图文介绍</mt-button>
			</router-link>
			<router-link :to="'/shop/pl/'+id">
			<mt-button size="large"  type="default"  class="blue">商品评论</mt-button>
			</router-link>
		</div>
		<!-- 图文/商品介绍结束 -->
		
	</section>
</template>
<script>
import { Header,Toast,Button,MessageBox  } from 'mint-ui';
import goolsNumber from "@/comment/goolsNumber"	
import requrl from "@/comment/request.js"
import silder from "@/comment/silder"
import {vm,send} from "@/comment/newVue.js"
import {KEY,setItem} from "@/comment/localStorage.js"
// console.log(vm)
	export default{
		data(){
			return{
				id:this.$route.params.shopId,
				config:"getthumimages/",//轮播图的传参
				sum:0,
				list:[],//商品参数
				flag:false
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
				var url=requrl.textUrl+"/api/goods/getinfo/"+this.id;
				this.$http.get(url).then(function(res){
					if(res.body.status!=0){
						Toast("数据加载失败")
					}
					this.list=res.body.message[0];
				})
			},
			getSum(config){//获取子组件传过来的值
				this.sum=config;
			},
			getNum(){
				MessageBox.confirm('确定加入购物车').then(action => {
				// this.flag=!this.flag;//放弃的动画效果
				vm.$emit(send,this.sum);
				setItem({shopid:this.id,count:this.sum});
				});

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
		border: 1px solid #eee;
		margin: 5px 5px 10px 5px;
		padding: 2px;
		border-radius:8px;
	}
	i{
		display: block;
		height: 1px;
		border-top: 1px solid #ccc;
		margin:8px 0;
	}
/*价格区域开始*/	
	b{
		color: red;
	}
	.box>h4{
		font-size:15px;
		color:#87d7f5;
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
	.config p{
		height: 30px;
		line-height: 30px;
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
/*加减区的插件定位样式---包含飞入的小球*/	
	.father{
		position: relative;
	}
	.son{
		position: absolute;
		top: 0;
		left: 85px;
	}
/*徽章动画效果的实现*/	
/*   	.radius{
  	position:absolute;
  	text-align: center;
  	line-height: 18px;
  	color: #fff;
  	width: 18px;
  	height: 18px;
  	border-radius:50%;
  	transform:translate(130px,-36px);
  	background-color: #f00;
  	z-index: 9999;
  }
  .gds-enter{
  	transform:translate(130px,-36px);
  }
  .gds-enter-active{
  	transition:3s;
  }
  .gds-enter-to{
  	transform: translate(285px,360px);
  }  */ 
/*购买按钮*/
	.box .mint-button--default{
		background-color: #fff;
		box-shadow:0 0 1px #43566f;
	}

	.blue{
		color: red;
	}

/*确认confirm样式*/		
	.mint-msgbox{
		width: 60%;
	}
</style>