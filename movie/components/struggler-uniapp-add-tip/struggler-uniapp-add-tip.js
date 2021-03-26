(global.webpackJsonp = global.webpackJsonp || []).push([ [ "components/struggler-uniapp-add-tip/struggler-uniapp-add-tip" ], {
    "01a6": function(t, n, e) {
        e.r(n);
        var a = e("b92d"), u = e("4ead");
        for (var o in u) "default" !== o && function(t) {
            e.d(n, t, function() {
                return u[t];
            });
        }(o);
        e("ebf0");
        var r = e("f0c5"), i = Object(r.a)(u.default, a.b, a.c, !1, null, "277b43c1", null, !1, a.a, void 0);
        n.default = i.exports;
    },
    "4a11": function(t, n, e) {},
    "4ce4": function(t, n, e) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var a = {
            data: function() {
                return {
                    showTip: !0
                };
            },
            mounted: function() {
                var t = this;
                setTimeout(function() {
                    t.showTip = !1;
                }, 1e3 * this.duration);
            },
            props: {
                tip: {
                    type: String,
                    default: "点击「添加小程序」，下次访问更便捷",
                    required: !0
                },
                duration: {
                    type: Number,
                    default: 10,
                    required: !1
                },
                showButton: {
                    type: Boolean,
                    default: !1,
                    required: !1
                }
            },
            methods: {
                hideTip: function() {
                    this.showTip = !1;
                }
            }
        };
        n.default = a;
    },
    "4ead": function(t, n, e) {
        e.r(n);
        var a = e("4ce4"), u = e.n(a);
        for (var o in a) "default" !== o && function(t) {
            e.d(n, t, function() {
                return a[t];
            });
        }(o);
        n.default = u.a;
    },
    b92d: function(t, n, e) {
        e.d(n, "b", function() {
            return a;
        }), e.d(n, "c", function() {
            return u;
        }), e.d(n, "a", function() {});
        var a = function() {
            var t = this;
            t.$createElement;
            t._self._c;
        }, u = [];
    },
    ebf0: function(t, n, e) {
        var a = e("4a11");
        e.n(a).a;
    }
} ]), (global.webpackJsonp = global.webpackJsonp || []).push([ "components/struggler-uniapp-add-tip/struggler-uniapp-add-tip-create-component", {
    "components/struggler-uniapp-add-tip/struggler-uniapp-add-tip-create-component": function(t, n, e) {
        e("543d").createComponent(e("01a6"));
    }
}, [ [ "components/struggler-uniapp-add-tip/struggler-uniapp-add-tip-create-component" ] ] ]);