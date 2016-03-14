var auth = require('../user/auth');
var global = require('../global');

var otReg = /(^|;)\s*?r2ot\s*?=\s*?(.*?)\s*?(;|$)/;
var startTime;
var running = false;
var unique = (function () {
	var time= (new Date()).getTime() + '-', i = 0;
	return function () {
		return time + (i++);
	}
})();
var ots = {
	start: function (){
		startTime = new Date().getTime();
		document.cookie = 'r2ot=1|' + startTime + ';path=/;domain=.r2games.com;';
		running = true;
		ots.send();
		setTimeout(arguments.callee, 600000);
	},
	check: function (){
		if(running) return;
		if(auth.is_login()){
			var temp = otReg.exec(document.cookie);
			var otsArr = (temp && temp[2].split('|'));
			if(!temp || ! +otsArr[0] || new Date().getTime() - (+otsArr[1]) > 600000){
				ots.start();
			}
		}
		setTimeout(arguments.callee, 3000);
	},
	send: function (){
		if(!window.r2Logger){
			window.r2Logger = {}; // 防止垃圾回收abort请求
		}
		var img = new Image();
		var uid = unique();
		window.r2Logger[uid] = img;
		img.onload = img.onerror = function (){
			img.onload = img.onerror = null;
			img = null;
			delete window.r2Logger[uid];
		}
		img.src = global.BASE_URL + '/user/?ac=onlineHeartbeat&_=' + (new Date().getTime() + Math.random() * 1000000);
	}
};
window.onbeforeunload = function (){
	running && (document.cookie = 'r2ot=0|' + otReg.exec(document.cookie)[2].split('|').pop() + ';path=/;domain=r2games.com;');
};
ots.check();
module.exports = ots;