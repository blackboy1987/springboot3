function t(o, r) {
    if (o === r) return !0;
    if (o && r && "object" == (void 0 === o ? "undefined" : n(o)) && "object" == (void 0 === r ? "undefined" : n(r))) {
        var e, i, f, u = Array.isArray(o), y = Array.isArray(r);
        if (u && y) {
            if ((i = o.length) != r.length) return !1;
            for (e = i; 0 != e--; ) if (!t(o[e], r[e])) return !1;
            return !0;
        }
        if (u != y) return !1;
        var c = o instanceof Date, l = r instanceof Date;
        if (c != l) return !1;
        if (c && l) return o.getTime() == r.getTime();
        var b = o instanceof RegExp, m = r instanceof RegExp;
        if (b != m) return !1;
        if (b && m) return o.toString() == r.toString();
        var s = Object.keys(o);
        if ((i = s.length) !== Object.keys(r).length) return !1;
        for (e = i; 0 != e--; ) if (!Object.prototype.hasOwnProperty.call(r, s[e])) return !1;
        for (e = i; 0 != e--; ) if (f = s[e], !t(o[f], r[f])) return !1;
        return !0;
    }
    return o !== o && r !== r;
}

var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, r = "function" == typeof Symbol && "symbol" == o(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : o(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : o(t);
}, n = "function" == typeof Symbol && "symbol" == r(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : r(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : r(t);
};

module.exports = {
    isValidUrl: function(t) {
        return /(ht|f)tp(s?):\/\/([^ \\/]*\.)+[^ \\/]*(:[0-9]+)?\/?/.test(t);
    },
    equal: t
};