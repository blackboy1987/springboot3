(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/fenlei/fenlei" ], {
    "452a": function(i, t, n) {
        (function(i) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var n = getApp().globalData, e = {
                data: function() {
                    return {
                        theme: n.$theme,
                        barMax: !0,
                        statusBarHeight: 0,
                        titleHeight: 0,
                        MaxClick: {
                            index: 0,
                            id: 1
                        },
                        sortlist: [ {
                            id: 0,
                            title: ""
                        }, {
                            id: 1,
                            title: ""
                        }, {
                            id: 3,
                            title: ""
                        } ],
                        MinClick: [],
                        tablist: [],
                        vodlist: [],
                        shuaixuan: !0,
                        loadingText: "加载中...",
                        noLoading: !1,
                        refreshIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAB5QTFRFcHBw3Nzct7e39vb2ycnJioqK7e3tpqam29vb////D8oK7wAAAAp0Uk5T////////////ALLMLM8AAABxSURBVHja7JVBDoAgDASrjqj//7CJBi90iyYeOHTPMwmFZrHjYyyFYYUy1bwUZqtJIYVxhf1a6u0R7iUvWsCcrEtwJHp8MwMdvh2amHduiZD3rpWId9+BgPd7Cc2LIkPyqvlQvKxKBJ//Qwq/CacAAwDUv0a0YuKhzgAAAABJRU5ErkJggg==",
                        pulling: !1,
                        refreshing: !1,
                        refreshText: "",
                        loadingMoreText: {
                            contentdown: "",
                            contentrefresh: "",
                            contentnomore: ""
                        },
                        wxAdId: [],
                        wxverify: !0,
                        adShow: !0
                    };
                },
                components: {},
                onLoad: function(i) {
                    var t = this;
                    t.initial(), t.tablist = JSON.parse(getApp().globalData.$config.feilei.type_class), 
                    this.wxverify = getApp().globalData.$wxverify, t.wxAdId = getApp().globalData.$config.feilei.wxAdId, 
                    this.MaxClick.id = this.tablist[0].type_id, t.refresh();
                },
                onReady: function() {},
                onShow: function() {
                    this.adShow = !0, this.theme = n.$theme;
                },
                onHide: function() {
                    this.adShow = !1;
                },
                onReachBottom: function() {
                    var i = this;
                    this.noLoading || (i.loadingText = "加载中...", i.noLoading = !0, setTimeout(function() {
                        i.MinClick[0].page++, i.MinClick[0].perpage = !0, i.refresh();
                    }, 1500));
                },
                onPullDownRefresh: function() {
                    this.initial(), this.refresh(!0);
                },
                methods: {
                    refresh: function(t) {
                        var n = this, e = this.MinClick[0].perpage;
                        this.loadingText = "加载中...", this.noLoading = !0;
                        var a = "&type=" + this.MaxClick.id + "&classid=" + this.MinClick[0].item + "&area=" + this.MinClick[1].item + "&year=" + this.MinClick[2].item + "&sort=" + this.MinClick[0].sortid + "&page=" + this.MinClick[0].page + "&limit=12", o = this.md5(this.MinClick[1].item + this.MinClick[0].item + "12" + this.MinClick[0].page + "App.Mov.GetCategory" + this.MinClick[0].sortid + this.MaxClick.id + this.MinClick[2].item), l = this.cjurl + "wxApi/public/?service=App.Mov.GetCategory" + a + "&sign=" + o;
                        i.request({
                            url: l,
                            dataType: "json",
                            data:{
                                token:i.getStorageSync("token"),
                                appCode:getApp().globalData.appCode,
                                appToken:getApp().globalData.appToken,
                            },
                            success: function(i) {
                                if (n.loadingText = "加载完成", 200 == i.data.Code && void 0 != i.data.Data.length) {
                                    n.noLoading = !1;
                                    var t = i.data.Data;
                                    n.vodlist = 1 == e ? n.vodlist.concat(t) : t;
                                } else n.loadingText = "我是有底线的";
                            },
                            complete: function() {
                                i.stopPullDownRefresh();
                            }
                        });
                    },
                    shuaixuantab: function() {
                        this.shuaixuan = !this.shuaixuan;
                    },
                    initial: function() {
                        this.MinClick = [ {
                            index: 0,
                            item: "全部",
                            page: 1,
                            perpage: !1,
                            all: !1,
                            sortid: 0
                        }, {
                            index: 0,
                            item: "全部"
                        }, {
                            index: 0,
                            item: "全部"
                        } ];
                    },
                    MaxTab: function(i, t) {
                        this.MaxClick.index !== i && (this.MaxClick.index = i, this.MaxClick.id = t, this.vodlist = [], 
                        this.initial(), this.refresh());
                    },
                    ClassClick: function(i, t) {
                        this.MinClick[0].index != t && (this.MinClick[0].index = t, this.MinClick[0].item = i, 
                        this.MinInitial());
                    },
                    EreaClick: function(i, t) {
                        this.MinClick[1].index != t && (this.MinClick[1].index = t, this.MinClick[1].item = i, 
                        this.MinInitial());
                    },
                    YearClick: function(i, t) {
                        this.MinClick[2].index != t && (this.MinClick[2].index = t, this.MinClick[2].item = i, 
                        this.MinInitial());
                    },
                    sortClick: function(i, t) {
                        this.MinClick[0].sortid != t && (this.MinClick[0].sortid = t, this.MinInitial());
                    },
                    MinInitial: function() {
                        this.MinClick[0].page = 1, this.MinClick[0].perpage = !1, this.vodlist = [], this.refresh();
                    },
                    getSearch: function() {
                        i.navigateTo({
                            url: "../search/search",
                            animationType: "pop-in",
                            animationDuration: 200
                        });
                    },
                    history: function() {
                        i.navigateTo({
                            url: "../history/history?tab=0",
                            animationType: "pop-in",
                            animationDuration: 200
                        });
                    },
                    pageScrollTo: function() {
                        i.pageScrollTo({
                            scrollTop: 0,
                            duration: 300
                        });
                    }
                }
            };
            t.default = e;
        }).call(this, n("543d").default);
    },
    "7d48": function(i, t, n) {
        (function(i) {
            function t(i) {
                return i && i.__esModule ? i : {
                    default: i
                };
            }
            n("3079"), t(n("66fd")), i(t(n("bf3b")).default);
        }).call(this, n("543d").createPage);
    },
    "85f7": function(i, t, n) {
        n.r(t);
        var e = n("452a"), a = n.n(e);
        for (var o in e) "default" !== o && function(i) {
            n.d(t, i, function() {
                return e[i];
            });
        }(o);
        t.default = a.a;
    },
    ae7f: function(i, t, n) {
        n.d(t, "b", function() {
            return a;
        }), n.d(t, "c", function() {
            return o;
        }), n.d(t, "a", function() {
            return e;
        });
        var e = {
            uniBar: function() {
                return Promise.all([ n.e("common/vendor"), n.e("components/uni-bar/uni-bar") ]).then(n.bind(null, "9a28"));
            },
            narBar: function() {
                return n.e("components/narBar/narBar").then(n.bind(null, "0b0a"));
            },
            customAd: function() {
                return n.e("components/custom-ad/custom-ad").then(n.bind(null, "dac9"));
            },
            vodItem: function() {
                return n.e("components/vod-item/vod-item").then(n.bind(null, "7534"));
            }
        }, a = function() {
            var i = this;
            i.$createElement;
            i._self._c;
        }, o = [];
    },
    aed7: function(i, t, n) {
        var e = n("d46e");
        n.n(e).a;
    },
    bf3b: function(i, t, n) {
        n.r(t);
        var e = n("ae7f"), a = n("85f7");
        for (var o in a) "default" !== o && function(i) {
            n.d(t, i, function() {
                return a[i];
            });
        }(o);
        n("aed7");
        var l = n("f0c5"), s = Object(l.a)(a.default, e.b, e.c, !1, null, null, null, !1, e.a, void 0);
        t.default = s.exports;
    },
    d46e: function(i, t, n) {}
}, [ [ "7d48", "common/runtime", "common/vendor" ] ] ]);