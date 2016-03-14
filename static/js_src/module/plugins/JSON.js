module.exports = {
    stringify: function(object){
        var type = typeof object;
        var value, results;
        if ('object' == type) {
            if (Array == object.constructor) type = 'array';
            else if (RegExp == object.constructor) type = 'regexp';
            else type = 'object';
        }
        switch (type) {
            case 'undefined':
            case 'unknown':
                return;
                break;
            case 'function':
            case 'boolean':
            case 'regexp':
                return object.toString();
                break;
            case 'number':
                return isFinite(object) ? object.toString() : 'null';
                break;
            case 'string':
                return '"' + object.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function () {
                    var a = arguments[0];
                    return (a == '\n') ? '\\n' : (a == '\r') ? '\\r' : (a == '\t') ? '\\t' : ""
                }) + '"';
                break;
            case 'object':
                if (object === null) return 'null';
                results = [];
                for (var property in object) {
                    value = JSON.stringify(object[property]);
                    if (value !== undefined) results.push(JSON.stringify(property) + ':' + value);
                }
                return '{' + results.join(',') + '}';
                break;
            case 'array':
                results = [];

                for (var i = 0; i < object.length; i++) {
                    value = JSON.stringify(object[i]);
                    if (value !== undefined) results.push(value);
                }
                return '[' + results.join(',') + ']';
                break;
            default:
                return;
        }
    },
    parse: function(data){
        try {
            data = eval('(' + data + ')');
            return data;
        } catch (e) {
        }
        return '';
    }
};