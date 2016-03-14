require('../../user/auth');
var containerWidth;
module.exports = {
	init: function (){
		var $eles = this.core.$eles;
		var $container = this.core.$container;
		
		$(window).on('resize', function (){
			var windowWidth = $(this).width(),
				windowHeight = $(this).height();
			var w,h;
			if(windowWidth >= 1920){
				w = 1903;
				// h = 549;
			} else if(windowWidth >= 1000){
				w = $(document).width();
				// h = 289 / 1000 * w
			} else{
				w = 1000;
				// h = 289;
			}
			$container.css({
				margin:'0 auto',
				width: w
			});
			$eles.css({
				width: w
			});
			containerWidth = w;
		}).trigger('resize');
		$eles.eq(0).find('p img').clone().css({visibility: 'hidden', display: 'block'}).appendTo($container);
		$container.css({overflow: 'hidden',position: 'relative'});
		$eles.show().css({
			position: 'absolute',
			top: 0,
			left: 0
		}).filter(':gt(0)').hide();
	},
	play: function (index){
		var self = this;
		var stepLength = Math.abs(index - this.core.index);
		var direction = index - this.core.index / stepLength;

		var $container = this.core.$container,
			$eles = this.core.$eles,
			$current = $eles.eq(this.core.index),
			$next = $eles.eq(index);

		if(direction > 0 || (this.core.index === this.core.length - 1 && index === 0 && !this.core.userAction)){
			$next.show().css({
				left: containerWidth // safari 百分比实现的动画有bug
			});
			$next.animate({
				left: 0
			}, this.duration, function (){
				self.end();
			});
			$current.animate({
				left: -containerWidth
			}, this.duration, function (){
				$(this).hide()
			});
		} else {
			$next.show().css({
				left: -containerWidth
			});
			$next.animate({
				left: 0
			}, this.duration, function (){
				self.end();
			});
			$current.animate({
				left: containerWidth
			}, this.duration, function (){
				$(this).hide()
			});
		}
	}
}