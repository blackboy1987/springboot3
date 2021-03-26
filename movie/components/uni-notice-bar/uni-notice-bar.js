(global.webpackJsonp = global.webpackJsonp || []).push([ [ "components/uni-notice-bar/uni-notice-bar" ], {
    "079b": function(t, n, e) {},
    "1c9e": function(t, n, e) {
        e.r(n);
        var o = e("28a1"), i = e.n(o);
        for (var a in o) "default" !== a && function(t) {
            e.d(n, t, function() {
                return o[t];
            });
        }(a);
        n.default = i.a;
    },
    2798: function(t, n, e) {
        e.d(n, "b", function() {
            return o;
        }), e.d(n, "c", function() {
            return i;
        }), e.d(n, "a", function() {});
        var o = function() {
            var t = this;
            t.$createElement;
            t._self._c;
        }, i = [];
    },
    "28a1": function(t, n, e) {
        (function(t) {
            Object.defineProperty(n, "__esModule", {
                value: !0
            }), n.default = void 0;
            var e = {
                name: "UniNoticeBar",
                components: {},
                props: {
                    text: {
                        type: String,
                        default: ""
                    },
                    moreText: {
                        type: String,
                        default: ""
                    },
                    backgroundColor: {
                        type: String,
                        default: "#fffbe8"
                    },
                    speed: {
                        type: Number,
                        default: 30
                    },
                    color: {
                        type: String,
                        default: "#de8c17"
                    },
                    moreColor: {
                        type: String,
                        default: "#999999"
                    },
                    single: {
                        type: [ Boolean, String ],
                        default: !1
                    },
                    scrollable: {
                        type: [ Boolean, String ],
                        default: !1
                    },
                    showIcon: {
                        type: [ Boolean, String ],
                        default: !1
                    },
                    showGetMore: {
                        type: [ Boolean, String ],
                        default: !1
                    },
                    showClose: {
                        type: [ Boolean, String ],
                        default: !1
                    }
                },
                data: function() {
                    return {
                        textWidth: 0,
                        boxWidth: 0,
                        wrapWidth: "",
                        webviewHide: !1,
                        elId: "Uni_".concat(Math.ceil(1e6 * Math.random()).toString(36)),
                        elIdBox: "Uni_".concat(Math.ceil(1e6 * Math.random()).toString(36)),
                        show: !0,
                        animationDuration: "none",
                        animationPlayState: "paused",
                        animationDelay: "0s"
                    };
                },
                mounted: function() {
                    var t = this;
                    this.$nextTick(function() {
                        t.initSize();
                    });
                },
                methods: {
                    initSize: function() {
                        var n = this;
                        if (this.scrollable) {
                            var e = [], o = new Promise(function(e, o) {
                                t.createSelectorQuery().in(n).select("#".concat(n.elId)).boundingClientRect().exec(function(t) {
                                    n.textWidth = t[0].width, e();
                                });
                            }), i = new Promise(function(e, o) {
                                t.createSelectorQuery().in(n).select("#".concat(n.elIdBox)).boundingClientRect().exec(function(t) {
                                    n.boxWidth = t[0].width, e();
                                });
                            });
                            e.push(o), e.push(i), Promise.all(e).then(function() {
                                n.animationDuration = "".concat(n.textWidth / n.speed, "s"), n.animationDelay = "-".concat(n.boxWidth / n.speed, "s"), 
                                setTimeout(function() {
                                    n.animationPlayState = "running";
                                }, 1e3);
                            });
                        }
                    },
                    loopAnimation: function() {},
                    clickMore: function() {
                        this.$emit("getmore");
                    },
                    close: function() {
                        this.show = !1, this.$emit("close");
                    },
                    onClick: function() {
                        this.$emit("click");
                    }
                }
            };
            n.default = e;
        }).call(this, e("543d").default);
    },
    b742: function(t, n, e) {
        e.r(n);
        var o = e("2798"), i = e("1c9e");
        for (var a in i) "default" !== a && function(t) {
            e.d(n, t, function() {
                return i[t];
            });
        }(a);
        e("e612");
        var c = e("f0c5"), r = Object(c.a)(i.default, o.b, o.c, !1, null, "75b5dee9", null, !1, o.a, void 0);
        n.default = r.exports;
    },
    e612: function(t, n, e) {
        var o = e("079b");
        e.n(o).a;
    }
} ]), (global.webpackJsonp = global.webpackJsonp || []).push([ "components/uni-notice-bar/uni-notice-bar-create-component", {
    "components/uni-notice-bar/uni-notice-bar-create-component": function(t, n, e) {
        e("543d").createComponent(e("b742"));
    }
}, [ [ "components/uni-notice-bar/uni-notice-bar-create-component" ] ] ]);