Component({
    properties: {},
    data: {
        type: Math.floor(Math.random() * 10000) % 3,
        ads:{},
    },
    lifetimes: {
        attached: function () {
            const appConfig = wx.getStorageSync("appConfig");
            this.setData({
                ads:appConfig.ads || {}
            })
            console.log("attached",this.data.ads);
        },
        moved: function () {
            console.log("attached");
        },
        detached: function () {
            console.log("attached");
        },
    },
    methods: {}
});
