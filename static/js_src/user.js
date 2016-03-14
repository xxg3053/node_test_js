require('./module/user/user_action');
var auth = require('./module/user/auth');
if(!user_action.is_login()){
	console.log('没有登录，显示登录窗口');
    $('.btn,.ticket,.record a').attr('data-login_btn', 1);
}

user_action.on('login', function (){
    console.log('执行了登录操作');
	window.location.reload(); 
});
user_action.on('logout', function (){
	window.location.reload();
});

$('.J-login-btn').click(function(){
   auth.login_out(function(){
       user_action.emit('logout');
   });
});
    
(function() {

    
})();