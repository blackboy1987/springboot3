var util = require("we7/resource/js/util.js"), t = require("./utils/util.js"), siteInfo = require("siteinfo.js"), siteroot = siteInfo.siteroot, arr = siteroot.split("/"), host_url = arr[0] + "//" + arr[2], accountInfo = wx.getAccountInfoSync(), modelInfo = wx.getSystemInfoSync();

if ("qq" == modelInfo.AppPlatform) var ald = require("./utils/qq/ald-stat.js");

App({
    onLaunch: function(t) {
        this.globalData.userInfo = wx.getStorageSync("userInfo") || null, this.globalData.openid = wx.getStorageSync("openid") || "",
        this.globalData.uid = wx.getStorageSync("uid") || "", this.globalData.scene = t.scene || "",
        this.globalData.code = wx.getStorageSync("code") || "", this.globalData.inviter_id = t.query.inviter_id || 0,
        this.globalData.from = t.query.from || "";
    },
    onShow: function(t) {
        t.referrerInfo && t.referrerInfo.appId && (this.globalData.cps_appid = t.referrerInfo.appId);
    },
    globalData: {
        open_sound: 1,
        userInfo: null,
        scene: "",
        hosts: "https://api.mandiankan.com/",
        rightMusic: wx.createInnerAudioContext(),
        version: "n20190912",
        appid: accountInfo.miniProgram.appId,
        cps_appid: "",
        inviter_id: "",
        from: "",
        code: "",
        token: "",
        musicBG: wx.createInnerAudioContext(),
        musicCommon: wx.createInnerAudioContext(),
        btnMusic: wx.createInnerAudioContext(),
        siteroot: host_url,
        ticket: 0,
        gold: 0,
        uid: "",
        seo: {},
        appCode:'IEC3OARSJZAB4SG3YX',
        appToken:'yxb1123588b8c311c661e2e2f6bff63195fb1932809403507e67044dfadaf741',
    },
    wxLogin: function(o, t) {
        var e = this;
        wx.login({
            success: function(t) {
                if (t.code) {
                    var a = {
                        code: t.code,
                        scene: e.globalData.scene,
                        from: e.globalData.from,
                        inviter_id: e.globalData.inviter_id,
                        appid: e.globalData.appid,
                        cps_appid: e.globalData.cps_appid
                    };
                    // 登录
                    wx.setStorageSync("code", t.code), e.globalData.code = t.code, wx.request({
                        url: e.getApiUrl("/User/login"),
                        header: {
                            "content-type": "application/x-www-form-urlencoded",
                            Accept: "application/json",
                            "appCode": e.globalData.appCode,
                            "appToken": e.globalData.appToken
                        },
                        data: a,
                        method: "POST",
                        success: function(t) {
                            console.log(t,"wxLogin");
                            if (200 == t.data.code) {
                                var a = t.data;
                                wx.setStorageSync("user_info", t), wx.setStorageSync("openid", a.openid), e.globalData.openid = a.openid,
                                wx.setStorageSync("token", a.token), e.globalData.token = a.token, wx.setStorageSync("uid", a.uid),
                                e.globalData.uid = a.uid, wx.setStorageSync("ticket", a.ticket), e.globalData.ticket = a.ticket,
                                "function" == typeof o && o(t);
                            }
                        },
                        fail: function(t) {
                            console.log("请求失败");
                        }
                    });
                }
            },
            fail: function(t) {}
        });
    },
    countDownTrue: function() {
        this.globalData.open_sound && (this.globalData.musicCommon.src = this.globalData.siteroot + "/attachment/aaa_zhaocha_resource/music/countDown.mp3",
        this.globalData.musicCommon.play());
    },
    btnSoundTrue: function() {
        this.globalData.open_sound && (this.globalData.musicCommon.src = this.globalData.siteroot + "/attachment/aaa_zhaocha_resource/music/btnSound.mp3",
        this.globalData.musicCommon.play());
    },
    sharePublic: function() {
        var t = "";
        arguments.length && (t = arguments[0]);
        var a = this;
        if ("" == a.globalData.openid) return !1;
        var o = this.util.request_url({
            url: "entry/wxapp/share_info"
        });
        wx.request({
            url: o,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                appid: a.globalData.appid,
                uid: a.globalData.uid,
                scene: a.globalData.scene,
                version: a.globalData.version,
                other: t
            },
            success: function(t) {
                console.log(t);
            }
        });
    },
    adStatistics: function(t, a, o) {
        var e = this;
        this.postData("/Config/statistics_click_ad", !0, {
            appid: e.globalData.appid,
            uid: e.globalData.uid,
            scene: e.globalData.scene,
            version: e.globalData.version,
            ad_appid: t,
            ad_id: a,
            ad_path: o
        }, {
            success: function(t) {
                200 == t.data.code && console.log(t.data.data);
            },
            fail: function() {}
        });
    },
    getData: function(t) {
        const {globalData} = this;
        var a = t.split("/"), o = this.util.request_url({
            url: "entry/wxapp/" + a[a.length - 1]
        }), e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1], n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : [], i = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : {};
        e = e ? {
            "content-type": "application/json"
        } : {}, wx.request({
            url: o,
            header: {
                ...e,
                "appCode": globalData.appCode,
                "appToken": globalData.appToken,
                "token":wx.getStorageSync("token"),
            },
            data: n,
            success: function(t) {
                "function" == typeof i.success && i.success(t);
            },
            fail: function(t) {
                "function" == typeof i.fail ? i.fail(t) : wx.showToast({
                    title: "请求失败",
                    icon: "none"
                });
            }
        });
    },
    postData: function(t) {
        const {globalData} = this;
        var a = t.split("/"), o = this.util.request_url({
            url: "entry/wxapp/" + a[a.length - 1]
        }), e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1], n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : [], i = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : {};
        e = e ? {
            "content-type": "application/x-www-form-urlencoded",
            Accept: "application/json"
        } : {}, wx.request({
            url: o,
            header: {
                ...e,
                "appCode": globalData.appCode,
                "appToken": globalData.appToken,
                "token":wx.getStorageSync("token"),
            },
            data: n,
            method: "POST",
            success: function(t) {
                "function" == typeof i.success && i.success(t);
            },
            fail: function(t) {
                if ("function" == typeof i.fail) i.fail(t); else {
                    var a = "请求失败";
                    void 0 !== t.data && (a = data.msg), wx.showToast({
                        title: a,
                        icon: "none"
                    });
                }
            }
        });
    },
    getApiUrl: function(t) {
        var a = t.split("/");
        return this.util.request_url({
            url: "entry/wxapp/" + a[a.length - 1]
        });
    },
    actionTrace: function() {},
    util: util,
    userInfo: {
        sessionid: null
    },
    siteInfo: require("siteinfo.js")
});
