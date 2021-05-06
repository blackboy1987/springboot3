function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e() {
    String.prototype.toPx = function(t) {
        var e = void 0, r = (e = t ? /^-?[0-9]+([.]{1}[0-9]+){0,1}(rpx|px)$/g : /^[0-9]+([.]{1}[0-9]+){0,1}(rpx|px)$/g).exec(this);
        if (!this || !r) return console.error("The size: " + this + " is illegal"), 0;
        var n = r[2], i = parseFloat(this), a = 0;
        return "rpx" === n ? a = Math.round(i * o) : "px" === n && (a = i), a;
    };
}

var r = t(require("./lib/pen")), n = t(require("./lib/downloader")), i = require("./lib/util"), a = new n.default();

Component({
    canvasWidthInPx: 0,
    canvasHeightInPx: 0,
    paintCount: 0,
    properties: {
        customStyle: {
            type: String
        },
        palette: {
            type: Object,
            observer: function(t, e) {
                this.isNeedRefresh(t, e) && (this.paintCount = 0, this.startPaint());
            }
        },
        dirty: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        picURL: "",
        showCanvas: !0,
        painterStyle: ""
    },
    attached: function() {
        e();
    },
    methods: {
        isEmpty: function(t) {
            for (var e in t) return !1;
            return !0;
        },
        isNeedRefresh: function(t, e) {
            return !(!t || this.isEmpty(t) || this.data.dirty && i.equal(t, e));
        },
        startPaint: function() {
            var t = this;
            if (!this.isEmpty(this.properties.palette)) {
                var e = this;
                if (!getApp().systemInfo || !getApp().systemInfo.screenWidth) try {
                    getApp().systemInfo = wx.getSystemInfoSync();
                } catch (t) {
                    var n = "Painter get system info failed, " + JSON.stringify(t);
                    return e.triggerEvent("imgErr", {
                        error: n
                    }), void console.error(n);
                }
                o = getApp().systemInfo.screenWidth / 750, this.downloadImages().then(function(e) {
                    var n = e.width, i = e.height;
                    if (t.canvasWidthInPx = n.toPx(), t.canvasHeightInPx = i.toPx(), n && i) {
                        t.setData({
                            painterStyle: "width:" + n + ";height:" + i + ";"
                        });
                        var a = wx.createCanvasContext("k-canvas", t);
                        new r.default(a, e).paint(function() {
                            t.saveImgToLocal();
                        });
                    } else console.error("You should set width and height correctly for painter, width: " + n + ", height: " + i);
                }).catch(function(t) {
                    e.triggerEvent("imgErr", {
                        error: t
                    });
                });
            }
        },
        downloadImages: function() {
            var t = this;
            return new Promise(function(e, r) {
                var n = 0, i = 0, o = JSON.parse(JSON.stringify(t.properties.palette));
                if (o.background && (n++, a.download(o.background).then(function(t) {
                    o.background = t, n === ++i && e(o);
                }, function() {
                    n === ++i && e(o);
                })), o.views) {
                    var s = !0, c = !1, u = void 0;
                    try {
                        for (var f, h = o.views[Symbol.iterator](); !(s = (f = h.next()).done); s = !0) !function() {
                            var t = f.value;
                            t && "image" === t.type && t.url && (n++, a.download(t.url).then(function(a) {
                                t.url = a, wx.getImageInfo({
                                    src: t.url,
                                    success: function(e) {
                                        t.sWidth = e.width, t.sHeight = e.height;
                                    },
                                    fail: function(e) {
                                        var n = "getImageInfo failed, " + JSON.stringify(e || {}) + "; imageUrl:" + t.url;
                                        console.error(n), r(n);
                                    },
                                    complete: function() {
                                        n === ++i && e(o);
                                    }
                                });
                            }, function() {
                                n === ++i && e(o);
                            }));
                        }();
                    } catch (t) {
                        c = !0, u = t;
                    } finally {
                        try {
                            !s && h.return && h.return();
                        } finally {
                            if (c) throw u;
                        }
                    }
                }
                0 === n && e(o);
            });
        },
        saveImgToLocal: function() {
            var t = this, e = this;
            setTimeout(function() {
                wx.canvasToTempFilePath({
                    canvasId: "k-canvas",
                    success: function(t) {
                        e.getImageInfo(t.tempFilePath);
                    },
                    fail: function(t) {
                        console.error("canvasToTempFilePath failed, " + JSON.stringify(t)), e.triggerEvent("imgErr", {
                            error: t
                        });
                    }
                }, t);
            }, 300);
        },
        getImageInfo: function(t) {
            var e = this;
            wx.getImageInfo({
                src: t,
                success: function(r) {
                    if (e.paintCount > 5) {
                        var n = "The result is always fault, even we tried 5 times";
                        return console.error(n), void e.triggerEvent("imgErr", {
                            error: n
                        });
                    }
                    Math.abs((r.width * e.canvasHeightInPx - e.canvasWidthInPx * r.height) / (r.height * e.canvasHeightInPx)) < .01 ? e.triggerEvent("imgOK", {
                        path: t
                    }) : e.startPaint(), e.paintCount++;
                },
                fail: function(t) {
                    console.error("getImageInfo failed, " + JSON.stringify(t)), e.triggerEvent("imgErr", {
                        error: t
                    });
                }
            });
        }
    }
});

var o = .5;