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

