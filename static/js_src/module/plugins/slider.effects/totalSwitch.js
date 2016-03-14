function getCssVal(ele, field, unit){
	return $(ele).css(field).replace(unit, '');
}
function getDis(ele){
	return $(ele).width() + (+getCssVal(ele, 'border-left-width', 'px'))
				 + (+getCssVal(ele, 'border-right-width', 'px'))
				 + (+getCssVal(ele, 'margin-left', 'px'))
				 + (+getCssVal(ele, 'margin-right', 'px'));
}
module.exports = {
	init: function (){
		var $eles = this.core.$eles;
		var $container = this.core.$container;
		var w = 0;
		$eles.each(function (){
			w += getDis(this);
		});
		$container.css({
			width: w
		});
		$eles.show();
		
	},
	play: function (index){
		var self = this,
			$container = this.core.$container,
			$eles = this.core.$eles,
			$current = $eles.eq(this.core.index),
			$next = $eles.eq(index);
			
		var dis = getDis($current);

		var stepLength = Math.abs(index - this.core.index);
		var direction = (stepLength === $eles.length - 1 ? -1 : 1) * (index - this.core.index / stepLength);// 单方向滚动
		direction > 0 && $container.animate({'margin-left': -dis}, function (){
			$current.appendTo($container);
			$container.css({'margin-left': 0});
			self.end();
		});
		direction <= 0 && $container.css({'margin-left': -dis}).prepend($next).animate({'margin-left': 0}, function (){
			self.end();
		});
	}
};