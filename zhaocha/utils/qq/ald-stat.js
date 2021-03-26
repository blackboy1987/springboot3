var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(t, n) {
    "object" == ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : t.Ald = n();
}(void 0, function() {
    function n() {
        var n = "";
        try {
            n = A.getStorageSync("aldstat_op");
        } catch (t) {
            n = A.getStorageSync("aldstat_op");
        }
        if ("" === n) {
            if ("" === R) return "";
            try {
                T = n = A.getStorageSync(R), n && A.setStorageSync("aldstat_op", n);
            } catch (t) {
                T = n = A.getStorageSync(R), n && A.setStorageSync("aldstat_op", n);
            }
        }
        return n;
    }
    function e(t) {
        this.app = t;
    }
    function o(t) {
        U = y(), at = (J = t).scene, this.aldstat = new e(this);
    }
    function r(t) {
        var n;
        n = t.scene != at, at = t.scene, Q = 0, V = (J = t).query.ald_share_src, W = t.query.aldsrc || "", 
        t.query.ald_share_src, ot || (K = !1), ot = !1, (0 !== j && 3e4 < Date.now() - j || n) && (rt || (C = y(), 
        E = Date.now(), ct = 0)), 0 !== j && Date.now() - j < 3e4 && (Z = !0), t.query.ald_share_src && "1044" == t.scene && t.shareTicket ? A.getShareInfo({
            shareTicket: t.shareTicket,
            success: function(t) {
                z = t, m("event", "ald_share_click", JSON.stringify(t));
            }
        }) : t.query.ald_share_src && m("event", "ald_share_click", 1), "" === F && A.getSetting({
            withCredentials: !0,
            success: function(t) {
                t.authSetting["scope.userInfo"] && A.getUserInfo({
                    withCredentials: !0,
                    success: function(t) {
                        var n = g();
                        F = t, n.ufo = w(t), N = v(t.userInfo.avatarUrl.split("/")), d(n);
                    }
                });
            }
        }), S("app", "show");
    }
    function a() {
        j = Date.now(), "" === F && A.getSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] && A.getUserInfo({
                    withCredentials: !0,
                    success: function(t) {
                        N = v((F = t).userInfo.avatarUrl.split("/"));
                        var n = g();
                        n.ufo = w(t), d(n);
                    }
                });
            }
        }), S("app", "hide");
    }
    function s(t) {
        $++, m("event", "ald_error_message", t);
    }
    function i(t) {
        et = t;
    }
    function c() {
        var t, n, e;
        it = Date.now(), tt = H ? this.$mp.page.route : this.route, t = "page", n = "show", 
        (e = g()).ev = t, e.life = n, e.pp = tt, e.pc = nt, e.dr = Date.now() - E, rt && (e.so = 1), 
        rt = !1, et && "{}" != JSON.stringify(et) && (e.ag = et), W && (e.qr = W, e.sr = W), 
        V && (e.usr = V), Z && (e.ps = 1), Y ? e.pdr = ct : (tt, Y = !0, e.ifp = Y, e.fp = tt, 
        e.pdr = 0), d(e), Z = !1;
    }
    function u() {
        nt = tt, ct = Date.now() - it;
    }
    function f() {
        nt = tt, ct = Date.now() - it;
    }
    function l() {
        m("event", "ald_pulldownrefresh", 1);
    }
    function h() {
        m("event", "ald_reachbottom", 1);
    }
    function p(t) {
        rt = !0;
        var n = function(t) {
            if (-1 == t.indexOf("?")) return "";
            var e = {};
            return t.split("?")[1].split("&").forEach(function(t) {
                var n = t.split("=")[1];
                e[t.split("=")[0]] = n;
            }), e;
        }(t.path), e = {};
        for (var o in J.query) "ald_share_src" === o && (e[o] = J.query[o]);
        var r = "";
        if (r = -1 == t.path.indexOf("?") ? t.path + "?" : t.path.substr(0, t.path.indexOf("?")) + "?", 
        "" !== n) for (var o in n) e[o] = n[o];
        for (var a in e.ald_share_src ? -1 == e.ald_share_src.indexOf(G) && e.ald_share_src.length < 200 && (e.ald_share_src = e.ald_share_src + "," + G) : e.ald_share_src = G, 
        e) -1 == a.indexOf("ald") && (r += a + "=" + e[a] + "&");
        return t.path = r + "ald_share_src=" + e.ald_share_src, m("event", "ald_share_status", t), 
        t;
    }
    function d(o) {
        function t() {
            return new Promise(function(n, t) {
                var e = {
                    AldStat: "MiniApp-Stat",
                    se: B || "",
                    op: T || "",
                    img: N
                };
                "" === L || (e.ai = L), A.request({
                    url: "https://" + O + ".aldwx.com/d.html",
                    data: o,
                    header: e,
                    method: "GET",
                    success: function(t) {
                        n(200 == t.statusCode ? "" : "status error");
                    },
                    fail: function() {
                        n("fail");
                    }
                });
            });
        }
        x.useOpen && n(), Q++, o.at = C, o.uu = G, o.v = M, o.ak = x.app_key.replace(/(\t)|(\s)/g, ""), 
        o.wsr = J, o.ifo = K, o.rq_c = Q, o.ls = U, o.te = b, o.et = Date.now(), o.st = Date.now(), 
        x.useOpen ? "" === T ? st.push(t) : (A.Queue.push(t), st.concat()) : A.Queue.push(t);
    }
    function g() {
        var t = {};
        for (var n in X) t[n] = X[n];
        return t;
    }
    function v(t) {
        for (var n = "", e = 0; e < t.length; e++) t[e].length > n.length && (n = t[e]);
        return n;
    }
    function y() {
        return "" + Date.now() + Math.floor(1e7 * Math.random());
    }
    function w(t) {
        var n = {};
        for (var e in t) "rawData" != e && "errMsg" != e && (n[e] = t[e]);
        return n;
    }
    function S(t, n) {
        var e = g();
        e.ev = t, e.life = n, e.ec = $, e.dr = Date.now() - E, W && (e.qr = W, e.sr = W), 
        V && (e.usr = V), d(e);
    }
    function m(t, n, e) {
        var o = g();
        o.ev = t, o.tp = n, o.dr = Date.now() - E, e && (o.ct = e), d(o);
    }
    function _(t, n, e) {
        if (t[n]) {
            var o = t[n];
            t[n] = function(t) {
                e.call(this, t, n), o.call(this, t);
            };
        } else t[n] = function(t) {
            e.call(this, t, n);
        };
    }
    function q(n) {
        var t = {};
        for (var e in n) "onLaunch" !== e && "onShow" !== e && "onHide" !== e && "onError" !== e && (t[e] = n[e]);
        return t.onLaunch = function(t) {
            o.call(this, t), "function" == typeof n.onLaunch && n.onLaunch.call(this, t);
        }, t.onShow = function(t) {
            r.call(this, t), n.onShow && "function" == typeof n.onShow && n.onShow.call(this, t);
        }, t.onHide = function() {
            a.call(this), n.onHide && "function" == typeof n.onHide && n.onHide.call(this);
        }, t.onError = function(t) {
            s.call(this, t), n.onError && "function" == typeof n.onError && n.onError.call(this, t);
        }, t;
    }
    function D(e) {
        var t = {};
        for (var n in e) "onLoad" !== n && "onShow" !== n && "onHide" !== n && "onUnload" !== n && "onPullDownRefresh" !== n && "onReachBottom" !== n && "onShareAppMessage" !== n && (t[n] = e[n]);
        return t.onLoad = function(t) {
            i.call(this, t), "function" == typeof e.onLoad && e.onLoad.call(this, t);
        }, t.onShow = function(t) {
            c.call(this), "function" == typeof e.onShow && e.onShow.call(this, t);
        }, t.onHide = function(t) {
            u.call(this), "function" == typeof e.onHide && e.onHide.call(this, t);
        }, t.onUnload = function(t) {
            f.call(this), "function" == typeof e.onUnload && e.onUnload.call(this, t);
        }, t.onReachBottom = function(t) {
            h(), e.onReachBottom && "function" == typeof e.onReachBottom && e.onReachBottom.call(this, t);
        }, t.onPullDownRefresh = function(t) {
            l(), e.onPullDownRefresh && "function" == typeof e.onPullDownRefresh && e.onPullDownRefresh.call(this, t);
        }, e.onShareAppMessage && "function" == typeof e.onShareAppMessage && (t.onShareAppMessage = function(t) {
            var n = e.onShareAppMessage.call(this, t);
            return void 0 === n ? (n = {}).path = this.route : void 0 === n.path && (n.path = this.route), 
            p.call(this, n);
        }), t;
    }
    var x = require("./ald-stat-conf"), A = "", b = "wx";
    qq, b = "qx", A = qq;
    var M = "8.0.0", O = "qx.log";
    void 0 === A.Queue && (A.Queue = new function() {
        this.concurrency = 4, this.queue = [], this.tasks = [], this.activeCount = 0;
        var r = this;
        this.push = function(o) {
            this.tasks.push(new Promise(function(n, t) {
                var e = function() {
                    r.activeCount++, o().then(function(t) {
                        n(t);
                    }).then(function() {
                        r.next();
                    });
                };
                r.activeCount < r.concurrency ? e() : r.queue.push(e);
            }));
        }, this.all = function() {
            return Promise.all(this.tasks);
        }, this.next = function() {
            r.activeCount--, 0 < r.queue.length && r.queue.shift()();
        };
    }(), A.Queue.all()), "" === x.app_key && console.error("请在ald-stat-conf.js文件中填写小程序统计平台创建小程序后生成的app_key，请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南！"), 
    x.useOpen && console.warn("提示：开启了useOpen配置后，如果不上传用户OpendID则不会上报数据，上传方式：http://doc.aldwx.com 小程序统计平台-快速接入指南-上传OpenID！");
    var I, k, P, L = void 0 === A.getAccountInfoSync ? "" : A.getAccountInfoSync().miniProgram.appId.split("").map(function(t) {
        return t.charCodeAt(0) + 9;
    }).join("-"), R = x.openKey || "", H = !1, C = y(), U = "", E = Date.now(), j = 0, B = "", T = n(), N = "", Q = 0, J = "", K = "", G = function() {
        var n = "";
        try {
            n = A.getStorageSync("aldstat_uuid");
        } catch (t) {
            n = "uuid_getstoragesync";
        }
        if (n) K = !1; else {
            n = function() {
                function t() {
                    return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
                }
                return t() + t() + t() + t() + t() + t() + t() + t();
            }();
            try {
                A.setStorageSync("aldstat_uuid", n), K = !0;
            } catch (n) {
                A.setStorageSync("aldstat_uuid", "uuid_getstoragesync");
            }
        }
        return n;
    }(), V = "", W = "", $ = 0, z = "", F = "", X = {}, Y = !1, Z = !1, tt = "", nt = "", et = "", ot = !0, rt = !1, at = "", st = new function() {
        this.request = [], this.push = function(t) {
            10 <= this.request.length && this.request.shift(), this.request.push(t);
        }, this.concat = function() {
            this.request.map(function(t) {
                A.Queue.push(t);
            }), this.request = [];
        };
    }(), it = 0, ct = 0;
    A.request({
        url: "https://" + O + ".aldwx.com/config/app.json",
        header: {
            AldStat: "MiniApp-Stat"
        },
        method: "GET",
        success: function(t) {
            200 === t.statusCode && (M < t.data.version && console.warn("您的SDK不是最新版本，部分功能不可用，请尽快前往 http://tj.aldwx.com/downSDK 升级"), 
            t.data.warn && console.warn(t.data.warn), t.data.error && console.error(t.data.error));
        }
    }), A.aldstat = new e("");
    try {
        var t = A.getSystemInfoSync();
        X.br = t.brand, X.pm = t.model, X.pr = t.pixelRatio, X.ww = t.windowWidth, X.wh = t.windowHeight, 
        X.lang = t.language, X.wv = t.version, X.wvv = t.platform, X.wsdk = t.SDKVersion, 
        X.sv = t.system;
    } catch (t) {}
    return A.getNetworkType({
        success: function(t) {
            X.nt = t.networkType;
        }
    }), A.getSetting({
        success: function(t) {
            t.authSetting["scope.userLocation"] ? A.getLocation({
                type: "wgs84",
                success: function(t) {
                    X.lat = t.latitude, X.lng = t.longitude, X.spd = t.speed;
                }
            }) : x.getLocation && A.getLocation({
                type: "wgs84",
                success: function(t) {
                    X.lat = t.latitude, X.lng = t.longitude, X.spd = t.speed;
                }
            });
        }
    }), e.prototype.sendEvent = function(t, n) {
        if ("" !== t && "string" == typeof t && t.length <= 255) if ("string" == typeof n && n.length <= 255) m("event", t, n); else if ("object" == (void 0 === n ? "undefined" : _typeof(n))) {
            if (255 <= JSON.stringify(n).length) return void console.error("自定义事件参数不能超过255个字符，请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南-自定义事件！");
            if (function(t) {
                for (var n in t) if ("object" == _typeof(t[n]) && null !== t[n]) return !0;
                return !1;
            }(n)) return void console.error("事件参数内部只支持Number、String等类型，请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南-自定义事件！");
            for (var e in n) "number" == typeof n[e] && (n[e] = n[e] + "s##");
            m("event", t, JSON.stringify(n));
        } else void 0 === n ? m("event", t, !1) : console.error("事件参数必须为String、Object类型，且参数长度不能超过255个字符，请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南-自定义事件！"); else console.error("事件名称必须为String类型且不能超过255个字符，请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南-自定义事件！");
    }, e.prototype.sendSession = function(t) {
        if ("" !== t && t) {
            B = t;
            var n = g();
            n.tp = "session", n.ct = "session", n.ev = "event", "" === F ? A.getSetting({
                success: function(t) {
                    t.authSetting["scope.userInfo"] ? A.getUserInfo({
                        success: function(t) {
                            n.ufo = w(t), N = v(t.userInfo.avatarUrl.split("/")), "" !== z && (n.gid = z), d(n);
                        }
                    }) : "" !== z && (n.gid = z, d(n));
                }
            }) : (n.ufo = F, "" !== z && (n.gid = z), d(n));
        } else console.error("请传入从后台获取的session_key");
    }, e.prototype.sendOpenid = function(t) {
        if (!t || 28 != t.length && 32 != t.length) console.error("OpenID不符合规则，请参考接入文档 http://doc.aldwx.com 小程序统计平台-快速接入指南！"); else {
            T = t, A.setStorageSync("aldstat_op", t);
            var n = g();
            n.tp = "openid", n.ev = "event", n.ct = "openid", d(n);
        }
    }, x.plugin ? {
        App: function(t) {
            return App(q(t));
        },
        Page: function(t) {
            return Page(D(t));
        },
        MpvueApp: function(t) {
            return H = !0, q(t);
        },
        MpvuePage: function(t) {
            return D(t);
        }
    } : (I = App, k = Page, P = Component, App = function(t) {
        _(t, "onLaunch", o), _(t, "onShow", r), _(t, "onHide", a), _(t, "onError", s), I(t);
    }, Page = function(t) {
        var e = t.onShareAppMessage;
        _(t, "onLoad", i), _(t, "onUnload", f), _(t, "onShow", c), _(t, "onHide", u), _(t, "onReachBottom", h), 
        _(t, "onPullDownRefresh", l), null != e && (t.onShareAppMessage = function(t) {
            if (void 0 !== e) {
                var n = e.call(this, t);
                return void 0 === n ? (n = {}).path = tt : void 0 === n.path && (n.path = tt), p(n);
            }
        }), k(t);
    }, void (Component = function(t) {
        try {
            var e = t.methods.onShareAppMessage;
            _(t.methods, "onLoad", i), _(t.methods, "onUnload", f), _(t.methods, "onShow", c), 
            _(t.methods, "onHide", u), _(t.methods, "onReachBottom", h), _(t.methods, "onPullDownRefresh", l), 
            null != e && (t.methods.onShareAppMessage = function(t) {
                if (void 0 !== e) {
                    var n = e.call(this, t);
                    return void 0 === n ? (n = {}).path = tt : void 0 === n.path && (n.path = tt), p(n);
                }
            }), P(t);
        } catch (e) {
            P(t);
        }
    }));
});