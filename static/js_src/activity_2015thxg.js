 require('./gamesite/public/gwLogin');
var md5 = require('./module/plugins/md5.js');
var global = require('./module/global');
var d = require('./module/ui/simpleDialog');
var Dialog = d.Dialog;
var dialogs = d.dialogs;
var Paging = require('./module/ui/paging').Paging;
if(!user_action.is_login()){
	$('.btn,.ticket,.record a').attr('data-login_btn', 1);
}
user_action.on('login', function (){
	window.location.reload();
});
user_action.on('logout', function (){
	window.location.reload();
});
(function() {
	var lastTime = 0;
	var vendors = ['webkit', 'moz'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||	// name has changed in Webkit
									  window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
			var id = window.setTimeout(function() {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}
	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
	}
}());

$('.drop-box').on('mouseover', function (){
	$(this).find('.drop-list').show();
}).on('mouseleave', function (){
	$(this).find('.drop-list').hide();
});

var recordDialog = new Dialog({
		dialog: '.popup-record',
		defaultPos: { x: 0.5, y: 0.5 }
	}),
	norecordDialog = new Dialog({
		dialog: '.popup-norecord',
		defaultPos: { x: 0.5, y: 0.5 }
	}),
	lotteriesDialog = new Dialog({
		dialog: '.popup-lottery',
		defaultPos: { x: 0.5, y: 0.5 }
	}),
	giftpackDialog = new Dialog({
		dialog: '.popup-giftpack',
		defaultPos: { x: 0.5, y: 0.5 }
	}),
	congratsDialog = new Dialog({
		dialog: '.popup-congrats',
		defaultPos: { x: 0.5, y: 0.5 }
	}),
	voucherDialog = new Dialog({
		dialog: '.popup-voucher',
		defaultPos: { x: 0.5, y: 0.5 }
	}),
	errorDialog = new Dialog({
		dialog: '.popup-error',
		defaultPos: { x: 0.5, y: 0.5 }
	});

var paging = new Paging({
	pagesContainer: '.mes-page .pages-cont',
	prev: '.mes-page .page-prev',
	next: '.mes-page .page-next',
	currentCls: 'current',
	perPage: 3
});

var actData = {};
var $games = giftpackDialog.$dialog.find('.game li');
// init
$.getJSON(global.BASE_URL + '/activity/?ct=thanksgiving&ac=checkEvent&jsoncallback=?', function (re){
	if(!re.status){
		_alert(re.message);
		return;
	}
	$.getJSON(global.BASE_URL + '/activity/?ct=thanksgiving&jsoncallback=?', function (re){
		if(!re.status){
			_alert(re.message || 'Error!');
			return;
		}
		actData = re.data;
		initCheckIn();
		paintRankList(actData.rank_list);
		initPointAndRank(actData);
		
		$('.play .start').on('click', function (){
			if(!user_action.is_login()) return;
			$(this).hide().siblings().show();
			gameReady = true;
		});
		$('.play .btn-keep-fire').on('click', keepFire);
		$(window).on('keydown', function (e){
			if(e.keyCode === 32 && gameReady){
				keepFire();
				e.preventDefault();
			}
		});
		voucherDialog.$dialog.find('.facebook').on('click', function (){
			fbShare(window.location.href, 'I just won ' + actData.my_points + ' points in R2\'s Black Friday Blowout! Now I\'m ranked ' + actData.my_rank + ', reckon you can beat that?', 'http://r2cdn2.r2games.com/en/www/act/2015thanksgiving/images/fbshare.png');
		});
		voucherDialog.$dialog.find('.twitter').on('click', function (){
			twitterShare(window.location.href, 'I just won ' + actData.my_points + ' points in R2\'s Black Friday Blowout! Now I\'m ranked ' + actData.my_rank + ', reckon you can beat that?');
		});
		voucherDialog.on('hide', function (){
			switchFlash(0, 0, 0, 0, 0, 0, 0, '');
			$('.start').show();
		});
	});
});
$('.sign .btn').on('click', function (){
		user_action.is_login() && !$(this).is('.done') && checkIn();
	});
	$('.record a').on('click', function (){
		user_action.is_login() && getCheckInRewards();
	});
	$('.ticket').on('click', function (){
		// lotteriesDialog.show();
		user_action.is_login() && getLotteries();
	});
	$('.popup-record').on('click', '.btn-get-code', function (){
			recordDialog.hide();
			actData.gettingType = $(this).attr('data-type');

			check($games.eq(0));
			giftpackDialog.$dialog.find('.btn-get-code').show().next().hide();
			giftpackDialog.$dialog.find('.code').text('');
			giftpackDialog.$dialog.find('.val').text(actData.gettingType);
			giftpackDialog.show();
		});
	giftpackDialog.$dialog.find('.btn-get-code').on('click', function (){
			getPackage($games.filter('.current').attr('data-gameid'));
		});
		$('.popup-giftpack .back').on('click',function (){
			giftpackDialog.hide();
			getCheckInRewards();
		});
		giftpackDialog.$dialog.find('.btn-get-code').on('click', function (){
			getPackage($games.filter('.current').attr('data-gameid'));
		});
		$games.on('click', function (){
			check(this);
			selected = $(this).attr('data-id');
		});
function initCheckIn(){
	$('.check-box [data-date="' + actData.my_check_in.toString().replace(/,/g, '"],[data-date="') + '"]').addClass('current');
	$('.num em').text(('' + actData.check_in_total).split('').reverse().join('').replace(/(\d{3})/g, '$1,').split('').reverse().join(''));
	$('.day').text(actData.today);
	$('.sign em').text(actData.my_check_in.length + ' days');
	actData.my_check_in.join(',').indexOf(actData.today) !== -1 && $('.sign .btn').addClass('done').text('Checked in');
}

function checkIn(){
	$.getJSON(global.BASE_URL + '/activity/?ct=thanksgiving&ac=checkIn&jsoncallback=?', function (re){
		if(!re.status){
			_alert(re.message || 'Error!');
			return;
		}

		actData.check_in_total = re.data.check_in_total;
		actData.my_check_in = re.data.my_check_in;
		initCheckIn();
		if(re.data.show_code_win){
			actData.gettingType = re.data.type;
			giftpackDialog.$dialog.find('.val').text(re.data.pack_name);
			giftpackDialog.show();
		}
	});
}
function getCheckInRewards(){
	$.getJSON(global.BASE_URL + '/activity/?ct=thanksgiving&ac=checkInRewards&jsoncallback=?', function (re){
		if(!re.status){
			_alert(re.message || 'Error!');
			return;
		}
		if(!re.data.length){
			norecordDialog.show();
			return;
		}
		var html = '';
		$.each(re.data, function (){
			html += '<li><i class="icon"></i><p class="prize-txt"><span>' + this.name + '!</span>' + (this.code ? '<b>CODE:' + this.code + '</b>' : '<a href="javascript:;" class="btn btn-get-code" data-type="' + this.type + '">Collect &gt;</a>') + '</p></li>';
		});
		recordDialog.$dialog.find('.prize-list').html(html);
		recordDialog.show();
	});
}
function getPackage(game_id){
	(function (type){
		$.getJSON(global.BASE_URL + '/activity/?ct=thanksgiving&ac=getCode&jsoncallback=?&game_id=' + game_id + '&type=' + type + (game_id === '43' ? '&timezone=' + $('[name="area"]:checked').val() : ''), function (re){
			if(!re.status){
				_alert(re.message || 'Error!');
				return;
			}
			if(type !== actData.gettingType){
				return;
			}
			giftpackDialog.$dialog.find('.btn-get-code').hide().next().show();
			giftpackDialog.$dialog.find('.code').text('CODE:' + re.data);
			giftpackDialog.show();
			// recordDialog.$dialog.find('[data-type="' + type + '"]').replaceWith('<b>CODE:' + re.data + '</b>');
		});
	})(actData.gettingType);
}
function check(item){
	$games.each(function (){
		uncheck(this);
	});
	$(item).addClass('current').find('.i-check').show();
	if($(item).attr('data-gameid') === '43'){
		giftpackDialog.$dialog.find('.area').show();
	} else {
		giftpackDialog.$dialog.find('.area').hide();
	}
}
function uncheck(item){
	$(item).removeClass('current').find('.i-check').hide();
}
// 烤火鸡
var gameStartTime = 0;
var gameEnd = true;
var score = 0;
var gameReady = false;
var countTimer;
var roastResult;
var roastTimer;
var gameTip = {
	'': '',
	0: 'Burnt',
	1: 'Undercooked',
	2: 'Pretty good',
	3: 'Rare',
	4: 'Medium rare',
	5: 'Just Right'
};
var $gameTip = $('.game-box .tips');
var $rankList = $('.rank-box ul');
var $flash = {
	smallFire: $('.flash-fire:eq(0)'),
	midFire: $('.flash-fire:eq(1)'),
	bigFire: $('.flash-fire:eq(2)'),
	smallSteam: $('.flash-steam:eq(0)'),
	bigSteam: $('.flash-steam:eq(1)'),
	blackSteam: $('.flash-steam:eq(2)')
};
var $bg = $('.game-img img');
var currentTipState = '';

function keepFire(){
	if(!gameStartTime){
		gameEnd = false;
		gameStartTime = new Date().getTime();
		updateState();
	}
	if(roastTimer){
		clearTimeout(roastTimer);
		roastTimer = null;
	}
	roastTimer = setTimeout(function (){
		if(gameEnd) return;
		onGameEnd();
	}, 500);
}
function onGameEnd(){
	voucherDialog.$dialog.find('img').attr('src', $bg.attr('src'));
	submitGame();

	gameStartTime = 0;
	gameEnd = true;
	score = 0;
	gameReady = false;
	roastResult = '';
	currentTipState = '';

	cancelAnimationFrame(countTimer);

	$('.play .start').hide().siblings().hide();
	$flash.smallFire.show();
	$flash.midFire.hide();
	$flash.bigFire.hide();
}
function updateState(){
	score = new Date().getTime() - gameStartTime;
	if(score <= 2000){
		roastResult =  1;
	} else if(score <= 4000){
		roastResult =  2;
	} else if(score <= 7000){
		roastResult =  3;
	} else if(score <= 9000){
		roastResult =  4;
	} else if(score <= 10000){
		roastResult =  5;
	} else {
		roastResult =  0;
	}

	switch(roastResult){
		case 0:
			switchFlash(0, 0, 1, 0, 0, 1, 11, roastResult);
			return;
		case 1:
			switchFlash(1, 0, 0, 1, 0, 0, 0, roastResult);
			break;
		case 2:
			switchFlash(0, 1, 0, 1, 0, 0, 7, roastResult);
			break;
		case 3:
			switchFlash(0, 1, 0, 0, 1, 0, 8, roastResult);
			break;
		case 4:
			switchFlash(0, 1, 0, 0, 1, 0, 9, roastResult);
			break;
		case 5:
			switchFlash(0, 0, 1, 0, 1, 0, 1, roastResult);
			break;
	}

	countTimer = requestAnimationFrame(arguments.callee);
}
function switchFlash(sf, mf, bf, ss, bs, bls, p, roastResult){
	$flash.smallFire[sf ? 'show' : 'hide']();
	$flash.midFire[mf ? 'show' : 'hide']();
	$flash.bigFire[bf ? 'show' : 'hide']();
	$flash.smallSteam[ss ? 'show' : 'hide']();
	$flash.bigSteam[bs ? 'show' : 'hide']();
	$flash.blackSteam[bls ? 'show' : 'hide']();

	setTimeout(function (){
		$bg.attr('src', '//r2cdn2.r2games.com/en/www/act/2015thanksgiving/images/animate/turkey' + p + '.png');
	}, 100);

	if(currentTipState !== roastResult){
		currentTipState = roastResult;
		$gameTip.text(gameTip[roastResult]).fadeIn(200, function (){
			setTimeout(function (){
				$gameTip.fadeOut(1000);
			}, 500);
		});
	}
}
function getRankList(){
	$.getJSON(global.BASE_URL + '/activity/?ct=thanksgiving&jsoncallback=?', function (re){
		paintRankList(re.data.rank_list);
	});
}
function getMyPointAndRank(){
	$.getJSON(global.BASE_URL + '/activity/?ct=thanksgiving&jsoncallback=?', function (re){
		initPointAndRank(re.data);
	});
}
function initPointAndRank(data){
	$('.my-point').text(data.my_points);
	$('.my-rank').text(data.my_rank);
}
function paintRankList(data){
	var html = '';
	$.each(data, function (){
		if(this.rank > 11){
			html += '<li>......</li>';
		}
		html += '<li><em>' + this.rank + '</em><span>' + this.name + '</span><b>' + this.score + '</b></li>';
	});
	$rankList.html(html);
}
function updatePaging(){
	paging.$items = lotteriesDialog.$dialog.find('.recharge');
	if(paging.$items.length < 4){
		$('.mes-page').hide();
	} else {
		$('.mes-page').show();
	}
	paging.update({
		totalItemNum: paging.$items.length,
		currentPage: 1
	});
}
function submitGame(){
	var cTime = new Date().getTime();
	$.getJSON(global.BASE_URL + '/' + 'a' + 'c' + 't' + 'i' + 'v' + 'i' + 't' + 'y' + '/' + '?' + 'c' + 't' + '=' + 't' + 'h' + 'a' + 'n' + 'k' + 's' + 'g' + 'i' + 'v' + 'i' + 'n' + 'g' + '&' + 'a' + 'c' + '=' + 'c' + 'o' + 'o' + 'k' + 'T' + 'u' + 'r' + 'k' + 'e' + 'y' + '&' + 'j' + 's' + 'o' + 'n' + 'c' + 'a' + 'l' + 'l' + 'b' + 'a' + 'c' + 'k' + '=' + '?' + '&time=' + cTime + '&gametime=' + score + '&token=' + md5('' + user_action.get_uid() + cTime + score), function (re){
		if(!re.status){
			return;
		}
		// 弹窗显示获取到的礼包
		actData.my_points = re.data.my_points;
		actData.my_rank = re.data.my_rank;

		voucherDialog.$dialog.find('.points').text(re.data.this_points);
		voucherDialog.$dialog.find('.rank').text(re.data.my_rank);

		initPointAndRank(re.data);
		if(re.data.rank_list){
			paintRankList(re.data.rank_list);
		}
		if(re.data.voucher && re.data.voucher.length){
			voucherDialog.$dialog.find('.voucher').show().find('.tit').html(re.data.voucher.join('<br>').replace(/for /g, 'for<br>'));
		} else {
			voucherDialog.$dialog.find('.voucher').hide();
		}
		voucherDialog.show();
	});
}
function getLotteries(){
	$.getJSON(global.BASE_URL + '/activity/?ct=thanksgiving&ac=cookRewards&jsoncallback=?', function (re){
		if(!re.status){
			_alert(re.message || 'Error!');
			return;
		}
		if(!re.data.length){
			norecordDialog.show();
			return;
		}
		var html = '';
		$.each(re.data, function (){
			html += '<li class="recharge">\
						<i class="icon"></i>\
        				<p class="tit">' + this.voucher.replace('for ', 'for<br>') + '</p>\
        				<p class="time">Valid: 11/27/2015 - 11/30/2015</p>\
        				' + (!this.code1 && !this.code2 && +actData.today >= 27 ? '<a href="//purchase.r2games.com" class="btn" target="_blank">Recharge</a>' : '') + '\
        				' + (this.code1 && '<p class="code"><span>' + this.name1 + '</span>CODE:' + this.code1 + '</p>') + '\
        				' + (this.code2 && '<p class="code"><span>' + this.name2 + '</span>CODE:' + this.code2 + '</p>') + '\
        			</li>';
		});
		lotteriesDialog.$dialog.find('.charge-list').html(html);
		updatePaging();
		lotteriesDialog.show();
	});
}
function _alert(message){
	for(var i = 0; i < dialogs.length; i ++){
		dialogs[i].hide();
	}
	errorDialog.$dialog.find('h4').text(message);
	errorDialog.show();
}
function fbShare(link, caption, picture){
	FB.ui({
		method: 'feed',
		link: link,
		caption: caption,
		picture: picture
	}, function(response) {
		console.log(response);
		$.post(global.BASE_URL + '/activity/?ct=newPlatform&ac=fbShare', { cno: response.post_id });
	});
}
function twitterShare(link, caption){
	window.open('http://twitter.com/home/?status='.concat(encodeURIComponent(caption)) .concat(' ') .concat(encodeURIComponent(link)));
}