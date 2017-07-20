var gulp = require("gulp");//将任务所需要的gulp导入
var sass = require("gulp-sass");//将所需要的插件导入

//发布任务(gulp.task())(建立任务),第一个参数：表示发布的任务名称，第二个参数  回调函数（对任务的描述）
gulp.task("styles",function(){
	return gulp.src("sass/test.scss")//src:指定编译的scss文件
	.pipe(sass({style:"expanded"}))//调用sass模式
	.pipe(gulp.dest("css"));//dest:编译后css文件的路径（目标路径）
})
//发布任务（监听）
gulp.task("watch",function(){
	gulp.watch("sass/test.scss",["styles"]);
	//第一个参数:监听那个文件,第二个参数：监听哪个任务
})
