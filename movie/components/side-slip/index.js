(global.webpackJsonp = global.webpackJsonp || []).push([ [ "components/side-slip/index" ], {
    5385: function(e, n, t) {
        t.d(n, "b", function() {
            return o;
        }), t.d(n, "c", function() {
            return i;
        }), t.d(n, "a", function() {});
        var o = function() {
            var e = this;
            e.$createElement;
            e._self._c;
        }, i = [];
    },
    "595e": function(e, n, t) {},
    b28e: function(e, n, t) {
        t.r(n);
        var o = t("d929"), i = t.n(o);
        for (var c in o) "default" !== c && function(e) {
            t.d(n, e, function() {
                return o[e];
            });
        }(c);
        n.default = i.a;
    },
    bffb: function(e, n, t) {
        var o = t("595e");
        t.n(o).a;
    },
    d929: function(e, n, t) {
        (function(e) {
            Object.defineProperty(n, "__esModule", {
                value: !0
            }), n.default = void 0;
            var t = {
                props: {},
                data: function() {
                    return {
                        x: 0,
                        move: 0,
                        open: !1
                    };
                },
                watch: {},
                mounted: function() {
                    var n = e.getSystemInfoSync().windowWidth;
                    this.deleteBtnWidth = (n || 375) / 375 * 80;
                },
                methods: {
                    remove: function() {
                        this.move = 0, this.open = !1, this.$emit("remove");
                    },
                    change: function(e) {
                        this.x = e.detail.x;
                    },
                    touchend: function() {
                        var e = this.x;
                        this.open ? e > 20 - this.deleteBtnWidth ? (this.move = 0, this.open = !1) : (this.move = -this.deleteBtnWidth, 
                        this.open = !0) : e < -20 ? (this.move = -this.deleteBtnWidth, this.open = !0) : (this.move = 0, 
                        this.open = !1);
                    }
                }
            };
            n.default = t;
        }).call(this, t("543d").default);
    },
    de31: function(e, n, t) {
        t.r(n);
        var o = t("5385"), i = t("b28e");
        for (var c in i) "default" !== c && function(e) {
            t.d(n, e, function() {
                return i[e];
            });
        }(c);
        t("bffb");
        var d = t("f0c5"), s = Object(d.a)(i.default, o.b, o.c, !1, null, "54c88fd8", null, !1, o.a, void 0);
        n.default = s.exports;
    }
} ]), (global.webpackJsonp = global.webpackJsonp || []).push([ "components/side-slip/index-create-component", {
    "components/side-slip/index-create-component": function(e, n, t) {
        t("543d").createComponent(t("de31"));
    }
}, [ [ "components/side-slip/index-create-component" ] ] ]);