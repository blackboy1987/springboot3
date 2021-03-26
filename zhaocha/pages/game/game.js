function t(t) {
    if (Array.isArray(t)) {
        for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
        return e;
    }
    return Array.from(t);
}

var a = getApp(), e = null, timeid = null, flag = 1;

Page({
    data: {
        first_login: 0,
        adUnitIdAAA: "",
        slots: [],
        topCircle: [],
        bottomCircle: [],
        errorCircle: [],
        topProp: [],
        bottomProp: [],
        resTimeTop: "",
        timeObj: null,
        hasNum: 0,
        focus: {},
        tipCtrol: 1,
        findList: [ {
            isHas: 0,
            notHasUrl: "../../images/a.png",
            hasUrl: "../../images/b.png"
        }, {
            isHas: 0,
            notHasUrl: "../../images/a.png",
            hasUrl: "../../images/b.png"
        }, {
            isHas: 0,
            notHasUrl: "../../images/a.png",
            hasUrl: "../../images/b.png"
        }, {
            isHas: 0,
            notHasUrl: "../../images/a.png",
            hasUrl: "../../images/b.png"
        }, {
            isHas: 0,
            notHasUrl: "../../images/a.png",
            hasUrl: "../../images/b.png"
        } ],
        txtTip: "这是第1个不同，请点击手指指引的位置",
        indexList: [],
        ballArr: [],
        resTimeColor: "#1b1b1b",
        curMusicBG: 1,
        excitation: 0,
        newSlots: [],
        flag_pk: 0,
        roomid: 0,
        tip_num: 0
    },
    onLoad: function(t) {
        if (null != t.t) {
            this.setData({
                fy_show: 1,
                seo: a.globalData.seo
            }), null == t.first_login && (t.first_login = 0), null != t.roomid && 0 < parseInt(t.roomid) && this.setData({
                flag_pk: 1,
                roomid: t.roomid
            });
            var e = a.globalData.config.adunit;
            this.setData({
                adList: {
                    one: e.banner,
                    two: e.banner,
                    three: e.banner
                },
                adUnitIdAAA: e.video,
                appConfig: a.globalData.config
            }), this.checkVideo();
            var i = this;
            this.setData({
                config: a.globalData.config,
                residue_time: a.globalData.config.game_time,
                first_login: parseInt(t.first_login)
            }), this.getTest(), this.data.flag_pk || (wx.createSelectorQuery().select(".numImg").boundingClientRect(function(t) {
                i.setData({
                    left: t.left,
                    top: t.top
                });
            }).exec(), wx.createSelectorQuery().select(".timeText").boundingClientRect(function(t) {
                i.setData({
                    errorleft: t.left + 150,
                    errortop: t.top + 10
                });
            }).exec()), this.data.flag_pk && (flag = 1, this.info_room());
        } else this.setData({
            fy_show: 0
        });
    },
    info_room: function() {
        null != timeid && clearTimeout(timeid);
        var i = this, t = this.data.residue_time;
        flag || (t = 0), a.util.request({
            url: "entry/wxapp/roomList",
            data: {
                appid: a.globalData.appid,
                uid: wx.getStorageSync("uid"),
                scene: a.globalData.scene,
                version: a.globalData.version,
                token: wx.getStorageSync("token"),
                roomid: this.data.roomid,
                flag_pk: 1,
                num: this.data.hasNum,
                residue: t,
                resource: "game"
            },
            method: "post",
            success: function(t) {
                var a = t.data.data;
                if (console.log(a), -1 != a.code) {
                    for (var e in i.setData({
                        room_list: a.room_list
                    }), a.room_list) {
                        if (parseInt(a.room_list[e].residue) <= 0) return void wx.redirectTo({
                            url: "../paiwei/result?t=1&roomid=" + this.data.roomid
                        });
                        if (5 == parseInt(a.room_list[e].num)) return void wx.redirectTo({
                            url: "../paiwei/result?t=1&roomid=" + this.data.roomid
                        });
                    }
                    1 == flag && (timeid = setTimeout(function() {
                        i.info_room();
                    }, 1e3));
                } else wx.showModal({
                    title: "提示",
                    content: a.message,
                    showCancel: !1,
                    success: function(t) {
                        wx.navigateBack();
                    }
                });
            }
        });
    },
    getSurplusTime: function() {
        a.getData("/Index/residue_time", !0, {
            appid: a.globalData.appid,
            uid: wx.getStorageSync("uid"),
            version: a.globalData.version,
            scene: a.globalData.scene
        }, {
            success: function(t) {
                200 == t.data.code && t.data.data;
            },
            fail: function() {}
        });
    },
    bindBGMusicTrue: function() {
        a.globalData.open_sound && (a.globalData.musicCommon.src = a.globalData.siteroot + "/attachment/aaa_zhaocha_resource/music/dadui.mp3", 
        a.globalData.musicCommon.play());
    },
    bindBGMusicOpen: function() {
        a.globalData.open_sound && (a.globalData.musicBG.src = a.globalData.siteroot + "/attachment/aaa_zhaocha_resource/music/bg.mp3", 
        a.globalData.musicBG.loop = !0, a.globalData.musicBG.autoplay = !0, wx.setStorageSync("curMusicBG", 1), 
        this.setData({
            curMusicBG: 1
        }, function() {
            a.globalData.musicBG.play();
        }));
    },
    bindBGMusicClose: function() {
        wx.setStorageSync("curMusicBG", 0), this.setData({
            curMusicBG: 0
        }, function() {
            a.globalData.musicBG.stop();
        });
    },
    getNextTip: function() {
        this.setData({
            tip_num: this.data.tip_num + 1
        });
        for (var a = this.data.focus, e = this.data.slots, i = this.data.indexList, o = this.data.newSlots, s = [].concat(t(o)), r = 0; r < o.length; r++) for (var n = 0; n < i.length; n++) o[r].name == i[n].name && s.splice(r, 1, {});
        if (this.data.hasNum < this.data.rightNum) for (var l = 0; l < s.length; l++) if (null != s[l].name) {
            a.layer = s[l].layer, a.x = s[l].x + s[l].width / 2 - 20, a.y = s[l].y + s[l].height / 2 - 20, 
            a.item = s[l];
            break;
        }
        e = s[0], "LayerAMiddle" == a.layer ? a.ctrol = 1 : "LayerBMiddle" == a.layer && (a.ctrol = 0), 
        this.setData({
            focus: a,
            tipCtrol: 0,
            item: e,
            indexList: i,
            newSlots: o
        });
    },
    noneClick: function(t) {
        var a = this;
        this.bindBGMusicTrue(), "提示" == t.currentTarget.dataset.istip && this.setData({
            tipCtrol: 1
        });
        for (var e = void 0, i = "", o = void 0, s = t.detail.x, r = t.detail.y, n = this.data.indexList, l = this.data.newSlots, d = t.currentTarget.dataset.place, c = 0; c < n.length; c++) if (e = t.currentTarget.dataset.item, 
        n[c].name == e.name) return void console.log("同位置重复点击");
        t ? (e = t.currentTarget.dataset.item, o = t.currentTarget.dataset.item, n.push(o)) : e = this.data.item;
        var u = this.data.hasNum, g = {};
        g.x = e.x + e.width / 2 - 15, g.y = e.y + e.height / 2 - 15, this.data.topCircle.push(g), 
        this.data.bottomCircle.push(g);
        for (c = 0; c < l.length; c++) l[c].name == e.name && (l.splice(c, 1), this.setData({
            newSlots: l
        }));
        this.setData({
            topCircle: a.data.topCircle,
            bottomCircle: a.data.bottomCircle,
            indexList: n
        }), u += 1, this.data.findList[u - 1].isHas = 1, 0 < u && (i = "很好，再找到" + (this.data.rightNum - u) + "个不同之处就能过关了！"), 
        this.setData({
            hasNum: u,
            findList: a.data.findList,
            txtTip: i,
            place: d
        }), this.cartAnimation(s, r, "2", d), u == this.data.rightNum && 0 <= this.data.residue_time && (clearInterval(a.data.timeObj), 
        a.data.flag_pk ? (flag = 2, a.info_room()) : wx.redirectTo({
            url: "../win/win?t=1"
        }));
    },
    backFun: function() {
        var t = getCurrentPages(), e = t[t.length - 2].route;
        "pages/fail/fail" == e || "pages/win/win" == e ? wx.navigateBack({
            delta: 2
        }) : (wx.navigateBack(), a.globalData.musicBG.stop());
    },
    getTipFun: function() {
        if (this.data.tipCtrol) {
            var i = this;
            10 <= this.data.gold ? (this.getNextTip(), a.postData("/Centre/use_gold_reminder", !0, {
                appid: a.globalData.appid,
                uid: wx.getStorageSync("uid"),
                scene: a.globalData.scene,
                version: a.globalData.version,
                token: wx.getStorageSync("token")
            }, {
                success: function(t) {
                    if (200 == t.data.code) {
                        var e = t.data.data;
                        1 == e.status ? (i.setData({
                            gold: e.gold
                        }), a.globalData.gold = e.gold) : 2 == e.status && wx.showToast({
                            title: "金币不足",
                            icon: "none"
                        });
                    }
                },
                fail: function() {}
            })) : wx.showToast({
                title: "金币不足",
                icon: "none"
            });
        }
    },
    countDown: function() {
        var t = this;
        clearInterval(t.data.timeObj);
        var a = this.data.residue_time;
        this.data.timeObj = setInterval(function() {
            0 < a ? (a -= 1, t.setData({
                residue_time: a
            }), t.change()) : (clearInterval(t.data.timeObj), t.data.hasNum < t.data.rightNum && (t.data.flag_pk ? (flag = 0, 
            t.info_room()) : wx.redirectTo({
                url: "../fail/fail?t=1"
            })));
        }, 1e3);
    },
    change: function() {
        var t = this.data.residue_time, a = void 0, e = t - 60 * (a = 60 <= t ? parseInt(t / 60) : 0);
        a < 10 && (a = "0" + a), e < 10 && (e = "0" + e);
        var i = a + ":" + e;
        this.setData({
            resTimeTop: i
        });
    },
    getTest: function() {
        var o = this, s = [], t = "/Index/start_game";
        0 < parseInt(o.data.roomid) && (t = "/Index/start_pkgame"), a.postData(t, !0, {
            appid: a.globalData.appid,
            uid: wx.getStorageSync("uid"),
            scene: a.globalData.scene,
            version: a.globalData.version,
            token: wx.getStorageSync("token"),
            roomid: o.data.roomid,
            reset: wx.getStorageSync("reset")
        }, {
            success: function(t) {
                if (200 == t.data.code) {
                    var e = t.data.data;
                    if (1 == e.status) {
                        for (var i = 0; i < e.question.length; i++) 0 != i && s.push(e.question[i]);
                        o.getSurplusTime(), o.setData({
                            slots: e.question,
                            rightNum: e.question.length - 1,
                            value: e.value,
                            newSlots: s
                        }), o.countDown(), a.globalData.ticket = e.ticket, wx.setStorageSync("ticket", e.ticket), 
                        wx.getSystemInfo({
                            success: function(t) {
                                var a = t.windowWidth - 30, e = a / 1602;
                                o.setData({
                                    imgWidth: a,
                                    porp: e,
                                    winHeight: t.windowHeight
                                }), o.changeProp();
                            }
                        }), 1 == o.data.first_login && o.getNextTip();
                    }
                }
            },
            fail: function() {}
        });
    },
    getError: function(t) {
        var a = this, e = this, i = t.detail.x, o = t.detail.y, s = {};
        s.x = i - 30, s.y = o - 30, wx.vibrateShort(), this.data.errorCircle.push(s), this.setData({
            errorCircle: e.data.errorCircle
        }), 20 < e.data.residue_time ? this.setData({
            residue_time: e.data.residue_time - 20,
            resTimeColor: "red"
        }) : (clearInterval(e.data.timeObj), e.data.flag_pk ? (flag = 0, e.info_room()) : wx.redirectTo({
            url: "../fail/fail?t=1"
        })), this.change(), this.countDown(), setTimeout(function() {
            a.setData({
                errorCircle: [],
                resTimeColor: "#1b1b1b"
            });
        }, 500), this.cartAnimation(i, o, "1", "");
    },
    cartAnimation: function(t, a, e, i) {
        var o = this, s = this.data.topCircle.length, r = this.data.slots.length - 1;
        if (this.data.leftNum = t, this.data.topNum = a, (this.data.opacity = 1) < s && s <= r && "2" == e ? (o.data.left = o.data.left + 24, 
        console.log(o.data.left)) : 1 < s && s <= r && "1" == e && (o.data.errorleft = o.data.errorleft + 24), 
        this.setData({
            type: e,
            left: o.data.left
        }), s + 1 <= r) var n = setInterval(function() {
            if ("1" == e) o.data.leftNum >= o.data.errorleft || o.data.topNum >= o.data.errortop ? (t = 0 < (t = (o.data.leftNum - o.data.errorleft) / 10) ? Math.ceil(t) : Math.floor(t), 
            o.data.leftNum -= t, a = 0 < (a = (o.data.topNum - o.data.errortop) / 10) ? Math.ceil(a) : Math.floor(a), 
            o.data.topNum -= a, o.data.topNum <= o.data.errortop + 20 ? (a = o.data.opacity / 5, 
            o.data.opacity -= a) : o.data.topNum == o.data.errortop && (o.data.opacity = 0), 
            o.setData({
                topNum: o.data.topNum,
                leftNum: o.data.leftNum,
                opacity: o.data.opacity
            }), o.data.topNum == o.data.errortop && (clearInterval(n), o.data.opacity -= a)) : clearInterval(n); else if ("2" == e) if (o.data.topNum >= o.data.top) {
                var t = (o.data.leftNum - o.data.left) / 10;
                if (t = 0 < t ? Math.ceil(t) : Math.floor(t), o.data.leftNum -= t, a = 0 < (a = (o.data.topNum - o.data.top) / 10) ? Math.ceil(a) : Math.floor(a), 
                o.data.topNum -= a, o.data.topNum <= o.data.top + 20) {
                    var a = o.data.opacity / 5;
                    o.data.opacity -= a;
                } else o.data.topNum == o.data.top && (o.data.opacity = 0);
                o.setData({
                    topNum: o.data.topNum,
                    leftNum: o.data.leftNum,
                    opacity: o.data.opacity
                }), o.data.topNum == o.data.top && (clearInterval(n), o.data.opacity -= a);
            } else clearInterval(n);
        }, 60);
    },
    changeProp: function() {
        for (var t = this.data.porp, a = this.data.topProp, e = this.data.bottomProp, i = this.data.slots, o = 0; o < i.length; o++) i[o].width = t * i[o].width, 
        i[o].height = t * i[o].height, i[o].x = t * i[o].x - i[o].width / 2, i[o].y = t * Math.abs(i[o].y) - i[o].height / 2, 
        "LayerAMiddle" == i[o].layer && a.push(i[o]), "LayerBMiddle" == i[o].layer && e.push(i[o]);
        this.setData({
            slots: i,
            topProp: a,
            bottomProp: e
        });
    },
    getProportion: function() {
        var t = this.data.imgWidth, a = parseInt(t / this.data.slots[0].width);
        this.setData({
            porp: a
        });
    },
    startVideo: function(t) {
        var a = this, i = t.currentTarget.dataset.name;
        clearInterval(this.data.timeObj), this.setData({
            typeName: i
        }), e && e.show().catch(function(t) {
            console.log("激励视频失败"), a.countDown(), a.setData({
                excitation: 0
            });
        });
    },
    checkVideo: function() {
        var a = this;
        wx.createRewardedVideoAd && ((e = wx.createRewardedVideoAd({
            adUnitId: a.data.adUnitIdAAA
        })).onLoad(function() {
            console.log("激励视频 广告加载成功"), a.setData({
                excitation: 1
            });
        }), e.onError(function(t) {
            console.log("视频报错,隐藏视频答题卡"), a.setData({
                excitation: 0
            });
        }), e.onClose(function(t) {
            a.countDown(), t && t.isEnded || void 0 === t ? "提示" == a.data.typeName && (a.getNextTip(), 
            console.log("看视频得提示")) : (wx.showToast({
                title: "未观看完整视频，无法获得奖励",
                icon: "none",
                duration: 1e3
            }), console.log("中途退出"));
        }));
    },
    onShow: function() {
        this.data.fy_show && (this.bindBGMusicOpen(), this.setData({
            gold: a.globalData.gold
        }), 1 == wx.getStorageSync("reset") && (wx.setStorageSync("reset", 0), this.setData({
            residue_time: 60
        })), this.countDown());
    },
    onHide: function() {
        this.bindBGMusicClose(), a.globalData.musicBG.stop();
        clearInterval(this.data.timeObj);
    },
    onUnload: function() {
        null != timeid && clearTimeout(timeid), this.bindBGMusicClose();
        clearInterval(this.data.timeObj), a.globalData.musicBG.stop(), this.setData({
            resTimeTop: ""
        });
    },
    onShareAppMessage: function() {
        var t = {
            title: a.globalData.config.share_title,
            path: "pages/index/index?inviter_id=" + a.globalData.uid,
            imageUrl: this.data.slots[0].url,
            success: function(t) {}
        };
        return console.log(t), t;
    }
});