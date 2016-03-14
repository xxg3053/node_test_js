var dialog = require('../ui/simpleDialog');
var lang = require('../lang');
var alertDialog, confirmDialog;
var icon = {
	'success': 'i-ok',
	'warn': 'i-warning',
	'error': 'i-error',
	'noicon': ''
};

var alertDialogTpl = '<div id="easyDialogWrapper" class="easyDialog_wrapper" style="display: block; margin: 0px;">\
							<div class="easyDialog_content">\
								<h4 class="easyDialog_title" id="easyDialogTitle" style="cursor: move;">\
									<a href="javascript:void(0)" class="close_btn" id="closeBtn">×</a>\
									Message\
								</h4>\
								<div class="easyDialog_text"></div>\
							</div>\
						</div>';

var confirmDialogTpl = '<div id="easyDialogWrapper" class="easyDialog_wrapper" style="display: block; margin: 0px;">\
							<div class="easyDialog_content">\
								<h4 class="easyDialog_title" id="easyDialogTitle" style="cursor: move;">\
									<a href="javascript:void(0)" class="close_btn" id="closeBtn">×</a>\
									Confirm\
								</h4>\
								<div class="easyDialog_text"></div>\
								<div class="easyDialog_footer">\
									<button class="btn_normal" id="easyDialogNoBtn">' + lang.L('Ui_Cancel_Btn') + '</button>\
									<button class="btn_highlight" id="easyDialogYesBtn">' + lang.L('Ui_Confirm_Btn') + '</button>\
								</div>\
							</div>\
						</div>';

exports.alert = function(msg, title, type, hide_time, callback){
	if(!alertDialog){
		var $dialog = $(alertDialogTpl).appendTo('body');
		alertDialog = new dialog.Dialog({
			dialog: $dialog,
			title: $dialog.find('.easyDialog_title'),
			closeBtn: $dialog.find('.close_btn')
		});
	}
	if(title){
		var textWrap = alertDialog.$title.show()[0];
		var text = textWrap.lastChild;
		if(text && text.nodeType === 3){ // 文本节点替换
			textWrap.removeChild(text);
		}
		textWrap.appendChild(document.createTextNode(title));
	} else {
		alertDialog.$title.hide();
	}
	alertDialog.$dialog.find('.easyDialog_text').html((type === 'noicon' ? '' : '<i class="i-tip ' + (type && (type in icon) ? icon[type] : 'i-error') + '"></i>') + '&nbsp;' + msg);
	alertDialog.show();
	hide_time && setTimeout(function (){alertDialog.hide();}, hide_time);
	typeof callback === 'function' && alertDialog.once('hide', callback);
	return alertDialog;
};
exports.confirm = function(msg, title, yesCallback, noCallback, type){
	yesCallback = yesCallback || function (){};
	noCallback = noCallback || function (){};
	if(!confirmDialog){
		var $dialog = $(confirmDialogTpl).appendTo('body');
		confirmDialog = new dialog.Dialog({
			dialog: $dialog,
			title: $dialog.find('.easyDialog_title'),
			closeBtn: $dialog.find('.close_btn')
		});
	}
	if(title){
		var textWrap = confirmDialog.$title.show()[0];
		textWrap.removeChild(textWrap.lastChild);
		textWrap.appendChild(document.createTextNode(title));
	} else {
		confirmDialog.$title.hide();
	}
	confirmDialog.$dialog.find('#easyDialogNoBtn,#closeBtn').one('click', function (){
		noCallback();
		confirmDialog.hide();
	});
	confirmDialog.$dialog.find('#easyDialogYesBtn').one('click', function (){
		yesCallback();
		confirmDialog.hide();
	});
	confirmDialog.$dialog.find('.easyDialog_text').html((type === 'noicon' ? '' : '<i class="i-tip ' + (type && (type in icon) ? icon[type] : 'i-error') + '"></i>') + '&nbsp;' + msg);
	confirmDialog.show();
	return confirm;
};
var dialogs = {};
exports.easyDialog = {
	open: function (opts){
		if(dialogs[opts.container]){
			dialogs[opts.container].show();
		} else {
			dialogs[opts.container] = new dialog.Dialog({
				dialog: $('#' + opts.container),
				closeBtn: $('#' + opts.container).find('.close_btn,.close,.cancel'),
				withScroll: opts.withScroll,
				width: opts.width,
				posType: opts.posType
			});
			dialogs[opts.container].show();
		}
	},
	close: function (){
		$.each(dialog.dialogs, function (){
			this.hide();
		});
	}
};
exports.dialogs = dialogs;