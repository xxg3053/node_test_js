$.getScript('//connect.facebook.net/en_US/sdk.js#version=v2.2&appId=188046604700406&status=true&cookie=true&xfbml=true', function (){});
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
module.exports = {
	facebook: fbShare,
	twitter: twitterShare
};