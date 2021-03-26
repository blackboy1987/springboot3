var a = getApp(), interstitialAd = null;

Page({
    data: {
        roomid: 0,
        room_list: [],
        win_openid: "",
        self: {}
    },
    onLoad: function(t) {
        if (null != t.t) {
            this.setData({
                fy_show: 1,
                seo: a.globalData.seo
            });
            var o = a.globalData.config.adunit;
            wx.createInterstitialAd && (interstitialAd = wx.createInterstitialAd({
                adUnitId: o.chaping
            })), setTimeout(function() {
                interstitialAd && interstitialAd.show().catch(function(a) {
                    console.error(a);
                });
            }, 500), this.setData({
                appConfig: a.globalData.config
            }), this.setData({
                roomid: t.roomid
            }), this.info_room();
        } else this.setData({
            fy_show: 0
        });
    },
    info_room: function() {
        var o = this;
        a.util.request({
            url: "entry/wxapp/roomList",
            data: {
                appid: a.globalData.appid,
                uid: wx.getStorageSync("uid"),
                scene: a.globalData.scene,
                version: a.globalData.version,
                token: wx.getStorageSync("token"),
                roomid: o.data.roomid,
                answer: 1,
                resource: "result"
            },
            method: "post",
            success: function(a) {
                var t = a.data.data;
                console.log(t), -1 != t.code ? o.setData({
                    room_list: t.room_list,
                    win_openid: t.win_openid,
                    self: t.self
                }) : wx.showModal({
                    title: "提示",
                    content: t.message,
                    showCancel: !1,
                    success: function(a) {
                        wx.navigateBack();
                    }
                });
            }
        });
    },
    againGame: function() {
        var o = this;
        a.util.request({
            url: "entry/wxapp/againGame",
            data: {
                appid: a.globalData.appid,
                uid: wx.getStorageSync("uid"),
                scene: a.globalData.scene,
                version: a.globalData.version,
                token: wx.getStorageSync("token"),
                roomid: o.data.roomid
            },
            method: "post",
            success: function(a) {
                var t = a.data.data;
                console.log(t), -1 != t.code ? wx.redirectTo({
                    url: "../paiwei/paiwei?t=1&roomid=" + o.data.roomid
                }) : wx.showModal({
                    title: "提示",
                    content: t.message,
                    showCancel: !1,
                    success: function(a) {
                        wx.navigateBack();
                    }
                });
            }
        });
    },
    backFun: function() {
        var t = wx.getStorageSync("uid"), o = this.data.roomid;
        a.util.request({
            url: "entry/wxapp/quit_room",
            data: {
                appid: a.globalData.appid,
                uid: wx.getStorageSync("uid"),
                scene: a.globalData.scene,
                version: a.globalData.version,
                token: wx.getStorageSync("token"),
                openid: t,
                roomid: o
            },
            method: "post",
            success: function(a) {}
        }), wx.navigateBack();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});