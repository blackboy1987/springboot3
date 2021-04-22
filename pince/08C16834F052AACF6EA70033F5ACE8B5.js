var e, n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

e = "function" == typeof Symbol && "symbol" == n(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : n(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : n(e);
}, function() {
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
    function o(e) {
        for (var o, r, s = e[0], a = e[1], i = e[2], p = 0, u = []; p < s.length; p++) r = s[p], 
        m[r] && u.push(m[r][0]), m[r] = 0;
        for (o in a) Object.prototype.hasOwnProperty.call(a, o) && (n[o] = a[o]);
        for (l && l(e); u.length; ) u.shift()();
        return c.push.apply(c, i || []), t();
    }
    function t() {
        for (var e, n = 0; n < c.length; n++) {
            for (var o = c[n], t = !0, s = 1; s < o.length; s++) {
                var a = o[s];
                0 !== m[a] && (t = !1);
            }
            t && (c.splice(n--, 1), e = r(r.s = o[0]));
        }
        return e;
    }
    function r(e) {
        if (s[e]) return s[e].exports;
        var o = s[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return n[e].call(o.exports, o, o.exports, r), o.l = !0, o.exports;
    }
    var s = {}, a = {
        "common/runtime": 0
    }, m = {
        "common/runtime": 0
    }, c = [];
    r.e = function(e) {
        var n = [];
        a[e] ? n.push(a[e]) : 0 !== a[e] && {
            "components/GridBox": 1,
            "components/ListBox": 1,
            "components/NavgationBox": 1,
            "components/PoptestBox": 1,
            "components/PopupBox": 1,
            "components/SearchBox": 1,
            "components/SelectStar": 1,
            "components/LoadBox": 1,
            "components/SwiperBox": 1,
            "components/invinbg-image-cropper/invinbg-image-cropper": 1,
            "components/AnswerBox": 1,
            "components/AuthorBox": 1,
            "components/QuestionNum": 1,
            "components/ChannelFour": 1,
            "components/tanme/msgimg": 1,
            "components/tanme/resultimg": 1,
            "components/tanme/userimg": 1,
            "components/tanme/usermsg": 1,
            "pages/tanmegame/message": 1,
            "components/tarotmark/Result": 1,
            "components/tarotmark/zhouWei-navBar/index": 1
        }[e] && n.push(a[e] = new Promise(function(n, o) {
            for (var t = ({
                "components/GridBox": "components/GridBox",
                "components/ListBox": "components/ListBox",
                "components/NavgationBox": "components/NavgationBox",
                "components/PoptestBox": "components/PoptestBox",
                "components/PopupBox": "components/PopupBox",
                "components/SearchBox": "components/SearchBox",
                "components/SelectStar": "components/SelectStar",
                "components/LoadBox": "components/LoadBox",
                "components/SwiperBox": "components/SwiperBox",
                "components/invinbg-image-cropper/invinbg-image-cropper": "components/invinbg-image-cropper/invinbg-image-cropper",
                "components/AnswerBox": "components/AnswerBox",
                "components/AuthorBox": "components/AuthorBox",
                "components/QuestionNum": "components/QuestionNum",
                "components/ChannelFour": "components/ChannelFour",
                "components/tanme/msgimg": "components/tanme/msgimg",
                "components/tanme/resultimg": "components/tanme/resultimg",
                "components/tanme/userimg": "components/tanme/userimg",
                "components/tanme/usermsg": "components/tanme/usermsg",
                "pages/tanmegame/message": "pages/tanmegame/message",
                "components/tarotmark/Result": "components/tarotmark/Result",
                "components/tarotmark/zhouWei-navBar/index": "components/tarotmark/zhouWei-navBar/index"
            }[e] || e) + ".wxss", s = r.p + t, m = document.getElementsByTagName("link"), c = 0; c < m.length; c++) {
                var i = m[c], p = i.getAttribute("data-href") || i.getAttribute("href");
                if ("stylesheet" === i.rel && (p === t || p === s)) return n();
            }
            var u = document.getElementsByTagName("style");
            for (c = 0; c < u.length; c++) if ((p = (i = u[c]).getAttribute("data-href")) === t || p === s) return n();
            var l = document.createElement("link");
            l.rel = "stylesheet", l.type = "text/css", l.onload = n, l.onerror = function(n) {
                var t = n && n.target && n.target.src || s, r = new Error("Loading CSS chunk " + e + " failed.\n(" + t + ")");
                r.request = t, delete a[e], l.parentNode.removeChild(l), o(r);
            }, l.href = s, document.getElementsByTagName("head")[0].appendChild(l);
        }).then(function() {
            a[e] = 0;
        }));
        var o = m[e];
        if (0 !== o) if (o) n.push(o[2]); else {
            var t = new Promise(function(n, t) {
                o = m[e] = [ n, t ];
            });
            n.push(o[2] = t);
            var s, c = document.createElement("script");
            c.charset = "utf-8", c.timeout = 120, r.nc && c.setAttribute("nonce", r.nc), c.src = function(e) {
                return r.p + "" + e + ".js";
            }(e), s = function(n) {
                c.onerror = c.onload = null, clearTimeout(i);
                var o = m[e];
                if (0 !== o) {
                    if (o) {
                        var t = n && ("load" === n.type ? "missing" : n.type), r = n && n.target && n.target.src, s = new Error("Loading chunk " + e + " failed.\n(" + t + ": " + r + ")");
                        s.type = t, s.request = r, o[1](s);
                    }
                    m[e] = void 0;
                }
            };
            var i = setTimeout(function() {
                s({
                    type: "timeout",
                    target: c
                });
            }, 12e4);
            c.onerror = c.onload = s, document.head.appendChild(c);
        }
        return Promise.all(n);
    }, r.m = n, r.c = s, r.d = function(e, n, o) {
        r.o(e, n) || Object.defineProperty(e, n, {
            enumerable: !0,
            get: o
        });
    }, r.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, r.t = function(n, o) {
        if (1 & o && (n = r(n)), 8 & o) return n;
        if (4 & o && "object" === (void 0 === n ? "undefined" : e(n)) && n && n.__esModule) return n;
        var t = Object.create(null);
        if (r.r(t), Object.defineProperty(t, "default", {
            enumerable: !0,
            value: n
        }), 2 & o && "string" != typeof n) for (var s in n) r.d(t, s, function(e) {
            return n[e];
        }.bind(null, s));
        return t;
    }, r.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return r.d(n, "a", n), n;
    }, r.o = function(e, n) {
        return Object.prototype.hasOwnProperty.call(e, n);
    }, r.p = "/", r.oe = function(e) {
        throw console.error(e), e;
    };
    var i = global.webpackJsonp = global.webpackJsonp || [], p = i.push.bind(i);
    i.push = o, i = i.slice();
    for (var u = 0; u < i.length; u++) o(i[u]);
    var l = p;
    t();
}([]);