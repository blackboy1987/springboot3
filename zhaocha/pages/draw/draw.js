var n = getApp();

Page({
    data: {},
    onLoad: function(a) {
        null != a.t ? (this.setData({
            fy_show: 1
        }), this.setData({
            config: a.globalData.config
        }), this.getDrawFun()) : this.setData({
            fy_show: 0
        });
    },
    getDrawFun: function() {
        var t = this;
        n.getData("/Draw/trophy_list", !0, {
            appid: n.globalData.appid,
            uid: wx.getStorageSync("uid"),
            version: n.globalData.version,
            scene: n.globalData.scene
        }, {
            success: function(a) {
                if (200 == a.data.code) {
                    var n = a.data.data;
                    t.setData({
                        obj: n
                    });
                }
            },
            fail: function() {}
        });
    },
    backFun: function() {
        wx.navigateBack();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});