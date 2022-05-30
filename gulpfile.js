const {
    src,
    dest,
    parallel,
    watch,
    series
} = require('gulp'), concat = require('gulp-concat'),
    sass = require('gulp-sass')(require('sass')), pug = require('gulp-pug'), browserSync = require('browser-sync').create()


const FilesPath = {
    sassFiles: 'scss/**/*.scss',
    jsFiles: 'js/**/*.js',
    htmlFiles: 'pug/pages/**/*.pug'
}
const {
    sassFiles,
    jsFiles,
    htmlFiles
} = FilesPath;

// reload

function sassTask() {
    return src(sassFiles).pipe(sass()).pipe(concat('style.css'))
        .pipe(dest('dist/css')).pipe(browserSync.stream());
}


// compile

function htmlTask() {
    return src(htmlFiles).pipe(pug({
            pretty: true
        }))
        .pipe(dest('dist')).pipe(browserSync.stream());
}

// extension

function jsTask() {
    return src(jsFiles).pipe(dest('dist/js'))
}

// copy

function assetsTask() {
    return src('assets/**')
        .pipe(dest('dist/assets'))
}

// support create sever

function serve() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    })
    watch(sassFiles, sassTask);
    watch(jsFiles, jsTask);
    watch(htmlFiles, htmlTask);
}

// 

exports.js = jsTask;
exports.sass = sassTask;
exports.html = htmlTask;
exports.assets = assetsTask;
exports.default = series(parallel(htmlTask, sassTask, jsTask, assetsTask));
exports.serve = series(serve, parallel(htmlTask, sassTask, jsTask, assetsTask))
