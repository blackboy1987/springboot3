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
        is_auth: !0
    },
    onLoad: function(e) {
        (n = this).data.id = e.id;

        this.setData({
            images:{
                my_bg:"my_bg",
                login_image:"login_image",
            },
            member:{
                head:'head',
                nickname:'nickname',
            },
            all_nun:123,
            audit_model:false,
            currency_name:'currency_name',
            config:{
                ad_type:1,
                grid_ad:"grid_ad",
                official_account_img:'official_account_img',
                is_auth:false,
                show_login:true,
            }
        })
    },
    cancel_login: function() {
        n.setData({
            show_login: !1
        });
    },
    showOfficial: function() {
        wx.previewImage({
            current: n.data.config.official_account_img,
            urls: [ n.data.config.official_account_img ]
        });
    },
    onReady: function() {
        var t = {
            action: "index",
            contr: "my",
            token: wx.getStorageSync("token")
        };
        e.default.request(t, function(e) {
            n.setData(e.info);
            var t = null;
            wx.createInterstitialAd && e.info.config.screen_ad && ((t = wx.createInterstitialAd({
                adUnitId: e.info.config.screen_ad
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
        if ("getUserInfo:ok" == t.detail.errMsg) {
            var o = {
                action: "login",
                contr: "my",
                token: wx.getStorageSync("token"),
                encryptedData: t.detail.encryptedData,
                iv: t.detail.iv
            };
            e.default.request(o, function(e) {
                n.onReady();
            });
        } else console.log("用户拒绝了");
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
        return {
            title: this.data.share.text,
            imageUrl: this.data.share.images,
            path: "bh_rising/pages/index/index?parent_id=" + this.data.share.member_id
        };
    }
});
