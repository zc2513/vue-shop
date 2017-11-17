//数据本地存储功能
/*
1.数据获取：localStorage.getItem(key);
2.数据添加：localStorage.setItem(key,val);
3.数据删除：localStorage.removeItem(key);
*/


//1.定义一个数据存储属常量：也就是localStorage的存储的一个key值
export const KEY="goodsData"

//2.定义数据获取方法：---直接用key值进行值的获取！
export function getItem(){//可以直接将获取到的字符串进行导出 但是在当前使用的时候我们需要的是一个json格式内容所以需要将获取到的值进行转换为json格式
	//2.1--防止获取到的是一个undefined所以在获取的时候进行判断 若果没有值，就给一个空的数组
	var str=window.localStorage.getItem(KEY)||"[]";
	return JSON.parse(str);
}
//3.定义数据的设置方法：---设置数据需要I先获取本地数据 再将当前需要设置的数据添加到本地数据的json对象当中
export function setItem(val){//---3.0需要有传入需要存储的参数
	//3.1获取数据---
	var str=window.localStorage.getItem(KEY)||"[]";
	//3.2将数据转为json数据--、
	var data=JSON.parse(str);
	//3.3将添加的值传入数组中
	data.push(val);
	//3.4将新的数组对象进行转化为字符串并添加到本地存储当中--JSON.stringify(arr);
	window.localStorage.setItem(KEY,JSON.stringify(data));
}
//4.定义删除数据方法：直接通过key值进行数据的删除
export function removeItem(id){//接收id根据id删除全部的同id的数据
	var data=getItem();
	for(var i =0 ;i<data.length;i++){
		if(data[i].shopid==id){
			data.splice(i,1);
		}
	}
	window.localStorage.setItem(KEY,JSON.stringify(data));
}
//5.根据类型对本地数据进行增删：---组件的增删
export function autoComputed(config){
	var data=getItem();
	var counte=1;//点击增加或者减少只能一个数值进行改变
	if(config.type=="add"){//将数据进行添加
		data.push({"shopid":config.shopId,"count":counte});
	}else{
		console.log("点击了减小");
		for (var i = 0; i<data.length;i++){//判断相同id下面的值的变化来删除数据
			if(data[i].shopid==config.shopId){
				console.log(data[i].count);
				if(data[i].count==1){
					data.splice(i,1);
					break;
				}else{//如果么有break跳出就会出现问题---
					data[i].count=data[i].count-1;
					break;
				}
			}
		}
		
	}
	window.localStorage.setItem(KEY,JSON.stringify(data));
}