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
      console.log('hello');
    },1000);
    // sendJSON(ws);
  }

  ws.onmessage = function(message){
    // console.log("incoming message ",message);
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
    if(ws_is_connected && ws.bufferedAmount ==0){
      ws.send(JSON.stringify({'alpha':alpha,'beta':beta,'gamma':gamma}));
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

