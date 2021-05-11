Page({
    data: {},
    onLoad: function (options) {

    },
    quxiao: function() {
        wx.reLaunch({
            url: "../index/index"
        });
    }
});
