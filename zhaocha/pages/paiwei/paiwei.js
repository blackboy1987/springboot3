var t = getApp(), timeid = null;

Page({
    data: {
        roomid: 0,
        master: 0,
        self: {},
        room_list: []
    },
    onLoad: function(o) {
        null != o.t ? (this.setData({
            fy_show: 1,
            seo: t.globalData.seo
        }), console.log("paiwei onLoad", o), this.setData({
            appConfig: t.globalData.config
        }), (timeid = null) == o.roomid && (console.log("创建房间"), this.create_room()), o.roomid && (console.log("加入房间"), 
        this.setData({
            roomid: o.roomid
        }), this.join_room(o.roomid))) : this.setData({
            fy_show: 0
        });
    },
    startGame: function() {
        if (this.data.room_list.length <= 1) wx.showToast({
            title: "需要两人以上才能开始游戏",
            icon: "none",
            duration: 2e3
        }); else {
            var e = this;
            t.util.request({
                url: "entry/wxapp/startGame",
                data: {
                    appid: t.globalData.appid,
                    uid: wx.getStorageSync("uid"),
                    scene: t.globalData.scene,
                    version: t.globalData.version,
                    token: wx.getStorageSync("token"),
                    roomid: this.data.roomid
                },
                method: "post",
                success: function(o) {
                    var t = o.data.data;
                    if (console.log(t), -1 != t.code) {
                        if (-2 != t.code) return e.setData({
                            roomid: t.roomid,
                            self: t.self,
                            master: t.master,
                            room_list: t.room_list
                        }), t.start ? (clearTimeout(timeid), void wx.redirectTo({
                            url: "../game/game?t=1&roomid=" + this.data.roomid
                        })) : void 0;
                        wx.showModal({
                            title: "提示",
                            content: t.message,
                            showCancel: !1,
                            success: function(o) {}
                        });
                    } else wx.showModal({
                        title: "提示",
                        content: t.message,
                        showCancel: !1,
                        success: function(o) {
                            wx.navigateBack();
                        }
                    });
                }
            });
        }
    },
    info_room: function() {
        if (null != timeid && clearTimeout(timeid), this.data.roomid) {
            var e = this;
            t.util.request({
                url: "entry/wxapp/roomList",
                data: {
                    appid: t.globalData.appid,
                    uid: wx.getStorageSync("uid"),
                    scene: t.globalData.scene,
                    version: t.globalData.version,
                    token: wx.getStorageSync("token"),
                    roomid: e.data.roomid,
                    resource: "paiwei"
                },
                method: "post",
                success: function(o) {
                    var t = o.data.data;
                    console.log(t), -1 != t.code ? -2 != t.code ? 200 == t.code && (e.setData({
                        roomid: t.roomid,
                        self: t.self,
                        master: t.master,
                        room_list: t.room_list
                    }), t.start ? wx.redirectTo({
                        url: "../game/game?t=1&roomid=" + this.data.roomid
                    }) : timeid = setTimeout(function() {
                        e.info_room();
                    }, 1e3)) : wx.showModal({
                        title: "提示",
                        content: t.message,
                        showCancel: !1,
                        success: function(o) {}
                    }) : wx.showModal({
                        title: "提示",
                        content: t.message,
                        showCancel: !1,
                        success: function(o) {
                            console.log("roomid", e.data.roomid), wx.navigateBack();
                        }
                    });
                }
            });
        } else console.log("info_room", this.data.roomid);
    },
    quit_room: function(o) {
        var e = o.currentTarget.dataset.item, a = e.openid, i = e.roomid, s = this;
        t.util.request({
            url: "entry/wxapp/quit_room",
            data: {
                appid: t.globalData.appid,
                uid: wx.getStorageSync("uid"),
                scene: t.globalData.scene,
                version: t.globalData.version,
                token: wx.getStorageSync("token"),
                openid: a,
                roomid: i
            },
            method: "post",
            success: function(o) {
                var t = o.data.data;
                console.log(t), -1 != t.code ? s.setData({
                    roomid: t.roomid,
                    self: t.self,
                    master: t.master,
                    room_list: t.room_list
                }) : wx.showModal({
                    title: "提示",
                    content: t.message,
                    showCancel: !1,
                    success: function(o) {
                        clearTimeout(timeid), wx.navigateBack();
                    }
                });
            }
        });
    },
    join_room: function(o) {
        var e = this;
        t.util.request({
            url: "entry/wxapp/join_room",
            data: {
                appid: t.globalData.appid,
                uid: wx.getStorageSync("uid"),
                scene: t.globalData.scene,
                version: t.globalData.version,
                token: wx.getStorageSync("token"),
                roomid: o
            },
            method: "post",
            success: function(o) {
                var t = o.data.data;
                console.log(t), -1 != t.code ? (e.setData({
                    roomid: t.roomid,
                    self: t.self,
                    master: t.master,
                    room_list: t.room_list
                }), t.start ? wx.redirectTo({
                    url: "../game/game?t=1&roomid=" + this.data.roomid
                }) : e.info_room()) : wx.showModal({
                    title: "提示",
                    content: t.message,
                    showCancel: !1,
                    success: function(o) {
                        wx.navigateBack();
                    }
                });
            }
        });
    },
    create_room: function() {
        var e = this;
        t.util.request({
            url: "entry/wxapp/create_room",
            data: {
                appid: t.globalData.appid,
                uid: wx.getStorageSync("uid"),
                scene: t.globalData.scene,
                version: t.globalData.version,
                token: wx.getStorageSync("token")
            },
            method: "post",
            success: function(o) {
                var t = o.data.data;
                console.log(t), -1 != t.code ? (e.setData({
                    roomid: t.roomid,
                    self: t.self,
                    master: t.master,
                    room_list: t.room_list
                }), e.info_room()) : wx.showModal({
                    title: "提示",
                    content: t.message,
                    showCancel: !1,
                    success: function(o) {
                        wx.navigateBack();
                    }
                });
            }
        });
    },
    backFun: function() {
        var o = wx.getStorageSync("uid"), e = this.data.roomid;
        t.util.request({
            url: "entry/wxapp/quit_room",
            data: {
                appid: t.globalData.appid,
                uid: wx.getStorageSync("uid"),
                scene: t.globalData.scene,
                version: t.globalData.version,
                token: wx.getStorageSync("token"),
                openid: o,
                roomid: e
            },
            method: "post",
            success: function(o) {
                clearTimeout(timeid);
            }
        }), wx.navigateBack();
    },
    onReady: function() {},
    onShow: function() {
        console.log("onShow", timeid), null != timeid && this.info_room();
    },
    onHide: function() {
        clearTimeout(timeid);
    },
    onUnload: function() {
        clearTimeout(timeid);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "跟我一起玩排位",
            path: "pages/index/index?mode=paiwei&roomid=" + this.data.roomid,
            imageUrl: ""
        };
    }
});