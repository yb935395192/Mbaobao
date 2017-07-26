$(function(){	
//加载头部
$(".containerH").load("http://localhost/Mbaobao/data/commonheader.html header",function(){
	userexit();
	iflogin();
	loadCart();
	//页面加载购物车
	function loadCart(){
		var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
		var cartObj = convertCartStrToObj(cartStr);
		if(!cartStr){
			$("#cart p").css("display","block");
			$(".goodsInCart").css("display","none");
			$(".InCartList").css("display","none");
			$(".mycart b").html("0");
		}else{
			$("#cart p").css("display","none");
			$(".goodsInCart").css("display","block");
			$(".InCartList").css("display","block");
			var InCartnum = 0;
			for(var id in cartObj){
				InCartnum += cartObj[id].num;
				var InCart = cartObj[id];
				var str = '<ul class="gIC_ul" data-good-id="'+ id  +'"><li class="gIC_pic"><a href="M_detail.html"><img src="'+ InCart.src +'" alt="" /></a></li><li class="gIC_name"><a href="M_detail.html">'+ InCart.name +'</a></li><li class="gIC_num">'+ InCart.num +'</li><li class="gIC_price">¥ ' + InCart.price + '</li><li class="gIC_remove"><a class="gIC_remove_a" href="javascript:;">[删除]</a></li></ul>';
				$(".goodsInCart").append(str);		
			}
			$(".mycart b").html(InCartnum);
			
			function shoppinglist(){
				var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
				var cartObj = convertCartStrToObj(cartStr);
				var totalprice = 0;
				var totalnum = 0;
				var id = 0;
				for(let j = 0 ; j < $(".gIC_ul").length; j++){
					id = $(".gIC_ul").eq(j).attr("data-good-id");
					totalprice += (cartObj[id].num * cartObj[id].price);
					totalnum += cartObj[id].num;
				}
				$(".ICL_num").html(totalnum);
				$(".ICL_total").html("<f>¥</f>" + totalprice)
			}
			shoppinglist();
			
			//删除按钮
			$(".gIC_remove_a").click(function(){
				var id = $(this).parents(".gIC_ul").remove().attr("data-good-id");
				var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
				var cartObj = convertCartStrToObj(cartStr);
				delete cartObj[id];
				$.cookie('cart', convertObjToCartStr(cartObj), {expires: 7,path: "/"});
				shoppinglist();
				reloadCart();
			})
		}
	}
	
	function reloadCart(){
		var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
			var cartObj = convertCartStrToObj(cartStr);
			//获取到购物车中所有商品的数量
			var InCartnum = 0;
			for(var id in cartObj){
				InCartnum += cartObj[id].num;
			}
			$(".mycart b").html(InCartnum);
			if(!cartStr){
				$("#cart p").css("display","block");
				$(".goodsInCart").css("display","none");
				$(".InCartList").css("display","none");
				$(".mycart b").html("0");
			}
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
});
$(".logo").load("http://localhost/Mbaobao/data/commonheader.html .logo"); 
$(".containerM").load("http://localhost/Mbaobao/data/commonheader.html .containerM",function(){
	twoMenu();
	$(".nav_row").children().eq(0).children().eq(0).removeClass("defaultN");
	$(".nav_row").children().eq(1).children().eq(0).addClass("defaultN");
});

//加载尾部
$(".subscribe").load("http://localhost/Mbaobao/data/commonheader.html .subscribe"); 
$(".feature").load("http://localhost/Mbaobao/data/commonheader.html .feature"); 
$(".containerF").load("http://localhost/Mbaobao/data/commonheader.html footer"); 
$(".fb_side").load("http://localhost/Mbaobao/data/commonheader.html .fb_side",function(){
	gotop();
});

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



//判断是否登录
function iflogin(){
	var users = $.cookie("loginedUsers") ? $.cookie("loginedUsers") : "";
	if(users != ""){
		$(".user_name").css("display","block");
		$(".user_exit").css("display","block");
		$(".user").css("display","none");
		$(".user_name a").append(users);
		$(".viplogin").css("display","none");
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


//用户退出
function userexit(){
	$(".user_exit").click(function(){
		$.cookie("loginedUsers",null,{expires:-1 , path:"/"});
		$(".user_name").css("display","none");
		$(".user_exit").css("display","none");
		$(".user").css("display","block");
		window.location.href = "M_index.html"
	})
}


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
		this.aLi[i].style.background = "url(images/active/1600-425-0"+ i +".jpg) 50% 0 no-repeat";
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


//第二个轮播图
function slider2(){
	this.oList = document.getElementById("list_pic2");
	this.aLi = this.oList.children;
	this.oBtnR = document.getElementById("btnR2");
	this.oBtnL = document.getElementById("btnL2");
	this.oPoint = document.getElementsByClassName("point2");
	this.aSpan = this.oPoint[0].children;
	this.index = 0;
	this.timer = null;
	this.init();
}
slider2.prototype.init = function(){
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
		this.aLi[i].style.background = "url(images/active/b"+ i +".jpg) 50% 0 no-repeat";
	}
	this.timer = setInterval(this.oBtnR.onclick,3000);
	this.follow();
}
slider2.prototype.btnMouseover = function(){
	clearInterval(this.timer);
}
slider2.prototype.btnMouseout = function(){
	clearInterval(this.timer);
	this.timer = setInterval(this.oBtnR.onclick,3000);
}
slider2.prototype.btnRclick = function(){
	if(this.index == this.aLi.length - 1){
		this.index = 0;
	}else{
		this.index ++;
	}
	this.banner();
}

slider2.prototype.btnLclick = function(){
	if(this.index == 0){
		this.index = this.aLi.length - 1;
	}else{
		this.index--;
	}
	this.banner();
}
slider2.prototype.banner = function(){
	for(var i = 0 ; i < this.aLi.length ; i++){
		this.aLi[i].className = "";
		this.aLi[i].style.opacity = "0.2";
		this.aSpan[i].className = "";
	}
	this.aLi[this.index].className = "active2";
	this.aSpan[this.index].className = "active2";
	move(this.aLi[this.index],{opacity:100});
}
slider2.prototype.follow = function(index){
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
new slider2();

//第二个轮播图
function slider3(){
	this.oList = document.getElementById("list_pic3");
	this.aLi = this.oList.children;
	this.oBtnR = document.getElementById("btnR3");
	this.oBtnL = document.getElementById("btnL3");
	this.oPoint = document.getElementsByClassName("point3");
	this.aSpan = this.oPoint[0].children;
	this.index = 0;
	this.timer = null;
	this.init();
}
slider3.prototype.init = function(){
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
		this.aLi[i].style.background = "url(images/active/c"+ i +".jpg) 50% 0 no-repeat";
	}
	this.timer = setInterval(this.oBtnR.onclick,3000);
	this.follow();
}
slider3.prototype.btnMouseover = function(){
	clearInterval(this.timer);
}
slider3.prototype.btnMouseout = function(){
	clearInterval(this.timer);
	this.timer = setInterval(this.oBtnR.onclick,3000);
}
slider3.prototype.btnRclick = function(){
	if(this.index == this.aLi.length - 1){
		this.index = 0;
	}else{
		this.index ++;
	}
	this.banner();
}

slider3.prototype.btnLclick = function(){
	if(this.index == 0){
		this.index = this.aLi.length - 1;
	}else{
		this.index--;
	}
	this.banner();
}
slider3.prototype.banner = function(){
	for(var i = 0 ; i < this.aLi.length ; i++){
		this.aLi[i].className = "";
		this.aLi[i].style.opacity = "0.2";
		this.aSpan[i].className = "";
	}
	this.aLi[this.index].className = "active3";
	this.aSpan[this.index].className = "active3";
	move(this.aLi[this.index],{opacity:100});
}
slider3.prototype.follow = function(index){
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
new slider3();

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



})