module.exports = {
	init: function (){
		var $eles = this.core.$eles;
		var $container = this.core.$container;

		var $placeholder = $eles.eq(0).find('img').clone().css({visibility: 'hidden', display: 'block'}).appendTo($container);

		$eles.css({
			position: 'absolute',
			left: 0,
			top: 0,
			width: '100%'
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