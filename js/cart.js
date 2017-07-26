$(function(){
	//拼接购物车
	var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
	$("#countsnub").html("0件");
	$("#countprices").html("¥0.00");
	$("#zgprice").html("¥0.00");
	if(!cartStr){
		$(".nogoods").css({
			display: "block"
		});
		$(".selected_good_list").css("display","none");
	}else{
		$(".nogoods").css({
			display: "none"
		});
		$(".selected_good_list").css("display","block");
		var cartObj = convertCartStrToObj(cartStr);
		for(var id in cartObj) {
			var good = cartObj[id];
			var str = '<ul class="goodInfo" data-good-id="' + id + '"><li><a href="M_detail.html"><img src=" '+ good.src + '" alt="" /></a></li><li><p class="good_name"><a href="M_detail.html">' + good.name + '</a></p><p class="good_sku">9132636002</p></li><li><span class="good_price">¥&nbsp;'+ good.price +'</span></li><li><a href="javascript:;" class="minus"></a><input type="text" class="count" value="'+  good.num  +'"><a href="javascript:;" class="plus"></a></li><li><span class="good_total">¥ '+ good.num * good.price + '.00</span></li><li><a href="javascript:;" class="good_remove">删除</a></li></ul>';	
			$(".selected_good_list").append(str);
		}
		//删除按钮
		$(".good_remove").click(function() {
			var id = $(this).parents(".goodInfo").remove().attr("data-good-id");
			var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
			var cartObj = convertCartStrToObj(cartStr);
			delete cartObj[id];
			$.cookie('cart', convertObjToCartStr(cartObj), {expires: 7,path: "/"});
			shoppinglist();
			
		})
		
		
		//给增加按钮添加事件
		for(let i = 0 ; i < $(".plus").length ; i++){
			$(".plus").eq(i).click(function() {
				var id = $(this).parents('.goodInfo').attr("data-good-id");
				var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
				var cartObj = convertCartStrToObj(cartStr);
				if(cartObj[id].num < 5){
					cartObj[id].num += 1;
					$(".count").eq(i).val("" + cartObj[id].num);
					$('.good_total').eq(i).html("¥ " +cartObj[id].num * cartObj[id].price + ".00");
					$.cookie('cart', convertObjToCartStr(cartObj), {expires: 7,path: "/"});
				}
				shoppinglist();
			});
		};
		
		
		//给减按钮添加点击事件
		for(let i = 0 ; i < $(".minus").length ; i++){
			$(".minus").eq(i).click(function(){
				var id = $(this).parents('.goodInfo').attr("data-good-id");
				var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
				var cartObj = convertCartStrToObj(cartStr);
				if(cartObj[id].num > 1){
					cartObj[id].num -= 1;
					$(".count").eq(i).val("" + cartObj[id].num);
					$('.good_total').eq(i).html("¥ "+ cartObj[id].num * cartObj[id].price + ".00");
					$.cookie('cart', convertObjToCartStr(cartObj), {expires: 7,path: "/"});
				}	
				shoppinglist();
			});
		}
		
		
		
		//改数量的input绑定一个blur事件
		for(let i = 0 ; i < $(".count").length ; i++){
			$(".count").eq(i).blur(function(){
				var id = $(this).parents('.goodInfo').attr("data-good-id");
				var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
				var cartObj = convertCartStrToObj(cartStr);
				var pattern = /^\d+$/;
				if(!pattern.test($(this).val())){
					cartObj[id].num = 1;
					$(this).val("1");
				}else{
					cartObj[id].num = parseInt($(this).val());
				}
				$(".count").eq(i).val("" + cartObj[id].num);
				$('.good_total').eq(i).html("¥ "+ cartObj[id].num * cartObj[id].price + ".00");
				$.cookie('cart', convertObjToCartStr(cartObj), {expires: 7,path: "/"});
				shoppinglist();
			})
		}
		
		
		function shoppinglist(){
			var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
			var cartObj = convertCartStrToObj(cartStr);
			var totalprice = 0;
			var totalnum = 0;
			var id = 0;
			for(let j = 0 ; j < $(".goodInfo").length; j++){
				id = $(".goodInfo").eq(j).attr("data-good-id");
				totalprice += (cartObj[id].num * cartObj[id].price);
				totalnum += cartObj[id].num;
			}
			$("#countprices").html("¥"+ totalprice +".00");
			$("#countsnub").html(totalnum + "件");
			$("#zgprice").html("¥"+ totalprice +".00")
		}
		shoppinglist();
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
