var Cookie = require('../plugins/Cookie');
var auth = require('../user/auth');
var global = require('../global');
var $login_id = $('input[name="login_id"]');
var $login_pwd = $('input[name="login_pwd"]');
var $btn = $('.J-login-btn');

function login_submit(){
	$btn.click(function() {
		var login_id = $login_id.val();
        var login_pwd = $login_pwd.val();
        //post登录
        auth.login_in();
        window.location.href = global.HOME;
     
	});
}

module.exports.init = function(){
    login_submit();
};