module.exports = function flash(swf, width, height, param, codebase, pluginspage) {
	var i, object = '',
		embed = '';
	codebase = codebase || 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0';
	pluginspage = pluginspage || 'http://www.macromedia.com/go/getflashplayer';
	param = param || {};
	param.quality = param.quality || "high";
	param.wmode = param.wmode || "transparent";
	for (i in param) {
		object += '<param name="' + i + '" value="' + param[i] + '" />';
		embed += ' ' + i.toString().toLowerCase() + '="' + param[i] + '"';
	}
	return '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' + codebase + '" width="' + width + '" height="' + height + '"><param name="movie" value="' + swf + '" />' + object + '<embed src="' + swf + '" pluginspage="' + pluginspage + '" type="application/x-shockwave-flash" width="' + width + '" height="' + height + '"' + embed + '></embed></object>';
};