require('../plugins/ZeroClipboard');
var events = require('../plugins/events');
var global = require('../global');
Clipboard = function (opts){
	this.init(opts);
};

Clipboard.prototype = $.extend(events(), {
	init: function (opts){
		this.initClipBoard();
		this.initElements(opts);
		this.bindEvents();
	},
	initElements: function (opts){
		this.$btn = $(opts.btn);
		this.$btn.attr('data-clipboard-target', opts.target);
		
		this.client = new ZeroClipboard(this.$btn);
	},
	initClipBoard: function (){
		ZeroClipboard.config({
			moviePath: this.swfPath,
			forceHandCursor: true
		});
	},
	bindEvents: function (){
		var self = this;
		self.client.on('complete', function(event) {
			self.emit('complete', event);
		});
	},
	swfPath: global.BASE_URL + '/resource/flash/ZeroClipboard.swf'
});

module.exports = Clipboard;