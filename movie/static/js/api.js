Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.wxRegister = exports.getIP = exports.login = exports.onShare = exports.getSetting = exports.apiRequest = exports.vodCl = void 0;

var t = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    return e.default = t, e;
}(require("./aes.js")), e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("vue"));

exports.vodCl = function(t) {
    if ("string" == typeof t.vod_play_from) {
        t.vod_play_from = t.vod_play_from.split("$$$"), t.vod_play_url = t.vod_play_url.split("$$$"), 
        t.vod_author = t.vod_author.split(","), t.vod_content = t.vod_content.replace(/<[^bai>]+>/g, ""), 
        t.vod_mincontent = t.vod_content.substr(0, 85) + "... ", t.vod_play_url = t.vod_play_from.map(function(e, o) {
            return [ e, t.vod_play_url[o] ];
        });
        for (var e = [], o = 0; o < t.vod_play_url.length; o++) {
            if (getApp().globalData.$config.play.hasOwnProperty("vodPlayer")) {
                var a = getApp().globalData.$config.play.vodPlayer, n = a.id.indexOf(t.vod_play_from[o]);
                n < 0 ? e.unshift(o) : (t.vod_play_url[o][0] = a.title[n], t.vod_play_url[o][3] = t.vod_play_from[o]);
            }
            var r = t.vod_play_url[o][1].replace(/#/g, '"},{"title":"');
            t.vod_play_url[o][1] = JSON.parse('[{"title":"' + r.replace(/\$/g, '","src":"') + '"}]'), 
            t.vod_play_url[o][2] = t.vod_play_url[o][1].length;
        }
        for (var i = 0; i < e.length; i++) t.vod_play_from.splice(e[i], 1), t.vod_play_url.splice(e[i], 1);
        if (getApp().globalData.$config.play.hasOwnProperty("vodPlayer")) {
            var u = getApp().globalData.$config.play.vodPlayer;
            t.vod_play_url.sort(function(t, e) {
                return u.title.indexOf(t[0]) - u.title.indexOf(e[0]);
            });
        }
        return 2 != t.type_id && 3 != t.type_id && 4 != t.type_id || t.vod_play_url.sort(function(t, e) {
            return e[2] - t[2];
        }), uni.setStorageSync("$voddata", t), t;
    }
    return uni.setStorageSync("$voddata", t), t;
}, exports.apiRequest = function(o) {
    return new Promise(function(a, n) {
        uni.request({
            url: o,
            dataType: "json",
            data:{
                token:t.getStorageSync("token"),
                appCode:getApp().globalData.appCode,
                appToken:getApp().globalData.appToken,
            },
            success: function(o) {
                "string" == typeof o.data.Data && (o.data.Data = JSON.parse(t.pwd(o.data.Data, e.default.prototype.key, e.default.prototype.iv))), 
                a(o.data);
            },
            fail: function() {
                n();
            },
            complete: function() {}
        });
    });
}, exports.getSetting = function() {
    return new Promise(function(t, e) {
        uni.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] ? t(!0) : e.authSetting["scope.userInfo"] || t(!1);
            },
            fail: function() {
                console.log("获取已授权选项失败"), t(!1);
            }
        });
    });
}, exports.onShare = function(t, e, o) {
    return t || (t = getApp().globalData.$config.index.share.title), e || (e = "pages/index/index?from=index"), 
    o || (o = getApp().globalData.$config.index.share.image), {
        title: t,
        path: e,
        imageUrl: o,
        success: function(t) {},
        fail: function(t) {}
    };
}, exports.login = function() {
    return new Promise(function(t, e) {
        uni.login({
            provider: "weixin",
            success: function(e) {
                uni.request({
                    url: "https://api.weixin.qq.com/sns/jscode2session",
                    dataType: "json",
                    data: {
                        grant_type: "authorization_code",
                        appid: getApp().globalData.$config.site.appid,
                        secret: getApp().globalData.$config.site.AppSecret,
                        js_code: e.code
                    },
                    success: function(e) {
                        t(e.data.openid);
                    }
                });
            }
        });
    });
}, exports.getIP = function(t) {
    return "" == t && (t = "腾讯云"), new Promise(function(e, o) {
        uni.request({
            url: "https://mip.chinaz.com/?query=",
            success: function(o) {
                if (200 == o.statusCode) {
                    var a = o.data.indexOf(t);
                    e(a >= 0);
                }
            },
            fail: function() {
                e(!1);
            },
            complete: function() {}
        });
    });
}, exports.wxRegister = function(o) {
    var a = getApp().globalData;
    return new Promise(function(n, r) {
        uni.showLoading({
            mask: !0,
            title: "正在登录"
        }), uni.request({
            url: o,
            dataType: "json",
            data:{
                token:t.getStorageSync("token"),
                appCode:getApp().globalData.appCode,
                appToken:getApp().globalData.appToken,
            },
            success: function(o) {
                console.log("ooooooooo");
                uni.hideLoading(), "string" == typeof o.data.Data && (o.data.Data = JSON.parse(t.pwd(o.data.Data, e.default.prototype.key, e.default.prototype.iv)));
                var r = o.data;
                console.log(Number(i.num),r.Data.userInfo.user_status,r.Data.userInfo.user_login_num);
                if (200 == r.Code) {
                    var i = a.$config.site.login;
                    200 == r.Data.code && (e.default.prototype.$user_login = !0, 0 == r.Data.userInfo.user_status ? a.$wxverify = !0 : "1" == i.radio && r.Data.userInfo.user_login_num >= Number(i.num) && ("android" != a.$platform && "ios" != a.$platform || (a.$wxverify = !1)), 
                    uni.setStorageSync("$new", !0),t.setStorageSync("$user_login",true),  uni.setStorageSync("$userInfo", r.Data.userInfo),
                    n(!0));
                } else n(!1);
                uni.showToast({
                    title: r.Data.tips,
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    });
};