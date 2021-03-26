var _data;

function _defineProperty(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var t = getApp(), a = null;

Page({
    data: (_data = {
        scrollId: "",
        nickname: "",
        avatarurl: "",
        adList: {
            one: "",
            two: "",
            three: ""
        },
        adUnitIdAAA: "",
        curAD: 0,
        oneAd: 1,
        getuser: 1,
        toastCtrol: 0,
        timer: null,
        residue_time: 0,
        engList: [ "../../images/engA.png", "../../images/engB.png", "../../images/engC.png", "../../images/engD.png", "../../images/engE.png" ],
        excitation: 0,
        hasOnShow: !1,
        ticket_add: 1,
        config: {
            ticket_max: 7,
            ticket_time: 0
        },
        flag_load: !1,
        rankData: [],
        myRankRow: {},
        close_service: 0,
        moreGameList: [],
        adunit: {},
        rank_list: []
    }, _defineProperty(_data, "scrollId", "list-scroll-item1"), _defineProperty(_data, "userinfo", {}),
    _defineProperty(_data, "leftMoreGame", []), _defineProperty(_data, "rightMoreGame", []),
    _defineProperty(_data, "rewards", {
        show: 0,
        list: []
    }), _defineProperty(_data, "money", 0), _defineProperty(_data, "yf_submit", 1),
    _defineProperty(_data, "siteInfo", require("../../siteinfo.js")), _defineProperty(_data, "huodongImg", ""),
    _defineProperty(_data, "huodongStatus", 0), _defineProperty(_data, "kefuWeixin", ""),
    _defineProperty(_data, "showAd", !0), _data),
    toggleMoreGame: function() {
        this.setData({
            showMoreGamePopup: !this.data.showMoreGamePopup
        });
    },
    tapMoreGame: function(t) {
        var a = t.currentTarget.dataset;
        wx.navigateToMiniProgram({
            appId: a.item.gameAppid,
            path: a.item.gamePath,
            success: function(t) {
                console.log("跳转成功");
            },
            fail: function() {
                console.log("跳转失败"), wx.previewImage({
                    urls: [ a.item.gameQrcode ]
                });
            }
        });
    },
    onLoad: function(a) {
        var n = a, s = this;
        this.getConfig(), a.open_date && this.setData({
            open_date: a.open_date,
            toastCtrol: 5
        }), t.wxLogin(function(a) {
            var e, o = s, i = a.data;
            console.log("i",a.data);
            console.log("a.data",i);
            console.log("用户当前的uid是：" + i.uid);
            wx.removeStorageSync("customs");
            wx.removeStorageSync("token");
            wx.removeStorageSync("value");
            wx.setStorageSync("customs", parseInt(i.customs));
            wx.setStorageSync("token", i.token);
            wx.setStorageSync("value", parseInt(i.value));
            wx.setStorageSync("ticket", i.ticket);
            t.globalData.token = i.token;

            t.globalData.userInfo && o.setData({
                userInfo: t.globalData.userInfo
            }), 1 == i.first_login && wx.showModal({
                title: "提示",
                content: "欢迎您的到来,对比两张图片,找出5个不同之处即可通关,请点击 ‘开始闯关’",
                confirmText: "我知道了",
                confirmColor: "#677288",
                showCancel: !1,
                success: function(t) {}
            }), wx.setStorageSync("uid", i.uid), o.setData((_defineProperty(e = {
                userinfo: i,
                service_flag: i.service_flag,
                noticeCard: i.noticeCard,
                open_sound: i.open_sound,
                flag_load: !0,
                nickname: i.nickname,
                avatarurl: i.avatarurl,
                uid: i.uid,
                gold: i.gold,
                first_login: i.first_login,
                is_add: i.is_add,
                money: i.money,
                ticket: i.ticket,
                customs: wx.getStorageSync("customs"),
                value: wx.getStorageSync("value"),
                scene: t.globalData.scene,
                value_name: i.value_name,
                rank: i.rank,
                is_userinfo: i.is_userinfo
            }, "uid", i.uid), _defineProperty(e, "will_title", i.will_title), _defineProperty(e, "rank_img", i.rank_img),
            _defineProperty(e, "rank_name_img", i.rank_name_img), _defineProperty(e, "sign_alert", i.sign_alert),
            e)), o.join_paiwei(n), t.globalData.open_sound = i.open_sound, t.globalData.rank = i.rank,
            t.globalData.gold = i.gold, o.data.ticket < o.data.config.ticket_max ? (clearInterval(o.data.timer),
            o.getSurplusTime()) : o.data.ticket == o.data.config.ticket_max && clearInterval(o.data.timer),
            0 == i.is_userinfo ? o.setData({
                getuser: 1
            }) : o.setData({
                getuser: 0
            }), o.data.ticket == o.data.config.ticket_max && o.setData({
                resTime: "已满"
            });
        });
    },
    closeHuodong: function() {
        this.data.huodongStatus ? this.setData({
            huodongStatus: 0
        }) : this.setData({
            huodongStatus: 1
        });
    },
    join_paiwei: function(t) {
        "paiwei" == t.mode && null != t.roomid && 1 < parseInt(t.roomid) && this.setData({
            toastCtrol: 11,
            roomid: t.roomid
        });
    },
    paiwei: function(t) {
        "paiwei" == t.mode && null != t.roomid && 1 < parseInt(t.roomid) && wx.navigateTo({
            url: "../paiwei/paiwei?t=1&roomid=" + t.roomid
        });
    },
    bannerRecord: function() {},
    handleContact: function() {},
    submitInfo: function(a) {
        if ("" == t.globalData.openid) return !1;
        var e = t.util.request_url({
            url: "entry/wxapp/send"
        });
        wx.request({
            url: e,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                form_id: a.detail.formId,
                appid: t.globalData.appid,
                touser: t.globalData.openid,
                uid: t.globalData.uid,
                template_id: ""
            },
            success: function(t) {
                console.log("发送模板:" + JSON.stringify(t.data));
            }
        });
    },
    modifyFun: function() {
        console.log(this.data.sign_alert), this.modifyRing(this.data.sign_alert);
    },
    modifyRing: function(a) {
        var e = this;
        0 == a ? a = 1 : 1 == a && (a = 0), t.postData("/Centre/edit_sign_alert", !0, {
            appid: t.globalData.appid,
            uid: wx.getStorageSync("uid"),
            scene: t.globalData.scene,
            version: t.globalData.version,
            token: wx.getStorageSync("token"),
            sign_alert: a
        }, {
            success: function(t) {
                200 == t.data.code && 1 == t.data.data.status && (1 == a ? e.setData({
                    sign_alert: 1
                }) : e.setData({
                    sign_alert: 0
                }));
            },
            fail: function() {}
        });
    },
    duanweiFun: function() {
        var t = this, a = Math.min(t.data.userinfo.rank + 1, this.data.rank_list.length);
        setTimeout(function() {
            t.setData({
                scrollId: "list-scroll-item" + a
            });
        }, 50), this.setData({
            toastCtrol: 10
        });
    },
    toDraw: function() {
        wx.navigateTo({
            url: "../draw/draw?t=1"
        });
    },
    joinGame: function() {
        var t = this.data.roomid + "";
        if (6 == t.length) {
            0, this.setData({
                toastCtrol: 0
            }), this.paiwei({
                mode: "paiwei",
                roomid: t
            });
        } else wx.showToast({
            title: "请输入6位房间号",
            icon: "none",
            duration: 2e3
        });
    },
    inupt_roomid: function(t) {
        var a = t.detail.value + "";
        this.setData({
            roomid: a
        });
    },
    pkBtn: function() {
        this.setData({
            toastCtrol: 11
        });
    },
    gift: function() {
        this.setData({
            toastCtrol: 4
        });
    },
    rankFun: function() {
        this.setData({
            toastCtrol: 6
        });
        var e = this;
        t.util.request({
            url: "entry/wxapp/rank",
            data: {
                appid: t.globalData.appid,
                uid: wx.getStorageSync("uid"),
                scene: t.globalData.scene,
                version: t.globalData.version,
                token: wx.getStorageSync("token")
            },
            method: "post",
            success: function(t) {
                var a = t.data.data;
                e.setData({
                    rankData: a.list,
                    myRankRow: a.my
                });
            }
        });
    },
    settingFun: function() {
        this.setData({
            toastCtrol: 9
        });
    },
    openDrawFun: function() {
        this.openDraw(this.data.open_date);
    },
    openDraw: function(a) {
        var o = this;
        t.postData("/Draw/open_trophy", !0, {
            appid: t.globalData.appid,
            uid: wx.getStorageSync("uid"),
            scene: t.globalData.scene,
            version: t.globalData.version,
            open_date: a
        }, {
            success: function(a) {
                if (200 == a.data.code) {
                    var e = a.data.data;
                    1 == e.status ? (o.setData({
                        ticket_add: e.ticket_add,
                        toastCtrol: 2
                    }), o.data.ticket = e.ticket, t.globalData.ticket = e.ticket) : (o.setData({
                        toastCtrol: 0
                    }), wx.showToast({
                        icon: "none",
                        title: e.msg
                    }));
                }
            },
            fail: function() {}
        });
    },
    countDown: function() {
        var t = this;
        clearInterval(t.data.timer);
        var a = this.data.residue_time;
        this.data.timer = setInterval(function() {
            0 != a ? (a -= 1, t.setData({
                residue_time: a
            }), t.change()) : (clearInterval(t.data.timer), t.getSurplusTime());
        }, 1e3);
    },
    change: function() {
        var t = this.data.residue_time, a = void 0, e = t - 60 * (a = 60 <= t ? parseInt(t / 60) : 0);
        a < 10 && (a = "0" + a), e < 10 && (e = "0" + e);
        var o = a + ":" + e;
        this.setData({
            resTime: o
        });
    },
    getSurplusTime: function() {
        var o = this;
        t.postData("/Index/residue_time", !0, {
            appid: t.globalData.appid,
            uid: wx.getStorageSync("uid"),
            version: t.globalData.version,
            scene: t.globalData.scene
        }, {
            success: function(a) {
                if (200 == a.data.code) {
                    var e = a.data.data;
                    1 == e.status ? (clearInterval(o.data.timer), o.setData({
                        residue_time: e.residue_time,
                        value: e.value,
                        money: e.money,
                        ticket: e.ticket,
                        gold: e.gold,
                        service_flag: e.service_flag,
                        share_flag: e.share_flag,
                        help_flag: e.help_flag,
                        rank_img: e.rank_img,
                        rank_name_img: e.rank_name_img,
                        value_name: e.value_name,
                        rank: e.rank,
                        will_title: e.will_title
                    }), t.globalData.ticket = e.ticket, t.globalData.gold = e.gold, o.data.ticket == o.data.config.ticket_max ? (o.setData({
                        resTime: "已满"
                    }), clearInterval(o.data.timer)) : 0 == e.residue_time ? (clearInterval(o.data.timer),
                    o.getTimeTicket(o.data.timer)) : (clearInterval(o.data.timer), o.setData({
                        residue_time: e.residue_time,
                        timer: null
                    }), o.change(), o.countDown())) : o.data.ticket == o.data.config.ticket_max && (o.setData({
                        resTime: "已满"
                    }), clearInterval(o.data.timer));
                }
            },
            fail: function() {}
        });
    },
    getTimeTicket: function(o) {
        var i = this;
        t.postData("/Index/get_time_ticket", !0, {
            appid: t.globalData.appid,
            uid: wx.getStorageSync("uid"),
            scene: t.globalData.scene,
            version: t.globalData.version,
            token: wx.getStorageSync("token")
        }, {
            success: function(a) {
                if (200 == a.data.code) {
                    var e = a.data.data;
                    clearInterval(i.data.timer), clearInterval(o), i.setData({
                        ticket: e.ticket
                    }), t.globalData.ticket = e.ticket, 1 == e.status ? i.data.ticket < i.data.config.ticket_max ? i.getSurplusTime() : (clearInterval(i.data.timer),
                    i.setData({
                        resTime: "已满"
                    })) : 2 == e.status && (clearInterval(i.data.timer), i.data.ticket < i.data.config.ticket_max ? (i.setData({
                        residue_time: e.residue_time
                    }), i.change(), i.countDown()) : (clearInterval(o), i.setData({
                        resTime: "已满"
                    })));
                }
            },
            fail: function() {}
        });
    },
    getVedioGold: function() {
        var o = this;
        t.postData("/Index/get_video_gold", !0, {
            appid: t.globalData.appid,
            uid: wx.getStorageSync("uid"),
            scene: t.globalData.scene,
            version: t.globalData.version,
            token: wx.getStorageSync("token")
        }, {
            success: function(a) {
                if (200 == a.data.code) {
                    var e = a.data.data;
                    1 == e.status && (o.setData({
                        gold_add: e.gold_add,
                        toastCtrol: 8
                    }), t.globalData.gold = e.gold);
                }
            },
            fail: function() {}
        });
    },
    getVedioEng: function() {
        var o = this;
        t.postData("/Index/get_video_ticket", !0, {
            appid: t.globalData.appid,
            uid: wx.getStorageSync("uid"),
            scene: t.globalData.scene,
            version: t.globalData.version,
            token: wx.getStorageSync("token")
        }, {
            success: function(a) {
                if (200 == a.data.code) {
                    var e = a.data.data;
                    1 == e.status && (o.setData({
                        ticket_add: e.ticket_add,
                        toastCtrol: 2
                    }), t.globalData.ticket = e.ticket);
                }
            },
            fail: function() {}
        });
    },
    checkGold: function(t) {
        var a = t.currentTarget.dataset.name;
        console.log(a), this.setData({
            typeName: a
        }), this.setData({
            toastCtrol: 7
        });
    },
    checkEng: function() {
        var t = 1;
        this.data.ticket >= this.data.config.ticket_max && (t = 3), this.setData({
            toastCtrol: t
        });
    },
    videoGetEng: function() {
        t.btnSoundTrue(), this.setData({
            ticket: t.globalData.ticket,
            toastCtrol: 0
        }), this.getSurplusTime();
    },
    videoGetGold: function() {
        t.btnSoundTrue(), this.setData({
            gold: t.globalData.gold,
            toastCtrol: 0
        });
    },
    startVideo: function(t) {
        var e = this, o = t.currentTarget.dataset.name;
        this.setData({
            typeName: o
        }), a && a.show().catch(function(t) {
            console.log("激励视频失败"), e.setData({
                excitation: 0
            });
        });
    },
    checkVideo: function() {
        var e = this, o = this;
        wx.createRewardedVideoAd && ((a = wx.createRewardedVideoAd({
            adUnitId: o.data.adUnitIdAAA
        })).onLoad(function() {
            console.log("激励视频 广告加载成功"), o.setData({
                excitation: 1
            });
        }), a.onError(function(t) {
            console.log("视频报错,隐藏视频答题卡"), o.setData({
                excitation: 0
            });
        }), a.onClose(function(t) {
            t && t.isEnded || void 0 === t ? (console.log("看视频获取体力/金币" + o.data.typeName), "vedioEng" == o.data.typeName && e.getVedioEng(),
            "vedioGold" == o.data.typeName && e.getVedioGold(), "vedioPK" == o.data.typeName && wx.navigateTo({
                url: "../paiwei/paiwei?t=1"
            }), "vedioJoinPK" == o.data.typeName && o.paiwei({
                mode: "paiwei",
                roomid: o.data.roomid
            })) : (wx.showToast({
                title: "未观看完整视频，无法获得奖励",
                icon: "none",
                duration: 1e3
            }), console.log("中途退出"));
        }));
    },
    closeFun: function() {
        this.setData({
            toastCtrol: 0
        });
    },
    copyKefu: function() {
        wx.setClipboardData({
            data: this.data.kefuWeixin,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    wxInfo: function(a, o, i) {
        var n = this, e = t.util.request_url({
            url: "entry/wxapp/user_authorization"
        });
        wx.request({
            url: e,
            header: {
                "content-type": "application/x-www-form-urlencoded",
                Accept: "application/json"
            },
            method: "POST",
            data: {
                userinfo: JSON.stringify(a),
                uid: t.globalData.uid,
                token: t.globalData.token,
                appid: t.globalData.appid
            },
            success: function(a) {
                var e = a.data;
                200 == e.code ? (wx.setStorageSync("userInfo", a.data.data), t.globalData.userInfo = a.data.data,
                n.setData({
                    userInfo: a.data.data
                }), "function" == typeof o && o()) : (wx.showToast({
                    title: e.msg,
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                }), "function" == typeof i && i());
            },
            fail: function() {}
        });
    },
    wxUserInfo: function(t) {
        var a = t.detail.errMsg;
        if ("getUserInfo:ok" == a) {
            var e = t.detail.userInfo;
            wx.setStorageSync("userInfo", e), this.wxInfo(wx.getStorageSync("userInfo")), this.setData({
                getuser: 0,
                userInfo: t.detail.userInfo
            }), wx.showToast({
                title: "授权成功，请继续游戏",
                icon: "none",
                duration: 2e3,
                mask: !0
            });
        } else "getUserInfo:fail auth deny" == a && (this.setData({
            getuser: 1
        }), wx.showToast({
            title: "授权后才能查看",
            icon: "none",
            duration: 2e3,
            mask: !0
        }));
    },
    toGameSubscribe: function() {
        var a = this.data.config, e = this, o = a.subscribe_id;
        o.length ? wx.requestSubscribeMessage({
            tmplIds: [ o ],
            success: function(t) {},
            fail: function(t) {},
            complete: function(a) {
                "accept" == a[o] && t.getData("/Index/subscribeMessage", !0, {
                    appid: t.globalData.appid,
                    uid: wx.getStorageSync("uid")
                }, {
                    success: function(t) {},
                    fail: function() {}
                }), e.toGame();
            }
        }) : e.toGame();
    },
    toGame: function() {
        t.btnSoundTrue(), this.data.ticket <= 0 ? this.setData({
            toastCtrol: 1
        }) : wx.navigateTo({
            url: "../game/game?t=1&first_login=0"
        });
    },
    toPaiweiSubscribe: function() {
        var a = this.data.config, e = this, o = a.subscribe_id;
        o.length ? wx.requestSubscribeMessage({
            tmplIds: [ o ],
            success: function(t) {},
            fail: function(t) {},
            complete: function(a) {
                "accept" == a[o] && t.getData("/Index/subscribeMessage", !0, {
                    appid: t.globalData.appid,
                    uid: wx.getStorageSync("uid")
                }, {
                    success: function(t) {},
                    fail: function() {}
                }), e.toPaiwei();
            }
        }) : e.toPaiwei();
    },
    toPaiwei: function() {
        if (this.data.excitation) return this.setData({
            typeName: "vedioPK"
        }), void (a && a.show().catch(function(t) {
            console.log("激励视频失败"), e.setData({
                excitation: 0
            });
        }));
        t.btnSoundTrue(), wx.navigateTo({
            url: "../paiwei/paiwei?t=1"
        });
    },
    getConfig: function() {
        var o = this;
        if (1047 == t.globalData.scene || 1011 == t.globalData.scene || 1025 == t.globalData.scene) {
            var a = {
                ticket_max: 7,
                ticket_time: 600,
                is_share: 0,
                game_time: 100,
                down_time: 20
            };
            a.share_img = t.globalData.siteroot + "/attachment/aaa_zhaocha_resource/images/service_img.png",
            a.share_title = "快来找不同", a.service_img = t.globalData.siteroot + "/attachment/aaa_zhaocha_resource/service_img.png",
            a.service_title = "点击领取", this.setData({
                config: a
            });
        }
        t.getData("/Config/config", !0, {
            appid: t.globalData.appid,
            uid: wx.getStorageSync("uid"),
            scene: t.globalData.scene,
            version: t.globalData.version
        }, {
            success: function(a) {
                if (200 == a.data.code) {
                    var e = a.data.data;
                    console.log("dd", e), e.kouling.length && wx.setClipboardData({
                        data: e.kouling,
                        success: function(t) {
                            wx.showToast({
                                title: "登录成功",
                                icon: "none",
                                duration: 1e3
                            });
                        }
                    }), t.globalData.name = e.name, t.globalData.logo = e.logo, t.globalData.siteroot = e.cdn,
                    t.globalData.seo = e.seo, console.log("t.globalData.siteroot", t.globalData.siteroot),
                    o.setData({
                        seo: e.seo,
                        yf_show: e.yf_show,
                        huodongImg: e.alert_image,
                        notice: e.notice,
                        yf_show_image: e.yf_show_image,
                        rank_list: e.rank_list,
                        moreGameList: e.moregame,
                        leftMoreGame: e.leftMoreGame,
                        rightMoreGame: e.rightMoreGame,
                        adunit: e.adunit,
                        close_service: e.close_service,
                        config: e,
                        kefuWeixin: e.kefuWeixin,
                        adUnitIdAAA: e.adunit.video,
                        adList: {
                            one: e.adunit.banner,
                            two: e.adunit.banner,
                            three: e.adunit.banner
                        }
                    }), e.alert_flag && setTimeout(function() {
                        o.setData({
                            huodongStatus: 1
                        });
                    }, 1e3), o.checkVideo(), wx.setStorageSync("ticket_max", a.data.data.ticket_max),
                    t.globalData.config = a.data.data;
                }
            },
            fail: function() {}
        });
    },
    oneAdSuccess: function() {
        this.setData({
            oneAd: 1
        });
    },
    oneAdFail: function() {
        this.setData({
            oneAd: 0
        });
    },
    getDailyEng: function() {
        var o = this;
        t.getData("/Index/get_info", !0, {
            appid: t.globalData.appid,
            uid: wx.getStorageSync("uid")
        }, {
            success: function(a) {
                if (200 == a.data.code) {
                    var e = a.data.data;
                    1 == e.status && (o.setData({
                        ticket: e.ticket,
                        gold: e.gold
                    }), t.globalData.gold = e.gold, t.globalData.ticket = e.ticket);
                }
            },
            fail: function() {}
        });
    },
    onShareTimeline: function() {
        var t = this.data.config, a = {};
        return a.title = t.pyq_title, t.pyq_image.length && (a.imageUrl = t.pyq_image),
        t.pyq_vars.length && (a.query = t.pyq_vars), a;
    },
    onShareAppMessage: function(a) {
        "button" == a.from && this.setData({
            toastCtrol: 0
        });
        var e = "";
        null != a.target && ("体力" == a.target.dataset.other && wx.setStorageSync("shareCtrol", 1),
        "金币" == a.target.dataset.other && wx.setStorageSync("coinCtrol", 1), e = a.target.dataset.other),
        console.log("other", e), t.sharePublic(e);
        var o = {
            title: this.data.config.share_title,
            path: "pages/index/index?inviter_id=" + t.globalData.uid,
            imageUrl: this.data.config.share_img,
            success: function(t) {}
        };
        return console.log("share", o), o;
    },
    getShareCoin: function() {
        var o = this;
        t.postData("/Centre/share_get_gold", !0, {
            appid: t.globalData.appid,
            uid: wx.getStorageSync("uid"),
            scene: t.globalData.scene,
            version: t.globalData.version,
            token: wx.getStorageSync("token")
        }, {
            success: function(a) {
                if (200 == a.data.code) {
                    var e = a.data.data;
                    1 == e.status && (o.setData({
                        gold: e.gold
                    }), t.globalData.gold = e.gold);
                }
            },
            fail: function() {}
        });
    },
    getShareEng: function() {
        var o = this;
        t.postData("/Index/get_share_ticket", !0, {
            appid: t.globalData.appid,
            uid: wx.getStorageSync("uid"),
            scene: t.globalData.scene,
            version: t.globalData.version,
            token: wx.getStorageSync("token")
        }, {
            success: function(a) {
                if (200 == a.data.code) {
                    var e = a.data.data;
                    1 == e.status && (o.setData({
                        ticket_add: 1,
                        toastCtrol: 2
                    }), o.data.ticket = e.ticket, t.globalData.ticket = e.ticket);
                }
            },
            fail: function() {}
        });
    },
    onShow: function(a) {
        if (this.setData({
            ticket: t.globalData.ticket,
            gold: t.globalData.gold
        }), !this.data.hasOnShow) {
            this.setData({
                hasOnShow: !0
            }), 1 == wx.getStorageSync("coinCtrol") && (wx.removeStorageSync("coinCtrol"), this.getShareCoin(this.data.box_id)),
            1 == wx.getStorageSync("shareCtrol") && (wx.removeStorageSync("shareCtrol"), this.getShareEng());
            var e = wx.getStorageSync("ticket_max") ? wx.getStorageSync("ticket_max") : 7;
            this.data.ticket < e ? clearInterval(this.data.timer) : this.data.ticket == e && clearInterval(this.data.timer);
        }
        this.getSurplusTime();
    },
    onHide: function() {
        clearInterval(this.data.timer), this.setData({
            hasOnShow: !1
        });
    },
    onUnload: function() {
        clearInterval(this.data.timer), this.setData({
            hasOnShow: !1
        });
    },
    copy_opoenid: function() {
        wx.setClipboardData({
            data: this.data.uid,
            success: function(t) {}
        });
    },
    copy_kefu: function() {
        wx.setClipboardData({
            data: this.data.config.kefu_account,
            success: function(t) {}
        });
    },
    switchCard: function() {
        var a = !this.data.noticeCard;
        this.setData({
            noticeCard: a
        }), t.util.request({
            url: "entry/wxapp/setting",
            data: {
                appid: t.globalData.appid,
                uid: wx.getStorageSync("uid"),
                scene: t.globalData.scene,
                version: t.globalData.version,
                token: wx.getStorageSync("token"),
                noticeCard: a ? 1 : 0
            },
            method: "post",
            success: function(t) {}
        });
    },
    switchSound: function() {
        var a = !this.data.open_sound;
        this.setData({
            open_sound: a
        }), t.globalData.open_sound = a, t.util.request({
            url: "entry/wxapp/setting",
            data: {
                appid: t.globalData.appid,
                uid: wx.getStorageSync("uid"),
                scene: t.globalData.scene,
                version: t.globalData.version,
                token: wx.getStorageSync("token"),
                open_sound: a ? 1 : 0
            },
            method: "post",
            success: function(t) {}
        });
    },
    goRewards: function(a) {
        var e = a.currentTarget.dataset.item;
        if (e.msg.length && this.data.money < e.max_unit) wx.showToast({
            title: e.msg,
            icon: "none",
            duration: 2e3
        }); else {
            var o = this;
            t.util.request({
                url: "entry/wxapp/exchangeList",
                data: {
                    appid: t.globalData.appid,
                    uid: wx.getStorageSync("uid"),
                    scene: t.globalData.scene,
                    version: t.globalData.version,
                    token: wx.getStorageSync("token")
                },
                method: "post",
                success: function(t) {
                    o.setData({
                        rewards: t.data.data
                    });
                }
            }), this.setData({
                toastCtrol: 12
            });
        }
    },
    submitClick: function() {
        wx.showToast({
            title: "操作成功",
            icon: "none",
            duration: 2e3
        });
        var t = this;
        t.setData({
            yf_submit: 0
        }), setTimeout(function() {
            t.setData({
                yf_submit: 1
            });
        }, 2e3);
    },
    goExchange: function(a) {
        a.currentTarget.dataset.item;
        var e = this;
        t.util.request({
            url: "entry/wxapp/exchange",
            data: {
                appid: t.globalData.appid,
                uid: wx.getStorageSync("uid"),
                scene: t.globalData.scene,
                version: t.globalData.version,
                token: wx.getStorageSync("token")
            },
            method: "post",
            success: function(t) {
                wx.showToast({
                    title: "兑换成功, 请联系客服",
                    icon: "none",
                    duration: 2e3
                }), e.setData({
                    rewards: t.data.data,
                    money: t.data.data.money
                });
            }
        });
    },
    adYsmbLoad: function() {
        console.log("adYsmbLoad 原生模板广告加载成功"), this.setData({
            showAd: !0
        });
    },
    adYsmbError: function(t) {
        console.log("adYsmbError 原生模板广告加载失败", t), this.setData({
            showAd: !1
        });
    }
});
