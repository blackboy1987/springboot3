var t, e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/tools.js"));

let timer;

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
        index: 1,
        interstitialAd: null,
    },
    onLoad: function(e) {
        t = this;
        const appConfig = wx.getStorageSync("appConfig")||{};
        this.setData(appConfig);
        if(wx.createInterstitialAd&&appConfig.ads.interstitialAdId){
            const interstitialAd = wx.createInterstitialAd({ adUnitId: appConfig.ads.interstitialAdId ||'' })
            interstitialAd.onLoad(() => {
                console.log('onLoad event emit')
            })
            interstitialAd.onError((err) => {
                console.log('onError event emit', err)
            })
            interstitialAd.onClose((res) => {
                console.log('onClose event emit', res);
                t.interstitialAdShow();
            })
            this.setData({
                interstitialAd:interstitialAd,
            });
            t.interstitialAdShow();
        }
    },

    interstitialAdShow:function (){
        const root = this;
        clearTimeout(timer);
        if(root.interstitialAd){
            timer = setTimeout(function (){
                root.interstitialAd.show();
            },15e3);
        }
    },

    bindTabClick: function(t) {
        var e = t.currentTarget.dataset.index;
        this.setData({
            index: e
        }), this.onReady();
    },
    onReady: function() {
        1 == this.data.index ? this.loadToday() : this.loadAll();
    },
    loadToday: function() {
        var n = {
            action: "rank",
            contr: "rank",
            token: wx.getStorageSync("token")
        };
        wx.showLoading({
            title: "加载中"
        }), e.default.request(n, function(e) {
            t.setData(e.data);
        });
    },
    loadAll: function() {
        var n = {
            action: "rank1",
            contr: "rank",
            token: wx.getStorageSync("token")
        };
        wx.showLoading({
            title: "加载中"
        }), e.default.request(n, function(e) {
            t.setData(e.data);
        });
    },
    clicklevel: function(e) {
        var n = e.currentTarget.dataset.level;
        this.setData({
            level: n,
            log: [],
            p: 1,
            isover: !1
        }), t.loadContent();
    },
    onReachBottom: function() {},
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
