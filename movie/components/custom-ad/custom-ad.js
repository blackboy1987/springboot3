(global.webpackJsonp = global.webpackJsonp || []).push([ [ "components/custom-ad/custom-ad" ], {
    "8bb5": function(n, o, t) {
        Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.default = void 0;
        var c = {
            data: function() {
                return {
                    show: !0
                };
            },
            onShow: function() {
                console.log("广告onshow");
            },
            onHide: function() {
                console.log("广告onHide");
            },
            props: {
                ysId: {
                    type: String,
                    default: ""
                },
                min: {
                    type: Number,
                    default: 680
                }
            },
            mounted: function() {},
            methods: {
                binderror: function(n) {
                    this.show = !1;
                },
                bindload: function(n) {
                    this.show = !0;
                }
            }
        };
        o.default = c;
    },
    c15d: function(n, o, t) {},
    c4ff: function(n, o, t) {
        t.r(o);
        var c = t("8bb5"), e = t.n(c);
        for (var u in c) "default" !== u && function(n) {
            t.d(o, n, function() {
                return c[n];
            });
        }(u);
        o.default = e.a;
    },
    d9e0: function(n, o, t) {
        var c = t("c15d");
        t.n(c).a;
    },
    dac9: function(n, o, t) {
        t.r(o);
        var c = t("fc80"), e = t("c4ff");
        for (var u in e) "default" !== u && function(n) {
            t.d(o, n, function() {
                return e[n];
            });
        }(u);
        t("d9e0");
        var a = t("f0c5"), d = Object(a.a)(e.default, c.b, c.c, !1, null, null, null, !1, c.a, void 0);
        o.default = d.exports;
    },
    fc80: function(n, o, t) {
        t.d(o, "b", function() {
            return c;
        }), t.d(o, "c", function() {
            return e;
        }), t.d(o, "a", function() {});
        var c = function() {
            var n = this;
            n.$createElement;
            n._self._c;
        }, e = [];
    }
} ]), (global.webpackJsonp = global.webpackJsonp || []).push([ "components/custom-ad/custom-ad-create-component", {
    "components/custom-ad/custom-ad-create-component": function(n, o, t) {
        t("543d").createComponent(t("dac9"));
    }
}, [ [ "components/custom-ad/custom-ad-create-component" ] ] ]);