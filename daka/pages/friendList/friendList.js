function e(e, t, o) {
    return t in e ? Object.defineProperty(e, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = o, e;
}

function t(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var o, i, n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/tools.js")), a = (getApp(), t(require("./modules/base-canvas-palette.js")),
t(require("../../utils/wx-promisify/wx-promisify"))), s = t(require("./modules/handle-create-img.js"));

(0, a.default)(wx.getSetting), Page((o = {
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
        poster: "",
        is_poster: !1,
        show_poster: !1
    },
    onLoad: function(e) {
        i = this;
        wx.setNavigationBarTitle({
            title:'我的好友'
        })
    },
    onReady: function() {
        var e = {
            action: "friend",
            contr: "my",
            token: wx.getStorageSync("token")
        };
        wx.showLoading({
            title: "加载中"
        }), n.default.request(e, function(e) {
            e.info = e.data;

            i.setData({
                config:{
                    ad_type:1,
                    grid_ad:'111',
                    poster_bg:'https://img.yzcdn.cn/public_files/2019/07/22/f4b70763c55c8710c52c667ecf192c05.jpeg',
                },
                friends_num:100,
                friends:[
                    {
                        head:'https://img01.yzcdn.cn/vant/logo.png',
                        nickname:'1234',
                        all_clock:1345,
                        day:{
                            clock:3
                        }
                    },
                    {
                        head:'https://img01.yzcdn.cn/vant/logo.png',
                        nickname:'1234',
                        all_clock:1345,
                        day:{
                            clock:3
                        }
                    },
                    {
                        head:'https://img01.yzcdn.cn/vant/logo.png',
                        nickname:'1234',
                        all_clock:1345,
                        day:{
                            clock:3
                        }
                    },
                    {
                        head:'https://img01.yzcdn.cn/vant/logo.png',
                        nickname:'1234',
                        all_clock:1345,
                        day:{
                            clock:3
                        }
                    },
                    {
                        head:'https://img01.yzcdn.cn/vant/logo.png',
                        nickname:'1234',
                        all_clock:1345,
                        day:{
                            clock:3
                        }
                    },
                    {
                        head:'https://img01.yzcdn.cn/vant/logo.png',
                        nickname:'1234',
                        all_clock:1345,
                        day:{
                            clock:3
                        }
                    },
                    {
                        head:'https://img01.yzcdn.cn/vant/logo.png',
                        nickname:'1234',
                        all_clock:1345,
                        day:{
                            clock:3
                        }
                    },
                    {
                        head:'https://img01.yzcdn.cn/vant/logo.png',
                        nickname:'1234',
                        all_clock:1345,
                        day:{
                            clock:3
                        }
                    },
                    {
                        head:'https://img01.yzcdn.cn/vant/logo.png',
                        nickname:'1234',
                        all_clock:1345,
                        day:{
                            clock:3
                        }
                    },
                    {
                        head:'https://img01.yzcdn.cn/vant/logo.png',
                        nickname:'1234',
                        all_clock:1345,
                        day:{
                            clock:3
                        }
                    },
                    {
                        head:'https://img01.yzcdn.cn/vant/logo.png',
                        nickname:'1234',
                        all_clock:1345,
                        day:{
                            clock:3
                        }
                    },
                    {
                        head:'https://img01.yzcdn.cn/vant/logo.png',
                        nickname:'1234',
                        all_clock:1345,
                        day:{
                            clock:3
                        }
                    },
                    {
                        head:'https://img01.yzcdn.cn/vant/logo.png',
                        nickname:'1234',
                        all_clock:1345,
                        day:{
                            clock:3
                        }
                    },
                    {
                        head:'https://img01.yzcdn.cn/vant/logo.png',
                        nickname:'1234',
                        all_clock:1345,
                        day:{
                            clock:3
                        }
                    },
                    {
                        head:'https://img01.yzcdn.cn/vant/logo.png',
                        nickname:'1234',
                        all_clock:1345,
                        day:{
                            clock:3
                        }
                    },
                    {
                        head:'https://img01.yzcdn.cn/vant/logo.png',
                        nickname:'1234',
                        all_clock:1345,
                        day:{
                            clock:3
                        }
                    },
                    {
                        head:'https://img01.yzcdn.cn/vant/logo.png',
                        nickname:'1234',
                        all_clock:1345,
                        day:{
                            clock:3
                        }
                    },
                    {
                        head:'https://img01.yzcdn.cn/vant/logo.png',
                        nickname:'1234',
                        all_clock:1345,
                        day:{
                            clock:3
                        }
                    },
                    {
                        head:'https://img01.yzcdn.cn/vant/logo.png',
                        nickname:'1234',
                        all_clock:1345,
                        day:{
                            clock:3
                        }
                    },
                ],
                audit_model:true,
                share:{
                    member_id:123,
                    text:'分享哈哈哈',
                    images:'https://img.yzcdn.cn/public_files/2019/08/15/fa0549210055976cb63798503611ce3d.png',
                },
                show_poster: false,
                poster:'',
                head:'https://msn-img-nos.yiyouliao.com/inforec-20210427-6a0817dc961fa5943750df62669d0f75.png?time=1619506717&signature=0E3143BA236C3B2343FE17B7AA84ADD6',
                qr_code:'https://msn-img-nos.yiyouliao.com/inforec-20210427-6a0817dc961fa5943750df62669d0f75.png?time=1619506717&signature=0E3143BA236C3B2343FE17B7AA84ADD6',
            })

            console.log("e.info",e.info);
            i.setData(e.info);
            var t = null;
            wx.createInterstitialAd && e.info.config.screen_ad && ((t = wx.createInterstitialAd({
                adUnitId: e.info.config.screen_ad
            })).onLoad(function() {
                console.log("onLoad event emit");
            }), t.onError(function(e) {
                console.log("onError event emit", e);
            }), t.onClose(function(e) {
                console.log("onClose event emit", e);
            }), t.show().catch(function(e) {
                console.error(e);
            }));
        });
    },
    showShare: function() {},
    onUnload: function() {},
    onHide: function() {},
    onShow: function() {}
}, e(o, "showShare", function() {
    var e = this.data.config.poster_bg;
    e = "https://img.yzcdn.cn/vant-weapp/qrcode-201808101114.jpg";
    if (console.log(e), this.data.poster) this.setData({
        show_poster: !0
    }); else {
        var t = [ {
            type: "image",
            url: e,
            css: {
                top: "0rpx",
                left: "0rpx",
                width: "540px",
                height: "960px",
                mode: "scaleToFill"
            }
        }, {
            type: "image",
            url: this.data.head,
            css: {
                top: "250px",
                left: "200px",
                width: "140px",
                height: "140px",
                borderRadius: "70px",
                borderWidth: "1px",
                borderColor: "#ffffff"
            }
        }, {
            type: "image",
            url: this.data.qr_code,
            css: {
                top: "655px",
                left: "185px",
                width: "170px",
                height: "170px",
                borderRadius: "85px",
                borderWidth: "1px",
                borderColor: "#ffffff"
            }
        } ];
        this.data.poster = {
            content: t
        }, console.log(t), i.setData({
            is_poster: !0
        }), wx.showLoading({
            title: "正在生成海报",
            mask: !0
        }), s.default.doCreateImg(this);
        try {
            getApp().sensors.track("XMClick", {
                ck_module: "保存海报",
                page: ""
            });
        } catch (e) {}
    }
}), e(o, "imgErr", function(e) {
    console.log(22222), i.setData({
        is_poster: !1
    }), s.default.createImgFail(e);
}), e(o, "hidePost", function() {
    i.setData({
        show_poster: !1
    });
}), e(o, "onImgOK", function(e) {
    console.log(e), console.log(33333333), wx.hideLoading(), i.setData({
        is_poster: !1,
        show_poster: !0,
        poster: e.detail.path
    });
}), e(o, "preservation", function() {
    wx.saveImageToPhotosAlbum({
        filePath: i.data.poster,
        success: function(e) {
            wx.showToast({
                title: "保存图片成功！",
                icon: "none"
            });
        },
        fail: function(e) {}
    });
}), e(o, "onShareAppMessage", function() {
    return {
        title: this.data.share.text,
        imageUrl: this.data.share.images,
        path: "bh_rising/pages/index/index?parentId=" + this.data.share.member_id
    };
}), o));
