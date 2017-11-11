<template>	
	<section>
		<div>
			<mt-header title="图片详情页">
  			<router-link to="/shop" slot="left">
    		<mt-button icon="back">返回</mt-button>
 			 </router-link>
			</mt-header>
		</div>

		我是页面详情页！！！
		页面id{{id}}
	</section>
</template>
<script>
import { Header } from 'mint-ui';
import { Toast } from 'mint-ui';
import requrl from "@/comment/request.js"
	export default{
		data(){
			return{
				id:this.$route.params.shopId,

			}
		},
		created(){
			this.getData();
		},
		methods:{
			getData(){
				var url=requrl.textUrl+"/api/goods/getdesc/"+this.id;
				this.$http.get(url).then(function(res){
					if(res.body.status!=0){
						Toast("数据加载失败")
					}
					console.log(res);
				})
			}
		}
	}
</script>
<style scoped>
	.mint-header{
		background-color: #5b8fb5;
	}	
</style>