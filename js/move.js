function getStyle(attr,DOM){
		if(DOM.currentStyle){
			//IE
			return DOM.currentStyle[attr]
		}else{
			//非IE
			return getComputedStyle(DOM,false)[attr]
		}
}

//move(oBox,{width:300,height:200})


function move(obj,opt,fn){
	
	//DOM; obj

	//target; 目标点;  opt[attr]

	//可能有几个那？ n~~~;

	//attr; 属性名;

	clearTimer();

	obj.timer = {}; //存定时器的!;  一个对象里有很多定时器;

	for(let attr in opt){ //为什么使用闭包; 就是为了关闭定时器;

		//opt[attr];

		obj.timer[attr] = setInterval(function(){

			if(attr == "opacity"){

				var iNow = Math.round(getStyle(attr,obj) * 100)

			}else{

				var iNow = parseInt(getStyle(attr,obj));
			}

			var speed = (opt[attr] - iNow) / 10;

			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			if(iNow == opt[attr]){

				clearInterval(obj.timer[attr]);

				delete obj.timer[attr];

				if(getTimerLength()==0){

					//执行结束；

					//fn ? fn() : "";

					if(fn){

						fn();
					}

				};


			}else{

				if(attr == "opacity"){
					obj.style[attr] = (iNow + speed) / 100;
				}else{
					obj.style[attr] = iNow + speed + "px";
				}

			}

			


		}, 30);

	}

	//console.log(obj.timer);

	function clearTimer(){

		for(var i in obj.timer){

			clearInterval(obj.timer[i]);

		}

	}

	function getTimerLength(){

		var n = 0;
		for(var i in obj.timer){

			n++

		}

		return n;

	}



}