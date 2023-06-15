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


exports.df = defaultTask

