(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/richText/richText" ], {
    "3c0f": function(t, n, e) {
        e.d(n, "b", function() {
            return a;
        }), e.d(n, "c", function() {
            return i;
        }), e.d(n, "a", function() {
            return r;
        });
        var r = {
            narBar: function() {
                return e.e("components/narBar/narBar").then(e.bind(null, "0b0a"));
            },
            jyfParser: function() {
                return Promise.all([ e.e("common/vendor"), e.e("components/jyf-parser/jyf-parser") ]).then(e.bind(null, "804f"));
            }
        }, a = function() {
            var t = this;
            t.$createElement;
            t._self._c;
        }, i = [];
    },
    "4bc6": function(t, n, e) {
        e.r(n);
        var r = e("3c0f"), a = e("5130");
        for (var i in a) "default" !== i && function(t) {
            e.d(n, t, function() {
                return a[t];
            });
        }(i);
        var o = e("f0c5"), u = Object(o.a)(a.default, r.b, r.c, !1, null, null, null, !1, r.a, void 0);
        n.default = u.exports;
    },
    5130: function(t, n, e) {
        e.r(n);
        var r = e("5d27"), a = e.n(r);
        for (var i in r) "default" !== i && function(t) {
            e.d(n, t, function() {
                return r[t];
            });
        }(i);
        n.default = a.a;
    },
    "5d27": function(t, n, e) {
        (function(t) {
            Object.defineProperty(n, "__esModule", {
                value: !0
            }), n.default = void 0;
            var e = getApp().globalData, r = {
                data: function() {
                    return {
                        theme: e.$theme,
                        artData: [],
                        type: ""
                    };
                },
                onLoad: function(t) {
                    var n = this;
                    this.type = t.type, e.$login ? n.refresh(t.id) : setTimeout(function() {
                        n.refresh(t.id);
                    }, 300);
                },
                onReady: function() {},
                methods: {
                    refresh: function(n) {
                        var e = this;
                        t.showLoading({
                            mask: !0,
                            title: "加载中..."
                        });
                        var r = this.md5(n + this.mark + "App.Art.GetArtId"), a = this.cjurl + "wxApi/public/?service=App.Art.GetArtId&artid=" + n + "&mark=" + this.mark + "&sign=" + r;
                        this.api.apiRequest(a).then(function(n) {
                            t.hideLoading(), 200 == n.Code && (e.artData = n.Data, t.setNavigationBarTitle({
                                title: e.artData.art_name
                            }));
                        });
                    },
                    ready: function(t) {},
                    imgtap: function(t) {},
                    linkpress: function(t) {},
                    error: function(t) {
                        console.error(t);
                    }
                }
            };
            n.default = r;
        }).call(this, e("543d").default);
    },
    b8ff: function(t, n, e) {
        (function(t) {
            function n(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            e("3079"), n(e("66fd")), t(n(e("4bc6")).default);
        }).call(this, e("543d").createPage);
    }
}, [ [ "b8ff", "common/runtime", "common/vendor" ] ] ]);