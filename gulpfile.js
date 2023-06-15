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



// 任務的順序
function TaskA(cb){
    console.log('任務A') 
    cb();
  } 


function TaskB(cb){
    console.log('任務B') 
    cb();
  }

exports.async = series(TaskA , TaskB);//有順序的執行任務
exports.sync = parallel(TaskA , TaskB);//一起執行任務


  
  

  




