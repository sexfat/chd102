const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');

// function 任務
function defaultTask(cb){
  console.log('gulp ok') 
  cb();
} 


exports.log = defaultTask


// 檔案搬家任務
function move(){
   return src('index.html').pipe(dest('dist/'))
}

exports.mv = move;



