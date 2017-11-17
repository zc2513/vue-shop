<template>
	<section >
		<div>
			<mt-header title="购物车列表">
  			<router-link to="/home" slot="left">
    		<mt-button icon="back">返回</mt-button>
 			 </router-link>
			</mt-header>
		</div>
		<div class="top">
			<mt-switch v-model="value"></mt-switch>
			获取去数据---:{{idstr}}
			<br>
		</div>		
	</section>

</template>
<script>
import {KEY,getItem} from "@/comment/localStorage.js"
import { Switch } from 'mint-ui';
import requrl from "@/comment/request.js"
	export default{
		data(){
			return{
				list:[],
				idstr:"",
				obj:{},
				value:""
			}
		},
		created(){
			this.list=getItem();//---获取本地存储数据---
			this.dp();
			this.getData();
		},
		methods:{
			dp(){//将获取到的值本地存储的值进行处理,处理--处理为id唯一cout为总的方式：{id:total}{87:50}
				//为请求服务的时候后面的id可以字符串拼接的形式请求多个--所以与将id进行拼接
					var obj={};//1.定义id的接收内容的对象
					for(var i=0;i<this.list.length;i++){//1.1---遍历对象--本地数据
						var item=this.list[i];
						if(obj[item.shopid]){//1.2判断对象中是否有key属性---如果有则直接将当前item.count与之前的obj里面key对应的count相加
							obj[item.count]=item.count+obj[item.shopid];
						}else{//1.3如果没有则将当前的key存储到obj当中--以键值对的形式
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
				var url=requrl.textUrl+"/api/goods/getshopcarlist/"+id;
				console.log(url)
				this.$http.get(url).then(function(res){
					console.log(res);
				})
			}
		}
	}
</script>
<style scoped>
/*返回部分的背景色设置*/
	.mint-header{
		background-color: #5b8fb5;
	}	
	.top{
		margin-top:10px;
	}
</style>