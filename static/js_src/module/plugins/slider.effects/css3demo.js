module.exports = {
	init: function (){
		$('<link rel="stylesheet" href="http://s.r2games.com/css/animate.css" />').appendTo('head');

		var self = this;
		var $eles = this.core.$eles;
		var $container = this.core.$container;

		$(window).on('resize', function (){
			var windowWidth = $(this).width(),
				windowHeight = $(this).height();
			var w,h;
			if(windowWidth >= 1920){
				w = 1903;
				h = 549;
			} else if(windowWidth >= 1366){
				w = $container.find('img:visible').width();
				h = $container.find('img:visible').height();
			} else if(windowWidth < 1024){
				w = 1000;
				h = 395;
			}
			$container.css({
				margin:'0 auto',
				width: w,
				height: h
			});
		}).trigger('resize');

		$container.css('position', 'relative');
		$eles.css({
			position: 'absolute',
			left: 0,
			top: 0
		}).filter('.not(:eq(0))').hide();
		$eles.on('webkitAnimationEnd', function (){
			self.end();
		});
		this.on('animationEnd', function (){
			$eles.removeClass('animated zoomOutDown zoomInUp').hide().eq(this.core.index).show();
		});
	},
	play: function (index){
		var $container = this.core.$container,
			$eles = this.core.$eles,
			$current = $eles.eq(this.core.index),
			$next = $eles.eq(index);

		$current.addClass('animated zoomOutDown').show();
		$next.addClass('animated zoomInUp').show();
	}
}