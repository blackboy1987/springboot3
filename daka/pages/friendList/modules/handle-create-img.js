function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../../utils/wx-promisify/wx-promisify")), o = e(require("./base-canvas-palette.js")), a = (0,
t.default)(wx.saveImageToPhotosAlbum);

exports.default = {
    doCreateImg: function(e) {
        console.log(e.data.poster), e.setData({
            template: new o.default(e.data.poster).palette()
        });
    },
    createImgScuess: function(e, t) {
        e.imagePath = t.detail.path, wx.hideLoading(), console.log("=====生成图片成功========="),
        a({
            filePath: e.imagePath
        }).then(function() {
            wx.showToast({
                title: "保存图片成功！",
                icon: "none"
            });
        }).catch(function(t) {
            console.log("保存图片失败了:" + JSON.stringify(t)), console.log(t), -1 != t.errMsg.indexOf("auth") && e.setData({
                requestAuthType: 2,
                isShowOpensettingDialog: !0
            });
        });
    },
    createImgFail: function(e) {
        wx.hideLoading(), wx.showToast({
            title: "生成图片失败",
            icon: "none"
        }), console.error("=======生成图片失败=======:" + JSON.stringify(e));
    }
};
