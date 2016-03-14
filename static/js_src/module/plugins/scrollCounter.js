function scrollCounter(num, length){
    length = length || ('' + num).length;
    var fixLen = length - ('' + num).length,
        val = (fixLen > 0 ? new Array(fixLen).toString().replace(/,/g, '0') + (fixLen && '0') : '') + num,
        $number = $('<p class="number"></p>'),
        $item = $('<span class="number-window"><s><b>0</b><b>1</b><b>2</b><b>3</b><b>4</b><b>5</b><b>6</b><b>7</b><b>8</b><b>9</b></s></span>'),
        $comma = $('<span class="number-window"><s><b>,</b></s></span>'),
        items = [];

    for(var i = length, j = 0; i > 0; i--, j++){
        if(!(j % 3) && j > 0){
            $number.prepend($comma.clone());
        }
        var $cloneItem = $item.clone();
        $number.prepend($cloneItem);
        items.unshift($cloneItem);
        $cloneItem.find('s').animate({'top': -val.split('')[i - 1] * 34}, 1000);
    }
    $number.data('items', items);
    $number.data('value', num);
    return $number;
}
function updateScrollNum($number, num, length){
    var items = $number.data('items');

    length = length || Math.max(('' + num).length, items.length);
    var fixLen = length - ('' + num).length,
        val = (fixLen > 0 ? new Array(fixLen).toString().replace(/,/g, '0') + (fixLen && '0') : '') + num,
        $item = $('<span class="number-window"><s><b>0</b><b>1</b><b>2</b><b>3</b><b>4</b><b>5</b><b>6</b><b>7</b><b>8</b><b>9</b></s></span>'),
        $comma = $('<span class="number-window"><s><b>,</b></s></span>');
    // 补上需要增加的位
    for(var i = 0, time = length - items.length; i < time; i++){
        var $cloneItem = $item.clone();
        $number.prepend($cloneItem);
        items.unshift($cloneItem);
        if(!(items.length % 3) && items.length !== length){
            $number.prepend($comma.clone());
        }
    }
    for(var i = 0; i < items.length; i++){
        items[i].find('s').animate({'top': -val.split('')[i] * 34}, 1000);
    }
}

module.exports = {
    scrollCounter: scrollCounter,
    updateScrollNum: updateScrollNum
};