if( /\.r2games\.com$/.test(location.hostname)) {
    document.domain = require('../global').DOMAIN;
}

var URL = require('./URL');

/*
 * frame如果传入iframe的dom，表示是主页面，否则是被iframe的页面
 */
var interface_id = 0;
function IframeEvents(frame){
    this.frame = frame || false;
    this._events = this._events || {};
    var t = this;

    if(this.frame){
        // iframe内会提供frame_interface
        window.frame_interface = window.frame_interface || {};
        interface_id++;
        window.frame_interface[interface_id] = function(event, args){ // 当前页面执行事件回调
            t.doEvent(event, args);
        };
        this.interface_id = interface_id;
    } else {
        this.interface_id = URL.search('frame_interface_id'); // 通过此处传入的interface_id找到window的对应的方法
        window.frame_interface = function(event, args){
            t.doEvent(event, args);
        }
    }
}
module.exports = IframeEvents;

IframeEvents.prototype.get_interface_id = function(){
    return this.interface_id;
};

//订阅对方的信息
IframeEvents.prototype.subscription = function(event, func){
    if(typeof func !== 'function') return;
    this._events[event] = func;
};

//通知对方 向下 向上
IframeEvents.prototype.publish = function(event){
    var len = arguments.length;
    var args = new Array(len - 1);
    for(var i = 1; i < len; i++){
        args[i - 1] = arguments[i];
    }

    if(this.frame){//调用iframe内的函数
        var frame_window = this._get_frame_window();
        frame_window.frame_interface(event, args);
    }else{
        if(this.interface_id > 0){ // 向上
            parent.frame_interface[this.interface_id](event, args);
        }
    }
};

//执行本地绑定好的event
IframeEvents.prototype.doEvent = function(event, args){
    if(typeof this._events[event] == "function"){
        this._events[event].apply(this, args);
    }
};

IframeEvents.prototype._get_frame_window = function(){
    if(this.frame){
        return this.frame[0].contentWindow;
    }
    return false;
};