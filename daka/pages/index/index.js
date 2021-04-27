function t(t, e) {
  if (t && e) {
    for (var o = t.split("."), n = e.split("."), a = Math.min(o.length, n.length), i = 0, s = 0; i < a && 0 == (s = parseInt(o[i]) - parseInt(n[i]));) i++;
    return (s = 0 != s ? s : o.length - n.length) >= 0;
  }
  return console.log("版本号不能为空"), !1;
}

var e, o = function (t) {
  return t && t.__esModule ? t : {
    default: t
  };
}(require("../../utils/tools.js")), n = getApp();

Page({
  data: {
    videoAd: "",
    hasVideoAd: !1,
    show_sgin: !1,
    show_pop: !1,
    feed_succ: !1,
    feed_fail: !1,
    collect_show: !1,
    setTimeself: "",
    currencyTimeself: "",
    m_height: 60,
    t_h: "00",
    t_m: "00",
    t_i: "00",
    is_request: 1,
    show_capacity: !1,
    parent_id: 0,
    goldcoin: [],
    is_rule: 1,
    showAddMeBtn: !1,
    surplus: 0,
    show_login: !0,
    is_auth: !0,
    show_bd: !1,
    is_video: 1,
  },
  signIn: function () {
    this.data.surplus > 0 || (e.data.is_auth ? e.data.config.profit_subscribe_id ? wx.requestSubscribeMessage({
      tmplIds: [e.data.config.profit_subscribe_id],
      success: function (t) {
        e.succTips();
      },
      fail: function (t) { },
      complete: function (t) {
        e.conduct();
      }
    }) : e.conduct() : e.setData({
      show_login: !0
    }));
  },
  conduct: function () {
    e.data.hasVideoAd ? this.videoAdShow() : e.completed();
  },
  succTips: function () {
    var t = {
      action: "addTips",
      contr: "my",
      token: wx.getStorageSync("token")
    };
    o.default.request(t, function (t) { });
  },
  cancel_login: function () {
    e.setData({
      show_login: !1
    });
  },
  onLoad: function (t) {
    (e = this).data.goldcoin.length = 10, t.parent_id && wx.setStorageSync("parent_id", t.parent_id),
      t.scene && wx.setStorageSync("parent_id", decodeURIComponent(t.scene)), e.clearTime();
  },
  swRule: function () {
    this.setData({
      gdtext: "page-home-frien"
    });
  },
  onReady: function () {
    wx.createSelectorQuery().select("#global-nav").boundingClientRect(function (t) {
      if(!t){
        t = {
          height:0,
        };
      }
      e.setData({
        m_height: t.height||0,
      }), n.globalData.nav_height = t.height||0;
    }).exec();
    var a = {
      action: "home",
      contr: "index",
      token: wx.getStorageSync("token")
    };
    o.default.request(a, function (o) {
      console.log(o.data,"o");
      o.info = o.data;
      o.info.time  = o.info.time || 0,
      e.setData(o.info), wx.getStorageSync("showAddMeFlag" + o.info.time) || e.setData({
        showAddMeBtn: !0
      });
      var n = null;
      wx.createInterstitialAd && o.info.config.screen_ad && ((n = wx.createInterstitialAd({
        adUnitId: o.info.config.screen_ad
      })).onLoad(function () {
        console.log("onLoad event emit");
      }), n.onError(function (t) {
        console.log("onError event emit", t);
      }), n.onClose(function (t) {
        console.log("onClose event emit", t);
      }), n.show().catch(function (t) {
        console.error(t);
      }));
      var a = wx.getSystemInfoSync();
      o.info.config.video_ad && (t(a.SDKVersion, "2.6.0") && (e.data.videoAd = wx.createRewardedVideoAd({
        adUnitId: o.info.config.video_ad
      }), e.data.videoAd.onError(function (t) {
        console.log(t);
      })), e.setData({
        hasVideoAd: !0
      }));
    }, function (t) { }, function () { }, "", !0);
  },
  completed: function () {
    if (1 == this.data.is_request) {
      this.data.is_request = 2;
      var t = {
        action: "sign",
        contr: "clock",
        token: wx.getStorageSync("token")
      };
      o.default.request(t, function (t) {
        e.data.is_request = 1, 2 == t.status ? wx.showModal({
          title: "提示",
          mask: !0,
          content: t.info,
          showCancel: !1
        }) : (e.loadClock(), e.setData(t.info), e.setData({
          show_bd: !0,
          bd_img: t.info.bd_img,
          surplus: e.data.config.clock_interval
        }), e.data.surplus > 0 && (e.clearTime(), e.countdown()));
      }, function (t) {
        e.data.is_request = 1;
      }, function () {
        e.data.is_request = 1;
      }, "", !0);
    }
  },
  loadClock: function () {
    var t = {
      action: "today",
      contr: "index",
      token: wx.getStorageSync("token")
    };
    o.default.request(t, function (t) {
      e.setData(t.info);
    });
  },
  hideBd: function () {
    e.setData({
      show_bd: !1
    });
  },
  onClickAddToMinProgramCloseBtn: function () {
    wx.setStorageSync("showAddMeFlag" + this.data.time, !0), this.setData({
      showAddMeBtn: !1
    });
  },
  countdown: function () {
    var t = e.data.surplus;
    console.log(t), e.data.surplus--;
    var o = Math.floor(t / 60 / 60 % 24), n = Math.floor(t / 60 % 60), a = Math.floor(t % 60);
    e.data.surplus < 0 ? e.clearTime() : (o < 10 && (o = "0" + o), n < 10 && (n = "0" + n),
      a < 10 && (a = "0" + a), e.data.setTimeself = setTimeout(function () {
        e.setData({
          surplus: e.data.surplus
        });
        var t = {
          surplus: e.data.surplus,
          time: Date.parse(new Date())
        };
        wx.setStorageSync("surplus", t), e.countdown();
      }, 1e3));
  },
  hideSgin: function () {
    e.setData({
      show_sgin: !1
    });
  },
  videoAdShow: function (t) {
    this.data.videoAd && 1 == e.data.is_video && (e.data.is_video = 2, this.data.videoAd.show().catch(function () {
      e.data.videoAd.load().then(function () {
        return e.data.videoAd.show();
      }).catch(function (t) {
        e.data.is_video = 1, wx.showToast({
          icon: "none",
          title: "激励视频加载失败~"
        }), console.log("激励视频 广告显示失败");
      });
    }), e.data.videoAd.offError(function (t) {
      e.data.is_video = 1, console.log(t);
    }), e.data.videoAd.onClose(function (t) {
      e.data.is_video = 1, e.data.videoAd.offClose(), (t && t.isEnded || void 0 === t) && e.completed();
    }));
  },
  onShow: function () {
    var t = wx.getStorageSync("surplus");
    if (console.log(t), t) {
      var o = Date.parse(new Date());
      if (o - parseInt(t.time) < 1e3 * parseInt(t.surplus)) {
        var n = (1e3 * parseInt(t.surplus) - (o - parseInt(t.time))) / 1e3;
        e.setData({
          surplus: n
        }), e.clearTime(), e.countdown();
      }
    }
    e.loadClock();
  },
  gotoRank: function () {
    wx.navigateTo({
      url: "/pages/rank/rank"
    });
  },
  onHide: function () { },
  onUnload: function () {
    this.clearTime();
  },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () {
    return {
      title: this.data.share.text,
      imageUrl: this.data.share.images,
      path: "/pages/index/index?parent_id=" + this.data.share.member_id
    };
  },
  clearTime: function () {
    clearTimeout(e.data.setTimeself);
  },
  getUserInfo: function (t) {
    if ("getUserInfo:ok" == t.detail.errMsg) {
      var n = {
        action: "login",
        contr: "my",
        token: wx.getStorageSync("token"),
        encryptedData: t.detail.encryptedData,
        iv: t.detail.iv
      };
      o.default.request(n, function (t) {
        e.setData({
          is_auth: !0
        });
      });
    } else console.log("用户拒绝了");
  },
  closecapacity: function () {
    e.setData({
      show_capacity: !1
    });
  }
});
