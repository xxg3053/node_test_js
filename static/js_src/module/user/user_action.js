var events = require('../plugins/events');
var user_action = $.extend(events(), require('./auth'));


function initLoginDialog(){
    user_action.login = function (){
        console.log('showLogin');
		this.emit('showLogin');
	};
    // 默认弹出框按钮
	$('body').on('click', '[data-login_btn]', function (){
        console.log('初始化登录按钮');
		if(user_action.is_login()){
			return;
		}
		user_action.login();
	});
}
(function (){

initLoginDialog();

window.user_action = user_action;

})();