<!-- 商品购物的加减组件- --> 
<template>
	<div>
		<span class="w" @click="minus">-</span class="center"><span v-text="num"></span><span class="w" @click="add">+</span>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				num:1
			}
		},
		created(){
			this.save();
		},
		methods:{
			minus(){
				this.num--;
				if(this.num<1){
					this.num=1;
				}
				this.save()
			},
			add(){
				this.num++;
				this.save();
			},
			save(){//将子元素的值发送一个事件，广播出去给父元素接收
				this.$emit("send",this.num);
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