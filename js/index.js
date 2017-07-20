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
	var aWords = document.getElementsByClassName("cata_hot_words");
	var aGroup = document.getElementsByClassName("cata_group");
	var aSub = document.getElementsByClassName("cata_sub");
	var aCover = document.getElementsByClassName("coverBorder");

	for(let i = 0 ; i < aGroup.length ; i++){
		
		aGroup[i].onmouseover = function(){
			this.style.boxShadow = "0 0 13px #666"
			this.style.position = "relative";
        	this.style.zIndex = "9999";
        	aSub[i].style.display = "block";
        	aWords[i].style.borderBottom = "none";
        	aCover[i].style.display = "block";
        	
		}
		aGroup[i].onmouseout = function(){
			this.style.boxShadow = ""
			this.style.position = "";
    		this.style.zIndex = "";
    		aSub[i].style.display = "none";
    		aWords[i].style.borderBottom = "1px solid #e5e5e5";
    		aCover[i].style.display = "none";
			
		}
	}
}
twoMenu();
