(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
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
		$("#debug").html(html);
		$zo.css({
			"-webkit-transform": "rotateX(" + (180 + beta) + "deg) rotateY(" + (180 + gamma) + "deg) rotateZ(" + alpha + "deg)",
			"-moz-transform": "rotateX(" + (180 + beta) + "deg) rotateY(" + (180 + gamma) + "deg) rotateZ(" + alpha + "deg)",
			"transform": "rotateX(" + (180 + beta) + "deg) rotateY(" + (180 + gamma) + "deg) rotateZ(" + alpha + "deg)"
		})
	}
})();


},{}],2:[function(require,module,exports){
var _ua = (function(u){
    return {
        Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1) || u.indexOf("ipad") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1) || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1) || u.indexOf("kindle") != -1 || u.indexOf("silk") != -1 || u.indexOf("playbook") != -1,
          Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1) || u.indexOf("iphone") != -1 || u.indexOf("ipod") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1) || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1) || u.indexOf("blackberry") != -1
              }
})(window.navigator.userAgent.toLowerCase());

},{}],3:[function(require,module,exports){
require('./ua');
if(_ua.Mobile){
  require('./gyro');
}

},{"./gyro":1,"./ua":2}]},{},[3]);
