function e(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var a, n = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/tools.js")), o = getApp();

Page(e({
    data: {
        p: 1,
        orderStatus: e({
            1: "FA2828",
            2: "FF8E00",
            3: "26BCC5",
            4: "909090"
        }, "4", "8C9EAE"),
        share_text: "",
        share_image: "",
        isShowPop: !1,
        order_explain: "",
        service_image: ""
    },
    onLoad: function(t) {
        this.setData({
            img_url: o.siteInfo.siteroot.replace(/app\/index.php/, "") + o.img_url
        }), this.setData({
            attention: this.data.img_url + "/step2gift/attention.png"
        }), a = this;
    },
    closePop: function() {
        this.setData({
            isShowPop: !1
        });
    },
    navigateToVoucher: function() {
        wx.navigateTo({
            url: "/pages/voucher/voucher"
        });
    },
    navigateCash: function() {
        wx.navigateTo({
            url: "/pages/cash/cash"
        });
    },
    onReady: function() {
        var t = {
            action: "order",
            contr: "my",
            token: wx.getStorageSync("token")
        };
        n.default.request(t, function(t) {
            a.setData(t.data);
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: this.data.share.text,
            imageUrl: this.data.share.images,
            path: "/pages/index/index?parent_id=" + wx.getStorageSync("userInfo").id,
        };
    },
    nagativeToIndex: function() {
        wx.reLaunch({
            url: "/pages/goodsconvert/goodsconvert"
        });
    },
    navigateToDetial: function() {
        var e = t.currentTarget.dataset.value;
        wx.navigateTo({
            url: "/pages/goods/goods?id=" + e
        });
    },
    copy: function(t) {
        var e = t.currentTarget.dataset.value;
        wx.setClipboardData({
            data: e,
            success: function(t) {
                wx.showToast({
                    title: "复制成功"
                });
            }
        });
    }
}, "navigateToDetial", function(t) {
    var e = t.currentTarget.dataset.value;
    t.currentTarget.dataset.etype, wx.navigateTo({
        url: "/pages/goods/goods?id=" + e
    });
}));
