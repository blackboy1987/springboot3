!function() {
    var a = null;
    Page({
        data: {
            dataList: [ {
                id: 2,
                thumb: "../../static/el.png",
                title: "美团红包，饿了么优惠卷",
                desc: "天天来领卷省出一套房",
                type: 2
            } ]
        },
        bindtapOnItemTap: function(a) {
            var t = this, e = a.currentTarget.dataset.index, i = t.data.dataList[e].type;
            if (0 == i) wx.navigateToMiniProgram({
                appId: "wx0f3202363b8dd409"
            }); else if (1 == i) wx.navigateToMiniProgram({
                appId: "wx1f301790f4eaecc1"
            }); else if (2 == i) wx.navigateToMiniProgram({
                appId: "wx8f19af4469309895"
            }); else if (3 == i) wx.navigateToMiniProgram({
                appId: "wx8f19af4469309895"
            }); else if (4 == i) wx.navigateToMiniProgram({
                appId: "wx5b720aca742179b5"
            }); else {
                var n = t.data.dataList[e].url;
                wx.navigateTo({
                    url: n
                });
            }
        },
        onLoad: function(t) {
            let appConfig = wx.getStorageSync("appConfig");
            wx.createInterstitialAd && ((a = wx.createInterstitialAd({
                adUnitId: appConfig.indexAd.interstitialAdId
            })).onLoad(function() {}), a.onError(function(a) {}), a.onClose(function() {}));
        },
        onShow: function() {
            setTimeout(function() {
                a && a.show().catch(function(a) {
                    console.error(a);
                });
            }, 2e3);
        },
        onShareAppMessage: function(a) {
            return {
                title: "",
                desc: "",
                path: "/pages/home/home"
            };
        }
    });
}();
