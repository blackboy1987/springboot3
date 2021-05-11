Page({
    data: {
        hasLogin: false
    },
    onLoad: function (options) {

    },
    openlogin:function (){
        wx.navigateTo({
            url:'/pages/user/login/login',
        })
    }
});
