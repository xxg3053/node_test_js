require('../../user/auth');
var containerWidth;
module.exports = {
	init: function (){
		var $eles = this.core.$eles;
		var $container = this.core.$container;

		$(window).on('resize', function (){
			var windowWidth = $(this).width(),
				windowHeight = $(this).height();
			
			$container.css({
				margin:'0 auto',
				width: $container.find('img:visible').width(),
				height: $container.find('img:visible').height() - 1
			});
			containerWidth = $container.width();
		}).trigger('resize');

		$eles.show().css({
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%'
		}).filter(':gt(0)').hide();
		
		$eles.eq(0).find('img').clone().css({visibility: 'hidden', display: 'block'}).appendTo($container);
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
				left: containerWidth
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