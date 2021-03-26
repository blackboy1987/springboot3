var t = getApp(), a = null, interstitialAd = null;

Page({
    data: {
        adList: {
            one: "",
            two: "",
            three: ""
        },
        adUnitIdAAA: "",
        curAD: 0,
        oneAd: 1,
        toastCtrol: 0,
        timer: null,
        residue_time: 0,
        will_title: "",
        sign_alert: 1,
        excitation: 0,
        siteInfo: require("../../siteinfo.js")
    },
    onLoad: function(a) {
        if (null != a.t) {
            this.setData({
                fy_show: 1,
                seo: t.globalData.seo
            });
            var e = t.globalData.config.adunit;
            this.setData({
                adList: {
                    one: e.banner,
                    two: e.banner,
                    three: e.banner
                },
                adUnitIdAAA: e.video,
                appConfig: t.globalData.config
            }), this.checkVideo(), wx.createInterstitialAd && (interstitialAd = wx.createInterstitialAd({
                adUnitId: e.chaping
            })), setTimeout(function() {
                interstitialAd && interstitialAd.show().catch(function(t) {
                    console.error(t);
                });
            }, 500);
            var i = this;
            this.setData({
                config: t.globalData.config,
                ticket: t.globalData.ticket
            }), t.countDownTrue(), i.data.ticket == i.data.config.ticket_max && i.setData({
                resTime: "已满"
            });
        } else this.setData({
            fy_show: 0
        });
    },
    bannerRecord: function() {},
    submitInfo: function(a) {
        if ("" == t.globalData.openid) return !1;
        var e = t.util.request_url({
            url: "entry/wxapp/send"
        });
        wx.request({
            url: e,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                form_id: a.detail.formId,
                appid: t.globalData.appid,
                touser: t.globalData.openid,
                uid: t.globalData.uid,
                template_id: ""
            },
            success: function(t) {
                console.log("发送模板:" + JSON.stringify(t.data));
            }
        });
    },
    delayFun: function() {
        t.btnSoundTrue(), wx.setStorageSync("reset", 1), wx.redirectTo({
            url: "../game/game?t=1"
        });
    },
    toIndex: function() {
        console.log("toIndex", getCurrentPages()), 1 < getCurrentPages().length ? wx.navigateBack({
            delta: 1
        }) : wx.redirectTo({
            url: "/pages/index/index"
        });
    },
    startVideo: function(t) {
        var e = this, i = t.currentTarget.dataset.name;
        this.setData({
            typeName: i
        }), a && a.show().catch(function(t) {
            console.log("激励视频失败"), e.setData({
                excitation: 0
            });
        });
    },
    checkVideo: function() {
        var e = this;
        wx.createRewardedVideoAd && ((a = wx.createRewardedVideoAd({
            adUnitId: e.data.adUnitIdAAA
        })).onLoad(function() {
            console.log("激励视频 广告加载成功"), e.setData({
                excitation: 1
            });
        }), a.onError(function(t) {
            console.log("视频报错,隐藏视频答题卡"), e.setData({
                excitation: 0
            });
        }), a.onClose(function(t) {
            t && t.isEnded || void 0 === t ? "延迟" == e.data.typeName ? (e.delayFun(), console.log("延迟60s")) : "vedioEng" == e.data.typeName && (e.getVedioEng(), 
            console.log("看视频获取体力")) : (wx.showToast({
                title: "未观看完整视频，无法获得奖励",
                icon: "none",
                duration: 1e3
            }), console.log("中途退出"));
        }));
    },
    getVedioEng: function() {
        var i = this;
        t.postData("/Index/get_video_ticket", !0, {
            appid: t.globalData.appid,
            uid: wx.getStorageSync("uid"),
            scene: t.globalData.scene,
            version: t.globalData.version,
            token: wx.getStorageSync("token")
        }, {
            success: function(a) {
                if (200 == a.data.code) {
                    var e = a.data.data;
                    1 == e.status && (i.setData({
                        ticket_add: e.ticket_add,
                        toastCtrol: 2
                    }), t.globalData.ticket = e.ticket);
                }
            },
            fail: function() {}
        });
    },
    nextSub: function() {
        t.btnSoundTrue(), this.data.ticket <= 0 ? this.setData({
            toastCtrol: 1
        }) : wx.redirectTo({
            url: "../game/game?t=1"
        });
    },
    countDown: function() {
        var t = this;
        clearInterval(t.data.timer);
        var a = this.data.residue_time;
        this.data.config.ticket_time, this.data.timer = setInterval(function() {
            0 != a ? (a -= 1, t.setData({
                residue_time: a
            }), t.change()) : (clearInterval(t.data.timer), t.getSurplusTime());
        }, 1e3);
    },
    change: function() {
        var t = this.data.residue_time, a = void 0, e = t - 60 * (a = 60 <= t ? parseInt(t / 60) : 0);
        a < 10 && (a = "0" + a), e < 10 && (e = "0" + e);
        var i = a + ":" + e;
        this.setData({
            resTime: i
        });
    },
    getSurplusTime: function() {
        var e = this;
        t.getData("/Index/residue_time", !0, {
            appid: t.globalData.appid,
            uid: wx.getStorageSync("uid"),
            version: t.globalData.version,
            scene: t.globalData.scene
        }, {
            success: function(t) {
                if (200 == t.data.code) {
                    var a = t.data.data;
                    1 == a.status ? (clearInterval(e.data.timer), e.setData({
                        residue_time: a.residue_time,
                        ticket: a.ticket
                    }), getApp().globalData.ticket = a.ticket, e.data.ticket == e.data.config.ticket_max ? (e.setData({
                        resTime: "已满"
                    }), clearInterval(e.data.timer)) : 0 == a.residue_time ? (clearInterval(e.data.timer), 
                    e.getTimeTicket(e.data.timer)) : (clearInterval(e.data.timer), e.setData({
                        residue_time: a.residue_time,
                        timer: null
                    }), e.change(), e.countDown())) : e.data.ticket == e.data.config.ticket_max && (e.setData({
                        resTime: "已满"
                    }), clearInterval(e.data.timer));
                }
            },
            fail: function() {}
        });
    },
    getTimeTicket: function(i) {
        var n = this;
        t.postData("/Index/get_time_ticket", !0, {
            appid: t.globalData.appid,
            uid: wx.getStorageSync("uid"),
            scene: t.globalData.scene,
            version: t.globalData.version,
            token: wx.getStorageSync("token")
        }, {
            success: function(a) {
                if (200 == a.data.code) {
                    var e = a.data.data;
                    clearInterval(n.data.timer), n.setData({
                        ticket: e.ticket
                    }), t.globalData.ticket = e.ticket, 1 == e.status ? n.data.ticket < n.data.config.ticket_max ? (n.getSurplusTime(), 
                    n.change()) : (clearInterval(n.data.timer), n.setData({
                        resTime: "已满"
                    })) : 2 == e.status && (clearInterval(n.data.timer), n.data.ticket < n.data.config.ticket_max ? (n.setData({
                        residue_time: e.residue_time
                    }), n.change(), n.countDown()) : (clearInterval(i), n.setData({
                        resTime: "已满"
                    })));
                }
            },
            fail: function() {}
        });
    },
    checkEng: function() {
        var t = 1;
        this.data.ticket >= this.data.config.ticket_max && (t = 3), this.setData({
            toastCtrol: t
        });
    },
    videoGetEng: function() {
        t.btnSoundTrue(), this.setData({
            ticket: t.globalData.ticket,
            toastCtrol: 0
        });
    },
    closeFun: function() {
        this.setData({
            toastCtrol: 0,
            rank_up: 0
        });
    },
    oneAdSuccess: function() {
        this.setData({
            oneAd: 1
        });
    },
    oneAdFail: function() {
        this.setData({
            oneAd: 0
        });
    },
    getShareEng: function() {
        var i = this;
        t.postData("/Index/get_share_ticket", !0, {
            appid: t.globalData.appid,
            uid: wx.getStorageSync("uid"),
            scene: t.globalData.scene,
            version: t.globalData.version,
            token: wx.getStorageSync("token")
        }, {
            success: function(a) {
                if (200 == a.data.code) {
                    var e = a.data.data;
                    1 == e.status && (i.setData({
                        toastCtrol: 2
                    }), i.data.ticket = e.ticket, t.globalData.ticket = e.ticket);
                }
            },
            fail: function() {}
        });
    },
    onShareAppMessage: function(a) {
        "button" == a.from && this.setData({
            toastCtrol: 0,
            rank_up: 0
        });
        var e = "";
        return null != a.target && ("体力" == a.target.dataset.other && wx.setStorageSync("shareCtrol", 1), 
        "延迟" == a.target.dataset.other && wx.setStorageSync("reset", 1), e = a.target.dataset.other), 
        t.sharePublic(e), {
            title: this.data.config.share_title,
            path: "pages/index/index?inviter_id=" + t.globalData.uid,
            imageUrl: this.data.config.share_img,
            success: function(t) {}
        };
    },
    onShow: function() {
        this.setData({
            ticket: t.globalData.ticket,
            gold: t.globalData.gold
        }), 1 == wx.getStorageSync("shareCtrol") && (wx.removeStorageSync("shareCtrol"), 
        this.getShareEng()), this.data.ticket < wx.getStorageSync("ticket_max") && (clearInterval(this.data.timer), 
        this.getSurplusTime());
    },
    onHide: function() {
        clearInterval(this.data.timer);
    },
    onUnload: function() {
        clearInterval(this.data.timer);
    },
    tapMoreGame: function(t) {
        var a = t.currentTarget.dataset;
        wx.navigateToMiniProgram({
            appId: a.item.gameAppid,
            path: a.item.gamePath,
            success: function(t) {
                console.log("跳转成功");
            },
            fail: function() {
                console.log("跳转失败"), wx.previewImage({
                    urls: [ a.item.gameQrcode ]
                });
            }
        });
    },
    toggleMoreGame: function() {
        this.setData({
            showMoreGamePopup: !this.data.showMoreGamePopup
        });
    }
});