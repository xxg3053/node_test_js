var head = require('./module/public/header');
var global = require('./module/global');

function test(){
	console.log('start home js');	
	$('.J-tip').empty().html(head.addHeader());
	console.log(global.DOMAIN);
}

test();
