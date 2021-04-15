var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

(global.webpackJsonp = global.webpackJsonp || []).push([ [ "common/main" ], {
    "05e5": function(e, t, o) {
        (function(e) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var n = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }(o("66fd")), r = {
                globalData: {
                    playbackRate: !0,
                    $wxverify: !0,
                    $config: [{
                        index:{}
                    }],
                    $scene: [],
                    $login: !1,
                    $getIP: !1,
                    ShowPlay: !0,
                    $points: !1,
                    $theme: "black",
                    systemInfo: [],
                    $platform: "android",
                    appCode:"IEC4OARSJZAB4SG3TA",
                    appToken:"fcb1123588b8c311c661e2e2f6bff63195fb1932809403507e67044dfadgg755",
                    baseUrl:"https://www.igomall.xin/api/v3/",
                },
                onLaunch: function() {
                    var t = this, o = this.$scope.globalData, r = wx.getLaunchOptionsSync();
                    o.$scene = r, e.getStorageSync("$theme") && (o.$theme = e.getStorageSync("$theme")),
                    "white" == o.$theme && (e.setTabBarStyle({
                        color: "#A9A9A9",
                        selectedColor: "#f49c36",
                        backgroundColor: "#ffffff",
                        borderStyle: "black"
                    }), e.setBackgroundColor({
                        backgroundColor: "#ffffff",
                        backgroundColorTop: "#f9f9f9"
                    }));
                    var i = this;
                    e.getSystemInfo({
                        success: function(t) {
                            o.$platform = t.platform;
                            var n = i.md5(i.cjurl + i.mark + o.$platform + o.$scene.scene + "App.Mov.GetConfig"), r = i.cjurl + "wxApi/public/?service=App.Mov.GetConfig&host=" + i.cjurl + "&scene=" + o.$scene.scene + "&mark=" + i.mark + "&platform=" + o.$platform + "&sign=" + n;
                            i.api.apiRequest(r).then(function(t) {
                                200 == t.Code && (o.$config = t.Data, o.$wxverify = !o.$config.wxverify, "1" != o.$config.site.ip.radio || "boolean" == typeof e.getStorageSync("$ip") || o.$wxverify ? "1" == o.$config.site.ip.radio && 1 == e.getStorageSync("$ip") ? o.$wxverify = !0 : "0" == o.$config.site.ip.radio && e.removeStorageSync("$ip") : i.api.getIP(o.$config.site.ip.text).then(function(t) {
                                    t && (o.$wxverify = !0), e.setStorageSync("$ip", t);
                                }));
                            });
                            var a = wx.getMenuButtonBoundingClientRect();
                            o.systemInfo.windowWidth = t.windowWidth, o.systemInfo.windowHeight = t.windowHeight,
                            o.systemInfo.statusBarHeight = t.statusBarHeight, o.systemInfo.customWidth = a.width,
                            o.systemInfo.customHeight = a.height, o.systemInfo.customTop = a.top, o.systemInfo.customlLeft = a.left,
                            o.systemInfo.customBar = a.height + a.top + 10;
                        }
                    }), this.api.getSetting().then(function(r) {
                        if (e.getStorageSync("$userInfo").hasOwnProperty("user_openid_weixin") && o.$config.site.hasOwnProperty("login")) {
                            var i = e.getStorageSync("$userInfo").user_openid_weixin;
                            n.default.prototype.$user_login = r;
                            var a = o.$config.site.login, f = t.md5(i + o.$platform + o.$scene.scene + "App.User.WxLogin"), c = t.cjurl + "wxApi/public/?service=App.User.WxLogin&openid=" + i + "&scene=" + o.$scene.scene + "&platform=" + o.$platform + "&sign=" + f;
                            t.api.apiRequest(c).then(function(n) {
                                200 == n.Code && (0 == n.Data.user_status ? o.$wxverify = !0 : "1" == a.radio && n.Data.user_login_num >= Number(a.num) && ("android" != o.$platform && "ios" != o.$platform || (o.$wxverify = !1)),
                                t.$user_login = !0, e.setStorageSync("$userInfo", n.Data)), o.$login = !0;
                            });
                        } else o.$login = !0, n.default.prototype.$user_login = !1;
                    });
                    var a = new Date();
                    a.getDate() !== e.getStorageSync("$adTime") && (e.setStorageSync("$adNum", 0), e.setStorageSync("$adTime", a.getDate()));
                },
                onShow: function() {
                    console.log("App Show");
                },
                onHide: function() {
                    console.log("App Hide");
                }
            };
            t.default = r;
        }).call(this, o("543d").default);
    },
    "390c": function(e, t, o) {
        var n = o("fad3");
        o.n(n).a;
    },
    a11b: function(e, t, o) {
        o.r(t);
        var n = o("05e5"), r = o.n(n);
        for (var i in n) "default" !== i && function(e) {
            o.d(t, e, function() {
                return n[e];
            });
        }(i);
        t.default = r.a;
    },
    c4be: function(t, o, n) {
        (function(t) {
            function o() {
                if ("function" != typeof WeakMap) return null;
                var e = new WeakMap();
                return o = function() {
                    return e;
                }, e;
            }
            function r(t) {
                if (t && t.__esModule) return t;
                if (null === t || "object" !== (void 0 === t ? "undefined" : e(t)) && "function" != typeof t) return {
                    default: t
                };
                var n = o();
                if (n && n.has(t)) return n.get(t);
                var r = {}, i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for (var a in t) if (Object.prototype.hasOwnProperty.call(t, a)) {
                    var f = i ? Object.getOwnPropertyDescriptor(t, a) : null;
                    f && (f.get || f.set) ? Object.defineProperty(r, a, f) : r[a] = t[a];
                }
                return r.default = t, n && n.set(t, r), r;
            }
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            function a(e, t) {
                var o = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable;
                    })), o.push.apply(o, n);
                }
                return o;
            }
            function f(e, t, o) {
                return t in e ? Object.defineProperty(e, t, {
                    value: o,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = o, e;
            }
            n("3079");
            var c = i(n("66fd")), u = i(n("d64e")), l = i(n("a420")), p = r(n("4a78")), s = r(n("0996"));
            c.default.prototype.md5 = l.default, c.default.prototype.db = p, c.default.prototype.api = s,
            c.default.prototype.cjurl = "https://www.igomall.xin/api/v3/", c.default.prototype.mark = "suisui",
            c.default.prototype.iv = "eq7U4nDJFMsaZFHC", c.default.prototype.key = "5m0hVqp39zNPd9qL",
            c.default.prototype.$user_login = !1, c.default.config.productionTip = !1, u.default.mpType = "app",
            t(new c.default(function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var o = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? a(Object(o), !0).forEach(function(t) {
                        f(e, t, o[t]);
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o)) : a(Object(o)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(o, t));
                    });
                }
                return e;
            }({}, u.default))).$mount();
        }).call(this, n("543d").createApp);
    },
    d64e: function(e, t, o) {
        o.r(t);
        var n = o("a11b");
        for (var r in n) "default" !== r && function(e) {
            o.d(t, e, function() {
                return n[e];
            });
        }(r);
        o("390c");
        var i = o("f0c5"), a = Object(i.a)(n.default, void 0, void 0, !1, null, null, null, !1, void 0, void 0);
        t.default = a.exports;
    },
    fad3: function(e, t, o) {}
}, [ [ "c4be", "common/runtime", "common/vendor" ] ] ]);
