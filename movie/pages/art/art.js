(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/art/art" ], {
    "003c": function(t, i, n) {
        (function(t) {
            Object.defineProperty(i, "__esModule", {
                value: !0
            }), i.default = void 0;
            var n = getApp().globalData, a = {
                data: function() {
                    return {
                        theme: n.$theme,
                        artData: [],
                        wxAdId: [],
                        artid: 0
                    };
                },
                onLoad: function(t) {
                    this.artid = t.id;
                },
                onHide: function() {},
                onReady: function() {
                    var t = this;
                    n.$login ? t.refresh(t.artid) : setTimeout(function() {
                        t.refresh(t.artid);
                    }, 300);
                },
                onShareAppMessage: function(t) {
                    return {
                        title: this.artData.topic_name,
                        path: "pages/art/art?id=" + this.artData.topic_id,
                        success: function(t) {},
                        fail: function(t) {}
                    };
                },
                onShareTimeline: function(t) {
                    return {
                        title: this.artData.topic_name,
                        path: "pages/art/art?id=" + this.artData.topic_id,
                        imageUrl: this.artData.topic_pic
                    };
                },
                methods: {
                    refresh: function(i) {
                        var n = this;
                        t.showLoading({
                            mask: !0,
                            title: "加载中..."
                        });
                        var a = this.md5(this.mark + "App.Topic.GetTopicId" + i), e = this.cjurl + "wxApi/public/?service=App.Topic.GetTopicId&topid=" + i + "&mark=" + this.mark + "&sign=" + a;
                        this.api.apiRequest(e).then(function(i) {
                            t.hideLoading(), 200 == i.Code && (n.artData = i.Data, t.setNavigationBarTitle({
                                title: n.artData.name
                            }), n.init());
                        });
                    },
                    init: function() {
                        var t = this, i = this;
                        this.wxAdId = n.$config.topic.wxAdId, wx.createInterstitialAd && this.wxAdId.cpId && (this.interstitialAd = wx.createInterstitialAd({
                            adUnitId: this.wxAdId.cpId
                        }), this.interstitialAd.onLoad(function() {}), this.interstitialAd.onError(function(t) {}), 
                        this.interstitialAd.onClose(function() {
                            t.interstitialAd.destroy(), t.interstitialAd = null;
                        })), this.interstitialAd && setTimeout(function() {
                            i.interstitialAd.show().catch(function(t) {
                                console.error(t);
                            });
                        }, 1500);
                    }
                }
            };
            i.default = a;
        }).call(this, n("543d").default);
    },
    "33b3": function(t, i, n) {
        n.r(i);
        var a = n("6c9c"), e = n("5b8f");
        for (var o in e) "default" !== o && function(t) {
            n.d(i, t, function() {
                return e[t];
            });
        }(o);
        n("b19b");
        var r = n("f0c5"), c = Object(r.a)(e.default, a.b, a.c, !1, null, null, null, !1, a.a, void 0);
        i.default = c.exports;
    },
    "5b8f": function(t, i, n) {
        n.r(i);
        var a = n("003c"), e = n.n(a);
        for (var o in a) "default" !== o && function(t) {
            n.d(i, t, function() {
                return a[t];
            });
        }(o);
        i.default = e.a;
    },
    "67fb": function(t, i, n) {
        (function(t) {
            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            n("3079"), i(n("66fd")), t(i(n("33b3")).default);
        }).call(this, n("543d").createPage);
    },
    "6c9c": function(t, i, n) {
        n.d(i, "b", function() {
            return e;
        }), n.d(i, "c", function() {
            return o;
        }), n.d(i, "a", function() {
            return a;
        });
        var a = {
            narBar: function() {
                return n.e("components/narBar/narBar").then(n.bind(null, "0b0a"));
            },
            customAd: function() {
                return n.e("components/custom-ad/custom-ad").then(n.bind(null, "dac9"));
            },
            shuvodlist: function() {
                return Promise.all([ n.e("common/vendor"), n.e("components/shuvodlist/shuvodlist") ]).then(n.bind(null, "de97"));
            }
        }, e = function() {
            var t = this;
            t.$createElement;
            t._self._c;
        }, o = [];
    },
    "8e1c": function(t, i, n) {},
    b19b: function(t, i, n) {
        var a = n("8e1c");
        n.n(a).a;
    }
}, [ [ "67fb", "common/runtime", "common/vendor" ] ] ]);