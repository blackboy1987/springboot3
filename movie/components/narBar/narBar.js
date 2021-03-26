(global.webpackJsonp = global.webpackJsonp || []).push([ [ "components/narBar/narBar" ], {
    "0b0a": function(t, e, n) {
        n.r(e);
        var s = n("74b1"), o = n("26d1");
        for (var i in o) "default" !== i && function(t) {
            n.d(e, t, function() {
                return o[t];
            });
        }(i);
        n("6a5d");
        var c = n("f0c5"), a = Object(c.a)(o.default, s.b, s.c, !1, null, null, null, !1, s.a, void 0);
        e.default = a.exports;
    },
    "26d1": function(t, e, n) {
        n.r(e);
        var s = n("89bd"), o = n.n(s);
        for (var i in s) "default" !== i && function(t) {
            n.d(e, t, function() {
                return s[t];
            });
        }(i);
        e.default = o.a;
    },
    6327: function(t, e, n) {},
    "6a5d": function(t, e, n) {
        var s = n("6327");
        n.n(s).a;
    },
    "74b1": function(t, e, n) {
        n.d(e, "b", function() {
            return s;
        }), n.d(e, "c", function() {
            return o;
        }), n.d(e, "a", function() {});
        var s = function() {
            var t = this;
            t.$createElement;
            t._self._c, t._isMounted || (t.e0 = function(t) {
                return this.$emit("black");
            }, t.e1 = function(t) {
                return this.$emit("white");
            }, t.e2 = function(t) {
                return this.$emit("pageScrollTo");
            });
        }, o = [];
    },
    "89bd": function(t, e, n) {
        (function(t) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0, getApp().globalData;
            var n = {
                data: function() {
                    return {
                        systemInfo: getApp().globalData.systemInfo,
                        statusBarHeight: 20
                    };
                },
                props: {
                    bgColor: {
                        type: String,
                        default: "rgba(255, 255, 255, 0)"
                    },
                    fixed: {
                        type: [ Boolean, String ],
                        default: !1
                    },
                    search: {
                        type: [ Boolean, String ],
                        default: !1
                    },
                    table: {
                        type: [ Boolean, String ],
                        default: !1
                    },
                    type: {
                        type: [ String ],
                        default: ""
                    },
                    text: {
                        type: [ String ],
                        default: ""
                    }
                },
                computed: {
                    barStyle: function() {
                        return "height:".concat(this.systemInfo.customTop, "px;");
                    },
                    bar: function() {
                        return "height:".concat(this.systemInfo.customHeight, "px;width:").concat(this.systemInfo.customlLeft - 10, "px; margin-left:10px;");
                    },
                    Button: function() {
                        if ("index" == this.type || "home" == this.type) var t = "width:".concat(this.systemInfo.customWidth, "px;"); else "back" != this.type && "top" != this.type || (t = "width:".concat(this.systemInfo.customWidth / 2, "px; height:").concat(this.systemInfo.customHeight, "px;line-height:").concat(this.systemInfo.customHeight, "px;"));
                        return t;
                    },
                    searchView: function() {
                        if (this.search) if ("" == this.type) var t = "width:".concat(this.systemInfo.customlLeft - 10, "px;height:").concat(this.systemInfo.customHeight, "px;line-height:").concat(this.systemInfo.customHeight, "px;"); else t = "index" == this.type ? "width:".concat(this.systemInfo.customlLeft - 10 - this.systemInfo.customWidth - 10, "px;height:").concat(this.systemInfo.customHeight, "px;line-height:").concat(this.systemInfo.customHeight, "px;") : "width:".concat(this.systemInfo.customlLeft - 10 - this.systemInfo.customWidth / 2, "px;height:").concat(this.systemInfo.customHeight, "px;line-height:").concat(this.systemInfo.customHeight, "px;");
                        return t;
                    },
                    textView: function() {
                        if ("" !== this.text) if ("home" == this.type) var t = "width:".concat(this.systemInfo.customlLeft - 10 - this.systemInfo.customWidth - 10, "px;height:").concat(this.systemInfo.customHeight, "px;line-height:").concat(this.systemInfo.customHeight, "px;"); else t = "back" == this.type ? "width:".concat(this.systemInfo.customlLeft - 10 - this.systemInfo.customWidth / 2, "px;height:").concat(this.systemInfo.customHeight, "px;line-height:").concat(this.systemInfo.customHeight, "px;") : "width:".concat(this.systemInfo.customlLeft - 10, "px;height:").concat(this.systemInfo.customHeight, "px;line-height:").concat(this.systemInfo.customHeight, "px;");
                        return t;
                    },
                    customBar: function() {
                        return "height:".concat(this.systemInfo.customBar, "px;");
                    }
                },
                mounted: function() {
                    this.systemInfo = getApp().globalData.systemInfo;
                },
                methods: {
                    BackPage: function() {
                        t.navigateBack({
                            delta: 1
                        });
                    },
                    BackIndex: function() {
                        t.switchTab({
                            url: "/pages/index/index"
                        });
                    },
                    getSearch: function() {
                        t.switchTab({
                            url: "../../pages/search/search"
                        });
                    },
                    switchChange: function(t) {
                        this.$emit("message", t.target.value), t.target.value ? this.$user_login ? this.subscribe() : this.$refs.userLogin.open() : this.setSubscribe();
                    }
                }
            };
            e.default = n;
        }).call(this, n("543d").default);
    }
} ]), (global.webpackJsonp = global.webpackJsonp || []).push([ "components/narBar/narBar-create-component", {
    "components/narBar/narBar-create-component": function(t, e, n) {
        n("543d").createComponent(n("0b0a"));
    }
}, [ [ "components/narBar/narBar-create-component" ] ] ]);