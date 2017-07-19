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

function showSlider(){
	var oList = document.getElementById("f_list");
	var aBannerImage = oList.children;
	var aSpan = document.querySelector(".f_list_sort").children;
	var index = 0;
	for(let i = 0 ; i < aBannerImage.length ; i++){
		aBannerImage[i].style.background = "url(images/952-440-1" + i + ".jpg) no-repeat";
	}
	var timer = setInterval(function(){
		if(index == aBannerImage.length - 1){
			index = 0;
		}else{
			index ++;
		}
		for(var i = 0 ; i < aSpan.length; i++){
			aSpan[i].className = "";
		}
		aSpan[index].className = "active";
		move(oList,{marginLeft:-index * aBannerImage[0].offsetWidth});	
	},2000);
}
showSlider();
