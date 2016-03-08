exports.cookie = function (name, value, exp, path, domain, secure) {
    if (value != undefined) {
        setCookie(name, value, exp, path, domain, secure);
    } else {
        return get_cookie(name);
    }
    function setCookie(name, value, exp, path, domain, secure) {
        var date = new Date();
        date.setTime(date.getTime() + exp * 1000);
        document.cookie = name + "=" + encodeURI(value) + ((exp) ? "; expires=" + date.toGMTString() : "") + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "");
    }

    function get_cookie(name) {
        if (!document.cookie) {
            return '';
        }
        var value = '';
        var cookie_values = document.cookie.split(";");
        for (var i in cookie_values) {
            var _t = $.trim(cookie_values[i]).split("=");
            if (_t[0] == name) {
                value = _t[1];
                try {
                    value = decodeURIComponent(value);
                } catch (e) {
                }
                break;
            }
        }
        return value;
    }
};