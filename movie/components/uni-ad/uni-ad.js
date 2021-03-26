(global.webpackJsonp = global.webpackJsonp || []).push([ [ "components/uni-ad/uni-ad" ], {
    "2a1c": function(n, e, a) {
        (function(n) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var a = {
                props: {
                    gg: {
                        type: Object,
                        defual: function() {
                            return {};
                        }
                    }
                },
                data: function() {
                    return {};
                },
                methods: {
                    ggImage: function() {
                        var e = this;
                        switch (e.gg.type) {
                          case "0":
                            n.setStorageSync("$web", e.gg.url), n.navigateTo({
                                url: "../web/web"
                            });
                            break;

                          case "1":
                            n.navigateToMiniProgram({
                                appId: e.gg.url,
                                path: "",
                                success: function(n) {}
                            });
                            break;

                          case "2":
                            e.gg.url && wx.previewImage({
                                current: e.gg.url,
                                urls: [ e.gg.url ]
                            });
                            break;

                          case "3":
                            e.gg.url && n.navigateTo({
                                url: e.gg.url
                            });
                        }
                    }
                }
            };
            e.default = a;
        }).call(this, a("543d").default);
    },
    "2fcb": function(n, e, a) {
        a.r(e);
        var t = a("2a1c"), u = a.n(t);
        for (var c in t) "default" !== c && function(n) {
            a.d(e, n, function() {
                return t[n];
            });
        }(c);
        e.default = u.a;
    },
    "43a2": function(n, e, a) {},
    e53c: function(n, e, a) {
        a.r(e);
        var t = a("f71d"), u = a("2fcb");
        for (var c in u) "default" !== c && function(n) {
            a.d(e, n, function() {
                return u[n];
            });
        }(c);
        a("e9d1");
        var o = a("f0c5"), r = Object(o.a)(u.default, t.b, t.c, !1, null, "5224f1ac", null, !1, t.a, void 0);
        e.default = r.exports;
    },
    e9d1: function(n, e, a) {
        var t = a("43a2");
        a.n(t).a;
    },
    f71d: function(n, e, a) {
        a.d(e, "b", function() {
            return t;
        }), a.d(e, "c", function() {
            return u;
        }), a.d(e, "a", function() {});
        var t = function() {
            var n = this;
            n.$createElement;
            n._self._c;
        }, u = [];
    }
} ]), (global.webpackJsonp = global.webpackJsonp || []).push([ "components/uni-ad/uni-ad-create-component", {
    "components/uni-ad/uni-ad-create-component": function(n, e, a) {
        a("543d").createComponent(a("e53c"));
    }
}, [ [ "components/uni-ad/uni-ad-create-component" ] ] ]);