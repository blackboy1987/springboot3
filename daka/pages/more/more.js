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
        e.setData({
            program:[
                {
                    icon:'https://msn-img-nos.yiyouliao.com/inforec-20210427-6a0817dc961fa5943750df62669d0f75.png?time=1619506717&signature=0E3143BA236C3B2343FE17B7AA84ADD6',
                    name:'name',
                },
                {
                    icon:'https://msn-img-nos.yiyouliao.com/inforec-20210427-6a0817dc961fa5943750df62669d0f75.png?time=1619506717&signature=0E3143BA236C3B2343FE17B7AA84ADD6',
                    name:'name',
                },
                {
                    icon:'https://msn-img-nos.yiyouliao.com/inforec-20210427-6a0817dc961fa5943750df62669d0f75.png?time=1619506717&signature=0E3143BA236C3B2343FE17B7AA84ADD6',
                    name:'name',
                },
                {
                    icon:'https://msn-img-nos.yiyouliao.com/inforec-20210427-6a0817dc961fa5943750df62669d0f75.png?time=1619506717&signature=0E3143BA236C3B2343FE17B7AA84ADD6',
                    name:'name',
                },
                {
                    icon:'https://msn-img-nos.yiyouliao.com/inforec-20210427-6a0817dc961fa5943750df62669d0f75.png?time=1619506717&signature=0E3143BA236C3B2343FE17B7AA84ADD6',
                    name:'name',
                },
                {
                    icon:'https://msn-img-nos.yiyouliao.com/inforec-20210427-6a0817dc961fa5943750df62669d0f75.png?time=1619506717&signature=0E3143BA236C3B2343FE17B7AA84ADD6',
                    name:'name',
                },
                {
                    icon:'https://msn-img-nos.yiyouliao.com/inforec-20210427-6a0817dc961fa5943750df62669d0f75.png?time=1619506717&signature=0E3143BA236C3B2343FE17B7AA84ADD6',
                    name:'name',
                },
                {
                    icon:'https://msn-img-nos.yiyouliao.com/inforec-20210427-6a0817dc961fa5943750df62669d0f75.png?time=1619506717&signature=0E3143BA236C3B2343FE17B7AA84ADD6',
                    name:'name',
                },
            ]
        })
    },
    onReady: function() {
        var n = {
            action: "program",
            contr: "index",
            token: wx.getStorageSync("token")
        };
        t.default.request(n, function(t) {
            e.setData(t.info);
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: e.data.share.text,
            imageUrl: e.data.share.image,
            path: "bh_clock/pages/index/index?arent_id=" + e.data.share.member_id
        };
    }
});
