var ua =require('./ua');
var _ua = ua.ua(window.navigator.userAgent.toLowerCase());
if(_ua.Mobile){
  console.log("mobile");
  require('./gyro');
} else {
  console.log("not mobile");
}

