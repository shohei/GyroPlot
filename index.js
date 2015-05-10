(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  // alpha=0;
  // beta=0;
  // gamma=0;

  // var createJSON  = function(){
  //   var json = {'beta':beta,'gamma':gamma,'alpha':alpha};
  //   return json;  
  // }
  //
  // var sendJSON = function(ws){
  //   var gyrojson = createJSON();
  //   console.log("gyrojson ",JSON.stringify(gyrojson));
  //   console.log("ws.bufferedAmount: ",ws.bufferedAmount);
  //   if (ws.bufferedAmount == 0){
  //     ws.send(JSON.stringify(gyrojson));
  //   } 
  //   setTimeout(function(){
  //     sendJSON();
  //   },100);
  // }

  var ws = new WebSocket("ws://heroku-echo.herokuapp.com");
  var ws_is_connected=false;
  ws.onopen = function(){
    console.log("ws opened");
    ws_is_connected=true;
    setInterval(function(){
      // console.log(JSON.stringify(gyrojson)); 
      ws.send(JSON.stringify(gyrojson)); 
      // console.log('hello');
    },1000);
    // sendJSON(ws);
  }

  ws.onmessage = function(message){
    console.log("incoming message ",JSON.stringify(message));
  }
  ws.onerror = function(){
    console.log("ws error");
  }
  ws.onclose = function(){
    console.log("ws closed");
    ws_is_connected=false;
  }

  $(window).unload(function() {
    ws.onclose(); // WebSocket close
    ws_is_connected=false;
  });


  var $zo;
  $(function() {
    $zo = $("#zo");
    window.addEventListener("deviceorientation", deviceorientationHandler);
  });
  /**
   *
   * @param event
   */
  function deviceorientationHandler(event) {
    //ジャイロセンサー情報取得
    // X軸
    var beta = event.beta;
    // Y軸
    var gamma = event.gamma;
    // Z軸
    var alpha = event.alpha;
    gyrojson = {'alpha':alpha,'beta':beta,'gamma':gamma};
    if(ws_is_connected && ws.bufferedAmount ==0){
      // ws.send(JSON.stringify({'alpha':alpha,'beta':beta,'gamma':gamma}));
    };
    var html = "";
    html += "X回転 : " + beta + "<br>";
    html += "Y回転 : " + gamma + "<br>";
    html += 'Z回転 : ' + alpha;
    $("#debug").html(html);
    $zo.css({
      "-webkit-transform": "rotateX(" + (180 + beta) + "deg) rotateY(" + (180 + gamma) + "deg) rotateZ(" + alpha + "deg)",
      "-moz-transform": "rotateX(" + (180 + beta) + "deg) rotateY(" + (180 + gamma) + "deg) rotateZ(" + alpha + "deg)",
      "transform": "rotateX(" + (180 + beta) + "deg) rotateY(" + (180 + gamma) + "deg) rotateZ(" + alpha + "deg)"
    })
  }
})();


},{}],2:[function(require,module,exports){
(function() {
  var $zo;
  $(function() {
    $zo = $("#zo");
  });

  var ws = new WebSocket("ws://heroku-echo.herokuapp.com");
  ws.onopen = function(){
    console.log("ws opened");
  }
  ws.onmessage = function(message){
    console.log("incoming message ",message);

    gyrojson = JSON.parse(message);
    var beta = gyrojson.beta;
    var gamma = gyrojson.gamma;
    var alpha = gyrojson.alpha;

    var html = "";
    html += "X回転 : " + beta + "<br>";
    html += "Y回転 : " + gamma + "<br>";
    html += 'Z回転 : ' + alpha;
    $("#debug").html(html);
    $zo.css({
      "-webkit-transform": "rotateX(" + (180 + beta) + "deg) rotateY(" + (180 + gamma) + "deg) rotateZ(" + alpha + "deg)",
      "-moz-transform": "rotateX(" + (180 + beta) + "deg) rotateY(" + (180 + gamma) + "deg) rotateZ(" + alpha + "deg)",
      "transform": "rotateX(" + (180 + beta) + "deg) rotateY(" + (180 + gamma) + "deg) rotateZ(" + alpha + "deg)"
    });

  }
  ws.onerror = function(){
    console.log("ws error");
  }
  ws.onclose = function(){
    console.log("ws closed");
  }

  $(window).unload(function() {
    ws.onclose(); // WebSocket close
  });

})();


},{}],3:[function(require,module,exports){
exports.ua = function(u){
    return {
        Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1) || u.indexOf("ipad") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1) || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1) || u.indexOf("kindle") != -1 || u.indexOf("silk") != -1 || u.indexOf("playbook") != -1,
          Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1) || u.indexOf("iphone") != -1 || u.indexOf("ipod") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1) || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1) || u.indexOf("blackberry") != -1
              }
};

},{}],4:[function(require,module,exports){
var ua =require('./ua');
var _ua = ua.ua(window.navigator.userAgent.toLowerCase());
if(_ua.Mobile){
  console.log("mobile");
  require('./gyro');
} else {
  console.log("not mobile");
  require('./pc');
}


},{"./gyro":1,"./pc":2,"./ua":3}]},{},[4]);
