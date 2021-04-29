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
        e.setData({
            config:{
                ad_type:1,
                grid_ad:'grid_ad',
            },
            rule:[
                {
                    content:'1111',
                },
                {
                    content:'22222',
                },
                {
                    content:'33333',
                },
                {
                    content:'44444',
                },
                {
                    content:'115555511',
                },
            ]
        })
    },
    onReady: function() {
        var n = {
            action: "exemption",
            contr: "index",
            token: wx.getStorageSync("token")
        };
        t.default.request(n, function(t) {
            e.setData(t.info);
        });
    },
    onUnload: function() {},
    onHide: function() {},
    onShow: function() {},
    onShareAppMessage: function() {
        return {
            title: this.data.share.text,
            imageUrl: this.data.share.images,
            path: "bh_rising/pages/index/index?parentId=" + this.data.share.member_id
        };
    }
});
