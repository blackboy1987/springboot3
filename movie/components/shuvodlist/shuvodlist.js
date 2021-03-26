(global.webpackJsonp = global.webpackJsonp || []).push([ [ "components/shuvodlist/shuvodlist" ], {
    "1b20": function(t, n, e) {
        (function(t) {
            function o(t, n, e, o, i, u, r) {
                try {
                    var a = t[u](r), c = a.value;
                } catch (t) {
                    return void e(t);
                }
                a.done ? n(c) : Promise.resolve(c).then(o, i);
            }
            function i(t) {
                return function() {
                    var n = this, e = arguments;
                    return new Promise(function(i, u) {
                        function r(t) {
                            o(c, i, u, r, a, "next", t);
                        }
                        function a(t) {
                            o(c, i, u, r, a, "throw", t);
                        }
                        var c = t.apply(n, e);
                        r(void 0);
                    });
                };
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            }), n.default = void 0;
            var u = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }(e("a34a")), r = {
                name: "shuvodlist",
                data: function() {
                    return {
                        WxVerify: !0,
                        picError: !1,
                        picLoad: !1,
                        showImg: !1,
                        vod_content: ""
                    };
                },
                props: {
                    item: {
                        type: Object,
                        defual: function() {
                            return [];
                        }
                    },
                    lishi: {
                        type: Boolean,
                        default: !0
                    },
                    theme: {
                        type: [ String ],
                        default: "white"
                    }
                },
                created: function() {
                    this.item.vod_content && (this.vod_content = this.item.vod_content.replace(/<[^bai>]+>/g, ""));
                },
                mounted: function() {
                    var t = this;
                    return i(u.default.mark(function n() {
                        return u.default.wrap(function(n) {
                            for (;;) switch (n.prev = n.next) {
                              case 0:
                                t.WxVerify = getApp().globalData.$wxverify;

                              case 1:
                              case "end":
                                return n.stop();
                            }
                        }, n);
                    }))();
                },
                methods: {
                    play: function(n) {
                        t.navigateTo({
                            url: "../detail/detail?id=" + n
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
            n.default = r;
        }).call(this, e("543d").default);
    },
    "2d6e": function(t, n, e) {},
    6622: function(t, n, e) {
        var o = e("2d6e");
        e.n(o).a;
    },
    "66bf": function(t, n, e) {
        e.r(n);
        var o = e("1b20"), i = e.n(o);
        for (var u in o) "default" !== u && function(t) {
            e.d(n, t, function() {
                return o[t];
            });
        }(u);
        n.default = i.a;
    },
    c006: function(t, n, e) {
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
    de97: function(t, n, e) {
        e.r(n);
        var o = e("c006"), i = e("66bf");
        for (var u in i) "default" !== u && function(t) {
            e.d(n, t, function() {
                return i[t];
            });
        }(u);
        e("6622");
        var r = e("f0c5"), a = Object(r.a)(i.default, o.b, o.c, !1, null, null, null, !1, o.a, void 0);
        n.default = a.exports;
    }
} ]), (global.webpackJsonp = global.webpackJsonp || []).push([ "components/shuvodlist/shuvodlist-create-component", {
    "components/shuvodlist/shuvodlist-create-component": function(t, n, e) {
        e("543d").createComponent(e("de97"));
    }
}, [ [ "components/shuvodlist/shuvodlist-create-component" ] ] ]);