require('./ua');
if(_ua.Mobile){
  console.log("mobile");
  require('./gyro');
} else {
  console.log("not mobile");
}

