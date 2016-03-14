function flv_player(movie, width, height, autoplay, loop, IsShowBar, buffer, logo) {
    var player = '//r2cdn.r2games.com/public/images/flvplayer.swf';
	var flash = require('./flash');
	
    return flash(player, width, height, {
        allowFullScreen: "true",
        FlashVars: "vcastr_file=" + movie + "&LogoText=" + (logo || 'R2Games') + "&BufferTime=" +
            (typeof buffer == 'undefined' ? 1 : buffer) + "&IsContinue=" + (loop === undefined ? 0 : loop) + "&IsAutoPlay=" + (typeof autoplay == 'undefined' ? 1 : autoplay) + '&IsShowBar=' + (IsShowBar === undefined ? 1 : IsShowBar)
    });
}
module.exports = flv_player;