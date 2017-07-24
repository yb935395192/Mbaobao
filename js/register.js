$(function(){	

$(".containerH").load("http://localhost/Mbaobao/data/commonheader.html header");
$(".logo").load("http://localhost/Mbaobao/data/commonheader.html .logo"); 
$(".containerM").load("http://localhost/Mbaobao/data/commonheader.html .containerM",function(){
	twoMenu();
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
