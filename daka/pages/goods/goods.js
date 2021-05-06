function t(t) {
    var e = {
        token: wx.getStorageSync("token"),
        id: t.data.id
    };
    a.default.request(e, function(t) {
        2 == t.status ? wx.requestPayment({
            timeStamp: t.info.paydata.timeStamp,
            nonceStr: t.info.paydata.nonceStr,
            package: t.info.paydata.package,
            signType: t.info.paydata.signType,
            paySign: t.info.paydata.paySign,
            success: function(t) {
                wx.showToast({
                    title: "兑换成功"
                }), setTimeout(function() {
                    wx.navigateTo({
                        url: "/pages/order/order"
                    });
                }, 1500);
            },
            fail: function(t) {
                console.log(t);
            }
        }) : 3 == t.status ? wx.showModal({
            title: "提示",
            mask: !0,
            content: t.info,
            showCancel: !1
        }) : (wx.showToast({
            title: "兑换成功"
        }), setTimeout(function() {
            wx.navigateTo({
                url: "../order/order"
            });
        }, 800));
    }, function() {}, function() {}, "", !0, "entry/wxapp/exchange");
}

var e, a = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/tools.js")), n = require("../../wxParse/wxParse.js");

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
        extra_info_tab: 1
    },
    onLoad: function(t) {
        (e = this).data.id = t.id;
        this.setData(wx.getStorageSync("appConfig"))
    },
    onReady: function() {
        wx.getSystemInfo({
            success: function(t) {
                "ios" == t.platform && (e.setData({
                    isIphone: !0
                }), t.model.indexOf("iPhone X") > -1 && e.setData({
                    isIphoneX: !0
                }));
            }
        }), wx.createSelectorQuery().select("#global-nav").boundingClientRect(function(t) {
            console.log(t.height), e.setData({
                m_height: t.height
            });
        }).exec();
    },
    setAddress: function(t) {
        wx.navigateTo({
            url: "/pages/address/address"
        });
    },
    onUnload: function() {},
    onHide: function() {},
    swiperchange: function(t) {
        this.setData({
            current: t.detail.current
        });
    },
    switchTab: function(t) {
        this.setData({
            extra_info_tab: t.target.dataset.extra
        });
    },
    onShow: function() {
        var t = {
            action: "shopDetails",
            contr: "shop",
            token: wx.getStorageSync("token"),
            id: e.data.id
        };
        a.default.request(t, function(t) {
            e.setData(t.data);
            var a = t.data.product.introduction;
            n.wxParse("article", "html", a, e, 5);
        });
    },
    exchange: function() {
        this.data.address || 1 !== e.data.product.type ? wx.showModal({
            title: "提示",
            content: "确定要兑换该商品",
            success: function(a) {
                a.confirm ? t(e) : a.cancel && console.log("用户点击取消");
            }
        }) : wx.navigateTo({
            url: "/pages/address/address"
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
