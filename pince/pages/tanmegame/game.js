var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = null;

var n;

n = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : e(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
}, (global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/tanmegame/game" ], {
    "2d2f": function(e, t, n) {
        n.r(t);
        var o = n("d836"), s = n.n(o);
        for (var i in o) "default" !== i && function(e) {
            n.d(t, e, function() {
                return o[e];
            });
        }(i);
        t.default = s.a;
    },
    "70be": function(e, t, n) {
        (function(e) {
            function t(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            n("8b22"), n("921b"), t(n("66fd")), e(t(n("7738")).default);
        }).call(this, n("543d").createPage);
    },
    "75ad": function(e, t, n) {
        var o = function() {
            this.$createElement, this._self._c;
        }, s = [];
        n.d(t, "a", function() {
            return o;
        }), n.d(t, "b", function() {
            return s;
        });
    },
    7738: function(e, t, n) {
        n.r(t);
        var o = n("75ad"), s = n("2d2f");
        for (var i in s) "default" !== i && function(e) {
            n.d(t, e, function() {
                return s[e];
            });
        }(i);
        n("a653");
        var a = n("2877"), r = Object(a.a)(s.default, o.a, o.b, !1, null, "205cbec8", null);
        t.default = r.exports;
    },
    "82b9": function(e, t, n) {},
    a653: function(e, t, n) {
        var o = n("82b9");
        n.n(o).a;
    },
    d836: function(e, t, o) {
        (function(e) {
            function s(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            function i(e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n, e;
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = s(o("f47e")), r = s(o("6f91")), l = new (s(o("94f5")).default)(), c = getApp(), u = {
                onShareAppMessage: function() {
                    return this.footbox = !1, {
                        title: this.sharetitle,
                        path: "/pages/home/index?ispush=1&jump_type=3&id=" + this.gamegid
                    };
                },
                components: {
                    msg: function() {
                        return o.e("pages/tanmegame/message").then(o.bind(null, "a136"));
                    },
                    umsg: function() {
                        return o.e("components/tanme/usermsg").then(o.bind(null, "5c65"));
                    },
                    msgimg: function() {
                        return o.e("components/tanme/msgimg").then(o.bind(null, "cc9a"));
                    },
                    userimgBox: function() {
                        return o.e("components/tanme/userimg").then(o.bind(null, "1df7"));
                    },
                    resimg: function() {
                        return o.e("components/tanme/resultimg").then(o.bind(null, "d609"));
                    },
                    ImageCropper: function() {
                        return o.e("components/invinbg-image-cropper/invinbg-image-cropper").then(o.bind(null, "c0e6"));
                    }
                },
                data: function() {
                    var e;
                    return i(e = {
                        wechatdesc: "",
                        wechatresult: "",
                        topimg: r.default,
                        defaulticon: "https://ssl-tanme.cdn.itwlw.com/common/img/tanme.jpg",
                        username: "",
                        scrollNumber: 0,
                        scrollId: "id0",
                        usersex: "",
                        ischeck: 0,
                        isinput: "",
                        userimg: "https://ssl-tanme.cdn.itwlw.com/common/img/tanme.jpg",
                        tempFilePaths: "",
                        resimgurl: "",
                        sharetitle: "",
                        sendbtn: !0,
                        filebtn: !1,
                        sexbtn: !1,
                        contentmsg: [],
                        gameconfig: "",
                        qzonetitle: "",
                        footbox: !1,
                        commimg: "",
                        gameheight: "",
                        gamegid: "",
                        imgfinished: !1,
                        showmodel: !1,
                        hasbannerad: 0,
                        transitiontime: 60,
                        showAds: !1,
                        forcedAds: !1,
                        asbannerad: ""
                    }, "transitiontime", ""), i(e, "banneradutilid", ""), i(e, "banneradcontent", ""),
                    i(e, "video_banner_ad", ""), i(e, "adBox_cancel_btn", ""), i(e, "adBox_video_btn", ""),
                    i(e, "banner_ad_style", ""), i(e, "adBox_style_type", ""), i(e, "modelContent", ""),
                    i(e, "progresspercent", 0), i(e, "bannerNumber", 0), i(e, "playNumber", 0), i(e, "videoplayednumber", ""),
                    i(e, "adtime", ""), i(e, "forcebutton", !1), i(e, "videoAd", ""), i(e, "showbannerad", !1),
                    i(e, "makeRes", 0), i(e, "userinfo", {}), i(e, "host", "https://ssl-tanme.itwlw.com"),
                    i(e, "imgurl", "https://ssl-uploads-admin.cdn.itwlw.com"), i(e, "uploadimg", ""),
                    e;
                },
                onLoad: function(t) {
                    a.default.Page.init(), e.showLoading({
                        title: "正在加载"
                    });
                    var n = this, o = {
                        gid: t.id
                    };
                    a.default.Event.stat("startgame", {
                        gid: o.gid
                    }), n.gamegid = o.gid, console.log(o.gid, "用户gid"), this.userinfo = e.getStorageSync("userinfo") ? e.getStorageSync("userinfo") : {
                        nickName: "",
                        avatarUrl: ""
                    }, this.userinfo.avatarUrl ? (n.isinput = this.userinfo.nickName, n.userimg = this.userinfo.avatarUrl,
                    n.tempFilePaths = n.userimg, e.getImageInfo({
                        src: this.userinfo.avatarUrl,
                        success: function(e) {
                            console.log(e.type), "gif" == e.type ? n.tempFilePaths = n.defaulticon : n.tempFilePaths = n.userimg;
                        }
                    })) : (n.userimg = n.defaulticon, n.tempFilePaths = n.userimg);
                    var s = e.getStorageSync("playNumbertanme"), i = e.getStorageSync("bannerNumbertanme"), r = e.getStorageSync("videoplayednumbertanme");
                    n.playNumber = s || 0, n.bannerNumber = i || 0, n.videoplayednumber = r || 0, n.adtime = e.getStorageSync("ad_videotanme") ? n.adtime : 0,
                    console.log(n.playNumber, n.bannerNumber, n.videoplayednumber, n.adtime, "广告测试"),
                    this.getGameData();
                },
                computed: {
                    modelList: function() {
                        if (this.modelContent) return this.modelContent.split("##");
                        console.log(this.modelContent, "////////+////");
                    },
                    adcontent: function() {
                        if (this.banneradcontent) {
                            if (1 == this.banner_ad_style) return this.banneradcontent.split("##").join("，");
                            if (2 == this.banner_ad_style) return this.banneradcontent.split("##");
                        }
                    }
                },
                watch: {
                    imgfinished: function() {
                        console.log("==================");
                    }
                },
                methods: {
                    getGameData: function() {
                        var t = this;
                        e.request({
                            url: this.host + "/index.php/Wxapp/Index/getGameInfo",
                            data: {
                                gid: this.gamegid,
                                appid: c.globalData.appid,
                                version: c.globalData.ver,
                                adtime: this.adtime ? this.adtime : 0,
                                adplayed: this.bannerNumber,
                                quizplayed: this.playNumber,
                                videoplayed: this.videoplayednumber
                            },
                            success: function(n) {
                                console.log(n.data, "*****"), t.sharetitle = n.data.sharetitle, t.wechatdesc = n.data.wechatdesc,
                                t.wechatresult = n.data.wechatresult, t.gameconfig = JSON.parse(n.data.gameConfig),
                                t.qzonetitle = n.data.title, console.log(t.gameconfig, "---");
                                var o = n.data;
                                t.showAds = 1 == o.showAds, t.forcedAds = 1 == o.forcedAds, t.hasbannerad = o.banner_ad,
                                t.transitiontime = 10 * parseInt(o.banner_ad_time), t.banneradutilid = o.banner_ad_utilid,
                                t.banneradcontent = o.banner_ad_content, t.video_banner_ad = o.video_banner_ad,
                                t.adBox_cancel_btn = o.adBox_cancel_btn, t.adBox_video_btn = o.adBox_video_btn,
                                t.banner_ad_style = o.banner_ad_style, t.adBox_style_type = o.adBox_style_type ? o.adBox_style_type : 1,
                                t.modelContent = o.adBox_desc, console.log(o.adBox_desc, "desc"), o.video_ad_utilid && o.video_ad_utilid,
                                console.log(o.video_ad_select), t.forcebutton = 1 != o.video_ad_select;
                                try {
                                    t.videoAd = qq.createRewardedVideoAd({
                                        adUnitId: "adunit-de18ac500113c55b"
                                    });
                                } catch (e) {}
                                console.log(t.videoAd, "*****"), null == t.userinfo.nickName ? t.isinput = "" : t.isinput = t.userinfo.nickName,
                                e.setNavigationBarTitle({
                                    title: n.data.title
                                }), t.getqrcodeUrl(), t.unamestyle(), e.hideLoading(), t.sendbtn = !1;
                            },
                            fail: function(e) {
                                console.log(e, "-------------------");
                            }
                        });
                    },
                    getqrcodeUrl: function() {
                        var t = this;
                        e.request({
                            url: this.host + "/index.php/Wxapp/Index/getGameQrcode",
                            data: {
                                gid: this.gamegid,
                                appid: c.globalData.appid,
                                version: c.globalData.ver
                            },
                            success: function(e) {
                                console.log(e.data.qrcode), t.gameconfig.drawconfig.qrcode.path = t.imgurl + "/" + e.data.qrcode;
                            },
                            fail: function(e) {
                            }
                        });
                    },
                    adresult: function() {
                        var t = this;
                        this.drawcanvas(), this.showAds && this.videoAd ? (console.log("----------视频广告------------"),
                        setTimeout(function() {
                            a.default.Event.stat("show_video", {
                                videotype: t.adBox_style_type
                            }), console.log("show_video", {
                                videotype: t.adBox_style_type
                            }, "98798798"), t.showmodel = !0, t.showbannerad = !0;
                        }, 1e3)) : 1 == this.hasbannerad ? (console.log("----------banner广告------------"),
                        this.showmodel = !0, setTimeout(function() {
                            t.modelProgress();
                        }, 1e3)) : (console.log("----------------无广告-----------------"), setTimeout(function() {
                            e.showLoading({
                                title: "请稍后"
                            }), setTimeout(function() {
                                var n = setInterval(function() {
                                    t.imgfinished && (t.imgresult(), e.hideLoading(), clearInterval(n));
                                }, 10);
                            }, 1e3);
                        }, 600));
                    },
                    modelProgress: function() {
                        var t = this, n = setInterval(function() {
                            t.progresspercent < 100 ? t.progresspercent++ : (clearInterval(n), t.showmodel = !1,
                            setTimeout(function() {
                                var n = setInterval(function() {
                                    t.imgfinished && (t.imgresult(), clearInterval(n));
                                }, 10);
                                t.showAds && (t.bannerNumber = parseInt(t.bannerNumber) + 1, e.setStorageSync("bannerNumbertanme", t.bannerNumber),
                                console.log(t.bannerNumber, "**************************"));
                            }, 600));
                        }, this.transitiontime);
                    },
                    watchBanner: function() {
                        var t = this;
                        this.showmodel = !1, l.useQQAd(this.videoAd).then(function(n) {
                            n ? (e.setStorageSync("ad_videotanme", Math.round(new Date().getTime() / 1e3)),
                            t.bannerNumber = parseInt(t.bannerNumber) + 1, e.setStorageSync("bannerNumbertanme", t.bannerNumber),
                            t.videoplayednumber = parseInt(t.videoplayednumber) + 1, e.setStorageSync("videoplayednumbertanme", t.videoplayednumber),
                            a.default.Event.stat("success_video", {
                                showtype: t.adBox_style_type
                            }), setTimeout(function() {
                                var e = setInterval(function() {
                                    t.imgfinished && (t.imgresult(), clearInterval(e));
                                }, 10);
                            }, 1e3)) : (t.forcedAds ? 1 == t.video_banner_ad && (t.showmodel = !0, t.showbannerad = !1,
                            setTimeout(function() {
                                t.modelProgress();
                            }, 1e3)) : setTimeout(function() {
                                var e = setInterval(function() {
                                    t.imgfinished && (t.imgresult(), clearInterval(e));
                                }, 10);
                            }, 500), a.default.Event.stat("fail_video", {
                                cancaltype: 1,
                                adstyletype: t.adBox_style_type
                            }));
                        }).catch(function() {
                            e.setStorageSync("ad_videotanme", Math.round(new Date().getTime() / 1e3)), t.bannerNumber = parseInt(t.bannerNumber) + 1,
                            e.setStorageSync("bannerNumbertanme", t.bannerNumber), t.videoplayednumber = parseInt(t.videoplayednumber) + 1,
                            e.setStorageSync("videoplayednumbertanme", t.videoplayednumber), a.default.Event.stat("success_video", {
                                showtype: t.adBox_style_type
                            }), setTimeout(function() {
                                var e = setInterval(function() {
                                    t.imgfinished && (t.imgresult(), clearInterval(e));
                                }, 10);
                            }, 1e3);
                        });
                    },
                    gohome: function() {
                        a.default.Event.stat("fail_video", {
                            cancaltype: 2,
                            adstyletype: this.adBox_style_type
                        }), e.navigateBack({
                            delta: 1
                        });
                    },
                    cancalModel: function() {
                        this.showmodel = !1, this.videoButton = !0, this.margin = !1;
                    },
                    unamestyle: function() {
                        1 == this.gameconfig.gameconfig.nickname.status && (this.contentmsg.push({
                            msg: this.wechatdesc,
                            temp: "msg"
                        }), this.contentmsg.push({
                            msg: "请输入姓名",
                            temp: "msg"
                        }), this.scrollNumber++, this.scrollId = "id" + this.scrollNumber);
                    },
                    getuserinfo: function(t) {
                        var n = this, o = this, s = t.currentTarget.dataset;
                        t.detail.userInfo ? (c.globalData.user = {
                            nickName: t.detail.userInfo.nickName,
                            avatarUrl: t.detail.userInfo.avatarUrl,
                            verify: 0
                        }, e.setStorageSync("user", c.globalData.user), e.setStorageSync("userinfo", {
                            nickName: t.detail.userInfo.nickName,
                            avatarUrl: t.detail.userInfo.avatarUrl
                        }), this.userinfo = {
                            nickName: t.detail.userInfo.nickName,
                            avatarUrl: t.detail.userInfo.avatarUrl
                        }, e.getImageInfo({
                            src: this.userinfo.avatarUrl,
                            success: function(e) {
                                console.log(e.type), "gif" == e.type ? (o.tempFilePaths = o.defaulticon, o.sendnametext()) : (o.tempFilePaths = n.userinfo.avatarUrl,
                                o.userimg = n.userinfo.avatarUrl, o.sendnametext());
                            }
                        })) : o.sendnametext();
                    },
                    sendnametext: function() {
                        var e = this;
                        if ("" == this.isinput) return this.contentmsg.push({
                            msg: "你还没有输入姓名~",
                            temp: "msg"
                        }), this.scrollNumber++, void (this.scrollId = "id" + this.scrollNumber);
                        this.sendbtn = !0, this.username = this.isinput, this.isinput = "", this.contentmsg.push({
                            umsg: this.username,
                            temp: "umsg",
                            usericon: this.userimg
                        }), this.scrollNumber++, this.scrollId = "id" + this.scrollNumber, 1 == this.gameconfig.gameconfig.headimg.status ? setTimeout(function() {
                            e.contentmsg.push({
                                msg: "确认使用头像",
                                temp: "msg"
                            }), e.contentmsg.push({
                                msgimg: e.userimg,
                                temp: "msgimg"
                            }), e.scrollNumber++, e.scrollId = "id" + e.scrollNumber, e.ischeck = 1;
                        }, 1e3) : 1 == this.gameconfig.gameconfig.gender.status ? setTimeout(function() {
                            e.contentmsg.push({
                                msg: "请选择你的性别",
                                temp: "msg"
                            }), e.scrollNumber++, e.scrollId = "id" + e.scrollNumber, e.ischeck = 2;
                        }, 1e3) : setTimeout(function() {
                            e.contentmsg.push({
                                msg: "正在为你分析结果，请稍后...",
                                temp: "msg"
                            }), e.scrollNumber++, e.scrollId = "id" + e.scrollNumber, e.adresult();
                        }, 1e3);
                    },
                    searchsex_m: function() {
                        var e = this;
                        this.sexbtn = !0, this.usersex = "男", this.contentmsg.push({
                            umsg: "男",
                            temp: "umsg",
                            usericon: this.userimg
                        }), this.scrollNumber++, this.scrollId = "id" + this.scrollNumber, setTimeout(function() {
                            e.contentmsg.push({
                                msg: "正在为你分析结果，请稍后...",
                                temp: "msg"
                            }), e.scrollNumber++, e.scrollId = "id" + e.scrollNumber, e.adresult();
                        }, 1e3);
                    },
                    searchsex_w: function() {
                        var e = this;
                        this.sexbtn = !0, this.usersex = "女", this.contentmsg.push({
                            umsg: "女",
                            temp: "umsg",
                            usericon: this.userimg
                        }), this.scrollNumber++, this.scrollId = "id" + this.scrollNumber, setTimeout(function() {
                            e.contentmsg.push({
                                msg: "正在为你分析结果，请稍后...",
                                temp: "msg"
                            }), e.scrollNumber++, e.scrollId = "id" + e.scrollNumber, e.adresult();
                        }, 1e3);
                    },
                    queren: function() {
                        var e = this;
                        this.filebtn = !0, this.contentmsg.push({
                            umsg: "确认使用",
                            temp: "umsg",
                            usericon: this.userimg
                        }), this.scrollNumber++, this.scrollId = "id" + this.scrollNumber, 1 == this.gameconfig.gameconfig.gender.status ? setTimeout(function() {
                            e.contentmsg.push({
                                msg: "请选择你的性别",
                                temp: "msg"
                            }), e.scrollNumber++, e.scrollId = "id" + e.scrollNumber, e.ischeck = 2;
                        }, 1e3) : (this.filebtn = !0, setTimeout(function() {
                            e.contentmsg.push({
                                msg: "正在为你分析结果，请稍后...",
                                temp: "msg"
                            }), e.scrollNumber++, e.scrollId = "id" + e.scrollNumber, e.adresult();
                        }, 1e3));
                    },
                    fileImg: function() {
                        var t = this;
                        t.filebtn = !0, e.chooseImage({
                            count: 1,
                            sizeType: [ "original", "compressed" ],
                            sourceType: [ "album", "camera" ],
                            success: function(e) {
                                t.uploadimg = e.tempFilePaths[0];
                            },
                            fail: function(n) {
                                e.showToast({
                                    title: "上传失败，请重试"
                                }), t.filebtn = !1;
                            }
                        });
                    },
                    confirm: function(t) {
                        var n = this;
                        this.uploadimg = "", n.filebtn = !1, n.contentmsg.push({
                            msg: "正在上传中...",
                            temp: "msg"
                        }), n.scrollNumber++, n.scrollId = "id" + n.scrollNumber, e.showLoading({
                            title: "请稍后"
                        }), n.tempFilePaths = t.detail.tempFilePath, setTimeout(function() {
                            n.contentmsg.push({
                                uimg: n.tempFilePaths,
                                usericon: n.userimg,
                                temp: "uimg"
                            }), n.scrollNumber++, n.scrollId = "id" + n.scrollNumber, n.contentmsg.push({
                                msg: "确认使用头像",
                                temp: "msg"
                            }), n.scrollNumber++, n.scrollId = "id" + n.scrollNumber, e.hideLoading();
                        }, 1e3);
                    },
                    drawcanvas: function(e) {
                        var t = this, n = t.getIndex(t.username, !0) - 1;
                        console.log(n, "");
                        var o = t.gameconfig.drawconfig.head_image, s = (t.gameconfig.drawconfig.nickname,
                        t.gameconfig.drawconfig.qrcode), i = this.imgurl + "/" + t.commimg[n].path;
                        console.log(i);
                        var r = {};
                        r.bg = i, 1 == o.status && (r.header = t.tempFilePaths, console.log(t.tempFilePaths, "头像")),
                        1 == s.status && "" != s.path && (r.qrcode = s.path, console.log(s.path)), t.getImageAll(r, t.drawcanvas2),
                        a.default.Event.stat("endgame", {
                            gid: t.gamegid
                        });
                    },
                    drawcanvas2: function(t) {
                        console.log(t);
                        var o = this, s = o.gameconfig.drawconfig.head_image, i = o.gameconfig.drawconfig.nickname, a = o.gameconfig.drawconfig.qrcode, r = e.createCanvasContext("myCanvas");
                        1 == s.status && r.drawImage(t.header.path, s.x, s.y, parseInt(s.width), parseInt(s.width)),
                        r.drawImage(t.bg.path, 0, 0), 1 == a.status && "" != a.path && r.drawImage(t.qrcode.path, parseInt(a.x), parseInt(a.y), parseInt(a.width), parseInt(a.width)),
                        1 == i.status && (r.setFontSize(i.font_size), r.setFillStyle(i.color), r.setTextBaseline("top"),
                        r.setTextAlign(i.text_align), r.fillText(o.username, i.x, i.y)), r.draw(!0, function() {
                            setTimeout(function() {
                                e.canvasToTempFilePath({
                                    x: 0,
                                    y: 0,
                                    width: t.bg.width,
                                    height: t.bg.height,
                                    destWidth: t.bg.width,
                                    destHeight: t.bg.height,
                                    canvasId: "myCanvas",
                                    success: function(e) {
                                        console.log(t.bg.height, n(t.bg.height));
                                        var s = t.bg.width / t.bg.height;
                                        o.gameheight = 460 / s + "rpx", o.resimgurl = e.tempFilePath, o.imgfinished = !0,
                                        console.log(o.resimgurl, "result");
                                    },
                                    fail: function() {
                                        console.log("------------");
                                    }
                                });
                            }, 800);
                        });
                    },
                    imgresult: function() {
                        var t = this;
                        t.contentmsg.push({
                            resimg: t.resimgurl,
                            temp: "resimg"
                        }), t.scrollNumber++, t.scrollId = "id" + t.scrollNumber, t.contentmsg.push({
                            msg: t.wechatresult,
                            temp: "msg"
                        }), t.scrollNumber++, t.scrollId = "id" + t.scrollNumber, t.filebtn = !0, t.ischeck = 3,
                        t.playNumber = parseInt(t.playNumber) + 1, e.setStorageSync("playNumbertanme", t.playNumber);
                    },
                    fsaveimg: function() {
                        this.footbox = !0;
                    },
                    saveImg: function() {
                        var t = this;
                        e.saveImageToPhotosAlbum({
                            filePath: t.resimgurl,
                            success: function() {
                                setTimeout(function() {
                                    e.showToast({
                                        title: "图片保存成功",
                                        icon: "none",
                                        duration: 1e3
                                    }), t.footbox = !1;
                                }, 200);
                            },
                            fail: function(t) {
                                e.showModal({
                                    title: "保存失败",
                                    content: "保存图片到相册功能需要开启相册授权！",
                                    showCancel: !1,
                                    cancelText: "取消",
                                    confirmText: "确定",
                                    success: function(e) {
                                        qq.openSetting({});
                                    }
                                });
                            }
                        });
                    },
                    clearbox: function() {
                        this.footbox = !1;
                    },
                    fpreview: function() {
                        e.previewImage({
                            urls: [ this.resimgurl ],
                            longPressActions: {
                                success: function(e) {}
                            }
                        });
                    },
                    shareqzon: function() {
                        var e = this;
                        qq.openQzonePublish({
                            text: e.sharetitle,
                            media: [ {
                                type: "photo",
                                path: e.resimgurl
                            } ]
                        }), e.footbox = !1;
                    },
                    getImageAll: function(t, n) {
                        var o, s = 0, i = {};
                        for (var a in o = Object.keys(t), t) !function(a) {
                            e.getImageInfo({
                                src: t[a],
                                success: function(e) {
                                    i[a] = e, (s += 1) == o.length && n(i);
                                },
                                fail: function(e) {
                                }
                            });
                        }(a);
                    },
                    getIndex: function(e, t) {
                        var n = this, o = n.gameconfig.gameconfig, s = n.gameconfig.resultimage, i = escape(e), a = [], r = 0;
                        if (t) for (var l in i) r += i.charAt(l).charCodeAt(); else r = e;
                        if (console.log(n.usersex), 1 == o.gender.status) {
                            if ("男" == n.usersex) {
                                console.log("man");
                                var c = s.male.concat(s.common);
                                for (n.commimg = c, l = 0; l < c.length; l++) a.push(100 / c.length);
                                return n.probability(r % 100, a, 1, c.length);
                            }
                            var u = s.famale.concat(s.common);
                            for (n.commimg = u, console.log(u, "+++++++"), l = 0; l < u.length; l++) a.push(100 / u.length);
                            return n.probability(r % 100, a, 1, u.length);
                        }
                        for (n.commimg = s.common, l = 0; l < s.common.length; l++) a.push(100 / s.common.length);
                        return n.probability(r % 100, a, 1, s.common.length);
                    },
                    probability: function(e, t, n, o) {
                        for (var s = 0; n <= o; n++) if (e < (s += 1 * t[n - 1])) return n;
                        return e % o + n;
                    }
                }
            };
            t.default = u;
        }).call(this, o("543d").default);
    }
}, [ [ "70be", "common/runtime", "common/vendor" ] ] ]);
