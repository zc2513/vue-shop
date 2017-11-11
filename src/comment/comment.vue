<!-- 提交控件！  -->
<template>
	<div>
		<div class="content">
			<h4>提交评论</h4>
			<i></i>
			<textarea v-model="userVal" placeholder="请输入内容：..."></textarea>
		<mt-button type="danger" size="large" @click="setData" :disabled="userVal.trim().length<=0 ">提交</mt-button>
		</div>
		<div class="content">	
			<i></i>
			<h4>评论列表</h4>
			<i></i>
			<div v-for="(item , index) in list" :key="index">
				<p>
					<span>第{{index+1}}楼</span>
					<span>用户名：{{item.user_name}}</span>
					<span>时间：{{item.add_time | getTime("YYYY-MM-DD HH:mm:ss")}}</span>
				</p>
				<p v-text="item.content"></p>
				<i></i>
			</div>

		</div>
		<mt-button type="default" @click="getData" size="large" plain>加载更多...</mt-button>
	</div>
</template>
<script>
import { Button } from 'mint-ui';
import requrl from "../comment/request.js";
import { Toast } from 'mint-ui';
	export default{
		props:["cont"],
		data(){
			return{
				list:[],
				userVal:"",
				page:0
			}
		},
		created(){
			this.getData();
		},
		methods:{
			getData(){//获取服务内容
				this.page++;
				var url=requrl.textUrl+"/api/getcomments/"+this.cont+"?pageindex="+this.page;
				this.$http.get(url).then(function(result){
					if(result.body.status!=0){
						Toast("获取失败！!!!!");
						return;
					}
					this.list=this.list.concat(result.body.message);
				})
			},
			setData(){
				var url=requrl.textUrl+"/api/postcomment/"+this.cont;
				this.$http.post(url,{content:this.userVal},{emulateJSON:true}).then(function(result){
					Toast(result.body.message)
					//将最新添加的数据显示到最前面并且将输入框清空：
					this.list=[{
						"user_name":"空空",
						"add_time":new Date(),
						"content":this.userVal
					}].concat(this.list)
					this.userVal=""
				})
			}
		}
	}
</script>
<style scoped>
	.content{
		padding: 0 5px;
	}
	.content>h4{
		font-weight: 400;
		font-family:"Micsoroft YaHei";
		color:purple;
	}
	i{
		margin-top: 10px;
		display: block;
		height: 1px;
		border-top: 1px solid #ccc;
		padding: 3px 0;
	}
	.content>textarea{
		font-size: 12px;
	}
	p{
		padding: 0 5px;
	}
	.mint-button--default.is-plain{
		border-color: #ccc;
	}
</style>