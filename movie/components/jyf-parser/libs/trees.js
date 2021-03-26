(global.webpackJsonp = global.webpackJsonp || []).push([ [ "components/jyf-parser/libs/trees" ], {
    "25df": function(t, e, r) {
        e.a = function(t) {
            t.options.wxsCallMethods || (t.options.wxsCallMethods = []);
        };
    },
    5453: function(t, e, r) {
        r.r(e);
        var n = r("b332"), i = r("6faa");
        for (var a in i) "default" !== a && function(t) {
            r.d(e, t, function() {
                return i[t];
            });
        }(a);
        r("bade");
        var s = r("f0c5"), o = r("25df"), c = Object(s.a)(i.default, n.b, n.c, !1, null, null, null, !1, n.a, void 0);
        "function" == typeof o.a && Object(o.a)(c), e.default = c.exports;
    },
    "6faa": function(t, e, r) {
        r.r(e);
        var n = r("9241"), i = r.n(n);
        for (var a in n) "default" !== a && function(t) {
            r.d(e, t, function() {
                return n[t];
            });
        }(a);
        e.default = i.a;
    },
    9241: function(t, e, r) {
        (function(t, n) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0, t.Parser = {};
            var i = r("44e7").errorImg, a = {
                components: {
                    trees: function() {
                        Promise.resolve().then(function() {
                            return resolve(r("5453"));
                        }.bind(null, r)).catch(r.oe);
                    }
                },
                name: "trees",
                data: function() {
                    return {
                        ctrl: [],
                        placeholder: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="225"/>',
                        errorImg: i,
                        loadVideo: "undefined" == typeof plus,
                        c: "",
                        s: ""
                    };
                },
                props: {
                    nodes: Array,
                    lazyLoad: Boolean,
                    loading: String
                },
                mounted: function() {
                    for (this.top = this.$parent; "parser" != this.top.$options.name; this.top = this.top.$parent) ;
                    this.init();
                },
                methods: {
                    init: function() {
                        for (var t, e = this.nodes.length; t = this.nodes[--e]; ) if ("img" == t.name) this.top.imgList.setItem(t.attrs.i, t.attrs.src); else if ("video" == t.name || "audio" == t.name) {
                            var r;
                            "video" == t.name ? r = n.createVideoContext(t.attrs.id, this) : this.$refs[t.attrs.id] && (r = this.$refs[t.attrs.id][0]), 
                            r && (r.id = t.attrs.id, this.top.videoContexts.push(r));
                        }
                    },
                    play: function(t) {
                        var e = this.top.videoContexts;
                        if (e.length > 1 && this.top.autopause) for (var r = e.length; r--; ) e[r].id != t.currentTarget.dataset.id && e[r].pause();
                    },
                    imgtap: function(e) {
                        var r = e.currentTarget.dataset.attrs;
                        if (!r.ignore) {
                            var i = !0, a = {
                                id: e.target.id,
                                src: r.src,
                                ignore: function() {
                                    return i = !1;
                                }
                            };
                            if (t.Parser.onImgtap && t.Parser.onImgtap(a), this.top.$emit("imgtap", a), i) {
                                var s = this.top.imgList, o = s[r.i] ? parseInt(r.i) : (s = [ r.src ], 0);
                                n.previewImage({
                                    current: o,
                                    urls: s
                                });
                            }
                        }
                    },
                    loadImg: function(t) {
                        var e = t.currentTarget.dataset.i;
                        this.lazyLoad && !this.ctrl[e] ? this.$set(this.ctrl, e, 1) : this.loading && 2 != this.ctrl[e] && this.$set(this.ctrl, e, 2);
                    },
                    linkpress: function(e) {
                        var r = !0, i = e.currentTarget.dataset.attrs;
                        if (i.ignore = function() {
                            return r = !1;
                        }, t.Parser.onLinkpress && t.Parser.onLinkpress(i), this.top.$emit("linkpress", i), 
                        r) {
                            if (i["app-id"]) return n.navigateToMiniProgram({
                                appId: i["app-id"],
                                path: i.path
                            });
                            i.href && ("#" == i.href[0] ? this.top.useAnchor && this.top.navigateTo({
                                id: i.href.substring(1)
                            }) : 0 == i.href.indexOf("http") || 0 == i.href.indexOf("//") ? n.setClipboardData({
                                data: i.href,
                                success: function() {
                                    return n.showToast({
                                        title: "链接已复制"
                                    });
                                }
                            }) : n.navigateTo({
                                url: i.href,
                                fail: function() {
                                    n.switchTab({
                                        url: i.href
                                    });
                                }
                            }));
                        }
                    },
                    error: function(t) {
                        var e = t.currentTarget, r = e.dataset.source, n = e.dataset.i;
                        if ("video" == r || "audio" == r) {
                            var a = this.ctrl[n] ? this.ctrl[n].i + 1 : 1;
                            a < this.nodes[n].attrs.source.length && this.$set(this.ctrl, n, a), t.detail.__args__ && (t.detail = t.detail.__args__[0]);
                        } else i && "img" == r && (this.top.imgList.setItem(e.dataset.index, i), this.$set(this.ctrl, n, 3));
                        this.top && this.top.$emit("error", {
                            source: r,
                            target: e,
                            errMsg: t.detail.errMsg
                        });
                    },
                    _loadVideo: function(t) {
                        this.$set(this.ctrl, t.target.dataset.i, 0);
                    }
                }
            };
            e.default = a;
        }).call(this, r("c8ba"), r("543d").default);
    },
    "9e34": function(t, e, r) {},
    b332: function(t, e, r) {
        r.d(e, "b", function() {
            return i;
        }), r.d(e, "c", function() {
            return a;
        }), r.d(e, "a", function() {
            return n;
        });
        var n = {
            customAd: function() {
                return r.e("components/custom-ad/custom-ad").then(r.bind(null, "dac9"));
            }
        }, i = function() {
            var t = this;
            t.$createElement;
            t._self._c;
        }, a = [];
    },
    bade: function(t, e, r) {
        var n = r("9e34");
        r.n(n).a;
    }
} ]), (global.webpackJsonp = global.webpackJsonp || []).push([ "components/jyf-parser/libs/trees-create-component", {
    "components/jyf-parser/libs/trees-create-component": function(t, e, r) {
        r("543d").createComponent(r("5453"));
    }
}, [ [ "components/jyf-parser/libs/trees-create-component" ] ] ]);