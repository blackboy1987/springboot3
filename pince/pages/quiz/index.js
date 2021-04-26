var e = null;
const app = getApp();

const appConfig = wx.getStorageSync("appConfig");
const indexAd = appConfig.indexAd || {};
wx.createInterstitialAd && ((e = wx.createInterstitialAd({
    adUnitId: indexAd.interstitialAdId
})).onLoad(function() {}), e.onError(function(e) {}), e.onClose(function() {})), function() {
    var e = null;
    (global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/quiz/index" ], {
        "04c4": function(t, a, s) {
            (function(t) {
                function i(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                }
                function o(e, t, a) {
                    return t in e ? Object.defineProperty(e, t, {
                        value: a,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[t] = a, e;
                }
                Object.defineProperty(a, "__esModule", {
                    value: !0
                }), a.default = void 0;
                var n, r = s("4e22"), l = s("c7c6"), u = i(s("cd71")), d = i(s("6654")), c = i(s("6f91")), h = i(s("a94b")), g = i(s("a6fa")), p = i(s("0861")), m = i(s("3324")), f = i(s("57a0")), b = i(s("1418")), v = i(s("f47e")), _ = new (i(s("94f5")).default)(), y = getApp(), w = {
                    data: function() {
                        return {
                            closeIcon: b.default,
                            watchBtn: m.default,
                            videoButton: !1,
                            originalQuce: u.default,
                            videoIcon: f.default,
                            previewImage: !1,
                            authorButton: !1,
                            makeButton: !1,
                            question_info: {},
                            special_config: {},
                            question: [],
                            shareOther: h.default,
                            shuoshuotu: g.default,
                            againimg: p.default,
                            items: [],
                            scrollTop: 0,
                            current: 0,
                            oldCurrent: 0,
                            count: 0,
                            input: !1,
                            button: !1,
                            margin: !1,
                            nickname: "",
                            message: "",
                            showMessage: !1,
                            canvasHW: {
                                width: 750,
                                height: 950
                            },
                            options: [],
                            answerAvatar: y.globalData.user.avatarUrl ? y.globalData.user.avatarUrl : d.default,
                            resimg: {
                                qrcode: "",
                                result: "",
                                avatar: y.globalData.user.avatarUrl ? y.globalData.user.avatarUrl : r.ssl_static_host + "quce/1562666285IKXQK.png"
                            },
                            preview: !1,
                            resultImage: "",
                            isfirstplay: !0,
                            resultTjFlag: !0,
                            result: "",
                            sharetitle: "",
                            quiztype: "",
                            incsavestatus: !0,
                            inlongSmall: !0,
                            inlongBig: !0,
                            isreplay: !1,
                            end: 0,
                            shareImage: "",
                            id: "",
                            scrollId: 0,
                            scrollToView: "",
                            videoAd: "",
                            showAds: !1,
                            forcedAds: !1,
                            makeRes: 1,
                            videoEnded: !1,
                            uid: "",
                            cancelinc: "",
                            showshare: !1,
                            modelContent: "",
                            showmodel: !1,
                            topimg: c.default,
                            settop: "",
                            imageshare: "",
                            openid: "",
                            ceshiprogress: !1,
                            shareqzonetitle: "",
                            shuoshuo: "",
                            shuoshuobutton: !1,
                            adtime: 0,
                            shareAppImage: "",
                            playNumber: 0,
                            bannerNumber: 0,
                            resultData: "",
                            CaptureImage: 1,
                            saveImageSmall: !0,
                            hasUserinfo: !1,
                            videoErr: !1,
                            shuoshuo_sharetitle: "",
                            canshareqzone: !0,
                            loading: !0,
                            progresspercent: 0,
                            transitiontime: 60,
                            progressend: !1,
                            imgfinished: !1,
                            hasbannerad: 0,
                            banneradutilid: "",
                            showbannerad: !1,
                            addresultimg: !0,
                            banneradcontent: "",
                            forcebutton: !1,
                            original: "",
                            video_banner_ad: "",
                            adBox_cancel_btn: "",
                            adBox_video_btn: "",
                            banner_ad_style: "",
                            adBox_style_type: "",
                            showVideoModel: "",
                            onLoad: 1,
                            videoplayednumber: "",
                            videoLoad: !1,
                            videoWatchNumber: 0,
                            showdingyue: !1,
                            dingyuemodel: !1,
                            subscribe_status: 0,
                            subscribe_content: "",
                            round: 1,
                            share_ecodeid: "",
                            hour: 0,
                            needAsk: 1,
                            needlogin: !1,
                            ads:{},
                        };
                    },
                    onShow: function() {
                        setTimeout(function() {
                            e && e.show().catch(function(e) {
                                console.error(e);
                            });
                        }, 2e3);
                    },
                    onLoad: function(a) {
                        let appConfig1 = wx.getStorageSync("appConfig");
                        const ads = appConfig1.indexAd ||{};
                        this.ads = ads;
                        wx.createInterstitialAd && ((e = wx.createInterstitialAd({
                            adUnitId: ads.interstitialAdId
                        })).onLoad(function() {}), e.onError(function(e) {}), e.onClose(function() {})),
                        (0, l.initChannel)(a), v.default.Page.init(),
                        this.onload = 1;
                        var s = this;
                        s.id = a.id, "undefined" != a.title && (
                        s.sharetitle = a.title, t.setNavigationBarTitle({
                            title: s.sharetitle
                        }));
                        var i = t.getStorageSync("bannerNumber"), o = t.getStorageSync("user"), n = t.getStorageSync("userinfo");
                        t.getUserInfo({
                            success: function(e) {
                                if (s.hasUserinfo = !0, n.nickName == e.userInfo.nickName && n.avatarUrl == e.userInfo.avatarUrl) y.globalData.user = o; else {
                                    var a = {
                                        nickName: e.userInfo.nickName,
                                        avatarUrl: e.userInfo.avatarUrl,
                                        verify: 0
                                    };
                                    y.globalData.user = a, t.setStorageSync("user", a), t.setStorageSync("userinfo", a);
                                }
                            },
                            fail: function(e) {}
                        }), a.acid && (y.globalData.acid = a.acid), this.canshareqzone = !1;
                        var r = t.getStorageSync("playNumber"), u = t.getStorageSync("videoplayednumber");
                        this.playNumber = r || 0, this.bannerNumber = i || 0, this.videoplayednumber = u || 0,
                        this.initQuestion(a), t.onUserCaptureScreen(function(e) {
                            s.userCaptureScreen();
                        });
                    },
                    onUnload: function() {
                        this.onload = 0;
                    },
                    onShareAppMessage: function() {
                        var e = this;
                        var t;
                        t = this.shareqzonetitle ? this.shareqzonetitle : this.sharetitle, this.showdingyue && 3 == this.subscribe_status && setTimeout(function() {
                            e.addDingYue();
                        }, 5e3);
                        var a = "/pages/home/index?id=" + this.id + "&title=" + this.sharetitle + "&ispush=1";
                        return this.share_ecodeid && (a = "/pages/home/index?q=".concat(this.share_ecodeid));
                    },
                    computed: {
                        modelList: function() {
                            if (this.modelContent) return this.modelContent.split("##");
                        },
                        subscribelist: function() {
                            if (this.subscribe_content) return this.subscribe_content.split("##");
                        },
                        adcontent: function() {
                            if (this.banneradcontent) {
                                if (1 == this.banner_ad_style) return this.banneradcontent.split("##").join("，");
                                if (2 == this.banner_ad_style) return this.banneradcontent.split("##");
                            }
                        }
                    },
                    components: {
                        AnswerBox: function() {
                            return Promise.all([ s.e("common/vendor"), s.e("components/AnswerBox") ]).then(s.bind(null, "2b59"));
                        },
                        AuthorBox: function() {
                            return Promise.all([ s.e("common/vendor"), s.e("components/AuthorBox") ]).then(s.bind(null, "7db3"));
                        },
                        QuestionNum: function() {
                            return s.e("components/QuestionNum").then(s.bind(null, "1594"));
                        }
                    },
                    methods: {
                        initQuestion: function(e) {
                            var a = this;
                            this.adtime = t.getStorageSync("ad_video");
                            const appConfig = t.getStorageSync("appConfig");
                            var s = {
                                appid: y.globalData.appid,
                                ver: y.globalData.ver,
                                sgid: y.globalData.from_gid,
                                uid: (0, l.setUid)(),
                                source: y.globalData.source,
                                scene: y.globalData.scene,
                                src: y.globalData.src,
                                adtime: this.adtime ? this.adtime : 0,
                                adplayed: this.bannerNumber,
                                quizplayed: this.playNumber,
                                videoplayed: this.videoplayednumber
                            };
                            e.id && (s.id = e.id), e.q && (s.q = e.q), t.request({
                                url: y.globalData.host + "/index.php/App/Index/getQuizInfo",
                                data: s,
                                success: function(s) {
                                    var i = s.data;
                                    e.q && (a.round = i.round ? i.round : "1", y.globalData.from_gid = s.data.id ? s.data.id : "0",
                                    y.globalData.src = s.data.src ? s.data.src : "301", a.hour = s.data.hour, a.id = s.data.id),
                                    v.default.Event.stat("participation", {
                                        gid: a.id
                                    }), a.needAsk = s.data.needAsk, a.showAds = 1 == i.showAds, a.forcedAds = 1 == i.forcedAds,
                                    a.quiztype = i.type, a.cancelinc = i.cancelinc, a.question_info = i, a.special_config = i.special_config,
                                    a.shuoshuo = i.shuoshuo, a.shuoshuo_sharetitle = i.shuoshuo_sharetitle, a.hasbannerad = i.banner_ad,
                                    a.transitiontime = 10 * parseInt(i.banner_ad_time), a.banneradutilid = i.banner_ad_utilid,
                                    a.banneradcontent = i.banner_ad_content, a.imageshare = i.imageshare, a.original = i.original,
                                    a.video_banner_ad = i.video_banner_ad, a.adBox_cancel_btn = i.adBox_cancel_btn,
                                    a.adBox_video_btn = i.adBox_video_btn, a.banner_ad_style = i.banner_ad_style, a.subscribe_status = i.subscribe_status ? i.subscribe_status : 0,
                                    a.subscribe_content = i.subscribe_content, a.adBox_style_type = i.adBox_style_type ? i.adBox_style_type : 1,
                                    a.showVideoModel = null != i.show_video_model ? i.show_video_model : 1, "1109659848" == y.globalData.appid ? (i.video_ad_utilid && i.video_ad_utilid,
                                    a.forcebutton = 1 != i.video_ad_select) : "1109802828" == y.globalData.appid ? (i.video_ad_utilid,
                                    a.forcebutton = !0) : "wx" == y.globalData.apptype ? (i.video_ad_utilid,
                                    a.forcebutton = 1 != i.video_ad_select) : (y.globalData.appid = "1109743918") && (i.video_ad_utilid && i.video_ad_utilid,
                                    a.forcebutton = 1 != i.video_ad_select);

                                    try {
                                        const indexAd = appConfig.indexAd||{};
                                        a.videoAd = wx.createRewardedVideoAd({
                                            adUnitId: indexAd.rewardedVideoAdId
                                        });
                                    } catch (e) {}
                                    a.videoAd && a.videoAd.onError(function(e) {
                                        a.videoErr = !0;
                                    }), a.showAds && a.videoAd && (a.transitiontime = 10 * parseInt(i.banner_videoad_time),
                                    a.banneradutilid = i.banner_videoad_utilid), a.title || (a.sharetitle = i.title,
                                    t.setNavigationBarTitle({
                                        title: i.title
                                    })), i.sharetitle && (a.shareqzonetitle = i.sharetitle), !t.getStorageSync("user_top") && i.settop && (a.settop = i.settop,
                                    a.settop.img = r.static_host + s.data.settop.img, a.cancalSettop()), a.special_config && 0 == a.hasUserinfo && (a.needlogin = !0),
                                    a.modelContent = i.adBox_desc, a.question = JSON.parse(i.question),
                                    a.options = a.question.map(function() {
                                        return 0;
                                    }), i.logo && a.add("AuthorBox", a.setObj({
                                        topicImage: r.static_host + i.logo
                                    })), setTimeout(function() {
                                        a.add("AuthorBox", a.setObj({
                                            desc: i.desc,
                                            start: a.start
                                        })), setTimeout(function() {
                                            a.loading = !1;
                                        }, 500);
                                    }, 200);
                                }
                            });
                        },
                        sharefriend: function(e) {
                            2 == e ? v.default.Event.stat("sharestatistics", {
                                sharetype: 2,
                                gid: this.id
                            }) : this.saveImageSmall ? v.default.Event.stat("sharestatistics", {
                                sharetype: 1,
                                gid: this.id
                            }) : v.default.Event.stat("sharestatistics", {
                                sharetype: 3,
                                gid: this.id
                            });
                        },
                        formSubmit: function(e) {},
                        userCaptureScreen: function() {
                            var e = this.ceshiprogress ? 1 : 0;
                            v.default.Event.stat("captureScreen", {
                                gid: this.id,
                                capturetype: this.CaptureImage
                            }), t.request({
                                url: y.globalData.host + "/index.php/App/Index/incUserCaptureScreen",
                                data: {
                                    imagetype: this.CaptureImage,
                                    progress: e,
                                    gid: this.id
                                },
                                success: function(e) {
                                }
                            });
                        },
                        login: function() {
                            var e = this;
                            t.login({
                                success: function(a) {
                                    t.request({
                                        url: y.globalData.host + "/index.php/App/Index/getQQappOpenid",
                                        data: {
                                            js_code: a.code,
                                            appid: y.globalData.appid
                                        },
                                        success: function(a) {
                                            t.setStorageSync("openid", a.data.openid), e.openid = a.data.openid;
                                        }
                                    });
                                }
                            });
                        },
                        cancalSettop: function() {
                            var e = this;
                            setTimeout(function() {
                                e.settop.status = 0;
                            }, 4e4);
                        },
                        previewImages: function() {
                            this.preview || (this.CaptureImage = 1);
                        },
                        setObj: function(e) {
                            var t = {
                                desc: !1,
                                question: !1,
                                topicImage: !1,
                                picture: !1,
                                audio: !1,
                                picarr: !1,
                                options: !1,
                                start: !1,
                                nextQuestion: !1,
                                prevQuestion: !1,
                                resultImage: !1,
                                viewPicture: !1,
                                resultTjFlag: !0,
                                savePicture: !1,
                                animationData: ""
                            };
                            for (var a in e) t[a] = e[a];
                            return t;
                        },
                        openQzone: function(e) {
                            var t, a = this;
                            t = this.shuoshuo_sharetitle ? this.shuoshuo_sharetitle : this.shareqzonetitle,
                            2 == e ? v.default.Event.stat("shareqzone", {
                                gid: this.id,
                                qzonetype: 2
                            }) : this.saveImageSmall ? v.default.Event.stat("shareqzone", {
                                gid: this.id,
                                qzonetype: 1
                            }) : v.default.Event.stat("shareqzone", {
                                gid: this.id,
                                qzonetype: 3
                            }), this.showdingyue && 3 == this.subscribe_status && setTimeout(function() {
                                a.addDingYue();
                            }, 5e3), qq.openQzonePublish({
                                text: t,
                                media: [ {
                                    type: "photo",
                                    path: this.resultImage
                                } ]
                            });
                        },
                        start: function() {
                            var e = this;
                            1 == this.subscribe_status ? this.showSubscribe(function() {
                                e.starGame();
                            }) : this.starGame();
                        },
                        starGame: function() {
                            var e = this;
                            this.add("AnswerBox", {
                                text: "开始",
                                avatar: this.answerAvatar
                            }), setTimeout(function() {
                                var t = e.question[0], a = e.resetOption(t.answer), s = {
                                    question: t.question,
                                    picture: !!t.img && r.static_host + t.img,
                                    options: a.options,
                                    picarr: a.picarr,
                                    nextQuestion: e.nextQuestion
                                };
                                e.add("QuestionNum", {
                                    num: e.current + 1,
                                    len: e.question.length
                                }), e.add("AuthorBox", e.setObj(s)), 3 != e.question_info.type ? e.current += 1 : e.options[0] = 1,
                                n = setTimeout(function() {
                                    e.scrollToView = e.scrollId, e.scrollTop = 1e3 * e.count;
                                }, 400);
                            }, 400);
                        },
                        nextQuestion: function(e) {
                            var t = this, a = !1;
                            switch (clearTimeout(n), this.question_info.type) {
                              case "2":
                                this.options[this.current - 1] = this.question[this.current - 1].answer[e.num].weight;
                                break;

                              case "3":
                                var s = this.question[this.current].answer[e.num].next;
                                parseInt(s) ? (this.options[this.current] = parseInt(s), this.current = parseInt(s) - 1) : (a = !0,
                                this.options[this.current] = s);
                                break;

                              default:
                                this.options[this.current - 1] = e.num.toUpperCase();
                            }
                            this.add("AnswerBox", {
                                text: e.title ? e.title : e.num,
                                avatar: this.answerAvatar
                            }), setTimeout(function() {
                                t.scrollToView = t.scrollId, t.scrollTop = 1e3 * t.count;
                            }, 100), this.current === this.question.length || a ? (this.showbannerad = this.showAds && this.videoAd,
                            this.special_config && 0 == this.hasUserinfo ? (this.authorButton = !0, this.margin = !0) : this.overAnswer()) : setTimeout(function() {
                                var e = t.question[t.current], a = t.resetOption(e.answer), s = {
                                    question: e.question,
                                    picture: !!e.img && r.static_host + e.img,
                                    options: a.options,
                                    picarr: a.picarr,
                                    audio: !!e.audio && r.static_host + e.audio,
                                    nextQuestion: t.nextQuestion,
                                    prevQuestion: t.current > 0,
                                    playAudiao: t.playAudiao
                                };
                                t.add("QuestionNum", {
                                    num: t.current + 1,
                                    len: t.question.length
                                }), t.add("AuthorBox", t.setObj(s)), n = setTimeout(function() {
                                    t.scrollToView = t.scrollId, t.scrollTop = 1e3 * t.count;
                                }, 400), 3 != t.question_info.type && (t.current += 1);
                            }, 400);
                        },
                        overAnswer: function() {
                            var e = this;
                            this.isfirstplay ? this.showAds && this.videoAd ? 0 == this.showVideoModel ? setTimeout(function() {
                                e.makeResult();
                            }, 500) : setTimeout(function() {
                                1 == e.adBox_style_type ? v.default.Event.stat("showvideomodel", {
                                    videotype: "3_" + y.globalData.ver,
                                    gid: e.id
                                }) : v.default.Event.stat("showvideomodel", {
                                    videotype: e.adBox_style_type + "_" + y.globalData.ver,
                                    gid: e.id
                                }), e.showmodel = !0;
                            }, 1e3) : 2 == this.subscribe_status ? this.showSubscribe(function() {
                                e.scrollToView = e.scrollId, e.scrollTop = 1e3 * e.count, e.analyzeResult(), 1 == e.hasbannerad && (e.showmodel = !0,
                                setTimeout(function() {
                                    e.modelProgress();
                                }, 1e3));
                            }) : (this.scrollToView = this.scrollId, this.scrollTop = 1e3 * this.count, this.analyzeResult(),
                            1 == this.hasbannerad && (this.showmodel = !0, setTimeout(function() {
                                e.modelProgress();
                            }, 1e3))) : (this.scrollToView = this.scrollId, this.scrollTop = 1e3 * this.count,
                            this.analyzeResult());
                        },
                        checking: function(e) {
                            return !!/^[a-zA-Z]+$/.test(e);
                        },
                        prevQuestion: function(e) {
                            for (var t = this, a = this.options.length; a > 0; a--) if (0 != this.options[a - 1]) {
                                this.current = a - 1, this.options[a - 1] = 0;
                                break;
                            }
                            this.add("AnswerBox", {
                                text: "重新回答上一题",
                                avatar: this.answerAvatar
                            }), setTimeout(function() {
                                t.scrollToView = t.scrollId, t.scrollTop = 1e3 * t.count;
                            }, 100), setTimeout(function() {
                                var e = t.question[t.current], a = t.resetOption(e.answer), s = {
                                    question: e.question,
                                    picture: !!e.img && r.static_host + e.img,
                                    options: a.options,
                                    picarr: a.picarr,
                                    nextQuestion: t.nextQuestion,
                                    prevQuestion: t.current > 0
                                };
                                t.add("QuestionNum", {
                                    num: t.current + 1,
                                    len: t.question.length
                                }), t.add("AuthorBox", t.setObj(s)), 3 != t.question_info.type && (t.current += 1),
                                setTimeout(function() {
                                    t.scrollToView = t.scrollId, t.scrollTop = 1e3 * t.count;
                                }, 400);
                            }, 500);
                        },
                        add: function(e, t) {
                            this.scrollId += 1, t.scrollid = this.scrollId, this.count += .5, this.items.push({
                                component: e,
                                content: t
                            });
                        },
                        resetOption: function(e) {
                            var t = [], a = !1;
                            for (var s in e) e[s].img && (a = !0), t.push({
                                title: e[s].title,
                                num: s,
                                img: r.static_host + e[s].img
                            });
                            return {
                                options: t,
                                picarr: a
                            };
                        },
                        getUserInfo: function(e) {
                            var a = this, s = this;
                            this.showbannerad = this.showAds && this.videoAd, e.detail && e.detail.userInfo ? (
                            this.hasUserinfo = !0, this.authorButton = !1, this.margin = !1, y.globalData.user = {
                                nickName: e.detail.userInfo.nickName,
                                avatarUrl: e.detail.userInfo.avatarUrl,
                                verify: 0
                            }, t.setStorageSync("user", y.globalData.user), t.setStorageSync("userinfo", {
                                nickName: e.detail.userInfo.nickName,
                                avatarUrl: e.detail.userInfo.avatarUrl
                            }), this.scrollToView = this.scrollId, this.scrollTop = 1e3 * this.count, s.authorButton = !1,
                            s.margin = !1, s.showAds && s.videoAd ? (0 == this.showVideoModel ? (
                            setTimeout(function() {
                                a.makeResult();
                            }, 500)) : (1 == this.adBox_style_type ? v.default.Event.stat("showvideomodel", {
                                videotype: "3_" + y.globalData.ver,
                                gid: this.id
                            }) : v.default.Event.stat("showvideomodel", {
                                videotype: this.adBox_style_type + "_" + y.globalData.ver + "_" + this.videoWatchNumber,
                                gid: this.id
                            }), s.showmodel = !0)) : (
                            s.analyzeResult(), 1 == s.hasbannerad && (s.showmodel = !0, setTimeout(function() {
                                s.modelProgress();
                            }, 1e3)))) : (this.authorButton = !1, this.margin = !1, y.globalData.user = {
                                nickName: appConfig.name,
                                avatarUrl: r.ssl_static_host + "quce/1562666285IKXQK.png"
                            }, this.resimg.avatar = r.ssl_static_host + "quce/1562666285IKXQK.png", this.scrollToView = this.scrollId,
                            this.scrollTop = 1e3 * this.count, s.authorButton = !1, s.margin = !1, s.showAds && s.videoAd ? 0 == this.showVideoModel ? setTimeout(function() {
                                a.makeResult();
                            }, 500) : (1 == this.adBox_style_type ? v.default.Event.stat("showvideomodel", {
                                videotype: "3_" + y.globalData.ver,
                                gid: this.id
                            }) : v.default.Event.stat("showvideomodel", {
                                videotype: this.adBox_style_type + "_" + y.globalData.ver,
                                gid: this.id
                            }), s.showmodel = !0) : (s.analyzeResult(), 1 == s.hasbannerad && (s.showmodel = !0,
                            setTimeout(function() {
                                s.modelProgress();
                            }, 1e3))));
                        },
                        gohome: function() {
                            v.default.Event.stat("cancal_video", {
                                gid: this.id,
                                cancaltype: "3_" + y.globalData.ver + "_" + this.videoWatchNumber,
                                adstyletype: this.adBox_style_type
                            }), t.navigateBack({
                                delta: 1
                            });
                        },
                        modelProgress: function() {
                            var e = this;
                            this.addresultimg = !1;
                            var a = setInterval(function() {
                                e.progresspercent < 100 ? e.progresspercent++ : (clearInterval(a), setTimeout(function() {
                                    e.progressend = !0, e.imgfinished && (e.showAds && e.onload && (e.bannerNumber = parseInt(e.bannerNumber) + 1,
                                    t.setStorageSync("bannerNumber", e.bannerNumber)), e.addResultPicture(), e.showmodel = !1);
                                }, 1e3));
                            }, this.transitiontime);
                        },
                        showChoose: function() {
                            var e = this;
                            this.scrollToView = this.scrollId, this.scrollTop = 1e3 * this.count, this.makeButton = !1,
                            this.margin = !1, setTimeout(function() {
                                e.showmodel = !0;
                            }, 100);
                        },
                        cancalModel: function() {
                            this.showmodel = !1, this.videoButton = !0, this.margin = !1;
                        },
                        watchBanner: function() {
                            this.videoButton = !1, this.showmodel = !1, this.makeResult();
                        },
                        makeResult: function() {
                            var e = this;
                            var a = this;
                            this.showAds && this.videoAd && !this.videoErr ? (a.makeRes = 1, this.videoWatchNumber += 1,
                            1 == this.adBox_style_type ? v.default.Event.stat("show_video", {
                                showtype: "3_" + y.globalData.ver,
                                gid: this.id
                            }) : (v.default.Event.stat("show_video", {
                                showtype: this.adBox_style_type + "_" + y.globalData.ver + "_" + this.videoWatchNumber,
                                gid: this.id
                            })), this.videoAd.load().then(function() {
                                e.videoAd.show().catch(function() {
                                    a.analyzeResult();
                                }), e.videoAd.show(), e.videoAd.onClose(function(e) {
                                    if (a.makeRes && !a.videoErr) {
                                        a.videoEnded = e.isEnded;
                                        var s = e.isEnded ? 1 : 0;
                                        s && (a.bannerNumber = parseInt(a.bannerNumber) + 1, t.setStorageSync("bannerNumber", a.bannerNumber),
                                        a.videoplayednumber = parseInt(a.videoplayednumber) + 1, t.setStorageSync("videoplayednumber", a.videoplayednumber),
                                        t.setStorageSync("ad_video", Math.round(new Date().getTime() / 1e3))), setTimeout(function() {
                                            t.request({
                                                url: y.globalData.host + "/index.php/App/Index/incQQAdsProgress",
                                                data: {
                                                    progress: s,
                                                    gid: a.id,
                                                    appid: y.globalData.appid,
                                                    sgid: y.globalData.from_gid,
                                                    ver: y.globalData.ver,
                                                    round: this.round,
                                                    uid: (0, l.setUid)(),
                                                    videonumber: a.videoWatchNumber,
                                                    force: a.video_banner_ad ? 2 : 1
                                                },
                                                method: "POST",
                                                header: {
                                                    "content-type": "application/x-www-form-urlencoded"
                                                },
                                                success: function() {},
                                                fail: function(e) {
                                                }
                                            });
                                        }, 500), e.isEnded ? setTimeout(function() {
                                            v.default.Event.stat("video_played", {
                                                playedtype: a.adBox_style_type + "_" + y.globalData.ver + "_" + a.videoWatchNumber,
                                                gid: a.id
                                            }), a.analyzeResult();
                                        }, 500) : "1109659848" == y.globalData.appid || "1109743918" == y.globalData.appid || "wx" == y.globalData.apptype ? (setTimeout(function() {
                                            v.default.Event.stat("cancal_video", {
                                                gid: a.id,
                                                cancaltype: "2_" + y.globalData.ver + "_" + a.videoWatchNumber,
                                                adstyletype: a.adBox_style_type + "_" + y.globalData.ver
                                            });
                                        }, 200), a.forcedAds ? 1 == a.video_banner_ad ? (a.showmodel = !0, a.showbannerad = !1,
                                        setTimeout(function() {
                                            a.analyzeResult(), a.progresswidth = 100, a.modelProgress();
                                        }, 1e3)) : a.videoButton = !0 : setTimeout(function() {
                                            a.analyzeResult();
                                        }, 500)) : "1109802828" == y.globalData.appid && (a.forcedAds ? a.showmodel = !0 : setTimeout(function() {
                                            a.analyzeResult();
                                        }, 500)), a.makeRes = 0;
                                    }
                                }), e.videoAd.onError(function(e) {
                                    t.request({
                                        url: y.globalData.host + "/index.php/App/Index/incQQAdsProgress",
                                        data: {
                                            progress: 2,
                                            gid: a.id,
                                            appid: y.globalData.appid,
                                            ver: y.globalData.ver,
                                            sgid: y.globalData.from_gid,
                                            uid: (0, l.setUid)(),
                                            round: this.round,
                                            errCode: e.errCode,
                                            errMsg: e.errMsg,
                                            videonumber: this.videoWatchNumber,
                                            force: a.video_banner_ad ? 2 : 1
                                        },
                                        method: "POST",
                                        header: {
                                            "content-type": "application/x-www-form-urlencoded"
                                        },
                                        success: function() {},
                                        fail: function(e) {
                                        }
                                    }), a.videoErr = !0, a.makeButton = !1, a.margin = !1, a.analyzeResult();
                                });
                            }).catch(function() {
                                a.makeButton = !1, a.margin = !1, a.analyzeResult();
                            })) : (a.makeButton = !1, a.margin = !1, a.analyzeResult());
                        },
                        analyzeResult: function() {
                            var e = this;
                            n = setTimeout(function() {
                                e.parseResult();
                            }, 400);
                        },
                        parseResult: function() {
                            var e = this, a = [];
                            this.options.map(function(e, t) {
                                0 != e && (e = e.toString(), a.push(e.toUpperCase()));
                            }), a = a.toString(",");
                            var s = this;
                            this.add("AuthorBox", this.setObj({
                                question: "正在为您分析结果......"
                            })), this.scrollToView = this.scrollId, this.scrollTop = 1e3 * this.count;
                            var i = {
                                id: this.question_info.id,
                                acid: y.globalData.acid,
                                userinput: y.globalData.user.nickName,
                                isreplay: this.isreplay,
                                sgid: y.globalData.from_gid,
                                round: this.round,
                                ver: y.globalData.ver,
                                appid: y.globalData.appid,
                                uid: (0, l.setUid)(),
                                src: y.globalData.src,
                                source: y.globalData.source,
                                scene: y.globalData.scene,
                                quizfrom: "wxapp"
                            };
                            0 == this.needAsk ? (i.israndresult = 1, i.option = "A") : i.option = a, t.request({
                                url: y.globalData.baseUrl + "/index.php/Wetest/Entry/getresult",
                                method: "POST",
                                header:{
                                    "content-type": "application/x-www-form-urlencoded",
                                    appCode: y.globalData.appCode,
                                    appToken:y.globalData.appToken,
                                },
                                data: i,
                                success: function(a) {
                                    var i = a.data;
                                    if (e.resultData = a.data, s.resimg.qrcode = r.ssl_static_host + JSON.parse(a.data.attention).qrcode,
                                    s.resimg.result = r.ssl_static_host + JSON.parse(a.data.content).img, e.share_ecodeid = !!i.share_ecodeid && i.share_ecodeid,
                                    s.shareImage = s.resimg.result, s.special_config && s.special_config.result_image) {
                                        var o = JSON.parse(a.data.content).threshold, n = JSON.parse(s.special_config.result_image)[o];
                                        n && (s.resimg.result = r.ssl_static_host + n);
                                    }
                                    i.share_title && (s.shareqzonetitle = i.share_title), i.share_shuoshuo_title && (s.shuoshuo_sharetitle = i.share_shuoshuo_title),
                                    s.isfirstplay && s.special_config ? t.getImageInfo({
                                        src: y.globalData.user.avatarUrl,
                                        success: function(e) {
                                            "gif" == e.type ? s.resimg.avatar = r.ssl_static_host + "quce/1562666285IKXQK.png" : s.resimg.avatar = y.globalData.user.avatarUrl,
                                            s.getImageAll(i, s.drawPicture);
                                        },
                                        fail: function(e) {
                                        }
                                    }) : s.getImageAll(a.data, s.drawPicture);
                                }
                            });
                        },
                        getImageAll: function(e, a) {
                            var s = 0, i = this;
                            for (var o in i.resimg) !function(o) {
                                t.getImageInfo({
                                    src: i.resimg[o],
                                    success: function(t) {
                                        i.resimg[o] = t, 3 == (s += 1) && a(e, i.resimg);
                                    },
                                    fail: function(e) {
                                    }
                                });
                            }(o);
                        },
                        resultLongPress: function(e) {
                            this.showShare(2);
                        },
                        viewPicture: function() {
                            if (this.imageshare) v.default.Event.stat("preview", {
                                gid: this.id,
                                previewtype: 1
                            }), this.preview = !this.preview, this.showshare = !1, this.saveImageSmall = !this.saveImageSmall,
                            this.CaptureImage = this.preview ? 3 : 1; else {
                                v.default.Event.stat("preview", {
                                    gid: this.id,
                                    previewtype: 2
                                });
                                var e = this.resultImage, a = this;
                                t.previewImage({
                                    urls: [ e ],
                                    success: function(e) {
                                        a.CaptureImage = 2, a.previewImage = !0;
                                    }
                                });
                            }
                        },
                        showShare: function(e) {
                            this.saveImageSmall = 2 == e, this.showshare = !0;
                        },
                        cancelShare: function() {
                            this.showshare = !1;
                        },
                        returnHome: function() {
                            t.navigateBack({});
                        },
                        answerAgin: function() {
                            var e = this;
                            this.incsavestatus = !0, this.isreplay = 1, this.isfirstplay = !1, this.shuoshuobutton = !1,
                            this.button = !1, this.resimg = {
                                qrcode: "",
                                result: "",
                                avatar: y.globalData.user.avatarUrl ? y.globalData.user.avatarUrl : r.ssl_static_host + "quce/1562666285IKXQK.png"
                            }, this.current = 0, this.options = this.question.map(function() {
                                return 0;
                            }), 3 == this.question_info.type && (this.options[0] = 1), setTimeout(function() {
                                e.add("AnswerBox", {
                                    text: "再来一次",
                                    avatar: e.answerAvatar
                                }), e.scrollToView = e.scrollId, setTimeout(function() {
                                    e.button = !1, e.margin = !1;
                                    var t = e.question[0], a = e.resetOption(t.answer), s = {
                                        question: t.question,
                                        picture: !!t.img && r.static_host + t.img,
                                        options: a.options,
                                        picarr: a.picarr,
                                        nextQuestion: e.nextQuestion
                                    };
                                    e.add("QuestionNum", {
                                        num: e.current + 1,
                                        len: e.question.length
                                    }), e.add("AuthorBox", e.setObj(s)), 3 != e.question_info.type && (e.current += 1),
                                    setTimeout(function() {
                                        e.scrollToView = e.scrollId, e.scrollTop = 1e3 * e.count;
                                    }, 400);
                                }, 100);
                            }, 100);
                        },
                        verifyUserInfo: function(e) {
                            t.request({
                                url: y.globalData.host + "/index.php/App/Index/checkAppAvatar",
                                data: {
                                    appid: y.globalData.appid,
                                    avatarUrl: y.globalData.user.avatarUrl,
                                    nickName: y.globalData.user.nickName
                                },
                                success: function(a) {
                                    0 == a.data.avatar_status && (y.globalData.user.avatarUrl = a.data.url),
                                    0 == a.data.name_status && (y.globalData.user.nickName = a.data.name), y.globalData.user.verify = 1,
                                    t.setStorageSync("user", y.globalData.user), e();
                                },
                                fail: function(t) {
                                    e();
                                }
                            });
                        },
                        drawPicture: function(e, a) {
                            function s(e) {
                                setTimeout(function() {
                                    o.draw(!0, function() {
                                        setTimeout(function() {
                                            t.canvasToTempFilePath({
                                                x: 0,
                                                y: 0,
                                                width: e.canvasHW.width,
                                                height: e.canvasHW.height,
                                                destWidth: e.canvasHW.width,
                                                destHeight: e.canvasHW.height,
                                                quality: .5,
                                                canvasId: "canvas",
                                                success: function(a) {
                                                    e.resultImage = a.tempFilePath, setTimeout(function() {
                                                        e.imgfinished = !0, e.addresultimg ? e.addResultPicture() : e.progressend && (e.showmodel = !1,
                                                        e.addResultPicture(), e.showAds && e.onload && (e.bannerNumber = parseInt(e.bannerNumber) + 1,
                                                        t.setStorageSync("bannerNumber", e.bannerNumber)));
                                                    }, 100);
                                                }
                                            }), t.canvasToTempFilePath({
                                                x: 0,
                                                y: 0,
                                                width: e.canvasHW.width,
                                                height: 512,
                                                destWidth: e.canvasHW.width,
                                                destHeight: 512,
                                                quality: .5,
                                                canvasId: "canvas",
                                                success: function(t) {
                                                    e.shareAppImage = t.tempFilePath;
                                                }
                                            });
                                        }, 500);
                                    });
                                }, 500);
                            }
                            var i = this;
                            this.canvasHW = {
                                width: a.result.width,
                                height: a.result.height
                            };
                            var o = t.createCanvasContext("canvas"), n = this.special_config, r = JSON.parse(e.content).threshold;
                            if (n && n.headimg_config) {
                                var l = JSON.parse(n.headimg_config);
                                r && l[r] && (l = l[r]), o.drawImage(a.avatar.path, 0, 0, a.avatar.width, a.avatar.height, l.x, l.y, l.width, l.height);
                            }
                            // 下载图片
                            let tempFile = "/static/qrcode.png";
                            const root = this;
                            wx.downloadFile({
                                url:appConfig.logo,
                                complete(res) {
                                    if(res.statusCode==200){
                                        tempFile = res.tempFilePath;
                                    }
                                    if (o.drawImage(a.result.path, 0, 0), o.drawImage(tempFile, "1", "1", "120px", "120px", 0, a.result.height - a.qrcode.height * a.result.width / a.qrcode.width, a.result.width, a.qrcode.height * a.result.width / a.qrcode.width),
                                    n && n.draw_config && root.question_info.special_result) {
                                        var u = JSON.parse(n.image_config), d = JSON.parse(n.draw_config);
                                        o.setFillStyle("rgb(".concat(u.c_r, ", ").concat(u.c_g, ", ").concat(u.c_b, ")")),
                                            o.setFontSize(parseInt(u.font)), o.setTextAlign(d.align), o.setTextBaseline("top"),
                                            0 == y.globalData.user.verify && root.hasUserinfo ? root.verifyUserInfo(function() {
                                                "center" == d.align ? o.fillText(y.globalData.user.nickName, d.x ? d.x : 320, d.y) : ("right" == d.align || "left" == d.align) && o.fillText(y.globalData.user.nickName, d.x, d.y),
                                                    s(i);
                                            }) : ("center" == d.align ? o.fillText(y.globalData.user.nickName, d.x ? d.x : 320, d.y) : ("right" == d.align || "left" == d.align) && o.fillText(y.globalData.user.nickName, d.x, d.y),
                                                s(root));
                                    } else s(root);
                                }
                            });
                        },
                        addResultPicture: function() {
                            var e = this;
                            this.add("AuthorBox", this.setObj({
                                resultImage: this.resultImage,
                                viewPicture: this.viewPicture,
                                savePicture: this.savePicture
                            })), this.scrollToView = this.scrollId, this.ceshiprogress = !0, !this.cancelinc && this.onload && (this.postResult(),
                            v.default.Event.stat("finishtest", {
                                gid: this.id
                            })), this.isfirstplay && this.onload && (this.playNumber = parseInt(this.playNumber) + 1,
                            t.setStorageSync("playNumber", this.playNumber)), setTimeout(function() {
                                e.scrollTop = 1e3 * e.count, e.add("AuthorBox", e.setObj({
                                    question: "长按上方图片保存您的结果卡片"
                                })), e.margin = !0, setTimeout(function() {
                                    e.margin = !0, e.shuoshuo ? e.shuoshuobutton = !0 : e.button = !0, e.scrollToView = e.scrollId,
                                    e.scrollTop = 1e3 * e.count;
                                }, 400);
                            }, 400);
                        },
                        postResult: function() {
                            var e = this.videoEnded ? this.bannerNumber : 0;
                            var a = this;
                            if (a.resultTjFlag) {
                                var s;
                                a.resultTjFlag = !1;
                                var i = JSON.parse(a.resultData.content), n = JSON.parse(a.resultData.attention), r = y.globalData.host + "/index.php/Wetest/Entry/incGetresult";
                                a.result = i.threshold, t.request({
                                    url: r,
                                    data: (s = {
                                        src: y.globalData.src,
                                        id: a.question_info.id,
                                        acid: y.globalData.acid,
                                        result: i.threshold,
                                        account: n.account,
                                        idx: i.new_idx,
                                        round: this.round,
                                        appid: y.globalData.appid,
                                        sgid: y.globalData.from_gid,
                                        ver: y.globalData.ver
                                    }, o(s, "src", y.globalData.src), o(s, "scene", y.globalData.scene), o(s, "source", y.globalData.source),
                                    o(s, "uid", (0, l.setUid)()), o(s, "videoad", e), o(s, "hour", this.hour), s),
                                    method: "POST",
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    success: function() {
                                        a.resultTjFlag = !1;
                                    },
                                    fail: function() {
                                        a.resultTjFlag = !0;
                                    }
                                });
                            }
                        },
                        incImageSave: function(e, a) {
                            t.request({
                                url: y.globalData.host + "/index.php/App/Index/commonLongtap",
                                method: "POST",
                                data: {
                                    result: this.result,
                                    gid: this.question_info.id,
                                    type: e,
                                    src: y.globalData.src,
                                    source: y.globalData.source,
                                    round: this.round,
                                    sgid: y.globalData.from_gid,
                                    uid: (0, l.setUid)(),
                                    scene: y.globalData.scene,
                                    appid: y.globalData.appid,
                                    ver: y.globalData.ver,
                                    dst: a
                                },
                                header: {
                                    "content-type": "application/x-www-form-urlencoded"
                                },
                                success: function(e) {}
                            });
                        },
                        savePicture: function(e) {
                            var a = this.resultImage, s = this;
                            wx.getSetting({
                                success: function(e) {
                                    e.authSetting["scope.writePhotosAlbum"] ? t.saveImageToPhotosAlbum({
                                        filePath: a,
                                        success: function() {
                                            t.showToast({
                                                title: "图片保存成功"
                                            }), s.showdingyue && 4 == s.subscribe_status && s.addDingYue(s.subscribe_status),
                                            s.saveImageSmall ? (v.default.Event.stat("saveresultimage", {
                                                gid: s.id,
                                                savetype: 1
                                            }), s.inlongSmall && (s.incImageSave(1, 2), s.inlongSmall = !1)) : (v.default.Event.stat("saveresultimage", {
                                                gid: s.id,
                                                savetype: 2
                                            }), s.inlongBig && (s.incImageSave(1, 3), s.inlongBig = !1));
                                        }
                                    }) : t.saveImageToPhotosAlbum({
                                        filePath: a,
                                        success: function() {
                                            t.showToast({
                                                title: "图片保存成功"
                                            }), s.showdingyue && 4 == s.subscribe_status && s.addDingYue(s.subscribe_status),
                                            s.saveImageSmall ? (v.default.Event.stat("saveresultimage", {
                                                gid: s.id,
                                                savetype: 1
                                            }), s.inlongSmall && (s.incImageSave(1, 2), s.inlongSmall = !1)) : (v.default.Event.stat("saveresultimage", {
                                                gid: s.id,
                                                savetype: 2
                                            }), s.inlongBig && (s.incImageSave(1, 3), s.inlongBig = !1));
                                        },
                                        fail: function(e) {
                                            t.showModal({
                                                title: "保存失败",
                                                content: "保存图片到相册功能需要开启相册授权！",
                                                showCancel: !1,
                                                cancelText: "取消",
                                                confirmText: "确定",
                                                success: function(e) {
                                                    wx.openSetting({});
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        },
                        showSubscribe: function(e) {
                            this.showdingyue && "303" != y.globalData.source ? (this.dingyuemodel = !0, v.default.Event.stat("showSubscribebox", {
                                showtype: this.subscribe_status + "_1"
                            })) : e();
                        },
                        cancalsub: function() {
                            var e = this;
                            switch (this.dingyuemodel = !1, v.default.Event.stat("showSubscribebox", {
                                showtype: this.subscribe_status + "_3"
                            }), this.subscribe_status) {
                              case 1:
                                this.starGame();
                                break;

                              case 2:
                                this.scrollToView = this.scrollId, this.scrollTop = 1e3 * this.count, this.analyzeResult(),
                                1 == this.hasbannerad && (this.showmodel = !0, setTimeout(function() {
                                    e.modelProgress();
                                }, 1e3));
                            }
                        },
                        addDingYue: function() {
                            var e = this;
                            this.dingyuemodel = !1, v.default.Event.stat("showSubscribebox", {
                                showtype: this.subscribe_status + "_2"
                            }), qq.subscribeAppMsg({
                                subscribe: !0,
                                success: function(a) {
                                    switch (_.addSubscribe(y, function() {
                                        t.setStorageSync("subscribe", 1), v.default.Event.stat("addSubscribe", {
                                            subscribetype: y.globalData.ver + "_" + e.subscribe_status + "_1"
                                        });
                                    }), e.subscribe_status) {
                                      case 1:
                                        e.starGame();
                                        break;

                                      case 2:
                                        e.scrollToView = e.scrollId, e.scrollTop = 1e3 * e.count, e.analyzeResult();
                                    }
                                },
                                fail: function(a) {
                                    switch ("subscribeAppMsg:fail no permission" == a.errMsg && t.setStorageSync("subscribe", 2),
                                    v.default.Event.stat("addSubscribe", {
                                        subscribetype: y.globalData.ver + "_" + e.subscribe_status + "_2"
                                    }), e.subscribe_status) {
                                      case 1:
                                        e.starGame();
                                        break;

                                      case 2:
                                        e.scrollToView = e.scrollId, e.scrollTop = 1e3 * e.count, e.analyzeResult(), 1 == e.hasbannerad && (e.showmodel = !0,
                                        setTimeout(function() {
                                            e.modelProgress();
                                        }, 1e3));
                                    }
                                }
                            });
                        }
                    }
                };
                a.default = w;
            }).call(this, s("543d").default);
        },
        "0a64": function(e, t, a) {},
        2720: function(e, t, a) {
            var s = function() {
                this.$createElement, this._self._c;
            }, i = [];
            a.d(t, "a", function() {
                return s;
            }), a.d(t, "b", function() {
                return i;
            });
        },
        "548d": function(e, t, a) {
            var s = a("0a64");
            a.n(s).a;
        },
        "7d65": function(e, t, a) {
            a.r(t);
            var s = a("2720"), i = a("958b");
            for (var o in i) "default" !== o && function(e) {
                a.d(t, e, function() {
                    return i[e];
                });
            }(o);
            a("548d");
            var n = a("2877"), r = Object(n.a)(i.default, s.a, s.b, !1, null, "124ba3ab", null);
            t.default = r.exports;
        },
        "958b": function(e, t, a) {
            a.r(t);
            var s = a("04c4"), i = a.n(s);
            for (var o in s) "default" !== o && function(e) {
                a.d(t, e, function() {
                    return s[e];
                });
            }(o);
            t.default = i.a;
        },
        aa9e: function(e, t, a) {
            (function(e) {
                function t(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                }
                a("8b22"), a("921b"), t(a("66fd")), e(t(a("7d65")).default);
            }).call(this, a("543d").createPage);
        }
    }, [ [ "aa9e", "common/runtime", "common/vendor" ] ] ]);
}();
