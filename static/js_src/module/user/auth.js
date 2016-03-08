var Cookie = require('../plugins/Cookie');
exports.is_login = function(){
    return Cookie.cookie('r2_auth') ? true : false;
};

exports.get_uid = function(){
    return Cookie.cookie('r2_uid');
};

exports.get_login_id = function(){
    return Cookie.cookie('r2_login_id');
};

exports.get_name = function(){
    return Cookie.cookie('r2_name');
};

exports.login_in = function(){
	 Cookie.cookie('r2_auth','1234567','1000');
};
exports.login_out = function(callback){
	Cookie.cookie('r2_auth','');
    // var login_out_url = require('../global').LOGIN_OUT_URL;
    // $.get(login_out_url, function(){
        callback();
    // });
};