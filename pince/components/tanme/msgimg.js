(global.webpackJsonp = global.webpackJsonp || []).push([ [ "components/tanme/msgimg" ], {
    1106: function(n, t, e) {
        var o = e("8671");
        e.n(o).a;
    },
    "38b9": function(n, t, e) {
        e.r(t);
        var o = e("b1a6"), a = e.n(o);
        for (var c in o) "default" !== c && function(n) {
            e.d(t, n, function() {
                return o[n];
            });
        }(c);
        t.default = a.a;
    },
    8671: function(n, t, e) {},
    b1a6: function(n, t, e) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = void 0, t.default = {
            name: "msgimg",
            props: {
                m_img: {
                    default: ""
                }
            },
            data: function() {
                return {};
            },
            methods: {}
        };
    },
    cc9a: function(n, t, e) {
        e.r(t);
        var o = e("f922"), a = e("38b9");
        for (var c in a) "default" !== c && function(n) {
            e.d(t, n, function() {
                return a[n];
            });
        }(c);
        e("1106");
        var u = e("2877"), r = Object(u.a)(a.default, o.a, o.b, !1, null, "7c1f000d", null);
        t.default = r.exports;
    },
    f922: function(n, t, e) {
        var o = function() {
            this.$createElement, this._self._c;
        }, a = [];
        e.d(t, "a", function() {
            return o;
        }), e.d(t, "b", function() {
            return a;
        });
    }
} ]), (global.webpackJsonp = global.webpackJsonp || []).push([ "components/tanme/msgimg-create-component", {
    "components/tanme/msgimg-create-component": function(n, t, e) {
        e("543d").createComponent(e("cc9a"));
    }
}, [ [ "components/tanme/msgimg-create-component" ] ] ]);