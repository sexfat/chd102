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

exports.all = series(TaskA , TaskB , parallel(TaskC , TaskD) , TaskE);


// css壓縮

//套件引入
const cleanCSS = require('gulp-clean-css');

//任務
function minicss(){
   return src('src/css/*.css')
   .pipe(cleanCSS()) //壓縮css
   .pipe(dest('dist/css'))
}

//導出
exports.style = minicss


// js 壓縮

const uglify = require('gulp-uglify');

function minijs(){
   return src('src/js/*.js')
   .pipe(uglify())
   .pipe(dest('dist/js'))
}


exports.scripts = minijs

















