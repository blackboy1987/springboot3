function e(e) {
    var t = {
        action: "getAddress",
        contr: "my",
        token: wx.getStorageSync("token")
    };
    a.default.request(t, function(t) {
        t.info.address ? e.setData({
            consignee: t.info.address.name,
            tel: t.info.address.phone,
            detailAddress: t.info.address.address
        }) : wx.chooseAddress({
            success: function(t) {
                e.setData({
                    consignee: t.userName,
                    tel: t.telNumber,
                    detailAddress: t.provinceName + t.cityName + t.countyName + t.detailInfo
                });
            }
        });
    });
}

var t, a = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/tools.js"));

Page({
    data: {
        consignee: "",
        tel: "",
        detailAddress: "",
        card: "",
        nav: {
            title: "收货地址",
            showHome: !0,
            isHomePage: !0
        },
        loading: !1
    },
    onLoad: function(a) {
        t = this, a.id && (t.data.id = a.id), e(t);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    nameInput: function(e) {
        this.setData({
            consignee: e.detail.value
        });
    },
    telInput: function(e) {
        this.setData({
            tel: e.detail.value
        });
    },
    cardInput: function(e) {
        this.setData({
            card: e.detail.value
        });
    },
    detailInput: function(e) {
        this.setData({
            detailAddress: e.detail.value
        });
    },
    layerclose: function(e) {
        this.setData({
            layer: !1
        });
    },
    submit: function(e) {
        this.setData({
            layer: !0
        });
    },
    btnsubmit: function(e) {
        var t = this;
        t.setData({
            layer: !1
        });
        var n = {
            action: "setAddress",
            contr: "my"
        }, o = wx.getStorageSync("token"), s = t.data.consignee, i = t.data.tel, d = (t.data.card,
        t.data.detailAddress);
        "" != s ? "" != i ? "" != d ? (n.token = o, n.formid = e.detail.formId, n.name = s,
        n.phone = i, n.address = d, a.default.request(n, function(e) {
            wx.navigateBack();
        })) : a.default.showNotice("请填写详细地址") : a.default.showNotice("请填写电话") : a.default.showNotice("请填写收货人");
    }
});
