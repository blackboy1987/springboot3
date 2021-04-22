(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/tanmegame/message" ], {
    "0b31": function(e, n, a) {},
    "457b": function(e, n, a) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0, n.default = {
            name: "msg",
            props: {
                content: {
                    default: ""
                },
                msgimg: {
                    default: ""
                }
            },
            data: function() {
                return {};
            }
        };
    },
    "5a72": function(e, n, a) {
        var t = a("0b31");
        a.n(t).a;
    },
    a136: function(e, n, a) {
        a.r(n);
        var t = a("d97a"), o = a("f420");
        for (var u in o) "default" !== u && function(e) {
            a.d(n, e, function() {
                return o[e];
            });
        }(u);
        a("5a72");
        var c = a("2877"), f = Object(c.a)(o.default, t.a, t.b, !1, null, "5df7941c", null);
        n.default = f.exports;
    },
    d97a: function(e, n, a) {
        var t = function() {
            this.$createElement, this._self._c;
        }, o = [];
        a.d(n, "a", function() {
            return t;
        }), a.d(n, "b", function() {
            return o;
        });
    },
    f420: function(e, n, a) {
        a.r(n);
        var t = a("457b"), o = a.n(t);
        for (var u in t) "default" !== u && function(e) {
            a.d(n, e, function() {
                return t[e];
            });
        }(u);
        n.default = o.a;
    }
} ]), (global.webpackJsonp = global.webpackJsonp || []).push([ "pages/tanmegame/message-create-component", {
    "pages/tanmegame/message-create-component": function(e, n, a) {
        a("543d").createComponent(a("a136"));
    }
}, [ [ "pages/tanmegame/message-create-component" ] ] ]);