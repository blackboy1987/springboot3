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
        index: 1
    },
    onLoad: function(e) {
        t = this;
        t.setData({
            share: {
                member_id:123,
                text:'aaa',
                images:'asdfasdf'
            },
            config:{
                ad_type:2,
                grid_ad:"12345",
                currency_name:'asdfdas'
            },
            rank:[
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
                {
                    head:'',
                    nickname:'',
                    currency:3,
                },
            ],
            audit_pattern:1
        })
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
            action: "today",
            contr: "rank",
            token: wx.getStorageSync("token")
        };
        wx.showLoading({
            title: "加载中"
        }), e.default.request(n, function(e) {
            t.setData(e.info);
        });
    },
    loadAll: function() {
        var n = {
            action: "all",
            contr: "rank",
            token: wx.getStorageSync("token")
        };
        wx.showLoading({
            title: "加载中"
        }), e.default.request(n, function(e) {
            t.setData(e.info);
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
        return {
            title: this.data.share.text,
            imageUrl: this.data.share.images,
            path: "/pages/index/index?parent_id=" + this.data.share.member_id
        };
    }
});
