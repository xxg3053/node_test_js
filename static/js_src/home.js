var Cookie = require('./module/plugins/Cookie');
var auth = require('./module/user/auth');
var global = require('./module/global');
var head = require('./module/public/header');
function init(){
	$('#J_login').click(function(event) {
		window.location.href = global.LOGIN;
	});

	$('#J_logout').click(function(event) {
		auth.login_out(function(){
			window.location.href = global.HOME;
		});
	});

	if(auth.is_login()){
		$('.J-tip').empty().html('用户已经登录了,登录session:'+Cookie.cookie('r2_auth'));
		$('#J_login').hide();
		$('#J_logout').show();
	}else{
		$('.J-tip').empty().html('请先登录');
		$('#J_login').show();
		$('#J_logout').hide();
	}
}

init();
