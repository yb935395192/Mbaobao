$(function(){
	var reg = /^\s*$/;
	var users = $.cookie("registerUsers") ? $.cookie("registerUsers") : "";
	users = convertStrToObj(users);
	$(".unametext").blur(function(){
		var usn = $(".unametext").val();
		var pwd = $(".upwdtext").val();
		if(reg.test($(".unametext").val())){
			$(".error1").css("display","block");
			$(".error1").html("请填写手机号码或者邮箱");
		}else if(!(usn in users)){
			$(".error2").css("display","block");
			$(".error2").html("用户名不存在");
			$(".error1").css("display","none");
		}else if(usn in users){
			$(".error1").css("display","none");
			$(".error2").css("display","none");
		}
	});
	$(".login_btn").click(function(){
		var usn = $(".unametext").val();
		var pwd = $(".upwdtext").val();
		if(reg.test($(".upwdtext").val())){
			$(".error1").css("display","block");
			$(".error1").html("请输入密码");
		}
		if(users[usn] == pwd){
			$.cookie("loginedUsers",usn,{path:"/"});
			location.href = "M_index.html";
		}else{
			//登录失败
			alert("用户名或密码不正确");
		}
	})
	
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
	
	
})
