var head = require('./module/public/header');
require('./module/global');

function test(){
	console.log('start home js');	
	$('.J-tip').empty().html(head.addHeader());
}

test();
