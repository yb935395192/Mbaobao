$(function(){	
//加载头部
$(".containerH").load("http://localhost/Mbaobao/data/commonheader.html header",function(){
	userexit();
	iflogin();
});
$(".logo").load("http://localhost/Mbaobao/data/commonheader.html .logo"); 
$(".containerM").load("http://localhost/Mbaobao/data/commonheader.html .containerM",function(){
	twoMenu();
});

//加载尾部
$(".subscribe").load("http://localhost/Mbaobao/data/commonheader.html .subscribe"); 
$(".feature").load("http://localhost/Mbaobao/data/commonheader.html .feature"); 
$(".containerF").load("http://localhost/Mbaobao/data/commonheader.html footer"); 
$(".fb_side").load("http://localhost/Mbaobao/data/commonheader.html .fb_side",function(){
	gotop();
});

//
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



//选项卡切换
function menucard(){
	var aMenuCard = $(".card_list").children();
	var aCoverCardBorder = $(".coverCardBorder");
	for(let i = 0 ; i < aMenuCard.length ; i++){
		aMenuCard.eq(i).click(function(){
			for(let j = 0 ; j < aMenuCard.length ; j++){
				$(aMenuCard[j]).removeClass("status_on");
				$(aCoverCardBorder[j]).removeClass("open_cover");
			}
			$(this).addClass("status_on");
			$(aCoverCardBorder[i]).addClass("coverCardBorder open_cover");
		})
		aMenuCard.eq(0).click(function(){
			$(".gooddetail").css("display","block");
			$(".info_img").css("display","block");
			$(".evaluation").css("display","none");
			$(".detail_ensure").css("display","none");
		})
		aMenuCard.eq(1).click(function(){
			$(".gooddetail").css("display","none");
			$(".info_img").css("display","none");
			$(".evaluation").css("display","block");
			$(".detail_ensure").css("display","none");
		})
		aMenuCard.eq(2).click(function(){
			$(".gooddetail").css("display","none");
			$(".info_img").css("display","none");
			$(".evaluation").css("display","none");
			$(".detail_ensure").css("display","block");
		})
	}
}

menucard();

//放大镜
//鼠标滑过图片显示在主窗口
function magnifier(){
	var index = 0;
	var aSimglist = $(".simglist").children();
	for(let i = 0 ; i < aSimglist.length ; i++){
		aSimglist.eq(i).mouseover(function(){
			for(var j = 0 ; j < aSimglist.length ; j++){
				aSimglist.eq(j).removeClass("active");
			}
			aSimglist.eq(i).addClass("active");
			$(".Big_img").css({
				background:"url(images/good1/0"+ (i + 1) +".jpg) no-repeat",
				backgroundSize: "480px 480px"
			})
			index = i;
		})
	}
	$(".Big_img").mouseover(function(){
		$(".position_box").css("display","block");
		$(".big_box").css("display","block");
	})
	$(".Big_img").mouseout(function(){
		$(".position_box").css("display","none")
		$(".big_box").css("display","none");
	})
	$(".Big_img").mousemove(function(e){
		var sImg = "";
		sImg = '<img src="images/good1/0'+ (index + 1) +'.jpg">';
		$(".big_box_all").html(sImg);
		var mouseX = e.pageX;
		var mouseY = e.pageY;
		var left = mouseX - $(".Big_img").offset().left - $(".position_box").width() / 2;
		var top = mouseY - $(".Big_img").offset().top - $(".position_box").height() / 2
		left = left <= 0 ? 0 : left;
		top = top <= 0 ? 0  :top;
		if(left >= $(".Big_img").width() - $(".position_box").width()){
			left = $(".Big_img").width() - $(".position_box").width();
		}
		if(top >= $(".Big_img").height() - $(".position_box").height()){
			top = $(".Big_img").height() - $(".position_box").height();
		}
		var leftProprtion = left / ($(".Big_img").width() - $(".position_box").width());

		var topProprtion = top / ($(".Big_img").height() - $(".position_box").height());

		$(".big_box_all").css({
			left: -($(".big_box_all").width() - $(".big_box").width())* leftProprtion,
			top : -($(".big_box_all").height() - $(".big_box").height()) * topProprtion
		})
		
		$(".position_box").css({
			left : left,
			top : top
		})
		
	})
}
magnifier()



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



//判断是否登录
function iflogin(){
	var users = $.cookie("loginedUsers") ? $.cookie("loginedUsers") : "";
	if(users != ""){
		$(".user_name").css("display","block");
		$(".user_exit").css("display","block");
		$(".user").css("display","none");
		$(".user_name a").append(users)
	}
	console.log(users)
	
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


})

