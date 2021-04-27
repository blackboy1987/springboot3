function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e) {
    return new Promise(function(t, o) {
        wx.downloadFile({
            url: e,
            success: function(r) {
                if (200 !== r.statusCode) return console.error("downloadFile " + e + " failed res.statusCode is not 200"), 
                void o();
                var f = r.tempFilePath;
                wx.getFileInfo({
                    filePath: f,
                    success: function(o) {
                        var r = o.size;
                        i(r).then(function() {
                            n(e, r, f).then(function(e) {
                                t(e);
                            });
                        }, function() {
                            t(f);
                        });
                    },
                    fail: function(e) {
                        console.error("getFileInfo " + r.tempFilePath + " failed, " + JSON.stringify(e)), 
                        t(r.tempFilePath);
                    }
                });
            },
            fail: function(e) {
                console.error("downloadFile failed, " + JSON.stringify(e) + " "), o();
            }
        });
    });
}

function n(e, t, n) {
    return new Promise(function(i, r) {
        wx.saveFile({
            tempFilePath: n,
            success: function(n) {
                var o = p[d] ? p[d] : 0;
                p[e] = {}, p[e][v] = n.savedFilePath, p[e][S] = new Date().getTime(), p[e][m] = t, 
                p.totalSize = t + o, wx.setStorage({
                    key: y,
                    data: p
                }), i(n.savedFilePath);
            },
            fail: function(t) {
                console.error("saveFile " + e + " failed, then we delete all files, " + JSON.stringify(t)), 
                i(n), o();
            }
        });
    });
}

function o() {
    wx.removeStorage({
        key: y,
        success: function() {
            wx.getSavedFileList({
                success: function(e) {
                    r(e.fileList);
                },
                fail: function(e) {
                    console.error("getSavedFileList failed, " + JSON.stringify(e));
                }
            });
        }
    });
}

function i(e) {
    return new Promise(function(t, n) {
        var o = p[d] ? p[d] : 0;
        if (e + o <= b) t(); else {
            var i = [], f = JSON.parse(JSON.stringify(p));
            delete f[d];
            var l = Object.keys(f).sort(function(e, t) {
                return f[e][S] - f[t][S];
            }), a = !0, u = !1, c = void 0;
            try {
                for (var s, m = l[Symbol.iterator](); !(a = (s = m.next()).done); a = !0) {
                    var w = s.value;
                    if (o -= p[w].size, i.push(p[w][v]), delete p[w], o + e < b) break;
                }
            } catch (e) {
                u = !0, c = e;
            } finally {
                try {
                    !a && m.return && m.return();
                } finally {
                    if (u) throw c;
                }
            }
            p.totalSize = o, wx.setStorage({
                key: y,
                data: p,
                success: function() {
                    i.length > 0 && r(i), t();
                },
                fail: function(e) {
                    console.error("doLru setStorage failed, " + JSON.stringify(e)), n();
                }
            });
        }
    });
}

function r(e) {
    var t = !0, n = !1, o = void 0;
    try {
        for (var i, r = e[Symbol.iterator](); !(t = (i = r.next()).done); t = !0) !function() {
            var e = i.value, t = e;
            "object" === (void 0 === e ? "undefined" : u(e)) && (t = e.filePath), wx.removeSavedFile({
                filePath: t,
                fail: function(t) {
                    console.error("removeSavedFile " + e + " failed, " + JSON.stringify(t));
                }
            });
        }();
    } catch (e) {
        n = !0, o = e;
    } finally {
        try {
            !t && r.return && r.return();
        } finally {
            if (n) throw o;
        }
    }
}

function f(e) {
    if (p[e]) return p[e].time = new Date().getTime(), wx.setStorage({
        key: y,
        data: p
    }), p[e];
}

var l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, a = "function" == typeof Symbol && "symbol" == l(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : l(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : l(e);
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var u = "function" == typeof Symbol && "symbol" == a(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : a(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : a(e);
}, c = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
    };
}(), s = require("./util"), y = "savedFiles", d = "totalSize", v = "path", S = "time", m = "size", b = 6291456, p = {}, w = function() {
    function n() {
        e(this, n), getApp().PAINTER_MAX_LRU_SPACE && (b = getApp().PAINTER_MAX_LRU_SPACE), 
        wx.getStorage({
            key: y,
            success: function(e) {
                e.data && (p = e.data);
            }
        });
    }
    return c(n, [ {
        key: "download",
        value: function(e) {
            return new Promise(function(n, o) {
                if (e && s.isValidUrl(e)) {
                    var i = f(e);
                    i ? wx.getSavedFileInfo({
                        filePath: i[v],
                        success: function(e) {
                            n(i[v]);
                        },
                        fail: function(i) {
                            console.error("the file is broken, redownload it, " + JSON.stringify(i)), t(e).then(function(e) {
                                n(e);
                            }, function() {
                                o();
                            });
                        }
                    }) : t(e).then(function(e) {
                        n(e);
                    }, function() {
                        o();
                    });
                } else n(e);
            });
        }
    } ]), n;
}();

exports.default = w;