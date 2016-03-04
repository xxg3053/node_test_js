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

var t1 = 0;
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
});

gulp.task('default', ['watch','js']);