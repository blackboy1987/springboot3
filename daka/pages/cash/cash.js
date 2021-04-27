var t, a = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/tools.js"));

getApp(), Page({
    data: {
        share: {
            text: "",
            xcx_title: "",
            share_image: "",
            member_id: "",
            cash_money: 0
        },
        payment_code: "",
        payment_code_url: "",
        is_cash: 1,
        audit_model: !0
    },
    onLoad: function(a) {
        t = this;
        t.setData({
            audit_model:false,
            member:{
                money:12.3,
            },
            cash_type:2,
            tx:123.5,
            least_money:5,
            cash_money:3,
            payment_code_url:'payment_code_url',
            share_text:'share_text',
            isShowAd:true,
            cash_explain:false,
            first_presentation:123.5,
            follow_up_presentation:123.5,
            bag_daily_upper:123.5,
            cash_explain:[
                'cash_explain',
                'cash_explaincash_explaincash_explain',
                'cash_explaincash_explaincash_explaincash_explaincash_explaincash_explain',
                'cash_explaincash_explaincash_explaincash_explaincash_explaincash_explaincash_explaincash_explaincash_explaincash_explain'
            ],
        })
    },
    onReady: function() {
        var e = {
            action: "cash",
            contr: "my",
            token: wx.getStorageSync("token")
        };
        a.default.request(e, function(a) {
            t.setData(a.info), t.setData({
                payment_code_url: t.data.member.payment_code_url,
                payment_code: t.data.member.payment_code
            });
        });
    },
    onShow: function() {},
    bindWithdrawAllClick: function() {
        this.setData({
            cash_money: this.data.member.money
        });
    },
    bindWithdrawBtnClick: function() {
        var e = parseFloat(this.data.member.money), n = parseFloat(this.data.cash_money);
        if (e < n) return wx.showToast({
            icon: "none",
            title: "余额不足"
        }), !1;
        if (Number.isNaN(n) || n < this.data.least_money) return wx.showToast({
            icon: "none",
            title: "最低提现门槛" + this.data.least_money + "元"
        }), !1;
        if (1 != this.data.is_cash) return !1;
        this.data.is_cash;
        var o = {
            action: "withdrawals",
            contr: "my",
            token: wx.getStorageSync("token"),
            money: n,
            payment_code: this.data.payment_code
        };
        a.default.request(o, function(a) {
            t.setData({
                is_cash: 1
            }), 2 == a.status ? wx.showModal({
                title: "提示",
                mask: !0,
                content: a.info,
                showCancel: !1
            }) : (wx.showToast({
                title: "提现成功"
            }), t.setData({
                cash_money: 0
            }), t.onReady());
        });
    },
    bindKeyInput: function(t) {
        this.data.cash_money = t.detail.value;
    },
    onHide: function() {},
    addImg: function() {
        var t = this;
        t.data.imgs && t.data.imgs.length >= 3 ? a.default.showNotice("最多上传1张") : wx.chooseImage({
            count: 1,
            success: function(e) {
                var n = [];
                console.log(t.data.imgs), t.data.imgs && (n = t.data.imgs), e.tempFiles.forEach(function(t) {
                    n.push(t.path);
                }), t.setData({
                    imgs: n
                }), a.default.upload(e.tempFiles[0].path, function(a) {
                    t.setData({
                        payment_code: a.info.path,
                        payment_code_url: a.info.url
                    });
                });
            }
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: this.data.share.text,
            imageUrl: this.data.share.images,
            path: "bh_rising/pages/index/index?parent_id=" + this.data.share.member_id
        };
    }
});
