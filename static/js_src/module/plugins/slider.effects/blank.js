module.exports = {
	init: function (){
		var $eles = this.core.$eles;
		$eles.filter(':gt(0)').hide();
	},
	play: function (index){
		var $container = this.core.$container,
			$eles = this.core.$eles,
			$current = $eles.eq(this.core.index),
			$next = $eles.eq(index);

		$eles.hide();
		$next.show();
		this.end();
	}
};