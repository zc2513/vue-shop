<template>
	<section>
		<div>
			<mt-header title="图文详情页">
				<router-link :to="'/shop/'+twId" slot="left">
			<mt-button icon="back">返回</mt-button>
				 </router-link>
			</mt-header>
		</div >
			<h4 v-text="list.title"></h4>
			<i></i>
			<div class="con" v-html="list.content"></div>
		</div>
	</section>
</template>
<script>
import { Header } from 'mint-ui';
import requrl from "@/comment/request.js"
import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				twId:this.$route.params.twId,
				list:[]
			}
		},
		created(){
			this.getData();
		},
		methods:{
			getData(){
				var url=requrl.textUrl+"/api/goods/getdesc/"+this.twId;
				console.log(url)
				this.$http.get(url).then(function(res){
					if(res.body.status!=0){
						Toast("获取内容失败！")
						return;
					}
					this.list=res.body.message[0];

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
	i{
		display:block;
		border-top: 1px solid #ccc;
		height: 1px;
		margin: 8px;
	}

	/*内容部分*/
	h4{
		font-size:17px;
		color: purple;
		padding:0 5px;
	}
	.con{
		padding: 0 5px;
	}
</style>