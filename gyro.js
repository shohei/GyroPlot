(function() {

  var ws = new WebSocket("ws://heroku-echo.herokuapp.com");
  ws.onopen = function(){
    console.log("ws opened");
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
    var beta = event.beta;
    // Y軸
    var gamma = event.gamma;
    // Z軸
    var alpha = event.alpha;
    var html = "";
    html += "X回転 : " + beta + "<br>";
    html += "Y回転 : " + gamma + "<br>";
    html += 'Z回転 : ' + alpha;
    gyrojson = {'beta':beta,'gamma':gamma,'alpha':alpha};
    ws.send(JSON.stringify(gyrojson));
    $("#debug").html(html);
    $zo.css({
      "-webkit-transform": "rotateX(" + (180 + beta) + "deg) rotateY(" + (180 + gamma) + "deg) rotateZ(" + alpha + "deg)",
      "-moz-transform": "rotateX(" + (180 + beta) + "deg) rotateY(" + (180 + gamma) + "deg) rotateZ(" + alpha + "deg)",
      "transform": "rotateX(" + (180 + beta) + "deg) rotateY(" + (180 + gamma) + "deg) rotateZ(" + alpha + "deg)"
    })
  }
})();

