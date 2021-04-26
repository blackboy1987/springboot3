!function() {
    var t = null;
    const appConfig = wx.getStorageSync("appConfig");
    (global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/Category/Category" ], {
        "0014": function(t, e, a) {},
        "41fa": function(t, e, a) {
            a.r(e);
            var i = a("720e"), n = a("f861");
            for (var o in n) "default" !== o && function(t) {
                a.d(e, t, function() {
                    return n[t];
                });
            }(o);
            a("86fe");
            var r = a("2877"), s = Object(r.a)(n.default, i.a, i.b, !1, null, "b9462a96", null);
            e.default = s.exports;
        },
        "720e": function(t, e, a) {
            var i = function() {
                this.$createElement, this._self._c;
            }, n = [];
            a.d(e, "a", function() {
                return i;
            }), a.d(e, "b", function() {
                return n;
            });
        },
        "86fe": function(t, e, a) {
            var i = a("0014");
            a.n(i).a;
        },
        dba0: function(e, a, i) {
            (function(e) {
                function n(t) {
                    return t && t.__esModule ? t : {
                        default: t
                    };
                }
                Object.defineProperty(a, "__esModule", {
                    value: !0
                }), a.default = void 0;
                var o = n(i("129d")), r = n(i("4cbf")), s = n(i("1b15")), c = i("4e22"), d = i("c7c6"), u = n(i("f47e")), g = getApp(), l = {
                    onLoad: function(a) {
                        var i = this;

                        const ads = wx.getStorageSync("appConfig").indexAd||{};
                        i.ads = ads;

                        wx.createInterstitialAd && ((t = wx.createInterstitialAd({
                            adUnitId: ads.interstitialAdId
                        })).onLoad(function() {}), t.onError(function(t) {}), t.onClose(function() {})),
                        e.showLoading({
                            title: "加载中"
                        }), (0, d.initChannel)(a), console.log(a), 1 == a.ispush && (this.push_gid = a.push_gid);
                        var n = e.getStorageSync("category_cid") ? e.getStorageSync("category_cid") : a.cid;
                        this.cid = n || 14;
                        var o = setInterval(function() {
                            (g.globalData.host_init_status || i.init_times >= 5) && (clearInterval(o), i.getQQboxaddata(function() {
                                i.getCategory();
                            })), i.init_times += 1;
                        }, 100);
                    },
                    onShow: function() {
                        setTimeout(function() {
                            t && t.show().catch(function(t) {
                                console.error(t);
                            });
                        }, 3e3);
                        var a = e.getStorageSync("category_cid");
                        if (this.onshow && a) {
                            this.cid = a;
                            for (var i = 0; i < this.subCategories.length; i++) if (this.subCategories[i].id = this.cid) {
                                var n = i, o = this.subCategories[i];
                                this.switchTab(o, n);
                            }
                            e.removeStorageSync("category_cid");
                        }
                        this.onshow = 1;
                    },
                    onReady: function() {},
                    onShareAppMessage: function() {
                        return {
                            title: appConfig.name+"-用测试创造惊喜",
                            imageUrl: ""
                        };
                    },
                    data: function() {
                        return {
                            categories: [],
                            subCategories: [],
                            container: [],
                            num: 0,
                            height: 0,
                            downIcon: o.default,
                            selectIcon: r.default,
                            isActive: !1,
                            order: "time",
                            load: !0,
                            waitIcon: s.default,
                            listshow: !0,
                            init_times: 0,
                            push_gid: "",
                            cid: "4",
                            onshow: 0,
                            boxVideoAd: "",
                            navData: "",
                            selectstar: !1,
                            navnum: 0,
                            nomorequiz: [],
                            ads:{}
                        };
                    },
                    components: {
                        NavgationBox: function() {
                            return Promise.all([ i.e("common/vendor"), i.e("components/NavgationBox") ]).then(i.bind(null, "326a"));
                        },
                        SearchBox: function() {
                            return Promise.all([ i.e("common/vendor"), i.e("components/SearchBox") ]).then(i.bind(null, "f1fb"));
                        },
                        SelectStarBox: function() {
                            return Promise.all([ i.e("common/vendor"), i.e("components/SelectStar") ]).then(i.bind(null, "6cc0"));
                        }
                    },
                    methods: {
                        touchmove: function() {
                            return !1;
                        },
                        switchTab: function(t, e) {
                            console.log(t, e), this.cid = t.id, this.num = parseInt(e);
                            var a = this.subCategories[this.num];
                            this.subCategories[this.num][this.order + "_page"] > 1 ? this.container = this.subCategories[this.num][this.order + "_list"] : this.getSubCategory(this.num, a.cid, a.order, a[this.order + "_page"]);
                        },
                        getQQboxaddata: function(t) {
                            var a = this;
                            e.request({
                                url: g.globalData.host + "/index.php/App/Index/qqCategoryData",
                                data: {
                                    appid: g.globalData.appid,
                                    ver: g.globalData.ver,
                                    source: g.globalData.source,
                                    src: g.globalData.src
                                },
                                success: function(e) {
                                    g.globalData.adbox = e.data.boxAd, a.navData = e.data.nav, e.data.channel && (g.globalData.src = e.data.channel.src,
                                    g.globalData.template = e.data.channel.template);
                                    for (var i = 0; i < a.navData.length; i++) if (console.log(a.navData[i].desc), "/pages/Category/Category" == a.navData[i].path) {
                                        a.navnum = i;
                                        break;
                                    }
                                    t && t();
                                }
                            });
                        },
                        getCategory: function() {
                            var t = this;
                            e.request({
                                url: g.globalData.host + "/index.php/Wetest/Index/getCategoryData",
                                method: "GET",
                                data: {},
                                success: function(a) {
                                    if (200 == a.statusCode) {
                                        t.categories = JSON.parse(a.data), t.subCategories = t.categories.map(function(t, e) {
                                            return {
                                                order: "time",
                                                cid: t.id,
                                                view_page: 1,
                                                view_list: [],
                                                time_page: 1,
                                                time_list: []
                                            };
                                        });
                                        for (var i = "", n = 0; n < t.subCategories.length; n++) t.subCategories[n].cid == t.cid && (t.num = n,
                                        i = t.subCategories[n], console.log(i));
                                        t.getSubCategory(t.num, i.cid, i.order, i.view_page, t.push_gid), e.removeStorageSync("category_cid");
                                    }
                                },
                                fail: function(t) {
                                    console.log(t);
                                },
                                complete: function(t) {
                                    e.hideLoading();
                                }
                            });
                        },
                        getSubCategory: function(t, a, i, n, o) {
                            var r = this, s = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];
                            e.request({
                                url: g.globalData.baseUrl + "/index.php/App/Index/getPageData",
                                method: "GET",
                                header:{
                                    appCode: g.globalData.appCode,
                                    appToken:g.globalData.appToken,
                                },
                                data: {
                                    cid: a,
                                    order: i,
                                    pageIndex: n,
                                    appid: g.globalData.appid,
                                    ver: g.globalData.ver,
                                    push_gid: o
                                },
                                success: function(e) {
                                    if (e.data || r.nomorequiz.push(a), 200 == e.statusCode && e.data) {
                                        var u = e.data.map(function(t, e) {
                                            return t.img = c.static_host + t.img, t;
                                        });
                                        r.subCategories[t][i + "_list"] = r.subCategories[t][i + "_list"].concat(u), r.subCategories[t][i + "_page"] = n + 1,
                                        r.container = r.subCategories[t][i + "_list"], r.order = i;
                                    }
                                    o && (0, d.playGame)({
                                        id: o
                                    }), s && s();
                                },
                                fail: function(t) {
                                    console.log(t);
                                }
                            });
                        },
                        toQuestion: function(t) {
                            if (t.is_jump) if ("constell" == t.content) {
                                var a = e.getStorageSync("star");
                                a ? (u.default.Event.stat("navigateMiniProgram", {
                                    minitype: t.appid + "_1"
                                }), e.navigateToMiniProgram({
                                    appId: t.appid,
                                    path: t.path + "?star=" + a + "&target=" + t.appid + "&from=1109659848&channel=2",
                                    success: function() {
                                        u.default.Event.stat("navigateMiniProgram", {
                                            minitype: t.appid + "_2"
                                        });
                                        var a = e.getStorageSync("appidList") ? e.getStorageSync("appidList") : [];
                                        -1 == a.indexOf(t.appid) && a.unshift(t.appid), e.setStorageSync("appidList", a),
                                        2 == t.type && saveOutRecord(g, 4, g.globalData.appid, t.appid);
                                    }
                                })) : (e.setStorageSync("MiniProgram", t), u.default.Event.stat("selectstar", {
                                    showorcencal: g.globalData.ver + "_show"
                                }), this.selectstar = !0);
                            } else u.default.Event.stat("navigateMiniProgram", {
                                minitype: t.appid + "_1"
                            }), e.navigateToMiniProgram({
                                appId: t.appid,
                                path: t.path,
                                success: function() {
                                    u.default.Event.stat("navigateMiniProgram", {
                                        minitype: t.appid + "_2"
                                    });
                                    var a = e.getStorageSync("appidList") ? e.getStorageSync("appidList") : [];
                                    -1 == a.indexOf(t.appid) && a.unshift(t.appid), e.setStorageSync("appidList", a),
                                    2 == t.type && saveOutRecord(g, 4, g.globalData.appid, t.appid);
                                }
                            }); else (0, d.playGame)(t);
                        },
                        openOrder: function() {
                            this.isActive ? this.isActive = !1 : this.isActive = !0;
                        },
                        changeOrder: function(t) {
                            if ("view" == this.order ? this.order = "time" : "time" == this.order && (this.order = "view"),
                            this.isActive = !1, this.subCategories[this.num].order = this.order, this.subCategories[this.num][this.order + "_page"] > 1) this.container = this.subCategories[this.num][this.order + "_list"]; else {
                                var e = this.subCategories[this.num];
                                this.getSubCategory(this.num, e.cid, e.order, e[this.order + "_page"]);
                            }
                        },
                        getPagedata: function() {
                            var t = this;
                            if (console.log(this.nomorequiz, this.cid, this.nomorequiz.indexOf(this.cid)), this.load && -1 == this.nomorequiz.indexOf(this.cid)) {
                                this.load = !1;
                                var e = this.subCategories[this.num];
                                this.getSubCategory(this.num, e.cid, e.order, e[this.order + "_page"], "", function() {
                                    t.load = !0;
                                });
                            }
                        },
                        bindStar: function(t) {
                            var a = this, i = e.getStorageSync("MiniProgram");
                            u.default.Event.stat("navigateMiniProgram", {
                                minitype: i.appid + "_1"
                            }), e.navigateToMiniProgram({
                                appId: i.appid,
                                path: i.path + "?star=" + t + "&target=" + i.appid + "&from=1109659848&channel=2",
                                success: function(n) {
                                    u.default.Event.stat("navigateMiniProgram", {
                                        minitype: i.appid + "_2"
                                    }), u.default.Event.stat("jumpluka", {
                                        hasstar: 0
                                    }), e.setStorageSync("star", t), console.log(n), a.initHome({});
                                }
                            });
                        }
                    },
                    created: function() {}
                };
                a.default = l;
            }).call(this, i("543d").default);
        },
        f861: function(t, e, a) {
            a.r(e);
            var i = a("dba0"), n = a.n(i);
            for (var o in i) "default" !== o && function(t) {
                a.d(e, t, function() {
                    return i[t];
                });
            }(o);
            e.default = n.a;
        },
        fc84: function(t, e, a) {
            (function(t) {
                function e(t) {
                    return t && t.__esModule ? t : {
                        default: t
                    };
                }
                a("8b22"), a("921b"), e(a("66fd")), t(e(a("41fa")).default);
            }).call(this, a("543d").createPage);
        }
    }, [ [ "fc84", "common/runtime", "common/vendor" ] ] ]);
}();
