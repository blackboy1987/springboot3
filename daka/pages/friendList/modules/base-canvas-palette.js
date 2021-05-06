function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
    };
}(), n = function() {
    function n(t) {
        console.log(t), console.log(222200), e(this, n), this.poster = t;
    }
    return t(n, [ {
        key: "palette",
        value: function() {
            return {
                width: "540px",
                height: "960px",
                background: "#fff",
                views: this.poster.content
            };
        }
    } ]), n;
}();

exports.default = n;