<template>
	<section >
		<div class="top">
			<div class="rows" v-for="(item,index) in goodsInfo" :key="index">
				<mt-switch v-model="value[index]"></mt-switch>
				<img :src="item.thumb_path" height="70" width="75" alt="">
				<div class="right">
					<h4 v-text="item.title"></h4>
					<ul>
						<li>￥{{item.sell_price}}</li>
						<li><goodsNumber class="cj"  :recieveId="item.id" :recieveCount="item.count" @send="getType"></goodsNumber></li>
						<li @click="del(item.id,index)">删除</li>
					</ul>
				</div>
			</div>
		</div>	
		<div class="total">
			<div>
				<h5>总计(不含运费)</h5>
				<h5>购买的商品个数：{{set}},总价格:￥{{price}} </h5>
			</div>
			<div class="balance">
				<mt-button type="danger" size="small">结算</mt-button>
			</div>	
		</div>	
	</section>

</template>
<script>
import {KEY,getItem,autoComputed,removeItem} from "@/comment/localStorage.js"
import { Switch , Toast ,Button } from 'mint-ui';
import goodsNumber from "@/comment/carNumber"
import requrl from "@/comment/request.js"
	export default{
		data(){
			return{
				list:[],
				idstr:"",
				obj:[],
				value:[],
				goodsInfo:[],
				total:0,
				price:0,
			}
		},
		components:{
			goodsNumber
		},
		computed:{
			set(){
				var total=this.value.filter(function(config){
					return config;
				})
				//计算总价格：
				var totalPrice=0;
				this.value.forEach((value,index)=>{
					if(value){//value里面的index对应的是计算后对象id的索引和值
						 let totalCount=this.goodsInfo[index].count;
						 let price = this.goodsInfo[index].sell_price;
						 totalPrice+=totalCount*price;
					}
				})
				this.price=totalPrice;
				return this.total=total.length;
			}
		},
		created(){
			this.list=getItem();//---获取本地存储数据---
			this.dp();
			this.getData();
		},
		methods:{
			dp(){//数据处理---
				var obj={};//1.定义id的接收内容的对象id:cout
					for(var i=0;i<this.list.length;i++){
						var item=this.list[i];
						if(obj[item.shopid]){
							// console.log(obj[item.shopid])
							obj[item.shopid]=item.count+obj[item.shopid];
						}else{
							obj[item.shopid]=item.count;
						}
					}
					this.obj=obj;
					//**--遍历obj将id的字符串进行拼接
					for (var k in obj){
						this.idstr+=k+","
					}
				},
			getData(){//--*获取当前页面的商品信息
				var id = this.idstr.substr(0,this.idstr.length-1);//1.将请求体最后一为的逗号去掉
				if(id.length<1){
					return;
				}
				var url=requrl.textUrl+"/api/goods/getshopcarlist/"+id;
				var that = this;
				this.$http.get(url).then(function(res){
					if(res.body.status!=0){
						Toast("获取数据失败");
						return;
					}							
					res.body.message.forEach(function(ele){		
						for (var k in that.obj){
							if(k==ele.id){
								ele.count=that.obj[k];
							}
						}
					})
					this.goodsInfo=res.body.message;
					// console.log(this.goodsInfo);
					//将总的商品个数在子组件中显示出来---需要将当前组件的值传入到子组件当中去
				})
			},
			getType(type){//接收传送回来操作的产品的id和操作类型---根据类型对本地数据进项操做
				autoComputed(type);
				for (let i = 0 ; i<this.goodsInfo.length;i++){//计算属性所监听的list的数组的内容;--跟随改变
					var item=this.goodsInfo[i];
					if(type.shopId==item.id){
						if(type.type=="add"){
							item.count=item.count+1;
						}else{
							item.count=item.count-1;
						}
					}
				}
			},
			del(id,index){//删除按钮--主要是响应式数据的更新--将页面的内容也刷新
				//1.删除数据库的内容
				removeItem(id);
				//2.删除当前网页显示的goodsInfo的内容
				this.goodsInfo.splice(index,1);
				//3.删除this.value的对应的数据
				this.value.splice(index,1);
			}
		}
	}
</script>
<style scoped>
/*返回部分的背景色设置*/
	.mint-header{
		background-color: #5b8fb5;
	}	
/*展示区域*/	
	.rows{
		display: flex;
		padding: 10px 5px;
		border-bottom:1px solid #ccc;

	}
	.rows img{
		margin-left: 5px;
	}
	.right{
		padding-left:5px;
		display: flex;
		flex-direction: column;
	}
 	 .right h4{
		font-size:14px;
		/*width: 250px;*/
		color:#a790c0;
 	}
	.right ul{
		list-style: none;
		display: flex;
		justify-content: space-between;
		height: 30px;
		line-height: 30px;
		margin-top: 10px;
	}
	.right ul>li:first-of-type{
		color: red;
		font-size: 14px;
	} 
	.right ul>li:last-of-type{
		color: #977575;
		font-size: 14px;
	}  
/*结算部分*/	
	.total{
		width: 100%;
		background-color: #eee;
		display: flex;
		justify-content: space-between;
		position: absolute;
		bottom: 50px;
	}
	.balance{
		padding: 15px 10px;
	}
	.mint-button--small{
		width: 80px;
	}
	h5{
		line-height: 20px;
		padding-bottom: 0px;
	}
</style>