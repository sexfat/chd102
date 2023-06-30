const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');

// function 任務
function defaultTask(cb) {
    console.log('gulp ok')
    cb();
}


exports.log = defaultTask


// 檔案搬家任務
function move() {
    return src('index.html').pipe(dest('dist/'))
}

exports.mv = move;



// 任務的順序
function TaskA(cb) {
    console.log('任務A')
    cb();
}


function TaskB(cb) {
    console.log('任務B')
    cb();
}

function TaskC(cb) {
    console.log('任務C')
    cb();
}

function TaskD(cb) {
    console.log('任務D')
    cb();
}

function TaskE(cb) {
    console.log('任務E')
    cb();
}

exports.async = series(TaskA, TaskB);//有順序的執行任務
exports.sync = parallel(TaskA, TaskB);//一起執行任務

exports.all = series(TaskA, TaskB, parallel(TaskC, TaskD), TaskE);


// css壓縮

//套件引入
const cleanCSS = require('gulp-clean-css');

//任務
function minicss() {
    return src('src/css/*.css')
        .pipe(cleanCSS()) //壓縮css
        .pipe(dest('dist/css'))
}

//導出
exports.style = minicss


// js 壓縮

const uglify = require('gulp-uglify');

function minijs() {
    return src('src/js/*.js')
        .pipe(uglify())
        .pipe(dest('dist/js'))
}


exports.scripts = minijs


// ========   css整合    ==========================
var concat = require('gulp-concat');

function concatcss() {
    return src('src/css/*.css')
        .pipe(concat('all.css'))
        .pipe(dest('dist/css'))
}

exports.allcss = concatcss;

// ==== sass =====
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');


function sassstyle() {
    return src('src/sass/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS()) 
        .pipe(dest('dist/css'))
}


exports.scss = sassstyle;


//   html template

const fileinclude = require('gulp-file-include');

function html() {
    return src('src/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('dist/'))
}

exports.template = html;

//圖片搬家

function img() {
    return src('src/images/*.*').pipe(dest('dist/images'))
}




//監看所有變動


function taskWatch() {
    watch('src/sass/*.scss', sassstyle)
    watch(['src/images/*.*' , 'src/images/**/*.*'], img)
    watch('src/js/*.js' , minijs)
    watch(['src/*.html', 'src/layout/*.html'], html)
}


exports.w = series(img,taskWatch)

//瀏覽器同步
const browserSync = require('browser-sync');
const reload = browserSync.reload;

function browser(done) {
    browserSync.init({
        server: {
            baseDir: "./dist",
            index: "index.html"
        },
        port: 3000
    });
    watch('src/sass/*.scss', sassstyle).on('change' , reload)
    watch(['src/images/*.*' , 'src/images/**/*.*'], img).on('change' , reload)
    watch('src/js/*.js' , minijs).on('change' , reload)
    watch(['src/*.html', 'src/layout/*.html'], html).on('change' , reload)
    done();
}




//以上開發用


//以下打包用

//壓縮圖片
const imagemin = require('gulp-imagemin');

function min_images(){
    return src(['src/images/*.*' , 'src/images/**/*.*'])
    .pipe(imagemin([
        imagemin.mozjpeg({quality: 70, progressive: true}) // 壓縮品質      quality越低 -> 壓縮越大 -> 品質越差 
    ]))
    .pipe(dest('dist/images'))
}

//js 降轉 babel 
const babel = require('gulp-babel');

function babel5() {
    return src('src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(dest('dist/js'));
}


exports.jsbabel = babel5



//清除舊檔案
const clean = require('gulp-clean');

function clear() {
  return src('dist' ,{ read: false ,allowEmpty: true })//不去讀檔案結構，增加刪除效率  / allowEmpty : 允許刪除空的檔案
  .pipe(clean({force: true})); //強制刪除檔案 
}

//exports.c = clear


exports.default = series(parallel(html , sassstyle , minijs , img) ,browser)

exports.online = series(clear, parallel(html , sassstyle , babel5 , min_images))













































