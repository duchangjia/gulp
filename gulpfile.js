'use strict'
// 1、LESS编译 压缩 合并
// 2、js合并 压缩 混淆
// 3、img复制
// 4、html压缩
var gulp=require('gulp')
var less=require('gulp-less')
var cssnano=require('cssnano');
//1、LESS编译 压缩 --合并并没有必要，一般预处理css都可以导包
gulp.task('style',function(){
	//这里执行style任务时自动执行
	gulp.src(['src/styles/*.less','!src/styles/_*.less'])
	.pipe(less())//编译成css
	.pipe(cssnano())//压缩
	.pipe(gulp.dest('dist/styles'))//合并
	.pipe(browserSync.reload({
      stream: true
    }));
})

var concat=require('gulp-concat');
var uglify=require('gulp-uglify')
//2、JS合并 压缩 混淆
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/scripts'))
	 .pipe(browserSync.reload({
      stream: true
    }));

})
//3.图片复制
gulp.task('image',function(){
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/image'))
	 .pipe(browserSync.reload({
      stream: true
    }));
})

var htmlmin=require('gulp-htmlmin')
//html
gulp.task('html',function(){
	gulp.src('src/*.html')
	.pipe(htmlmin({
		collapseWhitespace:true,
		removeComments:true
	}))
	.pipe(gulp.dest('dist'))
	 .pipe(browserSync.reload({
      stream: true
    }));
})

// var browserSync=require('browser-sync');

// gulp.task('serve',function(){
// 	browserSync({
// 		server:{
// 			baseDir:['dist']
// 		},
// 	},function(err,bs){
// 		console.log(bs.options.getIn(["url","local"]))
// 	})

//})
var browserSync=require('browser-sync');
gulp.task('serve',function(){
	browserSync({
	server:{
      baseDir: ['dist']//设置根目录
    },
	}, function(err, bs) {
	    console.log(bs.options.getIn(["urls", "local"]));
	});

	gulp.watch('src/styles/*.less',['style']);//监听改变
	gulp.watch('src/scripts/*.js',['script'])
	gulp.watch('src/image/*.*',['image'])
	gulp.watch('src/html/*.html',['html'])
})