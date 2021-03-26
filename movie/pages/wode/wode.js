(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/wode/wode" ], {
    3354: function(e, n, t) {},
    5821: function(e, n, t) {
        t.d(n, "b", function() {
            return i;
        }), t.d(n, "c", function() {
            return r;
        }), t.d(n, "a", function() {
            return o;
        });
        var o = {
            uniBar: function() {
                return Promise.all([ t.e("common/vendor"), t.e("components/uni-bar/uni-bar") ]).then(t.bind(null, "9a28"));
            },
            narBar: function() {
                return t.e("components/narBar/narBar").then(t.bind(null, "0b0a"));
            },
            uniAd: function() {
                return t.e("components/uni-ad/uni-ad").then(t.bind(null, "e53c"));
            },
            customAd: function() {
                return t.e("components/custom-ad/custom-ad").then(t.bind(null, "dac9"));
            },
            uniPopup: function() {
                return t.e("components/uni-popup/uni-popup").then(t.bind(null, "8930"));
            },
            popup: function() {
                return t.e("components/popup/popup").then(t.bind(null, "de85"));
            }
        }, i = function() {
            var e = this;
            e.$createElement;
            e._self._c;
        }, r = [];
    },
    "726a": function(e, n, t) {
        t.r(n);
        var o = t("5821"), i = t("7346");
        for (var r in i) "default" !== r && function(e) {
            t.d(n, e, function() {
                return i[e];
            });
        }(r);
        t("9deb");
        var a = t("f0c5"), u = Object(a.a)(i.default, o.b, o.c, !1, null, "e661a0a8", null, !1, o.a, void 0);
        n.default = u.exports;
    },
    7346: function(e, n, t) {
        t.r(n);
        var o = t("ef2e"), i = t.n(o);
        for (var r in o) "default" !== r && function(e) {
            t.d(n, e, function() {
                return o[e];
            });
        }(r);
        n.default = i.a;
    },
    "9deb": function(e, n, t) {
        var o = t("3354");
        t.n(o).a;
    },
    ef2e: function(e, n, t) {
        (function(e) {
            Object.defineProperty(n, "__esModule", {
                value: !0
            }), n.default = void 0;
            var t = getApp().globalData, o = {
                data: function() {
                    return {
                        theme: t.$theme,
                        maskClick: !1,
                        userImg: "../../static/tab/tabbarmeh.png",
                        userInfo: [],
                        mylist: [ {
                            text: "历史",
                            icon: "",
                            color: "#55aaff"
                        }, {
                            text: "收藏",
                            icon: "",
                            color: "#FFCC40"
                        }, {
                            text: "海报",
                            icon: "",
                            color: "#3fbd5c"
                        }, {
                            text: "客服",
                            icon: "",
                            color: "#ff007f"
                        } ],
                        wxAdId: [],
                        gg_wode: [],
                        sharepic: "",
                        more: [],
                        animationTime: !1,
                        adShow: !0
                    };
                },
                onLoad: function(n) {
                    this.$user_login = e.getStorageSync("$user_login");
                        this.userInfo = e.getStorageSync("$userInfo"), this.wxAdId = t.$config.wode.wxAdId,
                    this.sharepic = t.$config.site.sharepic, "1" == t.$config.wode.more.radio && (this.more = t.$config.wode.more.list);
                },
                onReady: function() {
                    this.gg_wode = t.$config.wode.gg, this.$user_login || this.$refs.userLogin.open();
                },
                onShow: function() {
                    this.adShow = !0, this.theme = t.$theme;
                },
                onHide: function() {
                    this.adShow = !1;
                },
                computed: {},
                methods: {
                    onGotUserInfo: function(n) {
                        var o = this;
                        e.login({
                            provider: "weixin",
                            success: function(i) {
                                var r = n.detail.userInfo, a = i.code, u = o.md5(r.avatarUrl + o.cjurl + o.mark + r.nickName + t.$platform + t.$scene.scene + "App.User.WxRegister" + a), s = o.cjurl + "wxApi/public/?service=App.User.WxRegister&user=" + a + "&name=" + r.nickName + "&avatarUrl=" + r.avatarUrl + "&mark=" + o.mark + "&platform=" + t.$platform + "&scene=" + t.$scene.scene + "&host=" + o.cjurl + "&sign=" + u;
                                o.api.wxRegister(s).then(function(n) {
                                    n ? (o.$refs.userLogin.close(), o.userInfo = e.getStorageSync("$userInfo")) : o.$refs.userLogin.open();
                                });
                            }
                        });
                    },
                    piaNum: function() {
                        var n = this, t = this;
                        if (!t.animationTime) {
                            t.animationTime = !0;
                            var o = this.md5("App.User.PidNum" + this.userInfo.user_id), i = this.cjurl + "wxApi/public/?service=App.User.PidNum&uid=" + this.userInfo.user_id + "&sign=" + o;
                            this.api.apiRequest(i).then(function(t) {
                                200 == t.Code && (n.userInfo.user_pid_num = t.Data.user_pid_num, e.setStorageSync("$userInfo", n.userInfo));
                            }), setTimeout(function() {
                                t.animationTime = !1;
                            }, 5e3);
                        }
                    },
                    listclick: function(n) {
                        switch (n) {
                          case 0:
                            e.navigateTo({
                                url: "../history/history?tab=0"
                            });
                            break;

                          case 1:
                            e.navigateTo({
                                url: "../history/history?tab=1"
                            });
                            break;

                          case 2:
                            this.sharepic && wx.previewImage({
                                current: this.sharepic,
                                urls: [ this.sharepic ]
                            });
                            break;

                          case 3:
                            "0" == t.$config.site.kefu.type ? (console.log("$web"), e.setStorageSync("$web", t.$config.site.kefu.url), 
                            e.navigateTo({
                                url: "../web/web"
                            })) : t.$config.site.kefu.url && wx.previewImage({
                                current: t.$config.site.kefu.url,
                                urls: [ t.$config.site.kefu.url ]
                            });
                        }
                    },
                    shareButton: function() {
                        var n = this;
                        e.getImageInfo({
                            src: n.sharepic,
                            success: function(t) {
                                e.saveImageToPhotosAlbum({
                                    filePath: t.path,
                                    success: function() {
                                        n.$refs.share.close(), e.showToast({
                                            title: "图片保存成功，可以去分享啦~",
                                            duration: 2e3
                                        });
                                    },
                                    fail: function() {
                                        n.$refs.share.close(), e.showToast({
                                            title: "保存失败，长按保存试试",
                                            duration: 2e3,
                                            icon: "none"
                                        });
                                    }
                                });
                            }
                        });
                    },
                    moreClick: function(n) {
                        n.indexOf("pages") >= 0 ? e.navigateTo({
                            url: n
                        }) : e.navigateToMiniProgram({
                            appId: n,
                            path: "pages/index/index",
                            success: function(e) {}
                        });
                    }
                }
            };
            n.default = o;
        }).call(this, t("543d").default);
    },
    fd58: function(e, n, t) {
        (function(e) {
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            t("3079"), n(t("66fd")), e(n(t("726a")).default);
        }).call(this, t("543d").createPage);
    }
}, [ [ "fd58", "common/runtime", "common/vendor" ] ] ]);