(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/tuijian/tuijian" ], {
    "05ef": function(t, n, e) {
        e.r(n);
        var i = e("b613"), o = e.n(i);
        for (var a in i) "default" !== a && function(t) {
            e.d(n, t, function() {
                return i[t];
            });
        }(a);
        n.default = o.a;
    },
    "0abc": function(t, n, e) {},
    "439c": function(t, n, e) {
        var i = e("0abc");
        e.n(i).a;
    },
    a93b: function(t, n, e) {
        e.r(n);
        var i = e("b819"), o = e("05ef");
        for (var a in o) "default" !== a && function(t) {
            e.d(n, t, function() {
                return o[t];
            });
        }(a);
        e("439c");
        var l = e("f0c5"), d = Object(l.a)(o.default, i.b, i.c, !1, null, null, null, !1, i.a, void 0);
        n.default = d.exports;
    },
    b613: function(t, n, e) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var i = getApp().globalData, o = {
            data: function() {
                return {
                    theme: i.$theme,
                    vodlist: [],
                    wxAdId: [],
                    levelID: 0,
                    levelName: "电影推荐",
                    page: 1,
                    loadingText: "加载中...",
                    noLoading: !1
                };
            },
            onLoad: function(t) {
                this.levelID = t.id, this.levelName = t.name;
            },
            onHide: function() {},
            onReady: function() {
                var t = this;
                i.$login ? t.refresh(t.levelID) : setTimeout(function() {
                    t.refresh(t.levelID);
                }, 300);
            },
            onShareAppMessage: function(t) {
                return {
                    title: "一周" + this.levelName,
                    path: "pages/tuijian/tuijian?id=" + this.levelID,
                    imageUrl: this.vodlist[0].vod_pic
                };
            },
            onShareTimeline: function(t) {
                return {
                    title: "一周" + this.levelName,
                    path: "pages/tuijian/tuijian?id=" + this.levelID,
                    imageUrl: this.vodlist[0].vod_pic
                };
            },
            onReachBottom: function() {
                var t = this;
                this.noLoading || (t.loadingText = "加载中...", t.noLoading = !0, setTimeout(function() {
                    t.page++, t.refresh(t.levelID);
                }, 1500));
            },
            methods: {
                refresh: function(t) {
                    var n = this;
                    this.loadingText = "加载中...", this.noLoading = !0;
                    var e = this.md5(t + this.page + "App.Mov.GetLevelId"), i = this.cjurl + "wxApi/public/?service=App.Mov.GetLevelId&level=" + t + "&page=" + this.page + "&sign=" + e;
                    this.api.apiRequest(i).then(function(t) {
                        n.loadingText = "加载完成", 200 == t.Code && void 0 != t.Data.length ? (n.noLoading = !1, 
                        n.vodlist.length < 1 ? (n.vodlist = t.Data, n.init()) : n.vodlist = n.vodlist.concat(t.Data)) : n.loadingText = "我是有底线的";
                    });
                },
                init: function() {
                    var t = this, n = this;
                    this.wxAdId = i.$config.topic.wxAdId, wx.createInterstitialAd && this.wxAdId.cpId && (this.interstitialAd = wx.createInterstitialAd({
                        adUnitId: this.wxAdId.cpId
                    }), this.interstitialAd.onLoad(function() {}), this.interstitialAd.onError(function(t) {}), 
                    this.interstitialAd.onClose(function() {
                        t.interstitialAd.destroy(), t.interstitialAd = null;
                    })), this.interstitialAd && setTimeout(function() {
                        n.interstitialAd.show().catch(function(t) {
                            console.error(t);
                        });
                    }, 1500);
                }
            }
        };
        n.default = o;
    },
    b819: function(t, n, e) {
        e.d(n, "b", function() {
            return o;
        }), e.d(n, "c", function() {
            return a;
        }), e.d(n, "a", function() {
            return i;
        });
        var i = {
            narBar: function() {
                return e.e("components/narBar/narBar").then(e.bind(null, "0b0a"));
            },
            customAd: function() {
                return e.e("components/custom-ad/custom-ad").then(e.bind(null, "dac9"));
            },
            shuvodlist: function() {
                return Promise.all([ e.e("common/vendor"), e.e("components/shuvodlist/shuvodlist") ]).then(e.bind(null, "de97"));
            }
        }, o = function() {
            var t = this;
            t.$createElement;
            t._self._c;
        }, a = [];
    },
    e60d: function(t, n, e) {
        (function(t) {
            function n(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            e("3079"), n(e("66fd")), t(n(e("a93b")).default);
        }).call(this, e("543d").createPage);
    }
}, [ [ "e60d", "common/runtime", "common/vendor" ] ] ]);