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
const app = getApp();
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
    parentId: 0,
    goldcoin: [],
    is_rule: 1,
    showAddMeBtn: !1,
    surplus: 0,
    show_login: false,
    isAuth: false,
    show_bd: !1,
    is_video: 1,
    pageCur:'index'
  },
  // 点击打开
  signIn: function () {
    const profit_subscribe_id = wx.getStorageSync("profit_subscribe_id");
    this.data.surplus > 0 || (e.data.isAuth ? profit_subscribe_id ? wx.requestSubscribeMessage({
      tmplIds: [profit_subscribe_id],
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
    (e = this).data.goldcoin.length = 10, t.parentId && wx.setStorageSync("parentId", t.parentId),
      t.scene && wx.setStorageSync("parentId", decodeURIComponent(t.scene)), e.clearTime();
    const root = this;
    root.star();
    // 在这里加个登录功能。主要用来获取当前账号的token。
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.siteroot+'login',
            header:{
              appCode: n.siteInfo.appCode,
              appToken: n.siteInfo.appToken,
            },
            data: {
              code: res.code,
              parentId:t.parentId||472,
            },
            success(res) {
              wx.setStorageSync("userInfo",res.data.data);
              wx.setStorageSync("isAuth",res.data.data.isAuth);
              wx.setStorageSync("token",res.data.data.token);
              root.setData({
                isAuth:res.data.data.isAuth,
              });

              wx.request({
                url: app.globalData.siteroot+'today',
                method:"POST",
                header:{
                  appCode: n.siteInfo.appCode,
                  appToken: n.siteInfo.appToken,
                  token:res.data.data.token,
                },
                success(res) {
                  console.log("today",res.data.data);
                  root.setData(res.data.data)
                }
              })

            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });


  },
  swRule: function () {
    this.setData({
      gdtext: "page-home-frien"
    });
  },
  onReady: function () {
    const root = this;
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
      const appConfig = o.data;
      wx.setStorageSync("appConfig",appConfig);
      const rules = appConfig.config.rules;
      root.setData(appConfig);
      const ads = o.data.ads ||{};
      o.info = o.data.config;
      o.info.time  = o.info.time || 0,
      e.setData(o.info), wx.getStorageSync("showAddMeFlag" + o.info.time) || e.setData({
        showAddMeBtn: !0
      });
      var n = null;
      wx.createInterstitialAd && appConfig.ads.interstitialAdId && ((n = wx.createInterstitialAd({
        adUnitId: appConfig.ads.interstitialAdId,
      })).onLoad(function () {
        console.log("onLoad event emit");
      }), n.onError(function (t) {
        console.log("onError event emit", t);
      }), n.onClose(function (t) {
        console.log("onClose event emit", t);
      }), setTimeout(function (){
        n.show().catch(function (t) {
          console.error(t);
        })
      },15e3));
      var a = wx.getSystemInfoSync();
      appConfig.ads.rewardedVideoAdId && (t(a.SDKVersion, "2.6.0") && (e.data.videoAd = wx.createRewardedVideoAd({
        adUnitId: appConfig.ads.rewardedVideoAdId || '',
      }), e.data.videoAd.onError(function (t) {
        console.log(t);
      })), e.setData({
        hasVideoAd: !0
      }));
    }, function (t) { }, function () { }, "", !0);
  },
  completed: function () {
    const root = this;
    if (1 === root.data.is_request) {
      root.data.is_request = 2;
      var t = {
        action: "sign",
        contr: "clock",
        token: wx.getStorageSync("token")
      };
      o.default.request(t, function (t) {
        root.data.is_request = 1, 2 === t.data.status ? wx.showModal({
          title: "提示",
          mask: !0,
          content: t.data.info,
          showCancel: !1
        }) : (e.loadClock(), e.setData({
          show_bd: !0,
          bd_img: t.data.bd_img,
          surplus: root.data.config.clockInterval||60,
          todayPoint:root.data.todayPoint+t.data.signPoint,
        }), root.data.surplus > 0 && (root.clearTime(), root.countdown()));
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
    const root = this;
    var t = root.data.surplus;
    console.log(t), e.data.surplus--;
    var o = Math.floor(t / 60 / 60 % 24), n = Math.floor(t / 60 % 60), a = Math.floor(t % 60);
    root.data.surplus < 0 ? root.clearTime() : (o < 10 && (o = "0" + o), n < 10 && (n = "0" + n),
      a < 10 && (a = "0" + a), root.data.setTimeself = setTimeout(function () {
      root.setData({
          surplus: root.data.surplus
        });
        var t = {
          surplus: root.data.surplus,
          time: Date.parse(new Date())
        };
        wx.setStorageSync("surplus", t), root.countdown();
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
    const appConfig = wx.getStorageSync("appConfig");
    return {
      title: appConfig.config.shareText,
      imageUrl: appConfig.config.shareImage,
      path: "/pages/index/index?parentId=" + wx.getStorageSync("userInfo").id
    };
  },
  clearTime: function () {
    clearTimeout(e.data.setTimeself);
  },
  getUserInfo: function (t) {
    wx.getUserProfile({
      lang: 'zh_CN',
      desc: '用户登录',
      success: (res) => {
        console.log("getUserProfile",res);
        if ("getUserProfile:ok" === res.errMsg) {
          var n = {
            action: "login",
            contr: "my",
            token: wx.getStorageSync("token"),
            parentId: wx.getStorageSync("parentId"),
            ...res.userInfo,
            iv: t.detail.iv
          };
          o.default.request(n, function (t) {
            if(t.data.userInfo){
              e.setData({
                isAuth: t.data.userInfo.isAuth
              });
              wx.setStorageSync("isAuth",t.data.userInfo.isAuth);
            }


          });
        } else{
          console.log("用户拒绝了");
        }

      },
      fail: () => {
        wx.showToast({
          icon:'none',
          title:'已拒绝小程序获取信息',
        })
      }
    });
  },
  closecapacity: function () {
    e.setData({
      show_capacity: !1
    });
  },
  NavChange:function (e){
    const pageCur = this.data.pageCur;
    if(pageCur!==e.currentTarget.dataset.page){
      wx.navigateTo({
        url:'/pages/'+e.currentTarget.dataset.page+"/"+e.currentTarget.dataset.page,
      })
    }
  },
  star:function (){
    const root = this;
    wx.request({
      url: app.globalData.siteroot+'star',
      method:"POST",
      header:{
        appCode: n.siteInfo.appCode,
        appToken: n.siteInfo.appToken,
      },
      success(res) {
        root.setData({
          star:res.data.data
        })
      }
    })
  }
});
