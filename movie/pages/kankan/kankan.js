var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/kankan/kankan" ], {
    "28ff": function(t, i, e) {
        (function(t) {
            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            e("3079"), i(e("66fd")), t(i(e("b3fb")).default);
        }).call(this, e("543d").createPage);
    },
    "2ee2": function(i, e, n) {
        (function(i) {
            function a() {
                if ("function" != typeof WeakMap) return null;
                var t = new WeakMap();
                return a = function() {
                    return t;
                }, t;
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var o = function(i) {
                if (i && i.__esModule) return i;
                if (null === i || "object" !== (void 0 === i ? "undefined" : t(i)) && "function" != typeof i) return {
                    default: i
                };
                var e = a();
                if (e && e.has(i)) return e.get(i);
                var n = {}, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for (var s in i) if (Object.prototype.hasOwnProperty.call(i, s)) {
                    var d = o ? Object.getOwnPropertyDescriptor(i, s) : null;
                    d && (d.get || d.set) ? Object.defineProperty(n, s, d) : n[s] = i[s];
                }
                return n.default = i, e && e.set(i, n), n;
            }(n("c32e")), s = getApp().globalData, d = null, r = {
                data: function() {
                    return {
                        theme: s.$theme,
                        ShowPlay: !0,
                        isPlay: !1,
                        voddata: {},
                        isSc: !1,
                        laiyuanindex: 0,
                        index: 0,
                        episode: 0,
                        showContent: !1,
                        likedata: {},
                        vod_content: "",
                        showControls: !0,
                        vodxuanji: !1,
                        initialTime: 0,
                        currentTime: 0,
                        objectFit: "contain",
                        vod_tip: !0,
                        tipShow: !1,
                        tipText: "正在解析影片",
                        playurl: "",
                        playIcon: "",
                        xuanjiid: "g0",
                        wxAdId: [],
                        adNum: 0,
                        second: 0,
                        points: !0,
                        videoPlay: !1,
                        myVideo: "",
                        adPlay: !0,
                        maskClick: !1,
                        mylist: [ {
                            text: "选集列表",
                            icon: "",
                            color: "#55aaff"
                        }, {
                            text: "倍速播放",
                            icon: "",
                            color: "#ff8e3d"
                        }, {
                            text: "播放链接",
                            icon: "",
                            color: "#aa007f"
                        }, {
                            text: "客服反馈",
                            icon: "",
                            color: "#ff007f"
                        } ],
                        rate: "1.0",
                        adViewContent: "该视频需要解锁后观看!",
                        gg: [],
                        notice: "",
                        fullscreen: !1,
                        showGz: !0,
                        danmuList: [ {
                            text: "请勿相信视频内广告",
                            color: "#ff0000",
                            time: 1
                        }, {
                            text: "本软件永久免费,为避免小程序被封,请关注下方备用小程序!",
                            color: "#ff00ff",
                            time: 3
                        } ],
                        message: !1,
                        statement: "免责声明:本软件资源均来源于网络整理,不储存任何资源,版权属于原作者,如无意侵犯您的版权,请反馈告知,我们给予删除,谢谢!"
                    };
                },
                onLoad: function(t) {
                    var e = this, n = this;
                    this.wxAdId = s.$config.play.wxAdId, this.gg = s.$config.play.gg, this.second = parseInt(s.$config.play.second), 
                    this.danmuList = s.$config.play.danmuList, this.statement = s.$config.wode.statement, 
                    s.$wxverify || "" == t.id ? (s.$wxverify = !0, this.BackPage()) : (this.isPlay = !0, 
                    i.getStorageSync("$voddata").vod_id == t.id && (this.voddata = i.getStorageSync("$voddata"), 
                    this.getLSDB())), wx.createInterstitialAd && this.wxAdId.cpId && (this.interstitialAd = wx.createInterstitialAd({
                        adUnitId: this.wxAdId.cpId
                    }), this.interstitialAd.onLoad(function() {}), this.interstitialAd.onError(function(t) {}), 
                    this.interstitialAd.onClose(function() {
                        e.interstitialAd.destroy(), e.interstitialAd = null;
                    })), wx.createRewardedVideoAd && this.wxAdId.jlspId && ((d = wx.createRewardedVideoAd({
                        adUnitId: this.wxAdId.jlspId
                    })).onLoad(function() {}), d.onError(function(t) {}), d.onClose(function(t) {
                        if (t && t.isEnded) {
                            s.$points = !1, e.myVideo.play();
                            var a = i.getStorageSync("$adNum");
                            i.setStorageSync("$adNum", a + 1);
                            var o = parseInt(Date.parse(new Date())) / 1e3;
                            i.setStorageSync("$interval", o);
                        } else {
                            n.points = !0;
                            var d = "广告完成后才可继续播放,每天观看2次我就消失!";
                            s.$config.play.adMsg.hasOwnProperty("close") && (d = s.$config.play.adMsg.close), 
                            i.showModal({
                                content: d,
                                confirmColor: "#ff9900",
                                success: function(t) {
                                    t.confirm ? n.adTab() : n.myVideo.play();
                                }
                            });
                        }
                    }));
                },
                onReady: function() {
                    var t = this;
                    t.myVideo = i.createVideoContext("myVideo"), t.interstitialAd && t.wxAdId.cpId && setTimeout(function() {
                        t.interstitialAd.show().catch(function(t) {
                            console.error(t);
                        });
                    }, 1e3);
                },
                onShow: function() {
                    i.setKeepScreenOn({
                        keepScreenOn: !0
                    });
                },
                onHide: function() {
                    i.setKeepScreenOn({
                        keepScreenOn: !1
                    });
                },
                onShareAppMessage: function(t) {
                    var e = i.getStorageSync("$userInfo").user_id, n = "/pages/detail/detail?id=" + this.voddata.vod_id;
                    e && (n = "pages/detail/detail?uid=" + e + "&id=" + this.voddata.vod_id), s.$points = !1, 
                    this.myVideo.play();
                    var a = i.getStorageSync("$adNum");
                    i.setStorageSync("$adNum", a + 1);
                    var o = parseInt(Date.parse(new Date())) / 1e3;
                    return i.setStorageSync("$interval", o), this.$refs.adPopup.close(), {
                        title: this.voddata.vod_name + "在线观看",
                        path: n,
                        imageUrl: this.voddata.vod_pic,
                        success: function(t) {
                            console.log("success");
                        },
                        fail: function() {
                            console.log("success");
                        },
                        complete: function() {
                            console.log("complete");
                        }
                    };
                },
                onBackPress: function(t) {
                    this.addDB(), i.setKeepScreenOn({
                        keepScreenOn: !1
                    });
                },
                onUnload: function() {
                    this.addDB(), i.setKeepScreenOn({
                        keepScreenOn: !1
                    });
                },
                mounted: function() {},
                methods: {
                    contenTab: function() {
                        this.showContent = !this.showContent;
                    },
                    vodlist: function() {
                        this.vodxuanji = !1, this.showControls = !0;
                    },
                    themeTab: function() {
                        this.fullscreen ? (this.showControls = !1, this.vodxuanji = !0) : "black" == this.theme ? this.theme = "white" : this.theme = "black";
                    },
                    refresh: function(t) {
                        var e = this;
                        i.showLoading({
                            mask: !0,
                            title: "加载中..."
                        });
                        var n = this, a = this.md5(this.mark + "App.Mov.GetOnlineMvById" + t), o = this.cjurl + "wxApi/public/?service=App.Mov.GetOnlineMvById&vodid=" + t + "&mark=" + this.mark + "&sign=" + a;
                        this.api.apiRequest(o).then(function(t) {
                            200 == t.Code && (n.voddata = e.api.vodCl(t.Data[0]), n.getLSDB(), i.hideLoading());
                        });
                    },
                    getlike: function(t) {
                        var e = this, n = i.getStorageSync("$likedata");
                        if (void 0 != t && 23 != t || (t = 1), "" == n || n[0].type_id != t) {
                            var a = this.md5(t + "121App.Mov.GetHomeLevelAll"), o = cjurl + "wxApi/public/?service=App.Mov.GetHomeLevelAll&level=" + t + "&limit=12&page=1&sign=" + a;
                            this.api.apiRequest(o).then(function(t) {
                                200 == t.Code && (e.likedata = t.Data.list);
                            });
                        } else this.likedata = n;
                    },
                    getDate: function(t) {
                        t != this.voddata.vod_id && (this.myVideo.stop(), this.playurl = "", this.addDB(), 
                        this.refresh(t));
                    },
                    getLSDB: function() {
                        var t = this.db.getLSDB(this.voddata.vod_id);
                        "{}" != JSON.stringify(t) ? (this.laiyuanindex = Number(t.laiyuanindex), this.index = Number(t.index), 
                        this.initialTime = Number(t.initialTime), this.isSc = t.shoucang, this.getPlayUrl(this.laiyuanindex, this.index)) : (this.isSc = !1, 
                        this.laiyuanindex = 0, this.index = 0, this.initialTime = 0, this.getPlayUrl(this.laiyuanindex, this.index)), 
                        "1" == s.$config.site.message.radio && (this.message = !0);
                    },
                    addDB: function() {
                        var t = {
                            vod_id: this.voddata.vod_id,
                            vod_pic: this.voddata.vod_pic,
                            vod_name: this.voddata.vod_name,
                            lishi: !0,
                            shoucang: this.isSc,
                            laiyuanindex: this.laiyuanindex,
                            initialTime: this.currentTime,
                            index: this.index
                        };
                        this.db.setLSDB(t);
                    },
                    scTab: function(t, e) {
                        this.isSc = !this.isSc;
                        var n = {
                            vod_id: e.vod_id,
                            vod_pic: e.vod_pic,
                            vod_name: e.vod_name,
                            lishi: !0,
                            shoucang: this.isSc,
                            laiyuanindex: this.laiyuanindex,
                            initialTime: this.currentTime,
                            index: this.index
                        };
                        this.db.scDB(n);
                        var a = "收藏成功";
                        a = this.isSc ? "收藏成功" : "取消收藏", i.showToast({
                            title: a,
                            icon: "success",
                            duration: 2e3
                        });
                    },
                    getPlayUrl: function(t, i) {
                        var e = this.voddata.vod_play_url[t][1][i].src;
                        this.episode = this.voddata.vod_play_url[t][1].length, this.adPlay = !0, -1 != e.indexOf(".m3u8") || -1 != e.indexOf(".mp4") ? (this.tipShow = !0, 
                        this.tipText = "加载成功,即将播放", this.playurl = e) : this.getjx(e, this.voddata.vod_play_url[t][3]);
                    },
                    getjx: function(t, i) {
                        var e = this;
                        t = o.b64_encode(t), this.tipShow = !0, this.tipText = "正在解析影片";
                        var n = this.md5(i + this.mark + "App.JX.VipJX" + t), a = this.cjurl + "wxApi/public/?service=App.JX.VipJX&url=" + t + "&form=" + i + "&mark=" + this.mark + "&sign=" + n;
                        this.api.apiRequest(a).then(function(t) {
                            200 == t.Code && (200 == t.Data.code ? (e.playurl = t.Data.url, e.tipText = "加载成功,即将播放") : (e.tipText = "加载失败,正在切换线路", 
                            e.laiyuanindex = Number(e.laiyuanindex), e.laiyuanindex + 1 < e.voddata.vod_play_from.length ? (e.laiyuanindex += 1, 
                            e.getPlayUrl(e.laiyuanindex, e.index)) : e.tipText = "加载失败,切换线路试试"));
                        }, function(t) {
                            e.tipText = "加载失败,正在切换线路", e.laiyuanindex + 1 < e.voddata.vod_play_from.length ? (e.laiyuanindex += 1, 
                            e.getPlayUrl(e.laiyuanindex, e.index)) : e.tipText = "加载失败,切换线路试试";
                        });
                    },
                    xuanjitab: function(t) {
                        this.index != t && (this.myVideo.pause(), this.mylist[1].icon = "", this.rate = "1.0", 
                        this.index = t, this.initialTime = 0, this.playurl = "", this.getPlayUrl(this.laiyuanindex, this.index)), 
                        this.$refs.xuanjipopup.close();
                    },
                    laiyuanClick: function(t) {
                        console.log(this.initialTime), this.laiyuanindex != t && (this.mylist[1].icon = "", 
                        this.rate = "1.0", this.laiyuanindex = t, this.initialTime = this.currentTime, this.myVideo.stop(), 
                        this.getPlayUrl(this.laiyuanindex, this.index));
                    },
                    laiyuanTab: function(t) {
                        switch (t) {
                          case 0:
                            this.$refs.xuanjipopup.open();
                            break;

                          case 1:
                            var e = [ "1.0", "1.25", "1.5", "2.0" ], n = [ "", "", "", "" ], a = e.indexOf(this.rate);
                            3 == a ? a = 0 : a += 1, this.mylist[1].icon = n[a], this.rate = e[a], this.myVideo.playbackRate(Number(e[a]));
                            break;

                          case 2:
                            i.setClipboardData({
                                data: this.playurl,
                                success: function(t) {
                                    i.showToast({
                                        title: "复制成功,浏览器打开!",
                                        icon: "none",
                                        duration: 5e3
                                    });
                                }
                            });
                            break;

                          case 3:
                            "0" == s.$config.site.kefu.type ? (i.setStorageSync("$web", s.$config.site.kefu.url), 
                            i.navigateTo({
                                url: "../web/web"
                            })) : s.$config.site.kefu.url && wx.previewImage({
                                current: s.$config.site.kefu.url,
                                urls: [ s.$config.site.kefu.url ]
                            });
                        }
                    },
                    Reverse: function() {
                        this.$refs.xuanjipopup.open();
                    },
                    BackPage: function() {
                        i.navigateBack({
                            delta: 1
                        });
                    },
                    BackIndex: function() {
                        i.switchTab({
                            url: "/pages/index/index"
                        });
                    },
                    play: function() {
                        this.videoPlay = !0, this.tipShow = !1;
                    },
                    pause: function() {
                        this.videoPlay = !1;
                    },
                    ended: function() {
                        0 != this.episode && this.index + 1 < this.episode ? (this.index = this.index + 1, 
                        this.mylist[1].icon = "", this.rate = "1.0", this.initialTime = 0, this.playurl = "", 
                        this.tipShow = !0, this.tipText = "即将播放下一集...", this.getPlayUrl(this.laiyuanindex, this.index)) : this.myVideo.stop();
                    },
                    clickFull: function(t) {
                        "contain" == this.objectFit ? this.objectFit = "fill" : this.objectFit = "contain";
                    },
                    controlstoggle: function(t) {
                        this.vod_tip = t.detail.show;
                    },
                    fullscreenchange: function(t) {
                        this.fullscreen = t.detail.fullScreen;
                    },
                    seek: function(t) {
                        this.myVideo.seek(this.currentTime + t);
                    },
                    timeupdate: function(t) {
                        var i = this;
                        i.currentTime = Math.floor(t.detail.currentTime), i.points && s.$points && i.currentTime > i.second && i.videoPlay && d && (i.fullscreen && i.myVideo.exitFullScreen(), 
                        setTimeout(function() {
                            i.points = !1, i.videoPlay = !1, i.myVideo.pause(), i.$refs.adPopup.open();
                        }, 300));
                    },
                    loadedmetadata: function() {},
                    adTab: function() {
                        var t = this;
                        this.$refs.adPopup.close(), d && d.show().catch(function() {
                            d.load().then(function() {
                                return d.show();
                            }).catch(function(i) {
                                s.$points = !1, t.myVideo.play();
                            });
                        });
                    },
                    laiyuanIcon: function() {
                        switch (this.mylist[0].text = this.voddata.vod_play_from[this.laiyuanindex], this.voddata.vod_play_url[this.laiyuanindex][0]) {
                          case "qq":
                            this.mylist[0].icon = "";
                            break;

                          case "qiyi":
                            this.mylist[0].icon = "";
                            break;

                          case "youku":
                            this.mylist[0].icon = "";
                            break;

                          case "mgtv":
                            this.mylist[0].icon = "";
                            break;

                          default:
                            this.mylist[0].icon = "";
                        }
                    },
                    barRight: function() {},
                    binderror: function(t) {
                        this.showGz = !1;
                    },
                    bindload: function(t) {
                        this.showGz = !0;
                    }
                },
                watch: {
                    index: {
                        handler: function(t, e) {
                            var n = "g" + (t - 2);
                            this.xuanjiid = n;
                            var a = parseInt(Date.parse(new Date())) / 1e3;
                            this.points = !0, "1" == s.$config.play.isPoints && i.getStorageSync("$adNum") < parseInt(s.$config.play.num) && a - i.getStorageSync("$interval") > parseInt(s.$config.play.interval) && (s.$points = !0);
                        }
                    },
                    videoPlay: {
                        handler: function(t, e) {
                            t ? (this.tipShow = !1, i.setKeepScreenOn({
                                keepScreenOn: !0
                            })) : (i.setKeepScreenOn({
                                keepScreenOn: !1
                            }), this.myVideo.pause());
                        }
                    }
                },
                computed: {
                    scrollViewId: function() {
                        return this.xuanjiid;
                    }
                }
            };
            e.default = r;
        }).call(this, n("543d").default);
    },
    "4d94": function(t, i, e) {
        var n = e("d1a3");
        e.n(n).a;
    },
    "734e": function(t, i, e) {
        e.d(i, "b", function() {
            return a;
        }), e.d(i, "c", function() {
            return o;
        }), e.d(i, "a", function() {
            return n;
        });
        var n = {
            uniBar: function() {
                return Promise.all([ e.e("common/vendor"), e.e("components/uni-bar/uni-bar") ]).then(e.bind(null, "9a28"));
            },
            narBar: function() {
                return e.e("components/narBar/narBar").then(e.bind(null, "0b0a"));
            },
            customAd: function() {
                return e.e("components/custom-ad/custom-ad").then(e.bind(null, "dac9"));
            },
            uniAd: function() {
                return e.e("components/uni-ad/uni-ad").then(e.bind(null, "e53c"));
            },
            strugglerUniappAddTip: function() {
                return e.e("components/struggler-uniapp-add-tip/struggler-uniapp-add-tip").then(e.bind(null, "01a6"));
            },
            uniPopup: function() {
                return e.e("components/uni-popup/uni-popup").then(e.bind(null, "8930"));
            },
            reverseList: function() {
                return Promise.all([ e.e("common/vendor"), e.e("components/reverse-list/reverse-list") ]).then(e.bind(null, "294c"));
            },
            message: function() {
                return e.e("components/message/message").then(e.bind(null, "6def"));
            }
        }, a = function() {
            var t = this;
            t.$createElement;
            t._self._c;
        }, o = [];
    },
    a007: function(t, i, e) {
        e.r(i);
        var n = e("2ee2"), a = e.n(n);
        for (var o in n) "default" !== o && function(t) {
            e.d(i, t, function() {
                return n[t];
            });
        }(o);
        i.default = a.a;
    },
    b3fb: function(t, i, e) {
        e.r(i);
        var n = e("734e"), a = e("a007");
        for (var o in a) "default" !== o && function(t) {
            e.d(i, t, function() {
                return a[t];
            });
        }(o);
        e("4d94");
        var s = e("f0c5"), d = Object(s.a)(a.default, n.b, n.c, !1, null, "0d50a2a8", null, !1, n.a, void 0);
        i.default = d.exports;
    },
    d1a3: function(t, i, e) {}
}, [ [ "28ff", "common/runtime", "common/vendor" ] ] ]);
