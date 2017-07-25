$(function(){	
	
	
loadCart();
//轮播图
function slider(){
	this.oList = document.getElementById("list_pic");
	this.aLi = this.oList.children;
	this.oBtnR = document.getElementById("btnR");
	this.oBtnL = document.getElementById("btnL");
	this.oPoint = document.getElementsByClassName("point");
	this.aSpan = this.oPoint[0].children;
	this.index = 0;
	this.timer = null;
	this.init();
}
slider.prototype.init = function(){
	var that = this;
	this.oBtnR.onclick = function(){
		that.btnRclick();
	}
	this.oBtnL.onclick = function(){
		that.btnLclick();
	}
	this.oBtnR.onmouseover = function(){
		that.btnMouseover();
	}
	this.oBtnL.onmouseover = function(){
		that.btnMouseover();
	}
	this.oBtnR.onmouseout = function(){
		that.btnMouseout();
	}
	this.oBtnL.onmouseout = function(){
		that.btnMouseout();
	}
	for(var i = 0 ; i < this.aLi.length ; i++){
		this.aLi[i].style.background = "url(images/1920-440-"+ i +".jpg) 50% 0 no-repeat";
	}
	this.timer = setInterval(this.oBtnR.onclick,3000);
	this.follow();
}
slider.prototype.btnMouseover = function(){
	clearInterval(this.timer);
}
slider.prototype.btnMouseout = function(){
	clearInterval(this.timer);
	this.timer = setInterval(this.oBtnR.onclick,3000);
}
slider.prototype.btnRclick = function(){
	if(this.index == this.aLi.length - 1){
		this.index = 0;
	}else{
		this.index ++;
	}
	this.banner();
}

slider.prototype.btnLclick = function(){
	if(this.index == 0){
		this.index = this.aLi.length - 1;
	}else{
		this.index--;
	}
	this.banner();
}
slider.prototype.banner = function(){
	for(var i = 0 ; i < this.aLi.length ; i++){
		this.aLi[i].className = "";
		this.aLi[i].style.opacity = "0.2";
		this.aSpan[i].className = "";
	}
	this.aLi[this.index].className = "active";
	this.aSpan[this.index].className = "active";
	move(this.aLi[this.index],{opacity:100});
}
slider.prototype.follow = function(index){
	var that = this;
	for(i = 0; i < this.aSpan.length ; i++){
		this.aSpan[i].onclick = (function(n){
			return function(){
				that.index = n;
				that.banner();
			}
		})(i)
	}
}
new slider();


//楼梯自动小轮播图
function showSlider(list,sort,num){
	var oList = document.getElementById(list);
	var aBannerImage = oList.children;
	var aSpan = document.querySelector(sort).children;
	var index = 0;
	var timer = null;
	oList.style.width = aBannerImage[0].offsetWidth * aBannerImage.length +"px";
	for(let i = 0 ; i < aBannerImage.length ; i++){
		aBannerImage[i].style.background = "url(images/952-440-" + num + i + ".jpg) no-repeat";
	}
	function sTimer(){
		clearInterval(timer);
		timer = setInterval(function(){
			if(index == aBannerImage.length - 1){
				index = 0;
			}else{
				index ++;
			}
			banner(index);
		},4500);
	}
	sTimer();
	for(let i = 0 ; i < aSpan.length ; i++){
		aSpan[i].onclick = function(){
			clearInterval(timer);
			n = i;
			banner(n);
			setTimeout(function(){
				sTimer();
			},1000)
		}
	}
	function banner(indexA){
		for(var i = 0 ; i < aSpan.length; i++){
			aSpan[i].className = "";
		}
		index = indexA;
		aSpan[index].className = "active";
		move(oList,{marginLeft:-index * aBannerImage[0].offsetWidth});	
	}
}
showSlider("f_list_1f",".f_list_sort_1f",1);
showSlider("f_list_2f",".f_list_sort_2f",2);
showSlider("f_list_3f",".f_list_sort_3f",3);
showSlider("f_list_4f",".f_list_sort_4f",4);
showSlider("f_list_5f",".f_list_sort_5f",5);



//商品分类二级菜单

function twoMenu(){
	var aWords = $(".cata_hot_words");
	var aGroup = $(".cata_group");
	var aSub = $(".cata_sub");
	var aCover = $(".coverBorder");

	for(let i = 0 ; i < aGroup.length ; i++){
		$(aGroup[i]).mouseover(function(){
			$(this).css({
				boxShadow : "0 0 13px #666",
				position : "relative",
				zIndex : "9999"
			})
        	$(aSub[i]).css({
        		display : "block"
        	})
        	$(aWords[i]).css({
        		borderBottom : "none"
        	})
        	$(aCover[i]).css({
        		display : "block"
        	})
		})
		$(aGroup[i]).mouseout(function(){
			$(this).css({
				boxShadow : "",
				position : "",
				zIndex : ""
			})
    		$(aSub[i]).css({
    			display : "none"
    		})
    		$(aWords[i]).css({
    			borderBottom : "1px solid #e5e5e5"
    		})
    		$(aCover[i]).css({
    			display : "none"
    		})
		})
	}
}
twoMenu();



//右侧快捷键
function gotop(){
	$topLi = $("#gotop");
	$(window).scroll(function(){
		if($(window).scrollTop() > 1030){
			$topLi.css({
				visibility: "visible"
			})
		}
		if($(window).scrollTop() <= 1030){
			$topLi.css({
				visibility: "hidden"
			})
		}
	});
	$topLi.click(function(){
		$(window).scrollTop(0);
	})
	
}
gotop();


////拼接主页商品列表
function goodsList(){
	var aGoodList = $(".mod_list");
	$.getJSON("data/goods.json",function(response,status,xhr){
		for(var i = 0 ; i < response.length ; i++){
		    var _good = response[i].obj;
		 	for(var j = 0 ; j < _good.length ; j++){
		 		var html = "";
		 		html+= '<li class="mod_item"><a class="pic" href="M_detail.html"><img src=" '+ _good[j].img + '"></a><div class="info"><span class="title"><a href="javascript:;" data-good-id="' + _good[j].id + '" >'+ _good[j].title +'</a></span><span class="price">￥' + _good[j].price + '<s>￥' + _good[j].original + '</s></span></div></li>';
		 		$(aGoodList[i]).append(html);
		 	}
		}
			
		for(let i = 0 ; i < $(".mod_item .info a").length ; i++){
			$(".mod_item .info a").eq(i).click(function(){
	 			var str = $(this).attr("data-good-id")
	 			$.cookie("dataId",str);
	 			window.location.href = "M_detail.html"
			})
		}
	})

}
goodsList();


//主页楼梯快速到达
function liftMenu(){
	var $liftNav = $(".menu_lift");
	var aliftLi = $liftNav.children().children();
	var afloor = $(".floor_1f");
	var aliftBg = aliftLi.children();
	$(window).scroll(function(){
		if($(window).scrollTop() > 650){
			$liftNav.css({
				display:"block"
			})
		}
		if($(window).scrollTop() <= 650){
			$liftNav.css({
				display:"none"
			})
		}
	})
	for(let i = 0 ; i < aliftLi.length ; i++){
		$(aliftLi[i]).click(function(){
			var str = afloor.eq(i).offset().top
			$(window).scrollTop(str);
		})
	}
}
liftMenu();

//判断是否登录
function iflogin(){
	var users = $.cookie("loginedUsers") ? $.cookie("loginedUsers") : "";
	if(users != ""){
		$(".user_name").css("display","block");
		$(".user_exit").css("display","block");
		$(".user").css("display","none");
		$(".user_name a").append(users)
	}
	
	
	//将字符串转为对象
	function convertStrToObj(str){
		if(!str){ //如果是空字符串
			return {}; //返回空对象
		}
		var users = str.split(":");
		var obj = {};
		for(var i = 0; i < users.length; i ++){
			var userData = users[i].split(",");
			obj[userData[0]] = userData[1];
		}
		return obj;
	}
	
	//将对象转为字符串
	function convertObjToStr(obj){
		var str = "";
		//遍历对象
		for(var usn in obj){
			var pwd = obj[usn];
			if(str){
				str += ":";
			}
			str += usn + ',' + pwd;
		}
		return str;
	}
}
iflogin();

//用户退出
function userexit(){
	$(".user_exit").click(function(){
		$.cookie("loginedUsers",null,{expires:-1 , path:"/"});
		$(".user_name").css("display","none");
		$(".user_exit").css("display","none");
		$(".user").css("display","block");
	})
}
userexit();


//页面加载购物车
function loadCart(){
	var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
	var cartObj = convertCartStrToObj(cartStr);
	//获取到购物车中所有商品的数量
	var total = 0;
	for(var id in cartObj){
		total += cartObj[id].num;
	}
	$(".mycart b").html(total);
}




function convertCartStrToObj(cartStr) {
	if(!cartStr) {
		return {};
	}
	var goods = cartStr.split(":");
	var obj = {};
	for(var i = 0; i < goods.length; i++) {
		var data = goods[i].split(",");
		obj[data[0]] = {
			name: data[1],
			price: parseFloat(data[2]),
			num: parseInt(data[3]),
			src: data[4]
		}
	}
	return obj;
}


function convertObjToCartStr(obj) {
	var cartStr = "";
	for(var id in obj) {
		if(cartStr) {
			cartStr += ":";
		}
		cartStr += id + "," + obj[id].name + "," + obj[id].price + "," + obj[id].num + "," + obj[id].src;
	}
	return cartStr;
}

})
