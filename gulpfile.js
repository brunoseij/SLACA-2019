const { series, parallel } = require('gulp')
const gulp = require('gulp')
const { appCSS, appHtml, appJS, appImg } = require('./gulpTasks/app')
const { monitorarArquivos, servidor } = require('./gulpTasks/servidor')


module.exports.default = series(
    parallel(
        series(appCSS, appHtml, appJS, appImg)
    ),
    servidor,
    monitorarArquivos
)
