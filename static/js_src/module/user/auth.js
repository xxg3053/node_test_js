var Cookie = require('../plugins/Cookie');

exports.is_login = function(){
    return Cookie.cookie('r2_auth') ? true : false;
};

exports.get_uid = function(){
    return Cookie.cookie('r2_uid');
};
exports.get_nid = function(){
    return Cookie.cookie('r2_nid');
};

exports.get_account = function(){
    return Cookie.cookie('r2_account');
};

exports.get_open_plat = function(){
    return Cookie.cookie('r2_open_plat');
};

exports.get_name = function(){
    return Cookie.cookie('r2_name');
};

exports.login_out = function(callback){
    Cookie.cookie('r2_auth','');
    callback();
};

exports.login_in = function(callback){
    Cookie.cookie('r2_auth','123456');
    Cookie.cookie('r2_uid','000000');
    Cookie.cookie('r2_account','1');
    Cookie.cookie('r2_name','kenfo');
    callback();
};