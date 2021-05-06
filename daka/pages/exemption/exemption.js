var e, t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/tools.js"));

getApp(), Page({
    data: {
        id: 0,
        indicatorDots: !1,
        vertical: !1,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        isScrollY: !0,
        current: 0,
        isIphoneX: !1,
        isIphone: !1,
        extra_info_tab: 1,
        level: 1,
        p: 1,
        isover: !1
    },
    onLoad: function(t) {
        e = this;
        e.setData(wx.getStorageSync("appConfig"));
    },
    onReady: function() {
        var n = {
            action: "exemption",
            contr: "index",
            token: wx.getStorageSync("token")
        };
        t.default.request(n, function(t) {
            e.setData(t.data);
        });
    },
    onUnload: function() {},
    onHide: function() {},
    onShow: function() {},
    onShareAppMessage: function() {
        const appConfig = wx.getStorageSync("appConfig");
        return {
            title: appConfig.config.shareText,
            imageUrl: appConfig.config.shareImage,
            path: "/pages/index/index?parentId=" + wx.getStorageSync("userInfo").id
        };
    }
});
