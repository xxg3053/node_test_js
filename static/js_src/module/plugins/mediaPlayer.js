module.exports = function (opts){
	var flvplayer = require('./flvplayer');
	var flashPlayer = require('./flash');
	var type = opts.type || opts.src.split('?').shift().split('.').pop() || 'img';
	var result = '';
	switch(type){
		case 'flv':
			result = flvplayer(opts.src, opts.width, opts.height, opts.autoplay, opts.loop, opts.IsShowBar, opts.buffer, opts.logo);
			break;
		case 'swf':
			result = flashPlayer(opts.src, opts.width, opts.height, opts.params, opts.codebase, opts.pluginspage);
			break;
		default:
			result = '<img src="' + opts.src + '" width="' + opts.width + '" height="' + opts.height + '" style="display:block;"/>';
	}
	return $(result);
};