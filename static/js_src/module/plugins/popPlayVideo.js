var mediaPlayer = require('./mediaPlayer');
var Dialog = require('../ui/simpleDialog').Dialog;

var $dialog = $('<div style="display: none;background: #000;z-index: 1000;overflow: hidden;"><span href="javascript:;" style="position: absolute; top: 0px; right: 0px; color: rgb(255, 255, 255); cursor: pointer; width: 16px; font-size: 16px; line-height: 16px; text-align: center; background-color: rgb(0, 0, 0);z-index:999;">×</span></div>').appendTo('body');
var dialog = new Dialog({
    dialog: $dialog,
    closeBtn: $dialog.find('span')
});
var $mediaEle, $linkMask;
function popPlay(src, width, height, link){
    var urlData = src.split('?');
    mediaData = (urlData[1] || '800x600').split('x');

    $mediaEle = $(mediaPlayer({
        src: src,
        width: width || mediaData[0] || 800,
        height: height || mediaData[1] || 600
    }));
    $linkMask = $('<a href="' + link + '" target="_blank" style="position: absolute; bottom: 30px;left:0;width: 100%;height: 100%;z-index: 998;"></a>')

    if('onload' in $mediaEle[0]){
        $mediaEle.on('load', function (){
            dialog.setPos(dialog.defaultPos.x, dialog.defaultPos.y);
        });
    }

    dialog.$dialog.append($mediaEle);
    dialog.$dialog.append($linkMask);
    dialog.show();
}
dialog.on('hide', function (){
    $mediaEle.remove();
    $linkMask.remove();
});
module.exports = {
    init: function ($ele){
        $ele.on('click', function (){
            var urlData = $(this).attr('data-media').split('?');
            var link = this.href;
            var src = urlData.shift();

            if(src){
                var mediaData = (urlData[0] || '800x600').split('x');
                popPlay(src, mediaData[0], mediaData[1], link);
                return false;
            }
        });
    },
    popPlay: popPlay
}