(global.webpackJsonp = global.webpackJsonp || []).push([ [ "components/vod-item/vod-item" ], {
    "05bb": function(t, n, e) {
        (function(t) {
            Object.defineProperty(n, "__esModule", {
                value: !0
            }), n.default = void 0, getApp().globalData;
            var e = {
                data: function() {
                    return {
                        WxVerify: "0",
                        picError: !1,
                        picLoad: !1,
                        showImg: !1
                    };
                },
                props: {
                    theme: {
                        type: [ String ],
                        default: "white"
                    },
                    item: {
                        type: Object,
                        defual: function() {
                            return {};
                        }
                    },
                    scrollTop: {
                        type: [ Number, String ],
                        default: 0
                    },
                    itemClick: {
                        type: Boolean,
                        default: !0
                    }
                },
                mounted: function() {},
                filters: {
                    ellipsis: function(t) {
                        return t ? t.length > 7 ? t.slice(0, 6) + "..." : t : "";
                    }
                },
                methods: {
                    play: function(n) {
                        t.setStorageSync("$voddata", n), this.itemClick && t.navigateTo({
                            url: "../detail/detail?id=" + n.vod_id
                        });
                    },
                    imgload: function(t) {
                        this.showImg = !0;
                    },
                    imgError: function(t) {
                        this.picError = !0;
                    }
                }
            };
            n.default = e;
        }).call(this, e("543d").default);
    },
    "3c66": function(t, n, e) {
        var o = e("c99f");
        e.n(o).a;
    },
    "63bc": function(t, n, e) {
        e.r(n);
        var o = e("05bb"), i = e.n(o);
        for (var c in o) "default" !== c && function(t) {
            e.d(n, t, function() {
                return o[t];
            });
        }(c);
        n.default = i.a;
    },
    7534: function(t, n, e) {
        e.r(n);
        var o = e("9464"), i = e("63bc");
        for (var c in i) "default" !== c && function(t) {
            e.d(n, t, function() {
                return i[t];
            });
        }(c);
        e("3c66");
        var a = e("f0c5"), r = Object(a.a)(i.default, o.b, o.c, !1, null, null, null, !1, o.a, void 0);
        n.default = r.exports;
    },
    9464: function(t, n, e) {
        e.d(n, "b", function() {
            return o;
        }), e.d(n, "c", function() {
            return i;
        }), e.d(n, "a", function() {});
        var o = function() {
            var t = this;
            t.$createElement;
            t._self._c;
        }, i = [];
    },
    c99f: function(t, n, e) {}
} ]), (global.webpackJsonp = global.webpackJsonp || []).push([ "components/vod-item/vod-item-create-component", {
    "components/vod-item/vod-item-create-component": function(t, n, e) {
        e("543d").createComponent(e("7534"));
    }
}, [ [ "components/vod-item/vod-item-create-component" ] ] ]);