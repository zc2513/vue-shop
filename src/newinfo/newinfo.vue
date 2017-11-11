<template>

		<div>
			<div>
		<mt-header title="图片详情页">
  		<router-link to="/news" slot="left">
    	<mt-button icon="back">返回</mt-button>
 		 </router-link>
		</mt-header>
	</div>
	<div  class="cls">
		<div>
			<h3>{{list.title}}</h3>
			<p class="tim">时间：{{list.add_time | getTime('YYYY-MM-DD HH:mm:ss')}} &nbsp;&nbsp; <span>{{list.click}}次浏览</span>
			&nbsp;&nbsp; <span> 分类：经济民生</span>
			</p>
		</div>
		<div v-html="list.content" class="box"></div>
		<comment :cont="id"></comment>

	</div>
		</div>
</template>
<script>
import { Header } from 'mint-ui';
import requrl from "../comment/request.js"
import { Toast } from 'mint-ui';
import comment from "@/comment/comment"
	export default{
		data(){
			return{
				id:this.$route.params.id,
				list:{}
			}
		},
		components:{
			comment
		},
		created(){
			this.getData();
		},
		methods:{
			getData(){
				var url = requrl.textUrl+"/api/getnew/"+this.id;
				// var url="http://vue.studyit.io/api/getnew/"+this.id;
				this.$http.get(url).then(function(response){
					if(response.body.status!=0){
						Toast("数据获取失败！")
					}
					this.list=response.body.message[0];
				})
			}
		}
	}
</script>
<style scoped>
	.box{
		padding-top: 10px;
		border-top:1px solid #ccc;
	}
	.cls{
		padding:8px;
	}
	.tim{
		padding: 5px 0;
	}
	.mint-header{
		background-color: #5b8fb5;
	}
</style>