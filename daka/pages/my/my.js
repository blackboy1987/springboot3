var n, e = function(n) {
    return n && n.__esModule ? n : {
        default: n
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
        audit_model: !0,
        show_login: !0,
        isAuth: wx.getStorageSync("isAuth")||false,
        appConfig:{},
        userInfo:{},
    },
    onLoad: function(e) {
        (n = this).data.id = e.id;
    },
    cancel_login: function() {
        n.setData({
            show_login: !1
        });
    },
    showOfficial: function() {
        wx.previewImage({
            current: n.data.appConfig.config.officialAccountImg,
            urls: [ n.data.appConfig.config.officialAccountImg ]
        });
    },
    onReady: function() {
        n.setData({
            appConfig:wx.getStorageSync("appConfig"),
            userInfo:wx.getStorageSync("userInfo"),
        });

        var t = {
            action: "my",
            contr: "my",
            token: wx.getStorageSync("token")
        };
        e.default.request(t, function(e) {
            const appConfig = wx.getStorageSync("appConfig");
            n.setData(e.data);
            var t = null;
            wx.createInterstitialAd && appConfig.ads.interstitialAdId && ((t = wx.createInterstitialAd({
                adUnitId: appConfig.ads.interstitialAdId
            })).onLoad(function() {
                console.log("onLoad event emit");
            }), t.onError(function(n) {
                console.log("onError event emit", n);
            }), t.onClose(function(n) {
                console.log("onClose event emit", n);
            }), t.show().catch(function(n) {
                console.error(n);
            }));
        });
    },
    getUserInfo: function(t) {
        const root = this;
        wx.getUserProfile({
            lang: 'zh_CN',
            desc: '用户登录',
            success: (res) => {
                if ("getUserProfile:ok" === res.errMsg) {
                    var n = {
                        action: "login",
                        contr: "my",
                        token: wx.getStorageSync("token"),
                        parentId: wx.getStorageSync("parentId"),
                        ...res.userInfo,
                        iv: t.detail.iv
                    };
                    e.default.request(n, function (t) {
                        if(t.data.userInfo){
                            root.setData({
                                isAuth: t.data.userInfo.isAuth
                            });
                            wx.setStorageSync("isAuth",t.data.userInfo.isAuth);
                        }


                    });
                } else{
                    console.log("用户拒绝了");
                }

            },
            fail: () => {
                wx.showToast({
                    icon:'none',
                    title:'已拒绝小程序获取信息',
                })
            }
        });
    },
    gotoCash: function() {
        wx.navigateTo({
            url: "/bh_cat/pages/cash/cash"
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
