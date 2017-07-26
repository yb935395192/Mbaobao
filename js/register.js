$(function(){	

$(".containerH").load("http://localhost/Mbaobao/data/commonheader.html header",function(){
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

//表单验证
function validate(){
	var complete =false;
	var isComplete = [false,false,false];
	$(".phone_num").focus(function(){
		$("#tip1").css({
			display:"block"
		});
		$(".error_phone").css("display","none")
		$(".success_phone").css("display","none")
	});
	$(".phone_num").blur(function(){
		$("#tip1").css({
			display:"none"
		});
		var reg = /^1[34578]\d{9}$/;
		var reg1 = /^\s*$/;
		if(reg.test($(".phone_num").val())){
			$(".success_phone").css("display","block")
			isComplete[0] = true;
		}else if(reg1.test($(".phone_num").val())){
			$(".error_phone").css("display","none")
		}else{
			$(".error_phone").css("display","block")
			$(".error_phone").find("p").html("手机号码格式错误，请重新填写");
		}
		console.log(isComplete)
	});	
	$(".pwd_num").focus(function(){
		$("#tip2").css({
			display:"block"
		});
		$(".error_pwd").css("display","none")
		$(".success_pwd").css("display","none")
	});
	$(".pwd_num").blur(function(){
		$("#tip2").css({
			display:"none"
		});
		var reg = /^\S{6,20}$/;
		var reg1 = /^\s*$/;
		if(reg.test($(".pwd_num").val())){
			isComplete[1] = true;
			$(".success_pwd").css("display","block");
		}else if(reg1.test($(".pwd_num").val())){
			$(".error_pwd").css("display","none");
		}else{
			$(".error_pwd").css("display","block");
			$(".error_pwd").find("p").html("格式错误，请使用6-12位字母加数字或符号的组合");
		}
		console.log(isComplete)
	});
	$(".pwd_con_num").focus(function(){
		$("#tip3").css({
			display:"block"
		});
		$(".error_pwd_con").css("display","none");
		$(".success_pwd_con").css("display","none");
	});
	$(".pwd_con_num").blur(function(){
		$("#tip3").css({
			display:"none"
		});
		var reg1 = /^\s*$/;
		if($(".pwd_con_num").val() == $(".pwd_num").val() && $(".pwd_con_num").val() != ""){
			$(".success_pwd_con").css("display","block");
			isComplete[2] = true;
		}else if(reg1.test($(".pwd_con_num").val())){
			$(".error_pwd_con").css("display","none");
		}else{
			$(".error_pwd_con").css("display","block");
			$(".error_pwd_con").find("p").html("两次密码输入不一致，请重新输入");
		}
		console.log(isComplete)
	});
	$(".user_VC_num").focus(function(){
		$("#tip4").css({
			display:"block"
		});
	});
	$(".user_VC_num").blur(function(){
		$("#tip4").css({
			display:"none"
		});
	});
	//点击获取验证码
	$(".send_VC").click(function(){
		$(this).css("display","none");
		$(".VC_sended").css("display","block");
		$(".user_VC_num").css("display","none");
	})
	$(".reg_submit").click(function(){
		for(let i = 0 ; i < isComplete.length ; i++){
			if(isComplete[i] == false){
             	return ;
			}else{
				complete =  true;
			}
		}
		if(complete){
			//获取用户名密码
			var usn = $(".phone_num").val();
			var pwd = $(".pwd_num").val();
			//获取cookie中的用户信息
			var users = $.cookie("registerUsers") ? $.cookie("registerUsers") : "";
			users = convertStrToObj(users);
			if(usn in users){ //判断usn属性是否在users对象中。
				alert("用户名已经被注册");
				return;
			}else{
				users[usn] = pwd;
				userStr = convertObjToStr(users);
				$.cookie("registerUsers",userStr,{expires:7,path:'/'});
				alert("注册成功！");
				window.location.href = "M_login.html"
			}
		}
	})
	//将字符串转为对象
	function convertStrToObj(str){
		if(!str){
			return {};
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
validate();
})
