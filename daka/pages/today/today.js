var t, e = function(t) {
    return t && t.__esModule ? t : {
        default: t
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
    onLoad: function(e) {
        t = this;
        t.setData({
            my_num:1234,
            one_num:12,
            two_num:55,
            config:{
                ad_type:1,
                grid_ad:'grid_ad',
                one_currency:123,
                two_currency:22,
                audit_model:true,
            },
            log:[
                {
                    member:{
                        nickname:'nickname',
                        head:'head',
                    },
                    created:'created',
                },
                {
                    member:{
                        nickname:'nickname',
                        head:'head',
                    },
                    created:'created',
                },
                {
                    member:{
                        nickname:'nickname',
                        head:'head',
                    },
                    created:'created',
                },
                {
                    member:{
                        nickname:'nickname',
                        head:'head',
                    },
                    created:'created',
                },
                {
                    member:{
                        nickname:'nickname',
                        head:'head',
                    },
                    created:'created',
                },
                {
                    member:{
                        nickname:'nickname',
                        head:'head',
                    },
                    created:'created',
                },
                {
                    member:{
                        nickname:'nickname',
                        head:'head',
                    },
                    created:'created',
                },
                {
                    member:{
                        nickname:'nickname',
                        head:'head',
                    },
                    created:'created',
                },
                {
                    member:{
                        nickname:'nickname',
                        head:'head',
                    },
                    created:'created',
                },
                {
                    member:{
                        nickname:'nickname',
                        head:'head',
                    },
                    created:'created',
                },
                {
                    member:{
                        nickname:'nickname',
                        head:'head',
                    },
                    created:'created',
                }
            ],

        })
    },
    onReady: function() {
        var a = {
            action: "index",
            contr: "clock",
            level: t.data.level,
            token: wx.getStorageSync("token")
        };
        e.default.request(a, function(e) {
            t.setData(e.info), t.loadContent();
        });
    },
    loadContent: function() {
        var a = {
            action: "log",
            contr: "clock",
            level: t.data.level,
            token: wx.getStorageSync("token"),
            p: t.data.p,
            today: 1
        };
        wx.showLoading({
            title: "加载中"
        }), e.default.request(a, function(e) {
            var a = e.info.log;
            t.data.p > 1 && (a = t.data.log.concat(a)), t.setData({
                log: a
            }), e.info.log.length < 10 && t.setData({
                isover: !0
            });
        });
    },
    clicklevel: function(e) {
        var a = e.currentTarget.dataset.level;
        this.setData({
            level: a,
            log: [],
            p: 1,
            isover: !1
        }), t.loadContent();
    },
    onReachBottom: function() {
        this.data.isover || (this.data.p += 1, t.loadContent());
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
