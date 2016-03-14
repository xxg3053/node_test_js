module.exports = {
	init: function (){
		var $eles = this.core.$eles;
		var $container = this.core.$container;

		$eles.css({
			position: 'absolute',
			left: 0,
			top: 0
		}).hide().eq(0).show();
	},
	play: function (index){
		var $container = this.core.$container,
			$eles = this.core.$eles,
			$current = $eles.eq(this.core.index),
			$next = $eles.eq(index);

		var self = this;
		$current.fadeOut(this.duration);
		$next.fadeIn(this.duration, function (){
			self.end();
		});
	}
}