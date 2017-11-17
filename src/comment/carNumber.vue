<!-- 商品购物的加减组件- --> 
<template>
	<div>
		<span class="w" @click="minus">-</span><span v-text="receiveCt"></span><span class="w" @click="add">+</span>
	</div>
</template>
<script>
	export default{//接收父组件穿过来的值id和总的商品个数---并渲染出来--将点击的方式传送给父组件--进行数据库的增删
		props:["recieveId","recieveCount"],
		data(){
			return{
				receiveCt:this.recieveCount,
			}
		},
		methods:{
			minus(){//--
				this.receiveCt--;
				if(this.receiveCt<1){
					this.receiveCt=1;
					return;
				}
				this.save("minus");
			},
			add(){//++
				this.receiveCt++;
				this.save("add");
			},
			save(config){//接收传入参数，将操作方法进行返回--返回商品的id和操作类型---例：{shopId:this.recieveId,type:config}
				this.$emit("send",{shopId:this.recieveId,type:config});
				
			}
		}
	}
</script>
<style scoped>
/*加减区域的样式设置*/
	span{
		display: inline-block;
		height: 26px;
		width: 40px;
		border: 1px solid #ccc;
		text-align: center;
		line-height: 26px;
	}
	.w{
		width: 25px;
		margin: 0px 1px ;
	}
</style>