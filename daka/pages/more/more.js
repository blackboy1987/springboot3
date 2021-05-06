var e, t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/tools.js"));

getApp(), Page({
    data: {
        share_text: "",
        share_image: "",
        img_url: "",
        isIphoneX: !1
    },
    onLoad: function(t) {
        e = this, wx.getStorageSync("demo_id") && wx.removeStorageSync("demo_id");
    },
    onReady: function() {
        var n = {
            action: "program",
            contr: "index",
            token: wx.getStorageSync("token")
        };
        t.default.request(n, function(t) {
            e.setData(t.data);
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        const appConfig = wx.getStorageSync("appConfig");
        return {
            title: appConfig.config.shareText,
            imageUrl: appConfig.config.shareImage,
            path: "/pages/index/index?parentId=" + wx.getStorageSync("userInfo").id
        };
    }
});
