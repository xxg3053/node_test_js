module.exports = {
	play: function (index){
		var $container = this.core.$container,
			$eles = this.core.$eles,
			$current = $eles.eq(this.core.index),
			$next = $eles.eq(index);

		switchClass = this.core.options.switchClass;
		$current.removeClass(switchClass);
		$next.addClass(switchClass);
		this.end();
	}
};