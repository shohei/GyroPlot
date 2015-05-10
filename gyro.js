(function() {
  var alpha=0;
  var beta=0;
  var gamma=0;

  var gyrojson;

  var createAndSendJSON  = function(_ws){
     gyrojson = {'beta':beta,'gamma':gamma,'alpha':alpha};
     console("created: "+JSON.stringify(gyrojson));
    _ws.send(JSON.stringify(gyrojson));
  }

  var ws = new WebSocket("ws://heroku-echo.herokuapp.com");
  ws.onopen = function(){
    console.log("ws opened");
    setInterval(function() {
      if (ws.bufferedAmount == 0){
        console("sending "+JSON.stringify(gyrojson));
        createAndSendJSON(ws);
      }
    }, 100);
  }

  ws.onmessage = function(message){
    // console.log("incoming message ",message);
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
    beta = event.beta;
    // Y軸
    gamma = event.gamma;
    // Z軸
    alpha = event.alpha;
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

