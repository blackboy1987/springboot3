(global.webpackJsonp = global.webpackJsonp || []).push([ [ "components/NavgationBox" ], {
    "144f": function(t, e, a) {
        var n = a("6c33");
        a.n(n).a;
    },
    3206: function(t, e, a) {
        (function(t) {
            function n(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0, n(a("bfc5")), n(a("c7cd")), n(a("eea2")), n(a("b902")),
            n(a("939d")), n(a("c571"));
            var o = n(a("f47e")), c = !0, i = getApp(), s = {
                name: "NavgationBox",
                props: [ "page", "navdata" ],
                data: function() {
                    return {
                        current_page: this.page,
                        boxVideoAd: "",
                        show: !1,
                        recommendP: i.globalData.adbox,
                        canclick: !0
                    };
                },
                methods: {
                    switchPage: function(e, a) {
                        var n = this;
                        if (a == this.page) return !1;
                        if (1 == e.type) 10 == parseInt(this.current_page) ? (console.log("reLaunch"), t.reLaunch({
                            url: e.path
                        })) : (t.switchTab({
                            url: e.path
                        })); else if (2 == e.type) o.default.Event.stat("navigateMiniProgram", {
                            minitype: e.appid + "_1"
                        }), t.navigateToMiniProgram({
                            appId: e.appid,
                            path: e.path,
                            success: function() {
                                o.default.Event.stat("navigateMiniProgram", {
                                    minitype: e.appid + "_2"
                                });
                            }
                        }); else if (3 == e.type) {
                            o.default.Event.stat("indexswitch", {
                                switchtype: i.globalData.ver + "_3"
                            }), this.canclick = !1, this.recommendP = i.globalData.adbox, c = !0, t.showLoading({
                                title: "正在加载 ",
                                mask: !0
                            });
                            try {
                                var s = qq.createAppBox({
                                    adUnitId: "adunit-3a16c4156cee2b51"
                                });
                                s.load().then(function() {
                                    s.show().then(function() {
                                         t.hideLoading();
                                    }).catch(function() {
                                        t.hideLoading(), n.show = !0, o.default.Event.stat("boxadshow", {
                                            boxtype: 2
                                        });
                                    });
                                }).catch(function() {
                                    t.hideLoading(), n.show = !0, console.log("aaaaaaaa");
                                }), s.onClose(function(t) {
                                    c && (c = !1, n.canclick = !0, s.destroy(), o.default.Event.stat("boxadshow", {
                                        boxtype: 1
                                    }));
                                }), s.onError(function(t) {
                                    c && (c = !1, n.show = !0, o.default.Event.stat("boxadshow", {
                                        boxtype: 2
                                    }));
                                });
                            } catch (e) {
                                console.log("eeeeeeeeeeeeeeeee"), t.hideLoading(), this.show = !0, o.default.Event.stat("boxadshow", {
                                    boxtype: 2
                                });
                            }
                        }
                    },
                    clickcancel: function() {
                        this.show = !1, this.canclick = !0;
                    },
                    jumpother: function(e) {
                        t.navigateToMiniProgram({
                            appId: e.appid,
                            path: e.path
                        });
                    }
                }
            };
            e.default = s;
        }).call(this, a("543d").default);
    },
    "326a": function(t, e, a) {
        a.r(e);
        var n = a("bc99"), o = a("ecb9");
        for (var c in o) "default" !== c && function(t) {
            a.d(e, t, function() {
                return o[t];
            });
        }(c);
        a("144f");
        var i = a("2877"), s = Object(i.a)(o.default, n.a, n.b, !1, null, "203e0491", null);
        e.default = s.exports;
    },
    "6c33": function(t, e, a) {},
    bc99: function(t, e, a) {
        var n = function() {
            this.$createElement, this._self._c;
        }, o = [];
        a.d(e, "a", function() {
            return n;
        }), a.d(e, "b", function() {
            return o;
        });
    },
    ecb9: function(t, e, a) {
        a.r(e);
        var n = a("3206"), o = a.n(n);
        for (var c in n) "default" !== c && function(t) {
            a.d(e, t, function() {
                return n[t];
            });
        }(c);
        e.default = o.a;
    }
} ]), (global.webpackJsonp = global.webpackJsonp || []).push([ "components/NavgationBox-create-component", {
    "components/NavgationBox-create-component": function(t, e, a) {
        a("543d").createComponent(a("326a"));
    }
}, [ [ "components/NavgationBox-create-component" ] ] ]);
