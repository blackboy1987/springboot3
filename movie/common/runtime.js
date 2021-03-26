var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function() {
    try {
        var e = Function("return this")();
        e && !e.Math && (Object.assign(e, {
            isFinite: isFinite,
            Array: Array,
            Date: Date,
            Error: Error,
            Function: Function,
            Math: Math,
            Object: Object,
            RegExp: RegExp,
            String: String,
            TypeError: TypeError,
            setTimeout: setTimeout,
            clearTimeout: clearTimeout,
            setInterval: setInterval,
            clearInterval: clearInterval
        }), "undefined" != typeof Reflect && (e.Reflect = Reflect));
    } catch (e) {}
}(), function(n) {
    function t(e) {
        for (var t, r, i = e[0], s = e[1], p = e[2], c = 0, m = []; c < i.length; c++) r = i[c], 
        Object.prototype.hasOwnProperty.call(a, r) && a[r] && m.push(a[r][0]), a[r] = 0;
        for (t in s) Object.prototype.hasOwnProperty.call(s, t) && (n[t] = s[t]);
        for (d && d(e); m.length; ) m.shift()();
        return u.push.apply(u, p || []), o();
    }
    function o() {
        for (var e, n = 0; n < u.length; n++) {
            for (var t = u[n], o = !0, r = 1; r < t.length; r++) {
                var s = t[r];
                0 !== a[s] && (o = !1);
            }
            o && (u.splice(n--, 1), e = i(i.s = t[0]));
        }
        return e;
    }
    function r(e) {
        return i.p + "" + e + ".js";
    }
    function i(e) {
        if (s[e]) return s[e].exports;
        var t = s[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return n[e].call(t.exports, t, t.exports, i), t.l = !0, t.exports;
    }
    var s = {}, p = {
        "common/runtime": 0
    }, a = {
        "common/runtime": 0
    }, u = [];
    i.e = function(e) {
        var n = [], t = {
            "components/custom-ad/custom-ad": 1,
            "components/narBar/narBar": 1,
            "components/struggler-uniapp-add-tip/struggler-uniapp-add-tip": 1,
            "components/uni-notice-bar/uni-notice-bar": 1,
            "components/uni-popup/uni-popup": 1,
            "components/vod-item/vod-item": 1,
            "components/uni-rate/uni-rate": 1,
            "components/message/message": 1,
            "components/uni-ad/uni-ad": 1,
            "components/reverse-list/reverse-list": 1,
            "components/popup/popup": 1,
            "components/shuvodlist/shuvodlist": 1,
            "components/side-slip/index": 1,
            "components/jyf-parser/jyf-parser": 1,
            "components/uni-transition/uni-transition": 1,
            "components/uni-icons/uni-icons": 1,
            "components/jyf-parser/libs/trees": 1
        };
        p[e] ? n.push(p[e]) : 0 !== p[e] && t[e] && n.push(p[e] = new Promise(function(n, t) {
            for (var o = ({
                "components/uni-bar/uni-bar": "components/uni-bar/uni-bar",
                "components/custom-ad/custom-ad": "components/custom-ad/custom-ad",
                "components/narBar/narBar": "components/narBar/narBar",
                "components/struggler-uniapp-add-tip/struggler-uniapp-add-tip": "components/struggler-uniapp-add-tip/struggler-uniapp-add-tip",
                "components/uni-notice-bar/uni-notice-bar": "components/uni-notice-bar/uni-notice-bar",
                "components/uni-popup/uni-popup": "components/uni-popup/uni-popup",
                "components/vod-item/vod-item": "components/vod-item/vod-item",
                "components/uni-rate/uni-rate": "components/uni-rate/uni-rate",
                "components/message/message": "components/message/message",
                "components/uni-ad/uni-ad": "components/uni-ad/uni-ad",
                "components/reverse-list/reverse-list": "components/reverse-list/reverse-list",
                "components/popup/popup": "components/popup/popup",
                "components/shuvodlist/shuvodlist": "components/shuvodlist/shuvodlist",
                "components/side-slip/index": "components/side-slip/index",
                "components/jyf-parser/jyf-parser": "components/jyf-parser/jyf-parser",
                "components/uni-transition/uni-transition": "components/uni-transition/uni-transition",
                "components/uni-icons/uni-icons": "components/uni-icons/uni-icons",
                "components/jyf-parser/libs/trees": "components/jyf-parser/libs/trees"
            }[e] || e) + ".wxss", r = i.p + o, s = document.getElementsByTagName("link"), a = 0; a < s.length; a++) {
                var u = s[a], c = u.getAttribute("data-href") || u.getAttribute("href");
                if ("stylesheet" === u.rel && (c === o || c === r)) return n();
            }
            var m = document.getElementsByTagName("style");
            for (a = 0; a < m.length; a++) if (u = m[a], (c = u.getAttribute("data-href")) === o || c === r) return n();
            var l = document.createElement("link");
            l.rel = "stylesheet", l.type = "text/css", l.onload = n, l.onerror = function(n) {
                var o = n && n.target && n.target.src || r, i = new Error("Loading CSS chunk " + e + " failed.\n(" + o + ")");
                i.code = "CSS_CHUNK_LOAD_FAILED", i.request = o, delete p[e], l.parentNode.removeChild(l), 
                t(i);
            }, l.href = r, document.getElementsByTagName("head")[0].appendChild(l);
        }).then(function() {
            p[e] = 0;
        }));
        var o = a[e];
        if (0 !== o) if (o) n.push(o[2]); else {
            var s = new Promise(function(n, t) {
                o = a[e] = [ n, t ];
            });
            n.push(o[2] = s);
            var u, c = document.createElement("script");
            c.charset = "utf-8", c.timeout = 120, i.nc && c.setAttribute("nonce", i.nc), c.src = r(e);
            var m = new Error();
            u = function(n) {
                c.onerror = c.onload = null, clearTimeout(l);
                var t = a[e];
                if (0 !== t) {
                    if (t) {
                        var o = n && ("load" === n.type ? "missing" : n.type), r = n && n.target && n.target.src;
                        m.message = "Loading chunk " + e + " failed.\n(" + o + ": " + r + ")", m.name = "ChunkLoadError", 
                        m.type = o, m.request = r, t[1](m);
                    }
                    a[e] = void 0;
                }
            };
            var l = setTimeout(function() {
                u({
                    type: "timeout",
                    target: c
                });
            }, 12e4);
            c.onerror = c.onload = u, document.head.appendChild(c);
        }
        return Promise.all(n);
    }, i.m = n, i.c = s, i.d = function(e, n, t) {
        i.o(e, n) || Object.defineProperty(e, n, {
            enumerable: !0,
            get: t
        });
    }, i.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, i.t = function(n, t) {
        if (1 & t && (n = i(n)), 8 & t) return n;
        if (4 & t && "object" === (void 0 === n ? "undefined" : e(n)) && n && n.__esModule) return n;
        var o = Object.create(null);
        if (i.r(o), Object.defineProperty(o, "default", {
            enumerable: !0,
            value: n
        }), 2 & t && "string" != typeof n) for (var r in n) i.d(o, r, function(e) {
            return n[e];
        }.bind(null, r));
        return o;
    }, i.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return i.d(n, "a", n), n;
    }, i.o = function(e, n) {
        return Object.prototype.hasOwnProperty.call(e, n);
    }, i.p = "/", i.oe = function(e) {
        throw console.error(e), e;
    };
    var c = global.webpackJsonp = global.webpackJsonp || [], m = c.push.bind(c);
    c.push = t, c = c.slice();
    for (var l = 0; l < c.length; l++) t(c[l]);
    var d = m;
    o();
}([]);