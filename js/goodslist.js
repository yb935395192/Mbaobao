$(function(){	
//加载头部
$(".containerH").load("http://localhost/Mbaobao/data/commonheader.html header",function(){
	iflogin();
	userexit();
});
$(".logo").load("http://localhost/Mbaobao/data/commonheader.html .logo"); 
$(".containerM").load("http://localhost/Mbaobao/data/commonheader.html .containerM",function(){
	twoMenu();
	//更改本商品列表页的头部选项卡默认选中
	$(".nav_row").children().eq(0).children().eq(0).removeClass("defaultN");
	$(".nav_row").children().eq(3).children().eq(0).addClass("defaultN");
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


//折叠二级菜单
function foldmenu(){
	var aFoldswitch = $(".l_filter dt");
	var aFolder = $(".l_filter dd")
	for(let i = 0 ; i < aFoldswitch.length ; i++){
		aFoldswitch.eq(i).click(function(){
			$(aFolder[i]).toggle();
		})
	}
}
foldmenu();

//点击二级菜单的某个项   显示在"你的筛选条件中"
function listfilter(){
	var aConditionLi = $(".l_filter dd ul li");
	for(let i = 0 ; i < aConditionLi.length ; i++){
		aConditionLi.eq(i).click(function(){
			$(".search_key ul").append("<li>"+ aConditionLi.eq(i).children().html() +"&nbsp;×</li>")
		})
	}
}
listfilter();

//商品列表分页
function Pagination(showNum){
    this.data = null;
    this.index = 0;
    if(!showNum){
        showNum = 4
    }
    this.showNum = showNum;
    this.init()
}
Pagination.prototype.init = function(){
    //加载数据;
    if(this.data == null){
         this.loadData()//返回值
    }else{
         that.pagination();
    }
}
Pagination.prototype.loadData = function(){
    var that = this;
    $.ajax({
        url:"http://localhost/Mbaobao/data/list.json",
        success:function(res){
            that.data = res;
            that.pagination();
        }
    })
}

Pagination.prototype.pagination = function(){
    var that = this;
    $(".pagination").pagination(Math.ceil(that.data.length / this.showNum),{
        items_per_page:1,
        num_display_entries:5,
        num_edge_entries:1,
        prev_text:"上一页",
        next_text:"下一页",
        callback:function(index){
            that.index = index;
            that.RenderingPag()

        }
    });
}

Pagination.prototype.RenderingPag = function(){
    var html = "";
    for(var i = this.index * this.showNum ; i < (this.index + 1) * this.showNum; i++){
        if( i < this.data.length){
        	html += `<li>
				<a class="minipic" href="#">
					<img src="`+this.data[i].img+`"/>
				</a>
				<div class="color_sel">
					<div class="color_wrap">
						<a href="#"><img src="`+this.data[i].img+`"/></a>
					</div>
				</div>
				<div class="pro_info">
					<a href="#" class="name">`+this.data[i].info+`</a>
					<div class="price">
						<stong class="red price1">¥`+this.data[i].price+`</stong>
						<s class="price1">¥1188</s>
					</div>
				</div>
			</li>` 
        }
    }
    html+= "</ul>"
    $("#list").html(html);
}

new Pagination(60);


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
	})
}


})