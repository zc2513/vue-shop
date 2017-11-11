<template>	
	<section>
		<div>
			<mt-header title="图片详情页">
  			<router-link to="/shop" slot="left">
    		<mt-button icon="back">返回</mt-button>
 			 </router-link>
			</mt-header>
		</div>
		<!-- 引入轮播图插件  -->
		<silder :imgId="config+id"></silder>
	</section>
</template>
<script>
import { Header } from 'mint-ui';
import { Toast } from 'mint-ui';
import requrl from "@/comment/request.js"
import silder from "@/comment/silder"

	export default{
		data(){
			return{
				id:this.$route.params.shopId,
				config:"getthumimages/"
			}
		},
		components:{
			silder
		},
		created(){
			this.getData();
		},
		methods:{
			getData(){//获取购物页面的数据
				var url=requrl.textUrl+"/api/goods/getdesc/"+this.id;
				this.$http.get(url).then(function(res){
					if(res.body.status!=0){
						Toast("数据加载失败")
					}
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