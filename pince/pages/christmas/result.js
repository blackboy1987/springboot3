var t = null;

(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/christmas/result" ], {
    "18ac": function(t, e, a) {
        a.r(e);
        var i = a("5b58"), n = a.n(i);
        for (var o in i) "default" !== o && function(t) {
            a.d(e, t, function() {
                return i[t];
            });
        }(o);
        e.default = n.a;
    },
    "2cb2": function(t, e, a) {},
    "3c49": function(t, e, a) {
        var i = a("2cb2");
        a.n(i).a;
    },
    "450c": function(t, e, a) {
        a.r(e);
        var i = a("9fc8"), n = a("18ac");
        for (var o in n) "default" !== o && function(t) {
            a.d(e, t, function() {
                return n[t];
            });
        }(o);
        a("3c49");
        var s = a("2877"), c = Object(s.a)(n.default, i.a, i.b, !1, null, "50a506af", null);
        e.default = c.exports;
    },
    "5b58": function(t, e, a) {
        (function(t) {
            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var n = i(a("f47e")), o = i(a("94f5")), s = getApp(), c = new o.default(), r = {
                data: function() {
                    return {
                        showimg: "",
                        sideness: !1,
                        showmodel: !1,
                        modeltype: "video",
                        qrcodeimg: "",
                        videoAd: "",
                        savefiltext: [ "观看完整视频广告", "才能保存到相册哦" ],
                        setsucesstext: [ "头像设置成功了", "快去向你的好友炫耀吧" ],
                        resultimg: ""
                    };
                },
                onLoad: function(e) {
                    n.default.Page.init();
                    var a = t.getStorageSync("userinfo") ? t.getStorageSync("userinfo") : {
                        nickName: "",
                        avatarUrl: ""
                    };
                    this.userinfo = a, a.avatarUrl && (this.needlogin = !1, this.showimg = a.avatarUrl.replace("100", "0")),
                    this.showimg = e.path, this.sideness = e.sideness, this.savefiltext = s.globalData.christmas.pagecontent.adbox.split("##"),
                    this.setsucesstext = s.globalData.christmas.pagecontent.setcb.split("##"), this.qrcodeimg = s.globalData.christmas.qrcode,
                    this.drawshareqzoneimg(), this.creatvideoAd();
                },
                onHide: function() {
                    this.showmodel = !1;
                },
                onShareAppMessage: function() {
                    return {
                        title: s.globalData.christmas.sharetitle,
                        imageUrl: s.globalData.christmas.sharebanner,
                        path: "pages/christmas/index"
                    };
                },
                methods: {
                    creatvideoAd: function() {
                        var t = this;
                        if (s.globalData.christmas.hasAd) {
                            try {
                                this.videoAd = wx.createRewardedVideoAd({
                                    adUnitId: "adunit-de18ac500113c55b"
                                });
                            } catch (t) {}
                            this.videoAd && this.videoAd.onError(function(e) {
                                t.videoErr = !0;
                            });
                        }
                    },
                    setheaderimg: function() {
                        qq.setCustomDress({
                            action: "uploadAvatar",
                            path: this.showimg,
                            success: function(t) {
                                console.log("success", t);
                            },
                            fail: function(t) {
                                console.log("fail", t);
                            }
                        });
                    },
                    saveimg: function() {
                        var t = this;
                        c.useQQAd(this.videoAd).then(function(e) {
                            e ? c.savePicture(t.showimg, function() {
                                t.closemodel();
                            }) : (t.showmodel = !0, t.modeltype = "video");
                        }).catch(function() {
                            c.savePicture(t.showimg, function() {
                                t.closemodel();
                            });
                        });
                    },
                    shareqzone: function() {
                        qq.openQzonePublish({
                            text: s.globalData.christmas.shuoshuo,
                            media: [ {
                                type: "photo",
                                path: this.resultimg
                            } ]
                        });
                    },
                    continuetype: function() {
                        "video" == this.modeltype ? this.saveimg() : this.shareqzone();
                    },
                    closemodel: function() {
                        this.showmodel = !1;
                    },
                    drawshareqzoneimg: function() {
                        var e = this, a = t.createCanvasContext("shareqzone"), i = [ {
                            img: "true" == this.sideness ? "https://ssl-uploads-admin.cdn.itwlw.com/quce/1577081419xgC6Q.png" : "https://ssl-uploads-admin.cdn.itwlw.com/quce/1577081381L1P1e.png"
                        }, {
                            img: this.showimg
                        }, {
                            img: this.qrcodeimg
                        } ];
                        c.getimgall(i, function(i) {
                            var n = i[0].path.height, o = i[0].path.width;
                            a.drawImage(i[1].path.path, 0, 0, i[1].path.width, i[1].path.height, 175, 375, 400, 400),
                            a.drawImage(i[0].path.path), a.drawImage(i[2].path.path, 0, 0, i[2].path.width, i[2].path.height, 75, 870, 165, 165),
                            a.draw(!1, function() {
                                setTimeout(function() {
                                    t.canvasToTempFilePath({
                                        x: 0,
                                        y: 0,
                                        width: o,
                                        height: n,
                                        destWidth: o,
                                        destHeight: n,
                                        canvasId: "shareqzone",
                                        fileType: "jpg",
                                        quality: .9,
                                        success: function(t) {
                                            e.resultimg = t.tempFilePath, console.log(222222);
                                        }
                                    });
                                }, 100);
                            });
                        });
                    }
                }
            };
            e.default = r;
        }).call(this, a("543d").default);
    },
    "5fef": function(t, e, a) {
        (function(t) {
            function e(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            a("8b22"), a("921b"), e(a("66fd")), t(e(a("450c")).default);
        }).call(this, a("543d").createPage);
    },
    "9fc8": function(t, e, a) {
        var i = function() {
            this.$createElement, this._self._c;
        }, n = [];
        a.d(e, "a", function() {
            return i;
        }), a.d(e, "b", function() {
            return n;
        });
    }
}, [ [ "5fef", "common/runtime", "common/vendor" ] ] ]);
