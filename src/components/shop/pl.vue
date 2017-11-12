<template>
	<section>
		<div>
			<mt-header title="商品评论">
				<router-link :to="'/shop/'+id" slot="left">
			<mt-button icon="back">返回</mt-button>
				 </router-link>
			</mt-header>
		</div >
		<div>
			<comment :cont="id"></comment>
		</div>
	</section>
</template>
<script>
import { Header } from 'mint-ui';
import comment from "@/comment/comment"
	export default{
		data(){
			return{
				id:this.$route.params.id
			}
		},
		components:{
			comment
		}
	}
</script>
<style scoped>
	/*返回部分的背景色设置*/
	.mint-header{
		background-color: #5b8fb5;
	}
</style>