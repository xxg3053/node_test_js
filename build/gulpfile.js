//构建JS
var static_dir = '../static';

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

var src_dir = static_dir + '/js_src/*.js';
var to_dir = static_dir + '/js';
gulp.task('js', function() {
        gulp.src(src_dir)
            .pipe(browserify()) //是浏览器支持node
            .pipe(uglify())     //压缩js
            .pipe(gulp.dest(to_dir)); //位置
});


//构建css

var minifyCSS = require('gulp-minify-css');
var importCss = require('gulp-import-css');
var rename = require('gulp-rename');
var css_src_dir = static_dir + '/css/page/*.css';
var css_to_dir = static_dir + '/css/min';
gulp.task('css', function () {
    gulp.src(css_src_dir)
        .pipe(importCss())
        .pipe(minifyCSS())
        // .pipe(rename(function(path){
        //     path.dirname = path.dirname.replace('page', 'min');
        // }))
        .pipe(gulp.dest(css_to_dir));
});

var t1 = 0;
var t2 = 0;
gulp.task('watch', function () {
    gulp.watch(static_dir + '/js_src/**/*.js', function(event){
        if(event.type == 'added' || event.type == 'changed' || event.type == 'deleted'){//added, changed or deleted
            if(t1){
                clearTimeout(t1);
            }
            t1 = setTimeout(function(){
                gulp.start('js');
            }, 1000);
        }
    });

    gulp.watch(static_dir + '/css/**/*.css', function(event){
        if(event.path.indexOf('/min/') !== -1){
            return;
        }
        if(event.type == 'added' || event.type == 'changed' || event.type == 'deleted'){//added, changed or deleted
            if(t2){
                clearTimeout(t2);
            }
            t2 = setTimeout(function(){
                gulp.start('css');
            }, 1000);
        }
    });

});

gulp.task('default', ['watch']);