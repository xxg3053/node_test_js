module.exports = {
	init: function (){
		var $eles = this.core.$eles;
		var $container = this.core.$container;

		$eles.show().css({
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%'
		}).hide().eq(0).show();
	},
	play: function (index){
		var self = this,
			$container = this.core.$container,
			$eles = this.core.$eles,
			$current = $eles.eq(this.core.index),
			$next = $eles.eq(index);

		var stepLength = Math.abs(index - this.core.index);
		var direction = (stepLength === $eles.length - 1 ? -1 : 1) * (index - this.core.index / stepLength);// 单方向滚动
		
		if(direction > 0){
			$next.css({
				left: '100%'
			});
			$next.show().animate({
				left: 0
			}, this.duration, function (){
				self.end();
			});
			$current.animate({
				left: '-100%'
			}, this.duration);
		} else {
			$next.css({
				left: '-100%'
			});
			$next.show().animate({
				left: 0
			}, this.duration, function (){
				self.end();
			});
			$current.animate({
				left: '100%'
			}, this.duration);
		}
	}
}