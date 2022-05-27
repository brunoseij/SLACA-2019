const gulp = require('gulp')
const webserver = require('gulp-webserver')
const watch = require('gulp-watch')

function monitorarArquivos(cb){
    watch('src/**/**.html', () => gulp.series('appHtml')()) // monitora qualquer mudança em qualquer html do src e chama a task referente
    watch('src/**/*.css', () => gulp.series('appCSS')())
    watch('src/**/*.js', () => gulp.series('appJS')())
    watch('src/assets/Imgs/**/*.*', () => gulp.series('appImg')())
    return cb()
}

function servidor(){
    return gulp.src('build')
        .pipe(webserver({
            port:8080,
            open:true,
            livereload:true
        }))
}

module.exports = {
    monitorarArquivos,
    servidor
}
