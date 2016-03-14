module.exports = function (logUrl){
	var global = require('../global');
	var unique = (function () {
		var time= (new Date()).getTime() + '-', i = 0;
		return function () {
			return time + (i++);
		}
	})();
	var imgLog = function (url){
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
		img.src = url + '&_uid=' + uid;
	};
	var getParam = function (field){
		if(!field) return '';
		var patten = new RegExp('(^|; ?)' + field + '=(.*?)(;|$)');
		var tempArr = patten.exec(document.cookie);
		return tempArr ? tempArr[2] : '';
	};
	var params = 'userid=' + getParam('r2_uid') + '&cid=' + getParam('fromdetail') + '&adid=' + getParam('fromadid') + '&requrl=' + encodeURIComponent(location.href.replace(/(\w+?:\/\/([\.\w-]+?))\//, '/')) + '&query_string=' + encodeURIComponent(location.search.replace('?', '')) + '&http_referer=' + encodeURIComponent(document.referrer) + '&domain=' + location.host + '&siteid=' + global.PLATFORM;
	var logUrl = logUrl || global.LOG_URL;
	imgLog(logUrl + (logUrl.indexOf('?') === -1 ? '?' : '&') + params);
};