<template>
	<section>
		<div>
			<mt-header title="图片详情页">
  			<router-link to="/home" slot="left">
    		<mt-button icon="back">返回</mt-button>
 			 </router-link>
			</mt-header>
		</div>

		<div>
			<ul class="mui-table-view mui-grid-view">
		        <li class="mui-table-view-cell mui-media mui-col-xs-6"  v-for="(item,index) in list" :key="index">
		            <router-link :to="'/shop/'+item.id">
		                <img class="mui-media-object" :src="item.img_url" height="500" width="800">
		                <section>
		                	<p v-text="item.title" class="p"></p>
		                	<div class="box">
		                		<p class="plice">
		                			<span>￥{{item.sell_price}}</span> &nbsp;&nbsp;&nbsp;
		                			<del>￥{{item.market_price}}</del></p>
		                		<p class="clearfix">
		                			<span class="left">热卖中</span>
		                			 <span class="right">还剩{{item.stock_quantity}}件</span>
		                		</p>
		                	</div>
		                </section>
		            </router-link>
		        </li>
			</ul>
		</div>
		<div>
			<mt-button type="default" size="large" @click="getData" v-if="flag">加载更多...</mt-button>			
		</div>
	</section>
</template>
<script>
import { Header } from 'mint-ui';
import { Toast } from 'mint-ui';
import requrl from "@/comment/request.js"
import { Button } from 'mint-ui';
	export default{
		data(){
			return{
				list:[],
				sum:0,
				flag:true
			}
		},
		created(){
			this.getData();
		},
		methods:{
			getData(){
				this.sum++;
				var url=requrl.textUrl+"/api/getgoods?pageindex="+this.sum;
				this.$http.get(url).then(function(response){
					if(response.body.status!=0){
						Toast("数据加载失败");
					}
					this.list=this.list.concat(response.body.message);
					if(response.body.message.length<=0||response.body.message.length<10){
						this.flag=false;
						return;
					}
				})
			}
		}
	}
</script>
<style scoped>
	*{
		box-sizing: border-box;
	}
	.mui-table-view-cell > a:not(.mui-btn){   
		/*white-space:normal;*/
	}
	.left{
		float: left;
	}
	.right{
		float: right;
		padding-right: 8px;
	}
	.p{
		color: #000;
        line-clamp: 2;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.plice{
		text-align: left;
		margin-bottom: 8px;
	}
	.plice>span:nth-of-type(1){
		color:red;
	}
	.mui-table-view > li{
		width: 48%;
	}
	.mui-table-view.mui-grid-view .mui-table-view-cell{
		border: 1px solid #ccc;
		text-align: left;
		margin:3px 2px;
		padding: 10px 0 0 10px;
		box-shadow: -1px -1px 2px 1px #ced2bb;
	}
	del{
		font-size: 12px;
	}
	.box{
		background-color: #eee;
	}
	.mint-header{
		background-color: #5b8fb5;
	}
</style>