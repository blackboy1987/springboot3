
App({
  onLaunch: function() {

    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })

    var n = wx.getUpdateManager();
    n.onCheckForUpdate(function(n) {
      console.log(n.hasUpdate);
    }), n.onUpdateReady(function() {
      wx.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否重启应用？",
        success: function(o) {
          o.confirm && n.applyUpdate();
        }
      });
    }), n.onUpdateFailed(function() {
      wx.showModal({
        title: "更新提示",
        content: "新版本下载失败",
        showCancel: !1
      });
    });
  },
  onShow: function(n) {},
  onHide: function() {},
  onError: function(n) {},
  globalData: {
    systemInfo: wx.getSystemInfoSync(),
    nav_height: 0
  },
  util: require("we7/resource/js/util.js"),
  siteInfo: require("siteinfo.js"),
});
