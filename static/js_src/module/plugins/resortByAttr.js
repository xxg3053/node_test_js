module.exports = function (obj, attr) {
	if(!obj) return;
	if(!attr) return obj;
	function sortByAttr() {
		return function (ele1, ele2){
			var attr1 = ele1[attr], attr2 = ele2[attr];
			if(!isNaN(+attr1) && !isNaN(attr2)){
				attr1 = +attr1;
				attr2 = +attr2;
			}
			if (attr1 < attr2) {
				return -1;
			} else if (attr1 > attr2) {
				return 1;
			} else {
				return 0;
			}
		}
	}

	var $temArr = [];
	if (obj instanceof Array)
		$temArr = obj;
	else
		for (var i in obj) {
			$temArr.push(obj[i]);
		}

	return $temArr.sort(sortByAttr());
};