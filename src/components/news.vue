<template>
	
<div>
	
      	<div>
			<mt-header title="图片详情页">
  			<router-link to="/home" slot="left">
    		<mt-button icon="back">返回</mt-button>
 			 </router-link>
			</mt-header>
		</div>


	<div>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="(item,indext) in list" :key="indext">
					<router-link :to="'/news/'+item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url" height="200" width="200">
						<div class="mui-media-body">
							{{item.title}}
							<p class='mui-ellipsis'>{{item.zhaiyao}}</p>
							<p>时间：{{item.add_time | getTime("YYYY-MM-DD HH:mm:ss")}} &nbsp;&nbsp;<span>点击次数：{{item.click}}</span></p>
						</div>
						
					</router-link>
				</li>
			</ul>
	</div>


</div>
</template>
<script>
import requrl from "../comment/request.js"
import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				list:[]
			}
		},
		created(){
			this.getData();
		},
		methods:{
			getData(){
				var url=requrl.textUrl+"/api/getnewslist";
				// var url="http://vue.studyit.io/api/getnewslist";
				this.$http.get(url).then(function(result){
					if(result.body.status!=0){
						Toast("获取页面失败")
					}
					console.log(result.body.message);
					this.list=result.body.message
				})
			}
		}
	}
</script>
<style scoped>
	.mui-media-body{
		text-align: left;
	}
	.mui-table-view .mui-media-object{
		max-width:100px;
		height: 86px;
	}
	.mui-table-view-cell p{
		line-height: 40px;
	}
	.mui-table-view-cell{
		padding:10px 15px;
	}
	.mint-header{
		background-color: #5b8fb5;
	}
</style>