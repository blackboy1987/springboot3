!function() {
    var a = null;
    (global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/home/index" ], {
        "166d": function(a, t, e) {
            e.r(t);
            var n = e("533b"), o = e("caca");
            for (var i in o) "default" !== i && function(a) {
                e.d(t, a, function() {
                    return o[a];
                });
            }(i);
            e("ec69");
            var r = e("2877"), c = Object(r.a)(o.default, n.a, n.b, !1, null, "a2df2248", null);
            t.default = c.exports;
        },
        "2e0d": function(t, e, n) {
            (function(t) {
                function o(a) {
                    return a && a.__esModule ? a : {
                        default: a
                    };
                }
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }), e.default = void 0;
                var i = o(n("81ab")), r = o(n("2e96")), c = o(n("1b15")), s = o(n("a35f")), d = o(n("f47e")), l = n("4e22"), u = n("c7c6"), p = (new (o(n("94f5")).default)(),
                getApp()), g = {
                    data: function() {
                        return {
                            update: 0,
                            banners: [],
                            recommend: [],
                            searchRmd: [],
                            searchitem: {},
                            latest: [],
                            featured: [],
                            show: !0,
                            pageIndex: 1,
                            load: !0,
                            waitIcon: c.default,
                            searchIcon: s.default,
                            current: !0,
                            keyword: "",
                            dailybox: !1,
                            popup: [],
                            ispush: !1,
                            pushitem: [],
                            today: "",
                            focus: !1,
                            listshow: !0,
                            init_times: 0,
                            indexImg: "",
                            showindeximg: !1,
                            boxVideoAd: "",
                            showtestbox: !1,
                            newScanData: {},
                            selectstar: !1,
                            groupclose: i.default,
                            groupicon: r.default,
                            showgroupBox: !1,
                            qqGroupid: "",
                            showdingyue: "",
                            navData: "",
                            navnum: "",
                            indexAd:{},
                        };
                    },
                    onLoad: function(e) {

                        var n = this;
                        let appConfig = wx.getStorageSync("appConfig");
                        n.indexAd = appConfig.indexAd||{};

                        d.default.Page.init(), (0, u.initChannel)(e);
                        var o = {};
                        wx.createInterstitialAd && ((a = wx.createInterstitialAd({
                            adUnitId: appConfig.indexAd.interstitialAdId,
                        })).onLoad(function() {}), a.onError(function(a) {}), a.onClose(function() {})),
                        t.showLoading({
                            title: "加载中"
                        }), d.default.Event.stat("homepage", {}), "1109659848" == p.globalData.appid ? t.setNavigationBarTitle({
                            title: appConfig.name || ''
                        }) : "1109802828" == p.globalData.appid && t.setNavigationBarTitle({
                            title: appConfig.name || ''
                        }), "303" == p.globalData.source && (this.listshow = !1);
                        var i = setInterval(function() {
                            if (p.globalData.host_init_status || n.init_times >= 5) {
                                clearInterval(i);
                                var a = new Date(), t = a.getFullYear(a), r = a.getMonth(a) + 1, c = a.getDate(a);
                                n.today = t + "" + r + c, n.initHome(e, o);
                            }
                            n.init_times += 1;
                        }, 100);
                        try {
                            this.boxVideoAd = qq.createAppBox({
                                adUnitId: "319e42e9f1046f5c3323424e28ad35e9"
                            });
                        } catch (a) {}
                    },
                    onShareAppMessage: function() {
                        let appConfig = wx.getStorageSync("appConfig");
                        return {
                            title: appConfig.name+"-用测试创造惊喜！",
                            imageUrl: ""
                        };
                    },
                    onShow: function() {
                        let appConfig = wx.getStorageSync("appConfig");
                        this.selectstar = !1, "1109659848" == p.globalData.appid ? t.setNavigationBarTitle({
                            title: appConfig.name || ''
                        }) : "1109802828" == p.globalData.appid && t.setNavigationBarTitle({
                            title: appConfig.name || ''
                        }), setTimeout(function() {
                            a && a.show().catch(function(a) {
                                console.error(a);
                            });
                        }, 15e3);
                    },
                    components: {
                        SearchBox: function() {
                            return Promise.all([ n.e("common/vendor"), n.e("components/SearchBox") ]).then(n.bind(null, "f1fb"));
                        },
                        SwiperBox: function() {
                            return n.e("components/SwiperBox").then(n.bind(null, "f265"));
                        },
                        GridBox: function() {
                            return Promise.all([ n.e("common/vendor"), n.e("components/GridBox") ]).then(n.bind(null, "0585"));
                        },
                        ListBox: function() {
                            return Promise.all([ n.e("common/vendor"), n.e("components/ListBox") ]).then(n.bind(null, "493d"));
                        },
                        LoadBox: function() {
                            return n.e("components/LoadBox").then(n.bind(null, "e82a"));
                        },
                        PopupBox: function() {
                            return Promise.all([ n.e("common/vendor"), n.e("components/PopupBox") ]).then(n.bind(null, "240f"));
                        },
                        NavgationBox: function() {
                            return Promise.all([ n.e("common/vendor"), n.e("components/NavgationBox") ]).then(n.bind(null, "326a"));
                        },
                        PoptestBox: function() {
                            return Promise.all([ n.e("common/vendor"), n.e("components/PoptestBox") ]).then(n.bind(null, "6234"));
                        },
                        SelectStarBox: function() {
                            return Promise.all([ n.e("common/vendor"), n.e("components/SelectStar") ]).then(n.bind(null, "6cc0"));
                        }
                    },
                    methods: {
                        initHome: function(a, e) {
                            var n = this, o = {
                                env: p.globalData.env,
                                ver: p.globalData.ver,
                                appid: p.globalData.appid,
                                scene: p.globalData.scene,
                                src: p.globalData.src,
                                source: p.globalData.source
                            };
                            a.g && (o.scan_gid = a.g), a.q && (o.q = a.q);
                            var i = t.getStorageSync("star") ? t.getStorageSync("star") : 0;
                            o.star_id = i;
                            var r = t.getStorageSync("Gridlist") ? t.getStorageSync("Gridlist") : [], c = t.getStorageSync("appidList") ? t.getStorageSync("appidList") : [];
                            r.length > 20 && (r = r.slice(0, 20), t.setStorageSync("Gridlist", r)), o.history_rcmd = r.join(),
                            o.history_app = c.join(), t.request({
                                url: p.globalData.host + "/index.php/App/index/qqindexData",
                                header: {
                                    "content-type": "application/x-www-form-urlencoded"
                                },
                                method: "POST",
                                data: o,
                                success: function(o) {
                                    n.searchRmd = o.data.searchRmd;
                                    var i = 0;
                                    n.searchitem = n.searchRmd[i], setInterval(function() {
                                        ++i >= n.searchRmd.length && (i = 0), n.searchitem = n.searchRmd[i];
                                    }, 3e3), n.recommend = o.data.recommend, n.navData = o.data.nav;
                                    for (var r = 0; r < n.navData.length; r++) if ("/pages/home/index" == n.navData[r].path) {
                                        n.navnum = r;
                                        break;
                                    }
                                    n.banners = o.data.banner;
                                    var c = t.getStorageSync("daily_recommend_status"), s = !1;
                                    if (1 == o.data.daily.show_daily_box && (n.ispush || c == n.today || (t.setStorageSync("daily_recommend_status", n.today),
                                    s = !0)), o.data.indexImg) {
                                        var d = n.today + o.data.indexImg.id;
                                        d == t.getStorageSync("today_img") || (t.setStorageSync("today_img", d), n.showindeximg = !0,
                                        o.data.indexImg.src = l.static_host + o.data.indexImg.src, n.indexImg = o.data.indexImg);
                                    }
                                    o.data.channel && (p.globalData.src = o.data.channel.src, p.globalData.template = o.data.channel.template);
                                    var g = o.data.qqGroup ? o.data.qqGroup : {};
                                    g.status && (n.showgroupBox = !0, n.qqGroupid = g.groupid), p.globalData.adbox = o.data.boxAd,
                                    n.dailybox = !(1 != o.data.daily.show_daily_box || !s), n.popup = {
                                        update: o.data.daily.count,
                                        items: o.data.daily.list
                                    };
                                    var h = o.data.lists.map(function(a, t) {
                                        return a.img = l.static_host + a.img + "?imageView2/1/w/100/h/100", a;
                                    });
                                    n.latest = n.latest.concat(h), 1 == n.pageIndex && (n.featured = n.latest),
                                    o.data.scandata && (0, u.playGame)(o.data.scandata);
                                    var m = o.data.newScanData ? o.data.newScanData : {};
                                    n.showtestbox = m.showScanbox, a.g && (m.showScanbox ? n.showtestbox = m.showScanbox : (0,
                                    u.playGame)({
                                        gid: a.g
                                    })), a.q && (1 == p.globalData.template ? t.navigateTo({
                                        url: "/pages/quiz/index?q=".concat(a.q)
                                    }) : 2 == p.globalData.template && t.navigateTo({
                                        url: "/pages/quizchoiceness/index?q=".concat(a.q)
                                    })), m.data && (m.data.img = l.static_host + m.data.logo), n.newScanData = m, n.pageIndex += 1,
                                    a.ispush && (0, u.playGame)(a), e.ispush && (0, u.playGame)(e);
                                },
                                complete: function() {
                                    t.hideLoading();
                                }
                            });
                        },
                        getPagedata: function() {
                            var a = this;
                            this.load && (this.load = !1, t.request({
                                url: p.globalData.host + "/index.php/App/index/getPageData",
                                method: "POST",
                                header: {
                                    "content-type": "application/x-www-form-urlencoded"
                                },
                                data: {
                                    pageIndex: this.pageIndex,
                                    appid: p.globalData.appid,
                                    ver: p.globalData.ver
                                },
                                success: function(t) {
                                    if (200 == t.statusCode) {
                                        var e = t.data.map(function(a, t) {
                                            return a.img = l.static_host + a.img + "?imageView2/1/w/100/h/100", a;
                                        });
                                        a.latest.shift(), a.latest = a.latest.concat(e), 1 == a.pageIndex && (a.featured = a.latest),
                                        a.pageIndex += 1;
                                    }
                                    a.load = !0;
                                },
                                fail: function(t) {
                                    a.load = !0;
                                }
                            }));
                        },
                        switchContent: function(a) {
                            var t = this;
                            this.current = a, a ? (this.keyword = "", this.focus = !1) : setTimeout(function() {
                                t.focus = !0;
                            }, 300);
                        },
                        search: function(a) {
                            if (a) t.navigateTo({
                                url: "/pages/Search/Search?keyword=".concat(a)
                            }); else {
                                var e = this.keyword;
                                this.keyword = "", t.navigateTo({
                                    url: "/pages/Search/Search?keyword=".concat(e)
                                });
                            }
                        },
                        toSearch: function(a) {
                            t.navigateTo({
                                url: "/pages/Search/Search?keyword=".concat(a.keyword)
                            });
                        },
                        scrollToLists: function() {
                            setTimeout(function() {
                                t.pageScrollTo({
                                    scrollTop: 2e3,
                                    duration: 300
                                });
                            }, 500);
                        },
                        bindStar: function(a) {
                            var e = this, n = t.getStorageSync("MiniProgram");
                            d.default.Event.stat("navigateMiniProgram", {
                                minitype: n.appid + "_1"
                            }), t.navigateToMiniProgram({
                                appId: n.appid,
                                path: n.path + "?star=" + a + "&target=" + n.appid + "&from=1109659848&channel=" + n.channel,
                                success: function(o) {
                                    d.default.Event.stat("navigateMiniProgram", {
                                        minitype: n.appid + "_2"
                                    }), d.default.Event.stat("jumpluka", {
                                        hasstar: 0
                                    }), t.setStorageSync("star", a), console.log(n.path + "?star=" + a + "&target=" + n.appid + "&from=1109659848&channel=2"),
                                    e.selectstar = !1, e.initHome({});
                                }
                            });
                        }
                    }
                };
                e.default = g;
            }).call(this, n("543d").default);
        },
        "533b": function(a, t, e) {
            var n = function() {
                this.$createElement, this._self._c;
            }, o = [];
            e.d(t, "a", function() {
                return n;
            }), e.d(t, "b", function() {
                return o;
            });
        },
        "6cf4": function(a, t, e) {
            (function(a) {
                function t(a) {
                    return a && a.__esModule ? a : {
                        default: a
                    };
                }
                e("8b22"), e("921b"), t(e("66fd")), a(t(e("166d")).default);
            }).call(this, e("543d").createPage);
        },
        caca: function(a, t, e) {
            e.r(t);
            var n = e("2e0d"), o = e.n(n);
            for (var i in n) "default" !== i && function(a) {
                e.d(t, a, function() {
                    return n[a];
                });
            }(i);
            t.default = o.a;
        },
        df20: function(a, t, e) {},
        ec69: function(a, t, e) {
            var n = e("df20");
            e.n(n).a;
        }
    }, [ [ "6cf4", "common/runtime", "common/vendor" ] ] ]);
}();
