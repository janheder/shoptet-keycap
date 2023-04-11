const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const sassGlob = require('gulp-sass-glob');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const postcss = require('gulp-postcss');
const autoprefixer= require('autoprefixer');


//compile scss into css
function style() {
    var processors = [ autoprefixer()];
    return gulp.src('./src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concat('style.min.css'))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
}


//compile js
function scripts() {
    return gulp.src('./src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify({mangle: false}))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
}



function watch() {
    browserSync.init({
        port: 8080,
        server: {
           baseDir: "./dist/"
        }
    });
    gulp.watch('./src/scss/**/*.scss', style)
    gulp.watch('./src/js/**/*.js', scripts)
    gulp.watch('./dist/**/*.html').on('change',browserSync.reload);
    gulp.watch('./dist/js/**/*.js').on('change', browserSync.reload);
}


exports.style = style;
exports.scripts = scripts;
exports.watch = watch;