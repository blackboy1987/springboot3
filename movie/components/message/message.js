(global.webpackJsonp = global.webpackJsonp || []).push([ [ "components/message/message" ], {
    "26f1": function(e, n, t) {},
    "6def": function(e, n, t) {
        t.r(n);
        var s = t("be7b"), i = t("8ea8");
        for (var o in i) "default" !== o && function(e) {
            t.d(n, e, function() {
                return i[e];
            });
        }(o);
        t("c355");
        var a = t("f0c5"), c = Object(a.a)(i.default, s.b, s.c, !1, null, null, null, !1, s.a, void 0);
        n.default = c.exports;
    },
    "8ea8": function(e, n, t) {
        t.r(n);
        var s = t("a384"), i = t.n(s);
        for (var o in s) "default" !== o && function(e) {
            t.d(n, e, function() {
                return s[e];
            });
        }(o);
        n.default = i.a;
    },
    a384: function(e, n, t) {
        (function(e) {
            Object.defineProperty(n, "__esModule", {
                value: !0
            }), n.default = void 0;
            var t = getApp().globalData, s = {
                data: function() {
                    return {
                        checked: !0,
                        userLogin: !0,
                        maskClick: !1,
                        sendNum: 0,
                        getNum: 0
                    };
                },
                props: {},
                methods: {
                    tab: function() {
                        this.checked ? (this.checked = !1, this.userLogin = this.$user_login, this.userLogin && 0 == this.sendNum && this.getSendNum(),
                        this.$refs.sendView.open()) : (this.$refs.sendView.close(), this.checked = !0);
                    },
                    onGotUserInfo: function(n) {
                        var s = this;
                        e.login({
                            provider: "weixin",
                            success: function(e) {
                                var i = n.detail.userInfo, o = e.code, a = s.md5(i.avatarUrl + s.cjurl + s.mark + i.nickName + t.$platform + t.$scene.scene + "App.User.WxRegister" + o), c = s.cjurl + "wxApi/public/?service=App.User.WxRegister&user=" + o + "&name=" + i.nickName + "&avatarUrl=" + i.avatarUrl + "&mark=" + s.mark + "&platform=" + t.$platform + "&scene=" + t.$scene.scene + "&host=" + s.cjurl + "&sign=" + a;
                                s.api.wxRegister(c).then(function(e) {
                                    s.userLogin = s.$user_login, s.getSendNum();
                                });
                            }
                        });
                    },
                    subscribe: function() {
                        var n = this;
                        if (0 != t.$config.site.message.hasOwnProperty("tmpIds")) {
                            var s = t.$config.site.message.tmpIds.split(",");
                            console.log(s,"ssssssssssssss");
                            e.requestSubscribeMessage ? e.requestSubscribeMessage({
                                tmplIds: s,
                                success: function(e) {
                                    "accept" === e[s[0]] && n.sendNum++;
                                },
                                fail: function(n) {
                                    console.log(n), e.showModal({
                                        content: "未授权发送通知，请到小程序设置界面开启订阅",
                                        confirmText: "去开启",
                                        cancelText: "取消",
                                        success: function(e) {
                                            e.confirm && wx.getSetting({
                                                withSubscriptions: !0,
                                                success: function(e) {
                                                    console.log(e.authSetting), console.log(e.subscriptionsSetting);
                                                }
                                            });
                                        }
                                    });
                                }
                            }) : wx.showToast({
                                title: "请更新您微信版本，来获取订阅消息功能",
                                icon: "none"
                            });
                        } else wx.showToast({
                            title: "模版错误,联系客服反馈!",
                            icon: "none"
                        });
                    },
                    setSubscribe: function() {
                        var n = this;
                        if (this.getNum != this.sendNum) {
                            e.showLoading({
                                mask: !0,
                                title: "订阅中..."
                            });
                            var globalData = getApp().globalData;
                            var t = e.getStorageSync("$voddata"), s = this.sendNum, i = e.getStorageSync("$userInfo").user_openid_weixin, o = e.getStorageSync("$userInfo").user_id, a = this.md5(this.mark + i + "App.Ulog.SetSubscribe" + t.type_id + s + o + t.vod_id), c = this.cjurl + "wxApi/public/?service=App.Ulog.SetSubscribe&vod_id=" + t.vod_id  +"&tmpIds="+globalData.$config.site.message.tmpIds + "&type_id=" + t.type_id + "&ulog_nid=" + s + "&user_id=" + o + "&mark=" + this.mark + "&openid=" + i + "&sign=" + a;
                            this.api.apiRequest(c).then(function(t) {
                                e.hideLoading(), 200 == t.Code && 200 == t.Data.code && (n.sendNum = t.Data.send_num,
                                n.getNum = t.Data.send_num, e.showToast({
                                    title: t.Data.msg,
                                    icon: "none",
                                    duration: 3e3
                                }));
                            });
                        } else e.showToast({
                            title: "未做修改",
                            icon: "none",
                            duration: 2e3
                        });
                    },
                    getSendNum: function() {
                        var n = this, t = e.getStorageSync("$userInfo").user_id, s = e.getStorageSync("$voddata").vod_id, i = this.md5("App.Ulog.GetLog" + t + s), o = this.cjurl + "wxApi/public/?service=App.Ulog.GetLog&vod_id=" + s + "&user_id=" + t + "&sign=" + i;
                        this.api.apiRequest(o).then(function(e) {
                            200 == e.Code && 0 != e.Data && (n.sendNum = e.Data.send_num, n.getNum = e.Data.send_num);
                        });
                    }
                },
                watch: {}
            };
            n.default = s;
        }).call(this, t("543d").default);
    },
    be7b: function(e, n, t) {
        t.d(n, "b", function() {
            return i;
        }), t.d(n, "c", function() {
            return o;
        }), t.d(n, "a", function() {
            return s;
        });
        var s = {
            uniPopup: function() {
                return t.e("components/uni-popup/uni-popup").then(t.bind(null, "8930"));
            }
        }, i = function() {
            var e = this;
            e.$createElement;
            e._self._c;
        }, o = [];
    },
    c355: function(e, n, t) {
        var s = t("26f1");
        t.n(s).a;
    }
} ]), (global.webpackJsonp = global.webpackJsonp || []).push([ "components/message/message-create-component", {
    "components/message/message-create-component": function(e, n, t) {
        t("543d").createComponent(t("6def"));
    }
}, [ [ "components/message/message-create-component" ] ] ]);
