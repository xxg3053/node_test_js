var Promise = function (onFulfilled, onRejected){
	this.state = 'pending';
	onFulfilled instanceof Function && (this.onFulfilled = onFulfilled);
	onRejected instanceof Function && (this.onRejected = onRejected);
};
Promise.prototype.then = function (onFulfilled, onRejected){
	this.nextPromise = new Promise();
	if(this.state === 'fulfilled'){
		onFulfilled instanceof Function && onFulfilled();
	} else if(this.state === 'rejected'){
		onRejected instanceof Function && onRejected();
	} else {
		onFulfilled instanceof Function && (this.nextPromise.onFulfilled = onFulfilled);
		onRejected instanceof Function && (this.nextPromise.onRejected = onRejected);
	}
	return this.nextPromise;
};
Promise.prototype.run = function (value){ // 上一个promise onFulfilled的返回结果
	var self = this;
	onFulfilled = this.onFulfilled;
	this.value = onFulfilled(resolve, reject, value); // 变成普通的函数调用
	function resolve(){
		self.resolve();
	}
	function reject(reason){
		self.reject(reason);
	}
	Promise.prototype.current = this; // 标记当前运行的promise实例
};
Promise.prototype.stop = function (reason){
	var onRejected = this.onRejected;
	onRejected(reason); // 变成普通的函数调用
};
Promise.prototype.resolve = function (){
	this.state = 'fulfilled';
	this.nextPromise && this.nextPromise.run(this.value); // resolve 让下一个跑
};
Promise.prototype.reject = function (reason){
	this.state = 'rejected';
	this.stop(reason); // reject 让自己停下
};
module.exports = Promise;