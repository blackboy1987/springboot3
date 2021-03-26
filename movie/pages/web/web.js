(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/web/web" ], {
    "099f": function(n, t, e) {
        e.r(t);
        var a = e("8d3b"), u = e.n(a);
        for (var c in a) "default" !== c && function(n) {
            e.d(t, n, function() {
                return a[n];
            });
        }(c);
        t.default = u.a;
    },
    "2dc5": function(n, t, e) {
        var a = e("6623");
        e.n(a).a;
    },
    6623: function(n, t, e) {},
    "8a07": function(n, t, e) {
        (function(n) {
            function t(n) {
                return n && n.__esModule ? n : {
                    default: n
                };
            }
            e("3079"), t(e("66fd")), n(t(e("a404")).default);
        }).call(this, e("543d").createPage);
    },
    "8d3b": function(n, t, e) {
        (function(n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var e = {
                data: function() {
                    return {
                        url: ""
                    };
                },
                onLoad: function() {
                    "" !== n.getStorageSync("$web") ? this.url = n.getStorageSync("$web") : n.navigateBack({
                        delta: 1
                    });
                },
                methods: {}
            };
            t.default = e;
        }).call(this, e("543d").default);
    },
    a404: function(n, t, e) {
        e.r(t);
        var a = e("ce9d"), u = e("099f");
        for (var c in u) "default" !== c && function(n) {
            e.d(t, n, function() {
                return u[n];
            });
        }(c);
        e("2dc5");
        var o = e("f0c5"), f = Object(o.a)(u.default, a.b, a.c, !1, null, null, null, !1, a.a, void 0);
        t.default = f.exports;
    },
    ce9d: function(n, t, e) {
        e.d(t, "b", function() {
            return a;
        }), e.d(t, "c", function() {
            return u;
        }), e.d(t, "a", function() {});
        var a = function() {
            var n = this;
            n.$createElement;
            n._self._c;
        }, u = [];
    }
}, [ [ "8a07", "common/runtime", "common/vendor" ] ] ]);