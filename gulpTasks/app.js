const gulp = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const htmlmin = require('gulp-htmlmin')
const concat = require('gulp-concat')

function appHtml(){
    return gulp.src('src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('build'))
}

function appCSS(){
    return gulp.src('src/assets/css/style.css')
        .pipe(uglifycss({ 'uglyComments': true }))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('build/assets/css'))
}

function appJS(cb){
    return gulp.src('src/assets/js/**/*.js')
        .pipe(babel({ presets: ['env'] }))
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('build/assets/js'))
}

function appImg(){
    return gulp.src('src/assets/imgs/**/*.*')
        .pipe(gulp.dest('build/assets/imgs'))
}

// para referenciar a task em outro arquivo (servidor.js)
gulp.task('appHtml', appHtml)
gulp.task('appCSS', appCSS)
gulp.task('appJS', appJS)
gulp.task('appImg', appImg)

module.exports = {
    appHtml,
    appImg,
    appJS,
    appCSS
}