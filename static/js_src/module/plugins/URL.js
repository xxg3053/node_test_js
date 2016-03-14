module.exports = {
    get_host: function(url){
        if(url.indexOf('http://') == -1) return location.host;
        return url.replace('http://', '').split('/')[0];
    },
    parse_str: function(str, separator, mark, cover_mode, fn_value, fn_key){
        if (typeof str !== 'string') return {};
        var re = {}, key, value;
        str = str.split(separator || ';');
        if ( ! mark) mark = ':';
        for (var i in str) {
            if ( ! $.trim(str[i])) continue;
            str[i] = str[i].split(mark);
            key = (typeof fn_key === 'function')? fn_key(str[i][0]): str[i][0];
            value = (typeof fn_value === 'function')? fn_value(str[i][1]): str[i][1];
            if (key in re) {
                switch(cover_mode){
                    case 'first':
                        continue;
                    case 'last':
                        re[key] = value;
                        break;
                    default:
                        if (typeof re[key] === 'object') re[key].push(value);
                        else re[key] = [re[key], value];
                }
            } else re[key] = value;
        }
        return re;
    },
    // 获取search
    search: function(key){
        if (search === undefined) var search = this.parse_str(location.search.substr(1), '&', '=', 'all', decodeURIComponent, decodeURIComponent);
        if (key === undefined) return search;
        return typeof search[key] == 'undefined' ? '' : search[key];
    }
};
