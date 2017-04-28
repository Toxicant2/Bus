var yargs = require('yargs').argv;
var PORT = 3000;
var connect = require('connect');
var serveStatic = require('serve-static');
var http = require('http');
var url=require('url');
var fs=require('fs');
var path=require('path');

var gulp = require('gulp');
var less = require('gulp-less');
var header = require('gulp-header');
var minify = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var webpackTask = require('webpack-stream');
var webpack = require('webpack');

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var ProvidePlugin = webpack.ProvidePlugin;
var option = {base: 'src'}; //基准目录从src目录开始
var dist = __dirname + '/dist';

gulp.task("default", ['release'], function() {
    //执行默认任务之前，你需要执行release任务（完成部署操作）
    if (yargs.s) {
        gulp.start('server');
    }

    if (yargs.w) {
        gulp.start('watch');
    }
    gulp.run('autoUpdateSource');
});

gulp.task("transformLess", function() {
    //gulp.src("src/style/**/*.less")//找到关于所有less的发源地
    //.pipe(less())//把所有less文件转化css文件
    //.pipe(gulp.dest(dist));
    //如果说你直接这么执行，会在dist目录下发现这样的文件结果：
     /*dist
        home
            header.css*/

    gulp.src("src/style/**/*.less", option)//找到关于所有less的发源地
    .pipe(less())//把所有less文件转化css文件
    .pipe(autoprefixer()) //自动匹配前缀操作
    .pipe(gulp.dest(dist))
    .pipe(concat('index_all.min.css'))
    .pipe(minify())//压缩css操作
    .pipe(gulp.dest(dist+'/style'))
    .pipe(browserSync.reload({stream: true})); //自动进行同步操作
     /*dist
        style
            home
                header.css*/

});
gulp.task("release",['cleanTask'], function(){
    //发布、部署操作 --》 就是要把src里面的内容全部转移到dist里去
    gulp.run('html');
    gulp.run('transformLess');
    gulp.run('img');
    gulp.run('js');
})
gulp.task("styles", function(){
    //样式的发布任务

})

gulp.task("html", function(){
    gulp.src("src/*.html") //找到src下所有的html的发源地
    .pipe(minifyHtml()) //进行html压缩工作，目的在于加速传输速度
    .pipe(gulp.dest(dist))
    .pipe(browserSync.reload({stream: true}));//当监听到html文件变化的时候，执行同步更新操作
})
gulp.task("img", function(){
    gulp.src("src/img/**/*", option).pipe(gulp.dest(dist))       
})

gulp.task("js", function(){
    gulp.src("src/js/**/*", option)
    .pipe(uglify())
    .pipe(gulp.dest(dist))       
})
//自动更新资源文件，比如js/less
gulp.task('autoUpdateSource', function(){
    //单独的监听所有与less相关的文件，做到对less转成css的工作
    gulp.watch("src/style/**/*.less", ['transformLess'])
    //单独的监听所有与html相关的文件，若改变，执行html任务
    gulp.watch("src/*.html", ['html'], function(){
        
       
    });
});

gulp.task('cleanTask', function(){
    return gulp.src(dist).pipe(clean());
});

gulp.task('server',['webpack'],function () {
    yargs.p = yargs.p || 8080;
    browserSync.init({
        server: {
            baseDir: "./dist" //--> localhost:8080/
        },
        port: yargs.p,
        startPath: './'
    });
});

var config_webpack_obj = {
    watch: true,
    //上下文
    context: __dirname + '/src',
    entry: {
        app: __dirname + '/src/js/test.js'
    },
    output: {
        filename: '[name].js',
    },
    plugins: [
        //公用模块
        new CommonsChunkPlugin('common.js',['app']),
        //设置此处，则在JS中不用类似require('./base')引入基础模块， 只要直接使用Base变量即可
        //此处通常可用做，对常用组件，库的提前设置
        new ProvidePlugin({
            $: __dirname + '/jslib/jquery/jquery.js' //从文件中获取
        })
    ],
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.hbs/,
            loader: "handlebars-loader?helperDirs[]=" + __dirname + "/helpers"
        }]
    }
};

var config_webpack_Obj_file = {
    watch: true,//实时监听与入口js相关的js文件变化
    context: __dirname,
    entry: { //开发环境下的入口js是在哪里
        app: __dirname + '/js/app.js'
    },
    output: {
        filename: '[name].js',
    }
}

var config_webpack_Obj_amd = {
    watch: true,//实时监听与入口js相关的js文件变化
    entry: { //开发环境下的入口js是在哪里
        app_amd: __dirname + '/amdjs/app_amd.js'
    },
    output: {
        filename: '[name].js',
    }
}
gulp.task("webpack", function(){
    //console.log(console.log(path.join(__dirname, '/node_modules/handlebars-helpers/index.js'), path));
    gulp.src('js/app.js')
    .pipe(webpackTask(config_webpack_Obj_file))
    .pipe(gulp.dest(dist))
});


gulp.task("webpack_amd", function(){
    //console.log(console.log(path.join(__dirname, '/node_modules/handlebars-helpers/index.js'), path));
    gulp.src('amdjs/app_amd.js')
    .pipe(webpackTask(config_webpack_Obj_amd))
    .pipe(gulp.dest(dist))
});

gulp.task('loc_server', function(){
    connect().use(serveStatic(__dirname)).listen(8880, function(){
        console.log('Server running on 8880...');
    });
})