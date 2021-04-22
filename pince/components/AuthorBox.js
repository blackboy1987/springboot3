(global.webpackJsonp = global.webpackJsonp || []).push([ [ "components/AuthorBox" ], {
    "7a5b": function(t, e, n) {},
    "7ca2": function(t, e, n) {
        var s = function() {
            this.$createElement, this._self._c;
        }, a = [];
        n.d(e, "a", function() {
            return s;
        }), n.d(e, "b", function() {
            return a;
        });
    },
    "7db3": function(t, e, n) {
        n.r(e);
        var s = n("7ca2"), a = n("be95");
        for (var o in a) "default" !== o && function(t) {
            n.d(e, t, function() {
                return a[t];
            });
        }(o);
        n("bb19");
        var i = n("2877"), u = Object(i.a)(a.default, s.a, s.b, !1, null, "64c5f09e", null);
        e.default = u.exports;
    },
    aebd: function(t, e, n) {
        (function(t) {
            function s(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var a = s(n("9000")), o = s(n("0dc9")), i = s(n("cd71")), u = s(n("6654")), r = s(n("6ba3")), c = s(n("e008")), d = s(n("2321")), f = s(n("d7cf")), l = !1;
            t.createInnerAudioContext() && (l = t.createInnerAudioContext());
            var p = getApp(), h = {
                props: [ "content", "needAsk", "needlogin" ],
                data: function() {
                    return {
                        authorAvatar: a.default,
                        answerAvatar: p.globalData.user.avatarUrl ? p.globalData.user.avatarUrl : u.default,
                        contents: this.content,
                        selectIcon: r.default,
                        promptMessage: o.default,
                        unselectIcon: c.default,
                        originalQuce: i.default,
                        active: -1,
                        show: !0,
                        audiores: {
                            icon: d.default,
                            tips: "点击播放",
                            status: "pause",
                            point: !0
                        },
                        startstatus: !0
                    };
                },
                onLoad: function() {

                },
                methods: {
                    start: function() {
                        this.startstatus && (this.startstatus = !1, this.$parent.start());
                    },
                    overanswer: function() {
                        this.startstatus && (this.startstatus = !1, this.$parent.overAnswer());
                    },
                    getuserinfo: function(t) {
                       this.startstatus && (this.startstatus = !1, this.$parent.getUserInfo(t));
                    },
                    formSubmit: function(t) {
                        this.$parent.formSubmit(t);
                    },
                    nextQuestion: function(t, e) {
                        if (this.active > -1 || "return" == this.active) return !1;
                        this.contents.audio && this.pauseAudio(), this.show = !1, this.active = e, this.$parent.nextQuestion(t);
                    },
                    prevQuestion: function() {
                        this.contents.audio && this.pauseAudio(), this.show = !1, this.active = "return",
                        this.$parent.prevQuestion();
                    },
                    viewPicture: function() {
                        this.$parent.viewPicture();
                    },
                    savePicture: function(t) {
                        this.$parent.resultLongPress(t);
                    },
                    playAudiao: function(t) {
                        var e = this;
                        this.audiores.point = !1, this.show && ("pause" == this.audiores.status ? (this.audiores.status = "running",
                        this.audiores.icon = f.default, this.audiores.tips = "正在播放", l && (l.src = t, l.play(),
                        l.onEnded(function() {
                            e.audiores.status = "pause", e.audiores.icon = d.default, e.audiores.tips = "点击播放";
                        }))) : (this.audiores.status = "pause", this.audiores.icon = d.default, this.audiores.tips = "点击播放",
                        l && l.stop()));
                    },
                    pauseAudio: function() {
                        this.audiores.status = "pause", this.audiores.icon = d.default, this.audiores.tips = "点击播放",
                        l && l.stop();
                    }
                }
            };
            e.default = h;
        }).call(this, n("543d").default);
    },
    bb19: function(t, e, n) {
        var s = n("7a5b");
        n.n(s).a;
    },
    be95: function(t, e, n) {
        n.r(e);
        var s = n("aebd"), a = n.n(s);
        for (var o in s) "default" !== o && function(t) {
            n.d(e, t, function() {
                return s[t];
            });
        }(o);
        e.default = a.a;
    }
} ]), (global.webpackJsonp = global.webpackJsonp || []).push([ "components/AuthorBox-create-component", {
    "components/AuthorBox-create-component": function(t, e, n) {
        n("543d").createComponent(n("7db3"));
    }
}, [ [ "components/AuthorBox-create-component" ] ] ]);
