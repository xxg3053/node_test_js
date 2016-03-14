var events = require('../plugins/events');

function SlideCore(options){
	this.init(options);
	this.auto && this.waitForNext();
}
SlideCore.prototype = $.extend(events(), {
	init:function (options){
		this.initElements(options);
		this.bindEvents();
	},
	initElements: function (options){
		this.$container = $(options.container);
		this.$eles = $(options.eles);
		this.$navItems = $(options.nav);
		this.$prevBtn = $(options.prevBtn);
		this.$nextBtn = $(options.nextBtn);
		
		this.index = options.index || 0;
		this.length = this.$eles.length;
		this.navEvent = options.navEvent || 'click';
		this.activeNavCls = options.activeNavCls || '';
		this.auto = ('auto' in options ? options.auto : 5000);

		this.animator = new Animator({
			effect: options.effect,
			duration: options.duration,
			core: this
		});
		this.userAction = false;// 特殊变量 userAction用于标记因用户操作发生的切换 为false则是auto切换
		this.options = options;
	},
	bindEvents: function (){
		var self = this;
		this.animator.on('animationEnd', function (){
			self.auto && self.waitForNext();
			self.userAction = false;
			self.emit('animationEnd');
		});
		this.on('toIndex', function (index){
			self.animator.animate(index);
			self.index = index;
			this.$navItems && this.$navItems.removeClass(self.activeNavCls).eq(self.index).addClass(self.activeNavCls);
		});

		this.$navItems.length && this.$navItems.on(this.navEvent, function (){
			self.userAction = true;
			self.toIndex(self.$navItems.index(this));
		});
		this.$prevBtn.on('click', function (){
			self.toPrev();
			if($(this).is('a[href^="javascript:"]')) return false;
		});
		this.$nextBtn.on('click', function (){
			self.toNext();
			if($(this).is('a[href^="javascript:"]')) return false;
		});
	},
	toPrev: function (){
		this.toIndex(this.index - 1);
		this.emit('toPrev');
	},
	toNext: function (){
		this.toIndex(this.index + 1);
		this.emit('toNext');
	},
	toIndex: function (index){
		if(this.isAnimating){
			return;
		}
		index = (index + this.length) % this.length;
		if(index === this.index){
			return;
		}
		this.emit('toIndex', index);
	},
	waitForNext: function (){
		var self = this;
		this.pause();
		this.autoTimer = setTimeout(function (){
			self.toNext();
		}, this.auto);
	},
	pause: function (){
		if(this.autoTimer){
			clearTimeout(this.autoTimer);
			this.autoTimer = null;
		}
	}
});

function Animator(options){
	this.init(options);
}
Animator.prototype = $.extend(events(), {
	init: function (options){
		this.core = options.core;
		this.effect = options.effect || 'blank';
		this.duration = options.duration || 500;

		this.effectFn = this.effectRouter[this.effect];
		// 确定动画效果时 对容器和子项进行初始化
		this.effectFn && this.effectFn.init && this.effectFn.init.call(this);
	},
	animate: function (index){
		if(!this.effectFn){
			return;
		}
		this.core.isAnimating = true;
		this.effectFn.play.call(this, index);
	},
	end: function (){
		this.core.isAnimating = false;
		this.emit('animationEnd');
	},
	// 定制的动画 按需配置 如果可以异步加载 就可以根据配置项加载了。
	effectRouter: require('../plugins/slider.effects')
});

$.fn.slidesjs = function (options){
	var slider = this.data('slider');
	if(slider && (slider instanceof SlideCore)){
		return slider;
	}
	this.data('slider', new SlideCore($.extend({
		container: this.get(0),
		eles: this.children()
	}, options || {})));
	return this;
};

exports.Slide = SlideCore;