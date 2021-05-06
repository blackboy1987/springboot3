var t, e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/tools.js"));

getApp(), Page({
    data: {
        member:{

        }
    },
    onLoad: function(e) {
        t = this;
        t.setData(wx.getStorageSync("appConfig"));
        t.setData({
            member:wx.getStorageSync("userInfo"),
        });
    },
    onReady: function() {
    },
    onUnload: function() {},
    onHide: function() {},
    onShow: function() {
        var n = {
            action: "shop",
            contr: "shop",
            token: wx.getStorageSync("token")
        };
        e.default.request(n, function(e) {
            t.setData(e.data);
        });
    },
    goodsDetails: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/goods/goods?id=" + e
        });
    },
    gotoSgin: function() {
        wx.navigateTo({
            url: "/pages/order/order"
        });
    },
    onShareAppMessage: function() {
        const appConfig = wx.getStorageSync("appConfig");
        return {
            title: appConfig.config.shareText,
            imageUrl: appConfig.config.shareImage,
            path: "/pages/index/index?parentId=" + wx.getStorageSync("userInfo").id
        };
    }
});
