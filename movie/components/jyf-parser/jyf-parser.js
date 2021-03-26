(global.webpackJsonp = global.webpackJsonp || []).push([ [ "components/jyf-parser/jyf-parser" ], {
    "2dea": function(t, e, n) {
        var i = n("eeb2");
        n.n(i).a;
    },
    "804f": function(t, e, n) {
        n.r(e);
        var i = n("ea0e"), o = n("cde9");
        for (var a in o) "default" !== a && function(t) {
            n.d(e, t, function() {
                return o[t];
            });
        }(a);
        n("2dea");
        var s = n("f0c5"), r = Object(s.a)(o.default, i.b, i.c, !1, null, null, null, !1, i.a, void 0);
        e.default = r.exports;
    },
    cde9: function(t, e, n) {
        n.r(e);
        var i = n("d8c2"), o = n.n(i);
        for (var a in i) "default" !== a && function(t) {
            n.d(e, t, function() {
                return i[t];
            });
        }(a);
        e.default = o.a;
    },
    d8c2: function(t, e, n) {
        (function(t) {
            function i(t) {
                for (var e = t.length, n = 5381; e--; ) n += (n << 5) + t.charCodeAt(e);
                return n;
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var o = {}, a = t.getFileSystemManager ? t.getFileSystemManager() : null, s = n("cce8"), r = {
                name: "parser",
                data: function() {
                    return {
                        showAm: "",
                        nodes: []
                    };
                },
                components: {
                    trees: function() {
                        n.e("components/jyf-parser/libs/trees").then(function() {
                            return resolve(n("5453"));
                        }.bind(null, n)).catch(n.oe);
                    }
                },
                props: {
                    html: String,
                    autopause: {
                        type: Boolean,
                        default: !0
                    },
                    autoscroll: Boolean,
                    autosetTitle: {
                        type: Boolean,
                        default: !0
                    },
                    compress: Number,
                    loadingImg: String,
                    useCache: Boolean,
                    domain: String,
                    lazyLoad: Boolean,
                    selectable: Boolean,
                    tagStyle: Object,
                    showWithAnimation: Boolean,
                    useAnchor: Boolean
                },
                watch: {
                    html: function(t) {
                        this.setContent(t);
                    }
                },
                created: function() {
                    this.imgList = [], this.imgList.each = function(t) {
                        for (var e = 0, n = this.length; e < n; e++) this.setItem(e, t(this[e], e, this));
                    }, this.imgList.setItem = function(t, e) {
                        var n = this;
                        if (void 0 != t && e) {
                            if (0 == e.indexOf("http") && this.includes(e)) {
                                for (var i, o = e.split("://")[0], s = o.length; (i = e[s]) && ("/" != i || "/" == e[s - 1] || "/" == e[s + 1]); s++) o += Math.random() > .5 ? i.toUpperCase() : i;
                                return o += e.substr(s), this[t] = o;
                            }
                            if (this[t] = e, e.includes("data:image")) {
                                var r, c = e.match(/data:image\/(\S+?);(\S+?),(.+)/);
                                if (!c) return;
                                r = "".concat(wx.env.USER_DATA_PATH, "/").concat(Date.now(), ".").concat(c[1]), 
                                a && a.writeFile({
                                    filePath: r,
                                    data: c[3],
                                    encoding: c[2],
                                    success: function() {
                                        return n[t] = r;
                                    }
                                });
                            }
                        }
                    };
                },
                mounted: function() {
                    this.html && this.setContent(this.html);
                },
                beforeDestroy: function() {
                    this.imgList.each(function(e) {
                        e && e.includes(t.env.USER_DATA_PATH) && a && a.unlink({
                            filePath: e
                        });
                    }), clearInterval(this._timer);
                },
                methods: {
                    setContent: function(e, n) {
                        var a, r = this;
                        if (!e) return this.nodes = [];
                        var c, l = new s(e, this);
                        if (this.useCache) {
                            var h = i(e);
                            o[h] ? a = o[h] : (a = l.parse(), o[h] = a);
                        } else a = l.parse();
                        this.$emit("parse", a), this.nodes = n ? this.nodes.concat(a) : a, a.length && a.title && this.autosetTitle && t.setNavigationBarTitle({
                            title: a.title
                        }), this.imgList && (this.imgList.length = 0), this.videoContexts = [], this.$nextTick(function() {
                            (function t(e) {
                                for (var n = e.length; n--; ) e[n].top && (e[n].controls = [], e[n].init(), t(e[n].$children));
                            })(r.$children), r.$emit("load");
                        }), clearInterval(this._timer), this._timer = setInterval(function() {
                            t.createSelectorQuery().in(r).select("#_top").boundingClientRect().exec(function(t) {
                                t && (r.rect = t[0], r.rect.height == c && (r.$emit("ready", r.rect), clearInterval(r._timer)), 
                                c = r.rect.height);
                            });
                        }, 350), this.showWithAnimation && !n && (this.showAm = "animation:_show .5s");
                    },
                    getText: function() {
                        for (var t, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.nodes, n = "", i = 0; t = e[i++]; ) if ("text" == t.type) n += t.text.replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"); else if ("br" == t.type) n += "\n"; else {
                            var o = "p" == t.name || "div" == t.name || "tr" == t.name || "li" == t.name || "h" == t.name[0] && t.name[1] > "0" && t.name[1] < "7";
                            o && n && "\n" != n[n.length - 1] && (n += "\n"), t.children && (n += this.getText(t.children)), 
                            o && "\n" != n[n.length - 1] ? n += "\n" : "td" != t.name && "th" != t.name || (n += "\t");
                        }
                        return n;
                    },
                    in: function(t) {
                        t.page && t.selector && t.scrollTop && (this._in = t);
                    },
                    navigateTo: function(e) {
                        var n = this;
                        if (!this.useAnchor) return e.fail && e.fail("Anchor is disabled");
                        var i = " ";
                        i = ">>>";
                        var o = t.createSelectorQuery().in(this._in ? this._in.page : this).select((this._in ? this._in.selector : "#_top") + (e.id ? "".concat(i, "#").concat(e.id, ",").concat(this._in ? this._in.selector : "#_top").concat(i, ".").concat(e.id) : "")).boundingClientRect();
                        this._in ? o.select(this._in.selector).scrollOffset().select(this._in.selector).boundingClientRect() : o.selectViewport().scrollOffset(), 
                        o.exec(function(i) {
                            if (!i[0]) return e.fail && e.fail("Label not found");
                            var o = i[1].scrollTop + i[0].top - (i[2] ? i[2].top : 0) + (e.offset || 0);
                            n._in ? n._in.page[n._in.scrollTop] = o : t.pageScrollTo({
                                scrollTop: o,
                                duration: 300
                            }), e.success && e.success();
                        });
                    },
                    getVideoContext: function(t) {
                        if (!t) return this.videoContexts;
                        for (var e = this.videoContexts.length; e--; ) if (this.videoContexts[e].id == t) return this.videoContexts[e];
                    }
                }
            };
            e.default = r;
        }).call(this, n("543d").default);
    },
    ea0e: function(t, e, n) {
        n.d(e, "b", function() {
            return i;
        }), n.d(e, "c", function() {
            return o;
        }), n.d(e, "a", function() {});
        var i = function() {
            var t = this;
            t.$createElement;
            t._self._c;
        }, o = [];
    },
    eeb2: function(t, e, n) {}
} ]), (global.webpackJsonp = global.webpackJsonp || []).push([ "components/jyf-parser/jyf-parser-create-component", {
    "components/jyf-parser/jyf-parser-create-component": function(t, e, n) {
        n("543d").createComponent(n("804f"));
    }
}, [ [ "components/jyf-parser/jyf-parser-create-component" ] ] ]);