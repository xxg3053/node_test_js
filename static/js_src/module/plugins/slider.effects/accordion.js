module.exports = {
	init: function (){
		this.core.$container.height(this.core.$container.height());
	},
	play: function (index){
		var $container = this.core.$container,
			$eles = this.core.$eles,
			$current = $eles.eq(this.core.index),
			$next = $eles.eq(index);

		$current.slideUp('fast');
		$next.slideDown('fast');
		this.end();
	}
}